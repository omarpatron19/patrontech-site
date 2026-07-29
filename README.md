# PatronTech Astro v2

Migración de PatronTech desde HTML estático manual hacia Astro, preparada para automatizar artículos, guías y noticias mediante Airtable, n8n, Azure OpenAI, GitHub y Azure Static Web Apps.

## Principios de la solución

- HTML estático real por publicación y por slug.
- Contenido automatizado en Markdown puro, sin MDX, JSX ni scripts ejecutables.
- Portada e imágenes interiores versionadas junto al contenido.
- Validación doble: contrato JSON antes de crear archivos y colecciones Zod durante el build.
- Publicación únicamente cuando `draft=false` y `reviewStatus=approved`.
- Noticias con fecha del acontecimiento y al menos una fuente HTTPS.
- SEO individual, Open Graph, JSON-LD, RSS y sitemap generados en el build.
- Compatibilidad temporal con enlaces antiguos `.html` y `articulo.html?slug=`.

## Requisitos

- Node.js 22.12.0 o superior.
- npm.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre `http://localhost:4321`.

## Validación y build

```bash
npm run validate:content
npm test
npm run check
npm run build
npm run preview
```

El resultado estático se genera en `dist/`.

## Estructura de contenido

Cada publicación vive en una carpeta propia:

```text
src/data/articles/<slug>/index.md
src/data/articles/<slug>/cover.webp
src/data/articles/<slug>/imagen-interior.webp

src/data/guides/<slug>/index.md
src/data/news/<slug>/index.md
```

El slug se deriva del nombre de la carpeta y no se repite en el frontmatter.

## Crear contenido desde un payload aprobado

Los contratos para n8n están en `automation/schemas/`. Un ejemplo está en `automation/examples/article-payload.json`.

```bash
npm run content:create -- \
  --input automation/examples/article-payload.json \
  --assets ./ruta-a-las-imagenes
```

Para actualizar una entrada existente:

```bash
npm run content:create -- \
  --input payload.json \
  --assets ./imagenes \
  --overwrite true
```

El reemplazo utiliza una carpeta temporal y respaldo para evitar dejar contenido parcialmente escrito.

## Azure Static Web Apps

Mantén el workflow generado por Azure y ajusta únicamente:

```text
app_location: /
api_location:
output_location: dist
app_build_command: npm run build:azure
```

Consulta `docs/AZURE_STATIC_WEB_APPS.md` antes de modificar el workflow productivo.
