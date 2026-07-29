# Reporte de validación — PatronTech Astro v2

Fecha de revisión: 2026-07-27

## Validaciones ejecutadas correctamente

- Sintaxis de todos los scripts `.mjs` y JavaScript público mediante `node --check`.
- Sintaxis TypeScript del código `.ts` y del frontmatter de componentes/páginas `.astro`.
- Lectura válida de todos los archivos JSON y validación de los contratos con JSON Schema Draft 2020-12.
- Validación de las tres colecciones de contenido.
- Detección de slugs duplicados, imágenes inexistentes, imágenes no utilizadas y formatos no permitidos.
- Verificación de firma binaria básica para PNG, JPEG, WebP y AVIF.
- Rechazo de HTML, JSX, protocolos peligrosos, H1 duplicado y bloques de código sin cerrar.
- Verificación de fechas calendáricas reales y orden de actualización.
- Pruebas del generador: creación, actualización atómica, portada única, sincronización de textos alternativos, fecha inválida, HTML no permitido e imagen falsa.

Resultado local:

```text
Contenido válido: 3 entradas.
Pruebas: 8 aprobadas, 0 fallidas.
```

## Validación pendiente en un entorno con acceso al registro npm

La instalación de dependencias no pudo completarse en este contenedor porque la conexión al registro npm agotó el tiempo de espera. Por ello, aquí no se ejecutaron todavía:

```bash
npm install
npm run check
npm run build
```

El workflow `.github/workflows/content-quality.yml` ejecutará la instalación, validación, pruebas, comprobación de tipos y build en el Pull Request. Producción no debe modificarse hasta que ese workflow y la preview de Azure Static Web Apps terminen correctamente.

## Criterio para aprobar la migración

1. El workflow `Content quality` debe quedar verde.
2. Azure Static Web Apps debe crear una preview del Pull Request.
3. Deben revisarse inicio, listados, artículo, guía, modo oscuro, móvil, imágenes, canonical, sitemap y redirecciones antiguas.
4. Solo después debe hacerse merge a `main`.
