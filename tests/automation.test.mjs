import test from 'node:test';
import assert from 'node:assert/strict';
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';

const projectRoot = resolve(import.meta.dirname, '..');
const generator = join(projectRoot, 'scripts/create-content-entry.mjs');
const example = JSON.parse(readFileSync(join(projectRoot, 'automation/examples/article-payload.json'), 'utf8'));

function fixture() {
  const root = mkdtempSync(join(tmpdir(), 'patrontech-content-'));
  const assets = join(root, 'assets');
  const output = join(root, 'data');
  mkdirSync(assets, { recursive: true });
  copyFileSync(join(projectRoot, 'src/data/guides/landing-zone-empresarial-azure/cover.webp'), join(assets, 'cover.webp'));
  copyFileSync(join(projectRoot, 'src/data/guides/landing-zone-empresarial-azure/landing-zone-diagram.webp'), join(assets, 'conceptos-azure.webp'));
  return { root, assets, output };
}

function run(payload, setup, { overwrite = false } = {}) {
  const input = join(setup.root, `payload-${Date.now()}-${Math.random()}.json`);
  writeFileSync(input, JSON.stringify(payload), 'utf8');
  const args = [generator, '--input', input, '--assets', setup.assets, '--output-root', setup.output];
  if (overwrite) args.push('--overwrite', 'true');
  execFileSync(process.execPath, args, { stdio: 'pipe' });
}

test('crea una entrada Markdown atómica con imágenes locales', () => {
  const setup = fixture();
  run(example, setup);
  const target = join(setup.output, 'articles', example.slug);
  const markdown = readFileSync(join(target, 'index.md'), 'utf8');
  assert.match(markdown, /^---\n/);
  assert.doesNotMatch(markdown, /^slug:/m);
  assert.match(markdown, /^cover: "\.\/cover\.webp"$/m);
  assert.ok(existsSync(join(target, 'cover.webp')));
  assert.ok(existsSync(join(target, 'conceptos-azure.webp')));
});

test('actualiza una entrada existente con reemplazo atómico', () => {
  const setup = fixture();
  run(example, setup);
  const updated = structuredClone(example);
  updated.title = 'AZ-900: guía actualizada para Microsoft Azure Fundamentals';
  run(updated, setup, { overwrite: true });
  const markdown = readFileSync(join(setup.output, 'articles', example.slug, 'index.md'), 'utf8');
  assert.match(markdown, /guía actualizada/);
});

test('rechaza portadas duplicadas', () => {
  const setup = fixture();
  const payload = structuredClone(example);
  payload.images.push({ fileName: 'segunda.webp', role: 'cover', alt: 'Segunda portada que no debería permitirse' });
  assert.throws(() => run(payload, setup), /exactamente una imagen con role=cover/);
});

test('rechaza diferencias entre alt declarado y Markdown', () => {
  const setup = fixture();
  const payload = structuredClone(example);
  payload.contentMarkdown = payload.contentMarkdown.replace('Mapa visual de los conceptos de Azure Fundamentals', 'Texto alternativo diferente y no sincronizado');
  assert.throws(() => run(payload, setup), /no coincide con su declaración/);
});

test('rechaza fechas calendáricas inexistentes', () => {
  const setup = fixture();
  const payload = structuredClone(example);
  payload.publishedAt = '2026-02-30';
  assert.throws(() => run(payload, setup), /fecha real/);
});

test('rechaza HTML o JSX dentro del contenido automatizado', () => {
  const setup = fixture();
  const payload = structuredClone(example);
  payload.contentMarkdown += '\n\n<div>Contenido no permitido</div>';
  assert.throws(() => run(payload, setup), /Markdown puro/);
});

test('rechaza archivos cuyo contenido no coincide con la extensión', () => {
  const setup = fixture();
  writeFileSync(join(setup.assets, 'imagen-falsa.webp'), 'esto no es una imagen', 'utf8');
  const payload = structuredClone(example);
  payload.images.push({ fileName: 'imagen-falsa.webp', role: 'inline', alt: 'Archivo falso utilizado para validar la firma binaria' });
  payload.contentMarkdown += '\n\n![Archivo falso utilizado para validar la firma binaria](./imagen-falsa.webp)';
  assert.throws(() => run(payload, setup), /contenido binario no coincide/);
});

test('los contratos JSON Schema cargan y mantienen controles de publicación', () => {
  for (const name of ['article', 'guide', 'news']) {
    const schema = JSON.parse(readFileSync(join(projectRoot, 'automation/schemas', `${name}.schema.json`), 'utf8'));
    assert.equal(schema.$schema, 'https://json-schema.org/draft/2020-12/schema');
    assert.equal(schema.additionalProperties, false);
    assert.equal(schema.properties.draft.const, false);
    assert.equal(schema.properties.reviewStatus.const, 'approved');
    assert.equal(schema.properties.images.minContains, 1);
    assert.equal(schema.properties.images.maxContains, 1);
  }
});
