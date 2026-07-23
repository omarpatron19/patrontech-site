# Implementación SEO — PatronTech

Dominio canónico: `https://www.patrontechhub.com`

## Cambios incluidos

- Títulos y descripciones únicos para cada página.
- Canonical, Open Graph y Twitter Cards con la URL definitiva.
- Imagen social de 1200 × 630 px.
- Datos estructurados JSON-LD para WebSite, Person, CollectionPage, ProfilePage, TechArticle y breadcrumbs.
- `robots.txt` y `sitemap.xml` actualizados.
- Página `404.html` y manejo de 404 en Azure Static Web Apps.
- Iconos PNG, Apple Touch Icon y `site.webmanifest`.
- Encabezados de seguridad en `staticwebapp.config.json`.

## Después del despliegue

1. Comprueba `https://www.patrontechhub.com/robots.txt`.
2. Comprueba `https://www.patrontechhub.com/sitemap.xml`.
3. Registra el dominio en Google Search Console y Bing Webmaster Tools.
4. Envía el sitemap `https://www.patrontechhub.com/sitemap.xml`.
5. Valida una URL inexistente para confirmar la página 404.
6. Comparte una URL en LinkedIn o WhatsApp para revisar la tarjeta social.

## Nota sobre artículos

Actualmente `articulo.html` contiene el texto completo de la guía de landing zones. Los demás títulos del catálogo se cargan desde JavaScript, pero todavía no tienen cuerpo editorial propio. El sitemap incluye únicamente el artículo con contenido completo para evitar indexar páginas incompletas.
