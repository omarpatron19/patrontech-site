# PatronTech Static v1

Sitio web estático de PatronTech, sin Node.js, npm ni procesos de compilación.

## Probar localmente

Puedes abrir `index.html` directamente o ejecutar un servidor simple:

```bash
python3 -m http.server 8000
```

Después abre:

```text
http://localhost:8000
```

## Despliegue manual en Azure Static Web Apps

Desde esta carpeta:

```bash
npm install -g @azure/static-web-apps-cli
swa deploy . --deployment-token "$DEPLOYMENT_TOKEN" --env production
```

También puedes publicar el contenido mediante GitHub Actions o el portal de Azure.

## Datos de marca

- Dominio: patrontech.mx
- Autor: Irving Omar Patron Padron
- Correo: irvingomar19@hotmail.com
- LinkedIn: https://www.linkedin.com/in/omarpatron/

## Editar contenido

Los artículos, novedades y recursos de demostración están en:

```text
assets/js/data.js
```

Los estilos están en:

```text
assets/css/styles.css
```

El sitio no incluye todavía CMS, automatización, newsletter real ni integración con IA.
