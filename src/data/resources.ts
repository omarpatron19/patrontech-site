export type CloudName = 'Azure' | 'AWS' | 'GCP' | 'Microsoft 365';
export type SourceType =
  | 'Sitio oficial'
  | 'GitHub oficial'
  | 'GitHub community'
  | 'Sitio community'
  | 'Vendor / Open Source';
export type OpenSourceStatus = 'Sí' | 'No' | 'No aplica' | 'No identificado';
export type ToolStatus = 'Activa' | 'Mantenimiento' | 'Reemplazada';
export type ToolLevel = 'Básico' | 'Intermedio' | 'Intermedio–Avanzado' | 'Avanzado';

export const cloudToolkit = [
  {
    slug: 'azure-vm-series',
    title: 'Azure VM Series',
    clouds: ['Azure'] as CloudName[],
    category: 'Compute y sizing',
    description:
      'Referencia oficial para conocer las familias de máquinas virtuales de Azure, sus perfiles de hardware y los tipos de workload para los que fueron diseñadas.',
    url: 'https://azure.microsoft.com/es-es/pricing/details/virtual-machines/series/',
    sourceType: 'Sitio oficial' as SourceType,
    source: 'Microsoft Azure',
    openSource: 'No aplica' as OpenSourceStatus,
    status: 'Activa' as ToolStatus,
    level: 'Básico' as ToolLevel,
    tags: ['VM', 'Compute', 'Sizing'],
    patronTip:
      'Úsala para elegir primero la familia adecuada. Después valida SKU, discos, IOPS, red, disponibilidad regional y cuotas antes de cerrar el sizing.'
  },
  {
    slug: 'cloudprice',
    title: 'CloudPrice',
    clouds: ['Azure', 'AWS', 'GCP'] as CloudName[],
    category: 'FinOps y sizing',
    description:
      'Comparador web de instancias y precios para Azure, AWS y Google Cloud. Permite explorar alternativas por vCPU, memoria, región, modalidad de pago y relación precio/rendimiento.',
    url: 'https://cloudprice.net/',
    sourceType: 'Sitio community' as SourceType,
    source: 'CloudPrice',
    openSource: 'No identificado' as OpenSourceStatus,
    status: 'Activa' as ToolStatus,
    level: 'Básico' as ToolLevel,
    tags: ['FinOps', 'Pricing', 'VM', 'Multicloud'],
    patronTip:
      'Excelente para crear un shortlist rápido de instancias. Para una decisión final valida siempre precios, descuentos, disponibilidad y capacidades en la fuente oficial del hyperscaler.'
  },
  {
    slug: 'azurespeed',
    title: 'AzureSpeed',
    clouds: ['Azure'] as CloudName[],
    category: 'Networking y regiones',
    description:
      'Herramienta web para medir desde el navegador la latencia hacia regiones Azure y comparar ubicaciones antes de realizar pruebas de red o aplicación más completas.',
    url: 'https://www.azurespeed.com/Azure/Latency',
    sourceType: 'Sitio community' as SourceType,
    source: 'AzureSpeed',
    openSource: 'Sí' as OpenSourceStatus,
    status: 'Activa' as ToolStatus,
    level: 'Básico' as ToolLevel,
    tags: ['Networking', 'Latency', 'Regions'],
    patronTip:
      'Tómalo como una señal inicial para seleccionar regiones candidatas. No sustituyas pruebas de aplicación ni la revisión de disponibilidad de servicios, resiliencia, residencia de datos y costos.'
  },
  {
    slug: 'azure-resource-inventory',
    title: 'Azure Resource Inventory (ARI)',
    clouds: ['Azure'] as CloudName[],
    category: 'Assessment e inventario',
    description:
      'Módulo PowerShell para generar inventarios detallados de ambientes Azure a los que tengas acceso de lectura, útil para documentación, assessments y descubrimiento técnico.',
    url: 'https://github.com/microsoft/ARI',
    sourceType: 'GitHub oficial' as SourceType,
    source: 'Microsoft',
    openSource: 'Sí' as OpenSourceStatus,
    status: 'Activa' as ToolStatus,
    level: 'Intermedio' as ToolLevel,
    tags: ['Assessment', 'Inventory', 'PowerShell'],
    patronTip:
      'Úsalo al inicio de un assessment para obtener una fotografía técnica del ambiente. El inventario debe complementarse con contexto de aplicación, criticidad, costos y dependencias.'
  },
  {
    slug: 'azure-finops-guide',
    title: 'Azure FinOps Guide',
    clouds: ['Azure'] as CloudName[],
    category: 'FinOps',
    description:
      'Repositorio que centraliza prácticas, referencias y herramientas para comprender, controlar y optimizar costos de Azure.',
    url: 'https://github.com/dolevshor/azure-finops-guide#tools',
    sourceType: 'GitHub community' as SourceType,
    source: 'Community',
    openSource: 'Sí' as OpenSourceStatus,
    status: 'Activa' as ToolStatus,
    level: 'Intermedio' as ToolLevel,
    tags: ['FinOps', 'Optimization', 'Cost Management'],
    patronTip:
      'Úsalo como índice de trabajo para una revisión FinOps. Conviene separar quick wins de cambios que requieren compromiso, rediseño o validación con los equipos de aplicación.'
  },
  {
    slug: 'azure-governance-visualizer',
    title: 'Azure Governance Visualizer (AzGovViz)',
    clouds: ['Azure'] as CloudName[],
    category: 'Governance y Landing Zones',
    description:
      'Herramienta PowerShell que recorre la jerarquía del tenant y captura información de gobierno como Management Groups, Azure Policy y RBAC para generar una vista consolidada.',
    url: 'https://github.com/Azure/Azure-Governance-Visualizer',
    sourceType: 'GitHub oficial' as SourceType,
    source: 'Azure GitHub / Microsoft',
    openSource: 'Sí' as OpenSourceStatus,
    status: 'Activa' as ToolStatus,
    level: 'Intermedio–Avanzado' as ToolLevel,
    tags: ['Governance', 'Landing Zones', 'Policy', 'RBAC'],
    patronTip:
      'Muy útil como punto de partida para un assessment de Landing Zone: ayuda a visualizar rápidamente cómo está organizado el gobierno antes de recomendar cambios.'
  },
  {
    slug: 'sap-hana-hardware-directory',
    title: 'SAP HANA Hardware Directory',
    clouds: ['Azure', 'AWS', 'GCP'] as CloudName[],
    category: 'SAP y arquitectura',
    description:
      'Directorio oficial de SAP para consultar plataformas, infraestructura y configuraciones certificadas o soportadas para SAP HANA, incluyendo opciones IaaS.',
    url: 'https://www.sap.com/dmc/exp/2014-09-02-hana-hardware/enEN/#/solutions?filters=iaas;ve:24&sort=Latest%20Certification&sortDesc=true&id=s:2634',
    sourceType: 'Sitio oficial' as SourceType,
    source: 'SAP',
    openSource: 'No aplica' as OpenSourceStatus,
    status: 'Activa' as ToolStatus,
    level: 'Intermedio–Avanzado' as ToolLevel,
    tags: ['SAP HANA', 'IaaS', 'Certification', 'Multicloud'],
    patronTip:
      'Para SAP HANA no basta con que una VM parezca tener CPU y RAM suficientes. Valida siempre que el escenario y tamaño estén certificados o soportados por SAP.'
  },
  {
    slug: 'azure-cost-cli',
    title: 'Azure Cost CLI',
    clouds: ['Azure'] as CloudName[],
    category: 'FinOps y automatización',
    description:
      'CLI open source que consulta Azure Cost Management API y permite obtener costos, análisis diarios, recursos, presupuestos y salidas en formatos útiles para automatización y pipelines.',
    url: 'https://github.com/mivano/azure-cost-cli',
    sourceType: 'GitHub community' as SourceType,
    source: 'Community',
    openSource: 'Sí' as OpenSourceStatus,
    status: 'Activa' as ToolStatus,
    level: 'Intermedio' as ToolLevel,
    tags: ['FinOps', 'CLI', 'Automation', 'Cost Management'],
    patronTip:
      'Tiene mucho valor cuando quieres llevar FinOps a CI/CD: además de reportar costos, puede alimentar jobs, resúmenes y controles automatizados alrededor del gasto.'
  },
  {
    slug: 'aws-finops-dashboard',
    title: 'AWS FinOps Dashboard',
    clouds: ['AWS'] as CloudName[],
    category: 'FinOps',
    description:
      'Dashboard open source en terminal para revisar costos AWS, presupuestos, tendencias, gasto por servicio y señales de optimización en uno o varios accounts.',
    url: 'https://github.com/ravikiranvm/aws-finops-dashboard',
    sourceType: 'GitHub community' as SourceType,
    source: 'Community',
    openSource: 'Sí' as OpenSourceStatus,
    status: 'Activa' as ToolStatus,
    level: 'Intermedio' as ToolLevel,
    tags: ['AWS', 'FinOps', 'Cost Explorer', 'CLI'],
    patronTip:
      'Puede funcionar muy bien como vista operativa rápida de costos. En organizaciones grandes conviene integrarlo dentro de un modelo FinOps con tags, ownership, budgets y KPIs definidos.'
  },
  {
    slug: 'm365-maps',
    title: 'M365 Maps',
    clouds: ['Microsoft 365'] as CloudName[],
    category: 'Licenciamiento y arquitectura',
    description:
      'Colección visual de diagramas de licenciamiento, comparadores, matrices de funcionalidades, mapas y calculadoras para el ecosistema Microsoft 365.',
    url: 'https://m365maps.com/',
    sourceType: 'Sitio community' as SourceType,
    source: 'Community',
    openSource: 'No identificado' as OpenSourceStatus,
    status: 'Activa' as ToolStatus,
    level: 'Básico' as ToolLevel,
    tags: ['Microsoft 365', 'Licensing', 'Entra', 'Defender'],
    patronTip:
      'Úsalo para entender visualmente diferencias entre licencias y capacidades, pero confirma condiciones comerciales y términos vigentes con documentación oficial de Microsoft.'
  },
  {
    slug: 'azure-charts',
    title: 'Azure Charts',
    clouds: ['Azure'] as CloudName[],
    category: 'Arquitectura y referencia',
    description:
      'Portal visual para explorar servicios Azure, regiones, disponibilidad, asociaciones entre servicios, mapas y diferentes vistas útiles durante diseño y aprendizaje.',
    url: 'https://azurecharts.com/',
    sourceType: 'Sitio community' as SourceType,
    source: 'Community',
    openSource: 'No identificado' as OpenSourceStatus,
    status: 'Activa' as ToolStatus,
    level: 'Básico' as ToolLevel,
    tags: ['Architecture', 'Regions', 'Services', 'Reference'],
    patronTip:
      'Es ideal para exploración y para acelerar conversaciones de arquitectura. Para decisiones de producción vuelve siempre a Microsoft Learn y a las páginas oficiales de disponibilidad regional.'
  },
  {
    slug: 'azure-mcp-server',
    title: 'Azure MCP Server',
    clouds: ['Azure'] as CloudName[],
    category: 'AI y automatización',
    description:
      'Servidor MCP oficial de Microsoft que conecta agentes y asistentes de IA con herramientas y servicios de Azure mediante Model Context Protocol.',
    url: 'https://github.com/microsoft/mcp/tree/main/servers/Azure.Mcp.Server',
    sourceType: 'GitHub oficial' as SourceType,
    source: 'Microsoft',
    openSource: 'Sí' as OpenSourceStatus,
    status: 'Activa' as ToolStatus,
    level: 'Intermedio–Avanzado' as ToolLevel,
    tags: ['MCP', 'AI Agents', 'Automation', 'Azure'],
    patronTip:
      'Trátalo como una nueva capa de automatización para agentes. Aplica mínimo privilegio, revisa qué tools expones y evita dar a un agente más permisos de los que necesita para su tarea.'
  },
  {
    slug: 'azure-scout-avs-rvtools-analyser',
    title: 'Azure Scout · AVS RVTools Analyser',
    clouds: ['Azure'] as CloudName[],
    category: 'Migration y AVS',
    description:
      'Plugin open source de Azure Scout que analiza exportaciones Excel de RVTools para detectar riesgos técnicos antes de una migración hacia Azure VMware Solution.',
    url: 'https://github.com/az-scout/az-scout-plugin-avs-rvtools-analyser',
    sourceType: 'GitHub community' as SourceType,
    source: 'Azure Scout Community',
    openSource: 'Sí' as OpenSourceStatus,
    status: 'Activa' as ToolStatus,
    level: 'Intermedio–Avanzado' as ToolLevel,
    tags: ['AVS', 'VMware', 'Migration', 'RVTools'],
    patronTip:
      'Úsalo antes de diseñar las waves de migración. Detectar snapshots, discos compartidos, versiones y configuraciones problemáticas temprano reduce sorpresas durante HCX y cutover.'
  },
  {
    slug: 'prowler',
    title: 'Prowler',
    clouds: ['Azure', 'AWS', 'GCP'] as CloudName[],
    category: 'Security y compliance',
    description:
      'Plataforma open source de seguridad cloud para automatizar assessments, controles y revisiones de compliance en AWS, Azure, GCP y otros proveedores.',
    url: 'https://github.com/prowler-cloud/prowler',
    sourceType: 'Vendor / Open Source' as SourceType,
    source: 'Prowler',
    openSource: 'Sí' as OpenSourceStatus,
    status: 'Activa' as ToolStatus,
    level: 'Intermedio–Avanzado' as ToolLevel,
    tags: ['Security', 'Compliance', 'CSPM', 'Multicloud'],
    patronTip:
      'Es especialmente potente para estandarizar assessments entre nubes. Define primero el framework y alcance que quieres evaluar para evitar convertir cientos de findings en ruido operativo.'
  },
  {
    slug: 'azure-tenant-security',
    title: 'Azure Tenant Security (AzTS)',
    clouds: ['Azure'] as CloudName[],
    category: 'Security y governance',
    description:
      'Solución compartida por el equipo AzSK para obtener visibilidad y ejecutar controles de seguridad sobre suscripciones y recursos Azure a escala de tenant.',
    url: 'https://github.com/azsk/AzTS-docs/tree/main/01-Setup%20and%20getting%20started',
    sourceType: 'GitHub community' as SourceType,
    source: 'Microsoft-originated Community Project',
    openSource: 'Sí' as OpenSourceStatus,
    status: 'Activa' as ToolStatus,
    level: 'Avanzado' as ToolLevel,
    tags: ['Security', 'Governance', 'Tenant', 'Compliance'],
    patronTip:
      'Tiene sentido para organizaciones que necesitan visibilidad centralizada a nivel tenant. Antes de desplegarlo, revisa cuidadosamente prerequisitos, permisos y cómo encajará con Defender for Cloud y tu modelo operativo.'
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
