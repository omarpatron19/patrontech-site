# Azure Static Web Apps

PatronTech permanece en Azure Static Web Apps. Astro compila el sitio a HTML, CSS, JavaScript e imágenes optimizadas dentro de `dist/`.

## Configuración del workflow existente

En `.github/workflows/azure-static-web-apps-*.yml`, conserva el token y los valores generados por Azure. Ajusta únicamente la configuración de build:

```yaml
app_location: "/"
api_location: ""
output_location: "dist"
app_build_command: "npm run build:azure"
```

No reemplaces el nombre real del secret `azure_static_web_apps_api_token`.

## Pull Requests

El workflow debe escuchar eventos `pull_request` contra `main`. Azure Static Web Apps creará un entorno temporal para revisar el artículo, sus imágenes, metadatos y navegación antes del merge.

## Archivos importantes

- `public/staticwebapp.config.json`: redirecciones, 404 y encabezados.
- `astro.config.mjs`: dominio, build estático, Markdown seguro y sitemap.
- `dist/`: salida de compilación; no se versiona.
