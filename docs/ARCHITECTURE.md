# Arquitectura de contenido

```text
Airtable
  ↓
n8n orquestador
  ├─ artículo
  ├─ guía
  └─ noticia + fuentes
  ↓
Azure OpenAI: salida JSON validada
  ↓
Subworkflow de imágenes
  ↓
Rama de GitHub + Markdown + imágenes
  ↓
Pull Request
  ↓
Validación de contenido + Astro check + Astro build
  ↓
Preview de Azure Static Web Apps
  ↓
Merge a main
  ↓
Producción
```

## Decisiones

- Astro genera HTML estático por slug.
- Azure Static Web Apps continúa como hosting.
- Cada contenido tiene una carpeta propia para facilitar commits automáticos.
- Las noticias exigen fuentes HTTPS en el esquema.
- `draft: true` evita que una entrada genere ruta pública.
- `reviewStatus: approved` registra que existió aprobación humana.
- Las imágenes de contenido se guardan junto al Markdown y Astro las optimiza durante el build.
- `public/` se reserva para favicons, scripts globales y recursos que deban conservar una URL exacta.
