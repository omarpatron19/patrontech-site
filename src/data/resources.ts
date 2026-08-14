export type CloudName = 'Azure' | 'AWS' | 'GCP' | 'Microsoft 365';

export type SourceType =
  | 'Sitio oficial'
  | 'GitHub oficial'
  | 'GitHub community'
  | 'Sitio community'
  | 'Vendor / Open Source';

export type OpenSourceStatus = 'Sí' | 'No' | 'No aplica' | 'No identificado';

export type ToolStatus = 'Activa' | 'Mantenimiento' | 'Reemplazada' | 'Archivada';

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
  },

  // Recursos adicionales — revisión editorial PatronTech 2026-08-14
  {
    slug: 'cartography',
    title: 'Cartography',
    clouds: ['Azure', 'AWS', 'GCP'] as CloudName[],
    category: 'Assessment, relaciones y attack paths',
    description:
      'Proyecto CNCF Sandbox que ingiere activos y relaciones de múltiples plataformas en Neo4j para consultar identidades, exposición, dependencias y caminos entre recursos cloud.',
    url: 'https://github.com/cartography-cncf/cartography',
    sourceType: 'Vendor / Open Source' as SourceType,
    source: 'CNCF / Cartography',
    openSource: 'Sí' as OpenSourceStatus,
    status: 'Activa' as ToolStatus,
    level: 'Avanzado' as ToolLevel,
    tags: ['Neo4j', 'Inventory', 'IAM', 'Attack Paths', 'Multicloud'],
    patronTip:
      'Úsalo cuando una lista plana de recursos ya no sea suficiente. El valor aparece al correlacionar identidad, red, vulnerabilidades y ownership para responder preguntas de exposición que cruzan cuentas, tenants o proveedores.'
  },
  {
    slug: 'cloudmapper',
    title: 'CloudMapper',
    clouds: ['AWS'] as CloudName[],
    category: 'Security y assessment',
    description:
      'Toolkit para analizar ambientes AWS mediante inventario, auditoría de configuraciones, revisión de privilegios, recursos públicos y activos sin uso. Su visualización de red histórica ya no se mantiene.',
    url: 'https://github.com/duo-labs/cloudmapper',
    sourceType: 'Vendor / Open Source' as SourceType,
    source: 'Duo Labs',
    openSource: 'Sí' as OpenSourceStatus,
    status: 'Mantenimiento' as ToolStatus,
    level: 'Intermedio–Avanzado' as ToolLevel,
    tags: ['AWS', 'Security', 'Audit', 'IAM', 'Inventory'],
    patronTip:
      'No lo agregaría hoy por su antiguo mapa de red: esa función ya no está mantenida. Su valor sigue estando en comandos como audit, find_admins, find_unused y public para análisis puntual de cuentas AWS.'
  },
  {
    slug: 'forseti-security',
    title: 'Forseti Security',
    clouds: ['GCP'] as CloudName[],
    category: 'Security y compliance',
    description:
      'Proyecto histórico de seguridad para Google Cloud que realizaba inventario, escaneo de políticas y controles de compliance. El repositorio fue archivado y ya no recibe soporte del equipo original.',
    url: 'https://github.com/forseti-security/forseti-security',
    sourceType: 'GitHub community' as SourceType,
    source: 'Forseti Security / Google-originated',
    openSource: 'Sí' as OpenSourceStatus,
    status: 'Archivada' as ToolStatus,
    level: 'Avanzado' as ToolLevel,
    tags: ['GCP', 'Security', 'Compliance', 'Legacy', 'Policy'],
    patronTip:
      'Consérvalo como referencia histórica o para entender instalaciones heredadas, pero no lo usaría como base de una implementación nueva. Para diseños actuales prioriza capacidades nativas de Google Cloud y proyectos con mantenimiento activo.'
  },
  {
    slug: 'azure-quick-review',
    title: 'Azure Quick Review (azqr)',
    clouds: ['Azure'] as CloudName[],
    category: 'Assessment y resiliencia',
    description:
      'CLI oficial de Azure que revisa recursos contra buenas prácticas y recomendaciones, genera inventario y action plans, e integra señales de Advisor, Defender for Cloud, Policy, costos y diagnostic settings.',
    url: 'https://github.com/Azure/azqr',
    sourceType: 'GitHub oficial' as SourceType,
    source: 'Azure / Microsoft',
    openSource: 'Sí' as OpenSourceStatus,
    status: 'Activa' as ToolStatus,
    level: 'Intermedio–Avanzado' as ToolLevel,
    tags: ['Assessment', 'Resiliency', 'Advisor', 'Defender', 'Azure Policy'],
    patronTip:
      'Es de las herramientas que más priorizaría para assessments Azure actuales. Empieza con Reader a nivel Management Group o suscripción y habilita stages adicionales sólo cuando tengas claro qué permisos y datos necesitas.'
  },
  {
    slug: 'cloudnetdraw',
    title: 'CloudNet Draw',
    clouds: ['Azure'] as CloudName[],
    category: 'Networking y diagramación',
    description:
      'Herramienta Python que descubre topologías de Azure Virtual Network mediante Azure Resource Graph y genera diagramas Draw.io con hubs, spokes, subnets, peerings, NSG, UDR y Azure Firewall.',
    url: 'https://github.com/krhatland/cloudnetdraw',
    sourceType: 'GitHub community' as SourceType,
    source: 'Kristoffer Hatland / Community',
    openSource: 'Sí' as OpenSourceStatus,
    status: 'Activa' as ToolStatus,
    level: 'Intermedio' as ToolLevel,
    tags: ['Networking', 'Draw.io', 'VNet', 'Hub-Spoke', 'Azure Resource Graph'],
    patronTip:
      'Muy útil para acelerar documentación de red porque entrega archivos .drawio editables. Valida manualmente rutas efectivas, propagación, appliances y dependencias que no puedan inferirse únicamente desde Resource Graph.'
  },
  {
    slug: 'azviz',
    title: 'AzViz',
    clouds: ['Azure'] as CloudName[],
    category: 'Arquitectura y diagramación',
    description:
      'Módulo PowerShell que descubre recursos dentro de uno o varios Resource Groups, identifica dependencias y genera diagramas de topología Azure en formatos como PNG y SVG usando GraphViz.',
    url: 'https://github.com/PrateekKumarSingh/AzViz',
    sourceType: 'GitHub community' as SourceType,
    source: 'Prateek Kumar Singh / Community',
    openSource: 'Sí' as OpenSourceStatus,
    status: 'Activa' as ToolStatus,
    level: 'Intermedio' as ToolLevel,
    tags: ['Diagram', 'PowerShell', 'GraphViz', 'Topology', 'Documentation'],
    patronTip:
      'Funciona especialmente bien para documentación rápida a nivel Resource Group. Para una vista de networking editable y más enfocada en VNets, compáralo con CloudNet Draw antes de decidir cuál usar.'
  },
  {
    slug: 'cloudblueprint-azure-iac',
    title: 'CloudBlueprint',
    clouds: ['Azure'] as CloudName[],
    category: 'IaC y arquitectura',
    description:
      'Generador web para crear repositorios de Infrastructure as Code en Azure, workloads basados en Bicep y Azure Verified Modules, pipelines CI/CD y simulaciones de políticas WAF.',
    url: 'https://azureblueprints.net/',
    sourceType: 'Sitio community' as SourceType,
    source: 'CloudBlueprint Community',
    openSource: 'Sí' as OpenSourceStatus,
    status: 'Activa' as ToolStatus,
    level: 'Intermedio' as ToolLevel,
    tags: ['Bicep', 'AVM', 'IaC', 'CI/CD', 'WAF'],
    patronTip:
      'No lo confundas con el servicio Azure Blueprints. Aquí hablamos de un generador de IaC. Úsalo para acelerar scaffolding, pero revisa el código generado, versiones de módulos, naming y controles de seguridad antes de desplegar.'
  },
  {
    slug: 'azure-resource-graph-examples',
    title: 'Azure Resource Graph Examples',
    clouds: ['Azure'] as CloudName[],
    category: 'Assessment e inventario',
    description:
      'Colección comunitaria de consultas Azure Resource Graph organizadas por compute, PaaS, networking, seguridad, Policy, tagging, alertas y recursos huérfanos, junto con una guía de introducción a ARG.',
    url: 'https://github.com/scautomation/AzureResourceGraph-Examples/tree/master',
    sourceType: 'GitHub community' as SourceType,
    source: 'SCAutomation Community',
    openSource: 'No identificado' as OpenSourceStatus,
    status: 'Activa' as ToolStatus,
    level: 'Intermedio' as ToolLevel,
    tags: ['Azure Resource Graph', 'KQL', 'Inventory', 'Policy', 'Queries'],
    patronTip:
      'Úsalo como biblioteca de patrones, no como copy-paste ciego. Revisa resource types, API behavior y propiedades actuales; ARG cambia y una consulta antigua puede devolver datos incompletos o requerir ajustes.'
  },
  {
    slug: 'microsoft-enterprise-security-assessment',
    title: 'Microsoft Enterprise Security Assessment (ESA)',
    clouds: ['Azure', 'Microsoft 365'] as CloudName[],
    category: 'Security y assessment',
    description:
      'Herramientas oficiales de Microsoft para recopilar datos de seguridad y compliance de Defender for Cloud, Microsoft Cloud Security Benchmark y contexto de licenciamiento para un Enterprise Security Assessment.',
    url: 'https://github.com/microsoft/ESA',
    sourceType: 'GitHub oficial' as SourceType,
    source: 'Microsoft',
    openSource: 'Sí' as OpenSourceStatus,
    status: 'Activa' as ToolStatus,
    level: 'Avanzado' as ToolLevel,
    tags: ['Defender for Cloud', 'MCSB', 'Secure Score', 'Assessment', 'PowerShell'],
    patronTip:
      'Tiene más sentido en assessments formales que en revisiones rápidas. Define previamente alcance, RBAC y permisos de directorio, y trata los CSV exportados como información sensible del entorno.'
  },
  {
    slug: 'azure-ad-assessment',
    title: 'Microsoft Azure AD Assessment',
    clouds: ['Azure', 'Microsoft 365'] as CloudName[],
    category: 'Identity y assessment',
    description:
      'Módulo PowerShell para evaluar estado y configuración de un tenant de Azure AD / Microsoft Entra, incluyendo recopilación del tenant y componentes híbridos como AD FS y Azure AD Connect.',
    url: 'https://github.com/AzureAD/AzureADAssessment',
    sourceType: 'GitHub oficial' as SourceType,
    source: 'Microsoft / AzureAD',
    openSource: 'Sí' as OpenSourceStatus,
    status: 'Activa' as ToolStatus,
    level: 'Avanzado' as ToolLevel,
    tags: ['Entra ID', 'Azure AD', 'Identity', 'Hybrid Identity', 'Assessment'],
    patronTip:
      'Es una herramienta de assessment, no un scanner para ejecutar sin preparación. Revisa los permisos solicitados, usa una app dedicada y controla cuidadosamente los paquetes de datos generados antes de compartirlos o almacenarlos.'
  },
  {
    slug: 'windows-cloud-academy',
    title: 'Windows Cloud Academy',
    clouds: ['Azure', 'Microsoft 365'] as CloudName[],
    category: 'Laboratorios y aprendizaje',
    description:
      'Repositorio oficial de Microsoft con retos hands-on para aprender Windows 365 y Azure Virtual Desktop, incluyendo host pools, RDP, Insights, Intune, aplicaciones y escenarios de Windows 365.',
    url: 'https://github.com/microsoft/WindowsCloudAcademy/tree/main',
    sourceType: 'GitHub oficial' as SourceType,
    source: 'Microsoft',
    openSource: 'Sí' as OpenSourceStatus,
    status: 'Activa' as ToolStatus,
    level: 'Intermedio' as ToolLevel,
    tags: ['AVD', 'Windows 365', 'Intune', 'Labs', 'DaaS'],
    patronTip:
      'Muy útil para formación porque está estructurado como retos prácticos. Úsalo como complemento de Microsoft Learn y valida costos, licencias y requisitos antes de reproducir laboratorios en un tenant propio.'
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
