# Contrato de automatización n8n → GitHub

## Entrada aprobada

n8n debe producir un JSON compatible con el esquema correspondiente en `automation/schemas/`.

Campos clave:

- `contentType`: `article`, `guide` o `news`.
- `slug`: se usa en el payload para crear la carpeta y la URL; no se escribe en el frontmatter porque Astro deriva el ID desde esa carpeta.
- `contentMarkdown`: cuerpo en Markdown sin frontmatter.
- `images`: lista de archivos que el subworkflow debe generar o descargar.
- `reviewStatus`: debe ser `approved` antes de abrir el Pull Request.
- `draft`: `false` para incluir la página en el build público.
- `airtableRecordId`: mantiene trazabilidad con Airtable.

## Convención de imágenes

La portada debe declararse así:

```json
{"fileName":"cover.webp","role":"cover","alt":"Descripción accesible"}
```

Las imágenes interiores se referencian en `contentMarkdown`:

```md
![Descripción accesible](./diagrama.webp)
```

Nombres permitidos: minúsculas, números, punto, guion y guion bajo. Formatos: PNG, JPEG, WebP y AVIF.

## Rutas resultantes

| Tipo | Carpeta de origen | URL pública |
|---|---|---|
| article | `src/data/articles/<slug>/` | `/articulos/<slug>/` |
| guide | `src/data/guides/<slug>/` | `/guias/<slug>/` |
| news | `src/data/news/<slug>/` | `/novedades/<slug>/` |

## Formato seguro de contenido

El generador crea `index.md`, no MDX. El contenido automatizado puede usar encabezados, tablas, listas, imágenes, enlaces, citas y bloques de código, pero no HTML, JSX, imports ni scripts ejecutables. Esto reduce el riesgo de que una salida del modelo introduzca código en el build.

## Validación

El Pull Request falla cuando:

- falta un campo obligatorio;
- el slug está duplicado o no coincide con la carpeta;
- falta una imagen local;
- una imagen no tiene texto alternativo;
- una noticia no incluye fuentes HTTPS;
- aparece `<script>` o un enlace `javascript:` dentro del contenido;
- Astro detecta errores de tipos, rutas o frontmatter.
