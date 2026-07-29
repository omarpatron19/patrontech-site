import {
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  realpathSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync
} from 'node:fs';
import { basename, extname, isAbsolute, join, relative, resolve } from 'node:path';

const categories = new Set([
  'Azure',
  'Inteligencia Artificial',
  'Arquitectura Cloud',
  'FinOps',
  'Automatización e IaC',
  'Seguridad y Gobierno',
  'Certificaciones',
  'Comunidad'
]);

function parseArguments(argv) {
  const values = new Map();
  for (let index = 2; index < argv.length; index += 1) {
    const key = argv[index];
    if (!key.startsWith('--')) throw new Error(`Argumento inesperado: ${key}`);
    const value = argv[index + 1];
    if (!value || value.startsWith('--')) throw new Error(`Falta valor para ${key}`);
    values.set(key, value);
    index += 1;
  }
  return values;
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function assertString(value, field, min, max) {
  assert(typeof value === 'string' && value.trim().length >= min && value.length <= max, `${field} debe tener entre ${min} y ${max} caracteres`);
}

function isRealDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function assertDate(value, field) {
  assert(isRealDate(value), `${field} debe ser una fecha real con formato YYYY-MM-DD`);
}

function isInside(parent, child) {
  const path = relative(parent, child);
  return path !== '' && !path.startsWith('..') && !isAbsolute(path);
}

function markdownImages(markdown) {
  return [...markdown.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)].map((match) => ({
    alt: match[1].trim(),
    source: match[2].trim().split(/\s+/)[0]
  }));
}

function hasExpectedImageSignature(file, extension) {
  const bytes = readFileSync(file).subarray(0, 32);
  const ascii = (start, end) => bytes.subarray(start, end).toString('ascii');
  if (extension === '.png') return bytes.length >= 8 && bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  if (extension === '.jpg' || extension === '.jpeg') return bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (extension === '.webp') return bytes.length >= 12 && ascii(0, 4) === 'RIFF' && ascii(8, 12) === 'WEBP';
  if (extension === '.avif') return bytes.length >= 16 && ascii(4, 8) === 'ftyp' && ['avif', 'avis', 'mif1', 'msf1'].includes(ascii(8, 12));
  return false;
}

function validateMarkdown(body) {
  const withoutCode = body.replace(/```[\s\S]*?```/g, '').replace(/~~~[\s\S]*?~~~/g, '');
  assert(body.trim().length >= 200, 'contentMarkdown debe tener al menos 200 caracteres');
  assert(!/^#\s+/m.test(withoutCode), 'contentMarkdown no debe incluir H1; el layout genera el título');
  assert(/^##\s+/m.test(withoutCode), 'contentMarkdown requiere al menos un encabezado H2');
  assert((body.match(/```/g)?.length ?? 0) % 2 === 0, 'contentMarkdown contiene un bloque ``` sin cerrar');
  assert((body.match(/~~~/g)?.length ?? 0) % 2 === 0, 'contentMarkdown contiene un bloque ~~~ sin cerrar');
  assert(!/(?:javascript|vbscript|data):/i.test(withoutCode), 'contentMarkdown contiene un protocolo no permitido');
  assert(!/<\/?[A-Za-z][^>]*>/.test(withoutCode), 'contentMarkdown debe ser Markdown puro, sin HTML ni JSX');
}

function validatePayload(payload) {
  const collectionMap = { article: 'articles', guide: 'guides', news: 'news' };
  const collection = collectionMap[payload.contentType];
  assert(collection, 'contentType debe ser article, guide o news');
  assert(payload.schemaVersion === 1, 'schemaVersion debe ser 1');
  assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(payload.slug ?? ''), 'slug inválido');
  assertString(payload.title, 'title', 10, 110);
  assertString(payload.description, 'description', 50, 170);
  assertString(payload.summary, 'summary', 50, 320);
  assert(categories.has(payload.category), 'category no pertenece al catálogo permitido');
  assert(Array.isArray(payload.tags) && payload.tags.length >= 1 && payload.tags.length <= 12, 'tags debe contener entre 1 y 12 etiquetas');
  for (const tag of payload.tags) assertString(tag, 'cada tag', 2, 40);
  assert(new Set(payload.tags.map((tag) => tag.toLowerCase())).size === payload.tags.length, 'tags no debe contener duplicados');
  assertDate(payload.publishedAt, 'publishedAt');
  if (payload.updatedAt) {
    assertDate(payload.updatedAt, 'updatedAt');
    assert(payload.updatedAt >= payload.publishedAt, 'updatedAt no puede ser anterior a publishedAt');
  }
  assertString(payload.author, 'author', 4, 120);
  assert(typeof payload.featured === 'boolean', 'featured debe ser booleano');
  assert(payload.reviewStatus === 'approved', 'Solo se puede crear contenido con reviewStatus=approved');
  assert(payload.draft === false, 'Solo se puede crear contenido publicado con draft=false');
  assertString(payload.coverAlt, 'coverAlt', 12, 180);
  if (payload.imageCredit !== undefined) assertString(payload.imageCredit, 'imageCredit', 1, 180);
  if (payload.airtableRecordId !== undefined) assertString(payload.airtableRecordId, 'airtableRecordId', 1, 80);
  assert(typeof payload.contentMarkdown === 'string', 'contentMarkdown debe ser texto');
  validateMarkdown(payload.contentMarkdown);

  if (payload.contentType === 'guide') {
    assert(['Inicial', 'Intermedio', 'Avanzado'].includes(payload.level), 'Una guía requiere level válido');
    assert(Number.isInteger(payload.durationMinutes) && payload.durationMinutes >= 1 && payload.durationMinutes <= 600, 'Una guía requiere durationMinutes entre 1 y 600');
    assert(Array.isArray(payload.prerequisites) && payload.prerequisites.length <= 12, 'prerequisites debe ser un arreglo de máximo 12 elementos');
    for (const item of payload.prerequisites) assertString(item, 'cada prerequisite', 2, 120);
  }

  if (payload.contentType === 'news') {
    assert(['Anuncios', 'Noticias', 'Certificaciones', 'Eventos'].includes(payload.newsType), 'Una noticia requiere newsType válido');
    assertDate(payload.eventDate, 'eventDate');
    assert(Array.isArray(payload.sources) && payload.sources.length >= 1 && payload.sources.length <= 12, 'Una noticia requiere entre 1 y 12 fuentes');
    for (const source of payload.sources) {
      assertString(source?.title, 'cada source.title', 4, 180);
      assert(/^https:\/\//i.test(source?.url ?? ''), 'Cada fuente debe usar una URL HTTPS');
    }
  }

  return collection;
}

const args = parseArguments(process.argv);
const input = args.get('--input');
const assetsDirectory = args.get('--assets');
const outputRoot = args.get('--output-root') ?? 'src/data';
const overwrite = args.get('--overwrite') === 'true';

assert(input, 'Uso: npm run content:create -- --input payload.json --assets ./imagenes [--output-root src/data] [--overwrite true]');
assert(assetsDirectory, '--assets es obligatorio para verificar y copiar todas las imágenes');

const payload = JSON.parse(readFileSync(resolve(input), 'utf8'));
const collection = validatePayload(payload);
const images = Array.isArray(payload.images) ? payload.images : [];
assert(images.length >= 1 && images.length <= 20, 'images debe contener entre 1 y 20 imágenes');
const covers = images.filter((image) => image.role === 'cover');
assert(covers.length === 1, 'Debe existir exactamente una imagen con role=cover');
const cover = covers[0];

const allowedImageName = /^[a-z0-9][a-z0-9._-]*\.(png|jpe?g|webp|avif)$/;
const imageNames = new Set();
for (const image of images) {
  assert(image && typeof image === 'object', 'Cada elemento de images debe ser un objeto');
  assert(image.role === 'cover' || image.role === 'inline', `role inválido para ${image.fileName ?? 'imagen'}`);
  assert(allowedImageName.test(image.fileName ?? ''), `Nombre o formato de imagen inválido: ${image.fileName ?? '(vacío)'}`);
  assert(!imageNames.has(image.fileName), `Nombre de imagen duplicado: ${image.fileName}`);
  assertString(image.alt, `alt de ${image.fileName}`, 12, 180);
  if (image.prompt !== undefined) assertString(image.prompt, `prompt de ${image.fileName}`, 12, 1200);
  if (image.insertAfterHeading !== undefined) assertString(image.insertAfterHeading, `insertAfterHeading de ${image.fileName}`, 2, 180);
  imageNames.add(image.fileName);
}
assert(payload.coverAlt === cover.alt, 'coverAlt debe coincidir exactamente con el alt de la imagen de portada');

const bodyImages = markdownImages(payload.contentMarkdown);
const inlineImages = new Map(images.filter((image) => image.role === 'inline').map((image) => [`./${image.fileName}`, image]));
const referenced = new Set();
for (const image of bodyImages) {
  assert(image.source.startsWith('./'), `Las imágenes del contenido deben ser locales: ${image.source}`);
  const declaration = inlineImages.get(image.source);
  assert(declaration, `La imagen ${image.source} aparece en Markdown pero no está declarada en images`);
  assert(image.alt === declaration.alt, `El alt de ${image.source} no coincide con su declaración en images`);
  referenced.add(image.source);
}
for (const source of inlineImages.keys()) {
  assert(referenced.has(source), `La imagen declarada ${source} no aparece en contentMarkdown`);
}

const assetsRoot = resolve(assetsDirectory);
assert(existsSync(assetsRoot) && statSync(assetsRoot).isDirectory(), '--assets debe apuntar a una carpeta existente');
const canonicalAssetsRoot = realpathSync(assetsRoot);
let totalImageBytes = 0;
for (const image of images) {
  const source = resolve(assetsRoot, image.fileName);
  assert(existsSync(source), `No existe el archivo de imagen: ${source}`);
  const canonicalSource = realpathSync(source);
  assert(isInside(canonicalAssetsRoot, canonicalSource), `Ruta de imagen fuera de --assets: ${image.fileName}`);
  assert(statSync(canonicalSource).isFile(), `La imagen no es un archivo regular: ${image.fileName}`);
  const size = statSync(canonicalSource).size;
  assert(size <= 15 * 1024 * 1024, `${image.fileName} supera el límite de 15 MB`);
  totalImageBytes += size;
  assert(hasExpectedImageSignature(canonicalSource, extname(image.fileName)), `El contenido binario no coincide con la extensión de ${image.fileName}`);
}
assert(totalImageBytes <= 50 * 1024 * 1024, 'El conjunto de imágenes supera el límite de 50 MB');

const collectionRoot = resolve(outputRoot, collection);
const target = join(collectionRoot, payload.slug);
assert(overwrite || !existsSync(target), `Ya existe ${target}; usa --overwrite true para reemplazarlo`);
mkdirSync(collectionRoot, { recursive: true });
const temporary = mkdtempSync(join(collectionRoot, `.${payload.slug}-`));
const backup = join(collectionRoot, `.${payload.slug}.backup-${process.pid}-${Date.now()}`);
let backupCreated = false;

try {
  for (const image of images) {
    copyFileSync(realpathSync(resolve(assetsRoot, image.fileName)), join(temporary, basename(image.fileName)));
  }

  const keys = [
    'schemaVersion', 'contentType', 'title', 'description', 'summary', 'category', 'tags',
    'publishedAt', 'updatedAt', 'author', 'draft', 'featured', 'reviewStatus', 'coverAlt',
    'imageCredit', 'airtableRecordId', 'level', 'durationMinutes', 'prerequisites',
    'newsType', 'eventDate', 'sources'
  ];
  const frontmatter = [];
  for (const key of keys) {
    if (payload[key] === undefined || payload[key] === null || payload[key] === '') continue;
    frontmatter.push(`${key}: ${JSON.stringify(payload[key])}`);
  }
  const coverAltIndex = frontmatter.findIndex((line) => line.startsWith('coverAlt:'));
  assert(coverAltIndex >= 0, 'coverAlt es obligatorio');
  frontmatter.splice(coverAltIndex, 0, `cover: ${JSON.stringify(`./${cover.fileName}`)}`);

  const markdown = `---\n${frontmatter.join('\n')}\n---\n\n${payload.contentMarkdown.trim()}\n`;
  writeFileSync(join(temporary, 'index.md'), markdown, 'utf8');

  if (overwrite && existsSync(target)) {
    renameSync(target, backup);
    backupCreated = true;
  }
  renameSync(temporary, target);
  if (backupCreated) rmSync(backup, { recursive: true, force: true });
  console.log(`Contenido creado: ${join(target, 'index.md')}`);
} catch (error) {
  rmSync(temporary, { recursive: true, force: true });
  if (backupCreated && !existsSync(target) && existsSync(backup)) renameSync(backup, target);
  throw error;
}
