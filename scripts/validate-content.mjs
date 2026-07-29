import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { basename, dirname, extname, isAbsolute, join, relative, resolve } from 'node:path';

const projectRoot = process.cwd();
const contentRoot = resolve(projectRoot, 'src/data');
const collections = {
  articles: { contentType: 'article' },
  guides: { contentType: 'guide' },
  news: { contentType: 'news' }
};
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
const imageExtensions = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif']);
const errors = [];
const slugs = new Map();

function walk(directory) {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

function parseDocument(text, label) {
  const match = text.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) {
    errors.push(`${label}: falta frontmatter delimitado por ---`);
    return { frontmatter: '', body: text };
  }
  return { frontmatter: match[1], body: match[2] };
}

function value(frontmatter, key, label) {
  const match = frontmatter.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
  if (!match) return undefined;
  try {
    return JSON.parse(match[1]);
  } catch {
    errors.push(`${label}: ${key} debe usar un valor JSON/YAML de una sola línea`);
    return undefined;
  }
}

function requireValue(frontmatter, key, label) {
  const result = value(frontmatter, key, label);
  if (result === undefined) errors.push(`${label}: falta el campo ${key}`);
  return result;
}

function isRealDate(input) {
  if (typeof input !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(input)) return false;
  const date = new Date(`${input}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === input;
}

function validateDate(input, field, label) {
  if (!isRealDate(input)) {
    errors.push(`${label}: ${field} debe ser una fecha real con formato YYYY-MM-DD`);
    return false;
  }
  return true;
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

function validateImage(file, label) {
  const extension = extname(file).toLowerCase();
  if (!hasExpectedImageSignature(file, extension)) {
    errors.push(`${label}: el contenido binario no coincide con la extensión de ${basename(file)}`);
  }
  const size = statSync(file).size;
  if (size > 15 * 1024 * 1024) errors.push(`${label}: ${basename(file)} supera el límite de 15 MB`);
}

for (const [collection, definition] of Object.entries(collections)) {
  const collectionDirectory = join(contentRoot, collection);
  if (!existsSync(collectionDirectory)) {
    errors.push(`Falta la colección: ${relative(projectRoot, collectionDirectory)}`);
    continue;
  }

  const entries = walk(collectionDirectory).filter((file) => basename(file).toLowerCase() === 'index.md');
  for (const file of entries) {
    const label = relative(projectRoot, file);
    const folder = dirname(file);
    const folderRelative = relative(collectionDirectory, folder).replaceAll('\\', '/');
    const slug = folderRelative;
    const text = readFileSync(file, 'utf8');
    const { frontmatter, body } = parseDocument(text, label);

    if (!slug || slug.includes('/') || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      errors.push(`${label}: la carpeta debe ser un slug de un solo nivel en minúsculas y guiones`);
    } else if (slugs.has(slug)) {
      errors.push(`${label}: slug duplicado con ${slugs.get(slug)}`);
    } else {
      slugs.set(slug, label);
    }

    if (/^slug:/m.test(frontmatter)) {
      errors.push(`${label}: no declares slug en frontmatter; Astro lo deriva de la carpeta`);
    }

    const schemaVersion = requireValue(frontmatter, 'schemaVersion', label);
    const contentType = requireValue(frontmatter, 'contentType', label);
    const title = requireValue(frontmatter, 'title', label);
    const description = requireValue(frontmatter, 'description', label);
    const summary = requireValue(frontmatter, 'summary', label);
    const category = requireValue(frontmatter, 'category', label);
    const tags = requireValue(frontmatter, 'tags', label);
    const publishedAt = requireValue(frontmatter, 'publishedAt', label);
    const updatedAt = value(frontmatter, 'updatedAt', label);
    const author = requireValue(frontmatter, 'author', label);
    const draft = requireValue(frontmatter, 'draft', label);
    const featured = requireValue(frontmatter, 'featured', label);
    const reviewStatus = requireValue(frontmatter, 'reviewStatus', label);
    const cover = requireValue(frontmatter, 'cover', label);
    const coverAlt = requireValue(frontmatter, 'coverAlt', label);
    const imageCredit = value(frontmatter, 'imageCredit', label);

    if (schemaVersion !== 1) errors.push(`${label}: schemaVersion debe ser 1`);
    if (contentType !== definition.contentType) errors.push(`${label}: contentType debe ser ${definition.contentType}`);
    if (typeof title !== 'string' || title.length < 10 || title.length > 110) errors.push(`${label}: title debe tener entre 10 y 110 caracteres`);
    if (typeof description !== 'string' || description.length < 50 || description.length > 170) errors.push(`${label}: description debe tener entre 50 y 170 caracteres`);
    if (typeof summary !== 'string' || summary.length < 50 || summary.length > 320) errors.push(`${label}: summary debe tener entre 50 y 320 caracteres`);
    if (!categories.has(category)) errors.push(`${label}: category no pertenece al catálogo permitido`);
    if (!Array.isArray(tags) || tags.length < 1 || tags.length > 12 || tags.some((tag) => typeof tag !== 'string' || tag.length < 2 || tag.length > 40)) {
      errors.push(`${label}: tags debe contener entre 1 y 12 etiquetas válidas`);
    } else if (new Set(tags.map((tag) => tag.toLowerCase())).size !== tags.length) {
      errors.push(`${label}: tags contiene etiquetas duplicadas`);
    }
    const publishedValid = validateDate(publishedAt, 'publishedAt', label);
    if (updatedAt !== undefined) {
      const updatedValid = validateDate(updatedAt, 'updatedAt', label);
      if (publishedValid && updatedValid && updatedAt < publishedAt) errors.push(`${label}: updatedAt no puede ser anterior a publishedAt`);
    }
    if (typeof author !== 'string' || author.length < 4 || author.length > 120) errors.push(`${label}: author no es válido`);
    if (typeof draft !== 'boolean') errors.push(`${label}: draft debe ser booleano`);
    if (typeof featured !== 'boolean') errors.push(`${label}: featured debe ser booleano`);
    if (!['draft', 'reviewed', 'approved'].includes(reviewStatus)) errors.push(`${label}: reviewStatus no es válido`);
    if (draft === false && reviewStatus !== 'approved') errors.push(`${label}: todo contenido público debe tener reviewStatus=approved`);
    if (typeof coverAlt !== 'string' || coverAlt.length < 12 || coverAlt.length > 180) errors.push(`${label}: coverAlt debe tener entre 12 y 180 caracteres`);
    if (imageCredit !== undefined && (typeof imageCredit !== 'string' || imageCredit.length > 180)) errors.push(`${label}: imageCredit debe tener máximo 180 caracteres`);

    if (collection === 'guides') {
      const level = requireValue(frontmatter, 'level', label);
      const duration = requireValue(frontmatter, 'durationMinutes', label);
      const prerequisites = requireValue(frontmatter, 'prerequisites', label);
      if (!['Inicial', 'Intermedio', 'Avanzado'].includes(level)) errors.push(`${label}: level no es válido`);
      if (!Number.isInteger(duration) || duration < 1 || duration > 600) errors.push(`${label}: durationMinutes debe ser un entero entre 1 y 600`);
      if (!Array.isArray(prerequisites) || prerequisites.length > 12 || prerequisites.some((item) => typeof item !== 'string' || item.length < 2 || item.length > 120)) {
        errors.push(`${label}: prerequisites debe ser un arreglo de máximo 12 textos válidos`);
      }
    }

    if (collection === 'news') {
      const newsType = requireValue(frontmatter, 'newsType', label);
      const eventDate = requireValue(frontmatter, 'eventDate', label);
      const sources = requireValue(frontmatter, 'sources', label);
      if (!['Anuncios', 'Noticias', 'Certificaciones', 'Eventos'].includes(newsType)) errors.push(`${label}: newsType no es válido`);
      validateDate(eventDate, 'eventDate', label);
      if (!Array.isArray(sources) || sources.length < 1 || sources.length > 12) {
        errors.push(`${label}: una noticia requiere entre 1 y 12 fuentes`);
      } else {
        for (const source of sources) {
          if (!source || typeof source.title !== 'string' || source.title.length < 4 || source.title.length > 180 || !/^https:\/\//i.test(source.url ?? '')) {
            errors.push(`${label}: cada fuente requiere title válido y URL HTTPS`);
          }
        }
      }
    }

    const bodyWithoutCode = body.replace(/```[\s\S]*?```/g, '').replace(/~~~[\s\S]*?~~~/g, '');
    if (body.trim().length < 200) errors.push(`${label}: el cuerpo debe tener al menos 200 caracteres`);
    if (/^#\s+/m.test(bodyWithoutCode)) errors.push(`${label}: no uses H1 en el cuerpo; el layout ya renderiza el título`);
    if (!/^##\s+/m.test(bodyWithoutCode)) errors.push(`${label}: el cuerpo requiere al menos un encabezado H2`);
    if ((body.match(/```/g)?.length ?? 0) % 2 !== 0) errors.push(`${label}: existe un bloque de código con cierre faltante`);
    if ((body.match(/~~~/g)?.length ?? 0) % 2 !== 0) errors.push(`${label}: existe un bloque de código con cierre faltante`);
    if (/(?:javascript|vbscript|data):/i.test(bodyWithoutCode)) errors.push(`${label}: contiene un protocolo de enlace no permitido`);
    if (/<\/?[A-Za-z][^>]*>/.test(bodyWithoutCode)) {
      errors.push(`${label}: usa HTML/JSX sin revisar; el contenido automatizado debe ser Markdown puro`);
    }

    const referencedImages = new Set();
    if (typeof cover === 'string') {
      if (!/^\.\/[a-z0-9][a-z0-9._-]*\.(png|jpe?g|webp|avif)$/.test(cover)) {
        errors.push(`${label}: cover debe ser una imagen local PNG, JPEG, WebP o AVIF con nombre en minúsculas`);
      } else {
        const coverPath = resolve(folder, cover);
        if (!isInside(folder, coverPath) || !existsSync(coverPath)) errors.push(`${label}: no existe la portada ${cover}`);
        else validateImage(coverPath, label);
        referencedImages.add(basename(cover));
      }
    }

    for (const image of markdownImages(body)) {
      if (image.alt.length < 12 || image.alt.length > 180) errors.push(`${label}: cada imagen debe tener texto alternativo de 12 a 180 caracteres`);
      if (!/^\.\/[a-z0-9][a-z0-9._-]*\.(png|jpe?g|webp|avif)$/.test(image.source)) {
        errors.push(`${label}: las imágenes del cuerpo deben ser locales, usar minúsculas y un formato permitido: ${image.source}`);
        continue;
      }
      const imagePath = resolve(folder, image.source);
      if (!isInside(folder, imagePath) || !existsSync(imagePath)) errors.push(`${label}: no existe la imagen ${image.source}`);
      else validateImage(imagePath, label);
      referencedImages.add(basename(image.source));
    }

    const folderFiles = readdirSync(folder).filter((name) => statSync(join(folder, name)).isFile());
    for (const name of folderFiles) {
      if (name === 'index.md') continue;
      if (!imageExtensions.has(extname(name).toLowerCase()) || name !== name.toLowerCase()) {
        errors.push(`${label}: archivo no permitido o nombre no normalizado en la carpeta de contenido: ${name}`);
      } else if (!referencedImages.has(name)) {
        errors.push(`${label}: imagen sin uso declarada en la carpeta: ${name}`);
      }
    }
  }
}

if (errors.length) {
  console.error(`Validación fallida (${errors.length} problema${errors.length === 1 ? '' : 's'}):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Contenido válido: ${slugs.size} entrada${slugs.size === 1 ? '' : 's'}, sin slugs duplicados, imágenes faltantes ni contenido ejecutable.`);
