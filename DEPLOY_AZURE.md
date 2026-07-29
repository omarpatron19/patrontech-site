# Despliegue de PatronTech Astro

## Local

```bash
npm install
npm run build
```

La salida se genera en `dist/`.

## Azure Static Web Apps

Configura el workflow existente con:

```yaml
app_location: "/"
output_location: "dist"
app_build_command: "npm run build:azure"
```

El merge a `main` publica producción. Un Pull Request contra `main` crea la preview para revisión.
