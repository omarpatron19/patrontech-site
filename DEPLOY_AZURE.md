# Despliegue en Azure Static Web Apps

Recurso existente:

- Static Web App: `patrontech`
- Resource Group: `Patronstech`
- Subscription: `06d75d42-c725-4b6c-81ca-ba16169b2a84`

## 1. Seleccionar suscripción

```bash
az account set --subscription "06d75d42-c725-4b6c-81ca-ba16169b2a84"
```

## 2. Obtener el token

```bash
DEPLOYMENT_TOKEN=$(az staticwebapp secrets list   --name "patrontech"   --resource-group "Patronstech"   --query "properties.apiKey"   --output tsv)
```

## 3. Instalar la CLI una sola vez

```bash
npm install -g @azure/static-web-apps-cli
```

## 4. Desplegar

Ejecuta desde la carpeta que contiene `index.html`:

```bash
swa deploy .   --deployment-token "$DEPLOYMENT_TOKEN"   --env production
```

## 5. Consultar URL

```bash
az staticwebapp show   --name "patrontech"   --resource-group "Patronstech"   --query "defaultHostname"   --output tsv
```
