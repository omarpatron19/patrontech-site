# Notas de migración

## Conservado

- Identidad visual, paleta, tipografías y modo oscuro.
- Navegación, hero, categorías, recursos, autor y footer.
- Dominio canónico, tarjeta social, favicons y encabezados de seguridad.
- Azure Static Web Apps como plataforma de alojamiento.

## Reemplazado

- `data.js` por colecciones de contenido validadas.
- `articulo.html?slug=` por rutas HTML reales.
- HTML duplicado por componentes y layouts Astro.
- Sitemap manual por generación durante el build.
- Metadatos genéricos por SEO individual y JSON-LD según el tipo.
- Imágenes dispersas por carpetas versionadas junto a cada contenido.

## Controles agregados

- Publicación condicionada a `draft=false` y `reviewStatus=approved`.
- Contratos JSON diferentes para artículo, guía y noticia.
- Markdown puro para impedir que contenido generado ejecute JSX o scripts.
- Verificación de imágenes declaradas, texto alternativo, firma binaria y tamaño.
- Creación y actualización atómica de carpetas de contenido.
- Pruebas automáticas y build obligatorio en Pull Requests.

## Compatibilidad

`public/articulo.html` conserva una redirección temporal para los enlaces antiguos con query string. Las páginas `.html` principales redirigen mediante `staticwebapp.config.json` a las nuevas rutas limpias.
