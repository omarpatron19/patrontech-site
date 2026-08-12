export const azureToolkit = [
  {
    title: 'Azure VM Series',
    kind: 'Microsoft Azure',
    category: 'Compute y sizing',
    description: 'Consulta las familias de máquinas virtuales de Azure, sus características y los tipos de carga para los que fueron diseñadas.',
    url: 'https://azure.microsoft.com/es-es/pricing/details/virtual-machines/series/',
    source: 'Oficial Microsoft',
    tags: ['VM', 'Compute', 'Sizing']
  },
  {
    title: 'CloudPrice',
    kind: 'Herramienta web',
    category: 'FinOps y sizing',
    description: 'Compara tamaños de VM por vCPU, memoria, región y precio para acelerar ejercicios iniciales de sizing y optimización.',
    url: 'https://cloudprice.net/?region=southcentralus&cores=2,3&ram=9,17',
    source: 'Tercero',
    tags: ['FinOps', 'VM', 'Pricing']
  },
  {
    title: 'AzureSpeed',
    kind: 'Herramienta web',
    category: 'Networking y regiones',
    description: 'Mide latencia desde tu navegador hacia regiones de Azure y úsala como una señal inicial para comparar ubicaciones.',
    url: 'https://www.azurespeed.com/Azure/Latency',
    source: 'Tercero',
    tags: ['Networking', 'Latency', 'Regions']
  },
  {
    title: 'Azure Resource Inventory (ARI)',
    kind: 'GitHub / PowerShell',
    category: 'Assessment y gobierno',
    description: 'Genera inventarios y reportes de recursos Azure para acelerar assessments, documentación y análisis de ambientes.',
    url: 'https://github.com/microsoft/ARI',
    source: 'Microsoft GitHub',
    tags: ['Assessment', 'Inventory', 'PowerShell']
  }
] as const;

export const resources = [
  {
    title: 'Checklist para landing zones',
    kind: 'Checklist',
    description: 'Controles esenciales de identidad, red, gobierno, seguridad y operación.',
    status: 'Próximamente'
  },
  {
    title: 'Plantilla base de Terraform para Azure',
    kind: 'Código',
    description: 'Estructura inicial para proveedores, backend, variables y módulos.',
    status: 'Próximamente'
  },
  {
    title: 'Matriz de decisiones de recuperación',
    kind: 'Plantilla',
    description: 'Comparación de RTO, RPO, disponibilidad y costos.',
    status: 'Próximamente'
  },
  {
    title: 'Guía rápida de optimización FinOps',
    kind: 'Cheat sheet',
    description: 'Acciones de ahorro organizadas por impacto y esfuerzo.',
    status: 'Próximamente'
  }
] as const;
