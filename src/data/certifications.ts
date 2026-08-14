export type CertificationProvider = 'Microsoft' | 'AWS' | 'Google Cloud';
export type CertificationStatus = 'Vigente' | 'Beta' | 'Próximo retiro';

export interface Certification {
  provider: CertificationProvider;
  code?: string;
  name: string;
  area: string;
  level: string;
  status: CertificationStatus;
  role: string;
  focus: string;
  url: string;
  retirement?: string;
  note?: string;
}

export interface CertificationRoute {
  provider: CertificationProvider;
  title: string;
  steps: string[];
  description: string;
}

export interface CertificationTransition {
  provider: CertificationProvider;
  code: string;
  title: string;
  detail: string;
}

export interface CertificationSource {
  provider: CertificationProvider;
  title: string;
  description: string;
  url: string;
}

export const providers: CertificationProvider[] = ['Microsoft', 'AWS', 'Google Cloud'];

export const certifications: Certification[] = [

  // Azure
  { provider:'Microsoft', code:'AZ-900', name:'Microsoft Certified: Azure Fundamentals', area:'Azure', level:'Fundamental', status:'Vigente', role:'Fundamentos de cloud', focus:'Conceptos de nube, arquitectura de Azure, servicios principales, administración y gobierno.', url:'https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/' },
  { provider:'Microsoft', code:'AZ-104', name:'Microsoft Certified: Azure Administrator Associate', area:'Azure', level:'Associate', status:'Vigente', role:'Azure Administrator', focus:'Identidad, gobierno, storage, compute, networking y monitorización de Azure.', url:'https://learn.microsoft.com/en-us/credentials/certifications/azure-administrator/' },
  { provider:'Microsoft', code:'AZ-700', name:'Microsoft Certified: Azure Network Engineer Associate', area:'Azure', level:'Associate', status:'Vigente', role:'Network Engineer', focus:'Core networking, conectividad híbrida, application delivery, Private Link y seguridad de red.', url:'https://learn.microsoft.com/en-us/credentials/certifications/azure-network-engineer-associate/' },
  { provider:'Microsoft', code:'AZ-305', name:'Microsoft Certified: Azure Solutions Architect Expert', area:'Azure', level:'Expert', status:'Vigente', role:'Solution Architect', focus:'Diseño de identidad, gobierno, almacenamiento, continuidad de negocio e infraestructura.', url:'https://learn.microsoft.com/en-us/credentials/certifications/azure-solutions-architect/', note:'Requiere Azure Administrator Associate además de aprobar AZ-305.' },
  { provider:'Microsoft', code:'AZ-400', name:'Microsoft Certified: DevOps Engineer Expert', area:'Azure', level:'Expert', status:'Vigente', role:'DevOps Engineer', focus:'Procesos DevOps, source control, CI/CD, seguridad, observabilidad y automatización.', url:'https://learn.microsoft.com/en-us/credentials/certifications/devops-engineer/' },
  { provider:'Microsoft', code:'AZ-140', name:'Microsoft Certified: Azure Virtual Desktop Specialty', area:'Azure', level:'Specialty', status:'Vigente', role:'AVD Administrator', focus:'Planeación, despliegue, identidad, seguridad, operación y monitoreo de Azure Virtual Desktop.', url:'https://learn.microsoft.com/en-us/credentials/certifications/azure-virtual-desktop-specialty/' },
  { provider:'Microsoft', code:'AZ-120', name:'Microsoft Certified: Azure for SAP Workloads Specialty', area:'Azure', level:'Specialty', status:'Vigente', role:'SAP on Azure Architect / Engineer', focus:'Migración, arquitectura, alta disponibilidad, recuperación y operación de SAP sobre Azure.', url:'https://learn.microsoft.com/en-us/credentials/certifications/azure-for-sap-workloads-specialty/' },

  // Security
  { provider:'Microsoft', code:'SC-900', name:'Microsoft Certified: Security, Compliance, and Identity Fundamentals', area:'Security', level:'Fundamental', status:'Vigente', role:'Fundamentos de seguridad', focus:'Microsoft Entra, seguridad, cumplimiento, privacidad y conceptos de Zero Trust.', url:'https://learn.microsoft.com/en-us/credentials/certifications/security-compliance-and-identity-fundamentals/' },
  { provider:'Microsoft', code:'SC-200', name:'Microsoft Certified: Security Operations Analyst Associate', area:'Security', level:'Associate', status:'Vigente', role:'Security Operations Analyst', focus:'Microsoft Sentinel, Defender XDR, investigación, detección y respuesta a amenazas.', url:'https://learn.microsoft.com/en-us/credentials/certifications/security-operations-analyst/' },
  { provider:'Microsoft', code:'SC-300', name:'Microsoft Certified: Identity and Access Administrator Associate', area:'Security', level:'Associate', status:'Vigente', role:'Identity and Access Administrator', focus:'Microsoft Entra ID, autenticación, autorización, Conditional Access y gobierno de identidad.', url:'https://learn.microsoft.com/en-us/credentials/certifications/identity-and-access-administrator/' },
  { provider:'Microsoft', code:'SC-401', name:'Microsoft Certified: Information Security Administrator Associate', area:'Security', level:'Associate', status:'Vigente', role:'Information Security Administrator', focus:'Microsoft Purview, Information Protection, DLP, retención y administración de riesgos.', url:'https://learn.microsoft.com/en-us/credentials/certifications/information-security-administrator/' },
  { provider:'Microsoft', code:'SC-500', name:'Microsoft Certified: Cloud and AI Security Engineer Associate', area:'Security', level:'Associate', status:'Vigente', role:'Cloud and AI Security Engineer', focus:'Controles de seguridad end-to-end para Azure, entornos híbridos y workloads habilitados con IA.', url:'https://learn.microsoft.com/en-us/credentials/certifications/cloud-and-ai-security-engineer-associate/' },
  { provider:'Microsoft', code:'SC-100', name:'Microsoft Certified: Cybersecurity Architect Expert', area:'Security', level:'Expert', status:'Vigente', role:'Cybersecurity Architect', focus:'Arquitectura Zero Trust, GRC, SecOps, identidad, infraestructura, aplicaciones y datos.', url:'https://learn.microsoft.com/en-us/credentials/certifications/cybersecurity-architect-expert/', note:'Microsoft sigue exigiendo SC-100 y al menos una certificación prerequisite aceptada en su página oficial.' },
  { provider:'Microsoft', code:'AZ-500', name:'Microsoft Certified: Azure Security Engineer Associate', area:'Security', level:'Associate', status:'Próximo retiro', retirement:'31 ago 2026', role:'Azure Security Engineer', focus:'Seguridad de identidad, red, compute, storage y Defender for Cloud.', url:'https://learn.microsoft.com/en-us/credentials/certifications/azure-security-engineer/', note:'La certificación, el examen y la renovación se retiran el 31 de agosto de 2026.' },

  // AI & Agents
  { provider:'Microsoft', code:'AI-901', name:'Microsoft Certified: Azure AI Fundamentals', area:'AI & Agents', level:'Fundamental', status:'Vigente', role:'Fundamentos de AI', focus:'Conceptos de AI, IA generativa, agentes y capacidades de Microsoft Foundry en Azure.', url:'https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-fundamentals/' },
  { provider:'Microsoft', code:'AI-103', name:'Microsoft Certified: Azure AI Apps and Agents Developer Associate', area:'AI & Agents', level:'Associate', status:'Vigente', role:'AI Engineer / Developer', focus:'Diseño, desarrollo y despliegue de aplicaciones y agentes de IA usando Python y Microsoft Foundry.', url:'https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-apps-and-agents-developer-associate/' },
  { provider:'Microsoft', code:'AI-200', name:'Microsoft Certified: Azure AI Cloud Developer Associate', area:'AI & Agents', level:'Associate', status:'Vigente', role:'Azure AI Cloud Developer', focus:'Back-end, contenedores, datos, integración de servicios, seguridad, monitoreo y ciclo de vida de soluciones AI.', url:'https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-cloud-developer-associate/' },
  { provider:'Microsoft', code:'AI-300', name:'Microsoft Certified: Machine Learning Operations Engineer Associate', area:'AI & Agents', level:'Associate', status:'Vigente', role:'MLOps / GenAIOps Engineer', focus:'MLOps, GenAIOps, Azure Machine Learning, Microsoft Foundry, GitHub Actions e Infrastructure as Code.', url:'https://learn.microsoft.com/en-us/credentials/certifications/operationalizing-machine-learning-and-generative-ai-solutions/' },
  { provider:'Microsoft', code:'AB-620', name:'Microsoft Certified: AI Agent Builder Associate', area:'AI & Agents', level:'Associate', status:'Vigente', role:'Agent Builder / Developer', focus:'Agentes empresariales con Copilot Studio, Power Platform, APIs, MCP, RAG e integraciones.', url:'https://learn.microsoft.com/en-us/credentials/certifications/ai-agent-builder-associate/' },
  { provider:'Microsoft', code:'AI-500', name:'Microsoft Certified: Multi-Agent AI Solutions Expert', area:'AI & Agents', level:'Expert', status:'Beta', role:'AI Engineer / Solution Architect', focus:'Arquitectura, desarrollo, evaluación, optimización, seguridad y despliegue de soluciones multi-agente.', url:'https://learn.microsoft.com/en-us/credentials/certifications/multi-agent-ai-solutions-expert/', note:'En beta. Requiere Azure AI Apps and Agents Developer Associate.' },
  { provider:'Microsoft', code:'AB-100', name:'Microsoft Certified: Agentic AI Business Solutions Architect', area:'AI & Agents', level:'Expert', status:'Vigente', role:'Solution Architect', focus:'Arquitectura de soluciones empresariales AI-first y agentic-first sobre el stack de Microsoft.', url:'https://learn.microsoft.com/en-us/credentials/certifications/agentic-ai-business-solutions-architect/', note:'Además de AB-100, Microsoft requiere una certificación Associate aceptada como prerequisite.' },
  { provider:'Microsoft', code:'AB-730', name:'Microsoft Certified: AI Business Professional', area:'AI & Agents', level:'Fundamental', status:'Vigente', role:'Business User', focus:'Uso de IA generativa, Microsoft 365 Copilot y agentes para productividad y decisiones de negocio.', url:'https://learn.microsoft.com/en-us/credentials/certifications/ai-business-professional/' },
  { provider:'Microsoft', code:'AB-731', name:'Microsoft Certified: AI Transformation Leader', area:'AI & Agents', level:'Fundamental', status:'Vigente', role:'Business Leader', focus:'Identificación de valor, estrategia de adopción, Responsible AI y transformación con Copilot y Foundry.', url:'https://learn.microsoft.com/en-us/credentials/certifications/ai-transformation-leader/' },

  // Data & Fabric
  { provider:'Microsoft', code:'DP-900', name:'Microsoft Certified: Azure Data Fundamentals', area:'Data & Fabric', level:'Fundamental', status:'Vigente', role:'Fundamentos de datos', focus:'Datos relacionales, no relacionales, analítica y servicios de datos de Azure.', url:'https://learn.microsoft.com/en-us/credentials/certifications/azure-data-fundamentals/' },
  { provider:'Microsoft', code:'DP-300', name:'Microsoft Certified: Azure Database Administrator Associate', area:'Data & Fabric', level:'Associate', status:'Vigente', role:'Database Administrator', focus:'Azure SQL, SQL Server híbrido, seguridad, rendimiento, automatización y HA/DR.', url:'https://learn.microsoft.com/en-us/credentials/certifications/azure-database-administrator-associate/' },
  { provider:'Microsoft', code:'DP-420', name:'Microsoft Certified: Azure Cosmos DB Developer Specialty', area:'Data & Fabric', level:'Specialty', status:'Vigente', role:'Developer', focus:'Diseño, desarrollo, indexación, seguridad y operación de soluciones con Cosmos DB for NoSQL.', url:'https://learn.microsoft.com/en-us/credentials/certifications/azure-cosmos-db-developer-specialty/' },
  { provider:'Microsoft', code:'DP-600', name:'Microsoft Certified: Fabric Analytics Engineer Associate', area:'Data & Fabric', level:'Associate', status:'Vigente', role:'Analytics Engineer', focus:'Soluciones analíticas en Microsoft Fabric, preparación de datos y modelos semánticos.', url:'https://learn.microsoft.com/en-us/credentials/certifications/fabric-analytics-engineer-associate/' },
  { provider:'Microsoft', code:'DP-700', name:'Microsoft Certified: Fabric Data Engineer Associate', area:'Data & Fabric', level:'Associate', status:'Vigente', role:'Data Engineer', focus:'Ingesta, transformación, seguridad, administración y optimización de soluciones de datos en Fabric.', url:'https://learn.microsoft.com/en-us/credentials/certifications/fabric-data-engineer-associate/' },
  { provider:'Microsoft', code:'DP-750', name:'Microsoft Certified: Azure Databricks Data Engineer Associate', area:'Data & Fabric', level:'Associate', status:'Vigente', role:'Data Engineer', focus:'Azure Databricks, Unity Catalog, procesamiento de datos, pipelines y operación.', url:'https://learn.microsoft.com/en-us/credentials/certifications/implementing-data-engineering-solutions-using-azure-databricks/' },
  { provider:'Microsoft', code:'DP-800', name:'Microsoft Certified: SQL AI Developer Associate', area:'Data & Fabric', level:'Associate', status:'Vigente', role:'SQL / AI Developer', focus:'Soluciones SQL modernas con características de AI, vectores, modelos, seguridad, optimización y CI/CD.', url:'https://learn.microsoft.com/en-us/credentials/certifications/developing-ai-enabled-database-solutions/' },

  // Microsoft 365
  { provider:'Microsoft', code:'AB-900', name:'Microsoft 365 Certified: Copilot and Agent Administration Fundamentals', area:'Microsoft 365', level:'Fundamental', status:'Vigente', role:'Microsoft 365 / Copilot Administrator', focus:'Servicios Microsoft 365, seguridad, gobierno de datos, Copilot y administración de agentes.', url:'https://learn.microsoft.com/en-us/credentials/certifications/copilot-and-agent-administration-fundamentals/' },
  { provider:'Microsoft', code:'MD-102', name:'Microsoft 365 Certified: Endpoint Administrator Associate', area:'Microsoft 365', level:'Associate', status:'Vigente', role:'Endpoint Administrator', focus:'Microsoft Intune, Autopilot, Entra ID, Defender for Endpoint, Windows 365 y administración moderna.', url:'https://learn.microsoft.com/en-us/credentials/certifications/modern-desktop/' },
  { provider:'Microsoft', code:'MS-700', name:'Microsoft 365 Certified: Teams Administrator Associate', area:'Microsoft 365', level:'Associate', status:'Vigente', role:'Teams Administrator', focus:'Microsoft Teams, reuniones, calling, seguridad, governance y troubleshooting.', url:'https://learn.microsoft.com/en-us/credentials/certifications/m365-teams-administrator-associate/' },
  { provider:'Microsoft', code:'MS-721', name:'Microsoft 365 Certified: Collaboration Communications Systems Engineer Associate', area:'Microsoft 365', level:'Associate', status:'Vigente', role:'Collaboration Communications Engineer', focus:'Teams Phone, meetings, webinars, Teams Premium, Rooms, dispositivos y Copilot.', url:'https://learn.microsoft.com/en-us/credentials/certifications/m365-collaboration-communications-systems-engineer/' },
  { provider:'Microsoft', code:'AB-650', name:'Microsoft 365 Certified: AI Services Administrator Associate', area:'Microsoft 365', level:'Associate', status:'Beta', role:'Microsoft 365 and AI Services Administrator', focus:'Administración, gobierno y seguridad de tenants, workloads, Copilot, agentes y servicios de IA.', url:'https://learn.microsoft.com/en-us/credentials/certifications/ai-services-administrator-associate/' },
  { provider:'Microsoft', code:'MS-102', name:'Microsoft 365 Certified: Administrator Expert', area:'Microsoft 365', level:'Expert', status:'Próximo retiro', retirement:'31 oct 2026', role:'Microsoft 365 Administrator', focus:'Administración tenant-level, Entra ID, Defender XDR y Microsoft Purview.', url:'https://learn.microsoft.com/en-us/credentials/certifications/m365-administrator-expert/', note:'Microsoft anunció su retiro para el 31 de octubre de 2026.' },

  // AWS - listado técnico vigente según AWS Certification Exam Guides, revisión 14-ago-2026
  { provider:'AWS', code:'CLF-C02', name:'AWS Certified Cloud Practitioner', area:'Fundamentals', level:'Foundational', status:'Vigente', role:'Cloud fundamentals / business & technical', focus:'Conceptos de AWS Cloud, seguridad y cumplimiento, tecnología y servicios, facturación, precios y soporte.', url:'https://aws.amazon.com/certification/certified-cloud-practitioner/' },
  { provider:'AWS', code:'AIF-C01', name:'AWS Certified AI Practitioner', area:'AI & ML', level:'Foundational', status:'Vigente', role:'AI / business / product professional', focus:'Fundamentos de AI, ML y generative AI, casos de uso, responsible AI y servicios de AWS relacionados.', url:'https://aws.amazon.com/certification/certified-ai-practitioner/' },

  { provider:'AWS', code:'SAA-C03', name:'AWS Certified Solutions Architect - Associate', area:'Architecture', level:'Associate', status:'Vigente', role:'Solutions Architect', focus:'Diseño de soluciones distribuidas, resilientes, seguras, de alto rendimiento y costo optimizado sobre AWS.', url:'https://aws.amazon.com/certification/certified-solutions-architect-associate/' },
  { provider:'AWS', code:'SOA-C03', name:'AWS Certified CloudOps Engineer - Associate', area:'Operations', level:'Associate', status:'Vigente', role:'CloudOps / Systems Administrator', focus:'Deployment, management y operación de workloads; monitoreo, resiliencia, networking, seguridad y automatización.', url:'https://aws.amazon.com/certification/certified-cloudops-engineer-associate/', note:'Es el nombre vigente de la ruta operativa que anteriormente se conocía como SysOps Administrator Associate.' },
  { provider:'AWS', code:'DVA-C02', name:'AWS Certified Developer - Associate', area:'Development', level:'Associate', status:'Vigente', role:'Cloud Developer', focus:'Desarrollo, despliegue, debugging y mantenimiento de aplicaciones cloud-native sobre AWS.', url:'https://aws.amazon.com/certification/certified-developer-associate/', note:'DVA-C02 sigue disponible hasta el 30 de noviembre de 2026. AWS abre registro de DVA-C03 el 1 de diciembre de 2026.' },
  { provider:'AWS', code:'DEA-C01', name:'AWS Certified Data Engineer - Associate', area:'Data', level:'Associate', status:'Vigente', role:'Data Engineer', focus:'Ingesta y transformación, data stores, operaciones, soporte y seguridad de workloads de datos sobre AWS.', url:'https://aws.amazon.com/certification/certified-data-engineer-associate/' },
  { provider:'AWS', code:'MLA-C01', name:'AWS Certified Machine Learning Engineer - Associate', area:'AI & ML', level:'Associate', status:'Vigente', role:'ML Engineer / MLOps Engineer', focus:'Implementación, despliegue, mantenimiento y operación de soluciones de machine learning en AWS.', url:'https://aws.amazon.com/certification/certified-machine-learning-engineer-associate/', note:'MLA-C02 está en actualización: el registro beta abre el 1 de septiembre de 2026; MLA-C01 en inglés termina el 28 de septiembre.' },

  { provider:'AWS', code:'SAP-C02', name:'AWS Certified Solutions Architect - Professional', area:'Architecture', level:'Professional', status:'Vigente', role:'Senior Solutions Architect', focus:'Diseño avanzado de sistemas distribuidos, migraciones, continuidad, multi-account, gobernanza y optimización empresarial.', url:'https://aws.amazon.com/certification/certified-solutions-architect-professional/' },
  { provider:'AWS', code:'DOP-C02', name:'AWS Certified DevOps Engineer - Professional', area:'DevOps', level:'Professional', status:'Vigente', role:'DevOps Engineer', focus:'Provisioning, operación y administración de sistemas distribuidos, CI/CD, observabilidad, automatización y resiliencia.', url:'https://aws.amazon.com/certification/certified-devops-engineer-professional/' },
  { provider:'AWS', code:'AIP-C01', name:'AWS Certified Generative AI Developer - Professional', area:'AI & ML', level:'Professional', status:'Vigente', role:'Generative AI Developer', focus:'Diseño, implementación, integración y despliegue de soluciones de generative AI sobre AWS.', url:'https://aws.amazon.com/certification/certified-generative-ai-developer-professional/' },

  { provider:'AWS', code:'SCS-C03', name:'AWS Certified Security - Specialty', area:'Security', level:'Specialty', status:'Vigente', role:'Cloud Security Engineer', focus:'Protección de workloads y aplicaciones AWS, detección, respuesta, infraestructura, IAM, datos y gobierno de seguridad.', url:'https://aws.amazon.com/certification/certified-security-specialty/' },
  { provider:'AWS', code:'ANS-C01', name:'AWS Certified Advanced Networking - Specialty', area:'Networking', level:'Specialty', status:'Próximo retiro', retirement:'25 ago 2026', role:'Network Specialist / Architect', focus:'Diseño e implementación de arquitecturas avanzadas de networking AWS e híbridas a escala.', url:'https://aws.amazon.com/certification/certified-advanced-networking-specialty/', note:'Último día para presentar el examen: 25 de agosto de 2026. AWS no emitirá nuevas certificaciones después de esa fecha.' },


  // Google Cloud - catálogo oficial vigente, revisión 14-ago-2026
  { provider:'Google Cloud', name:'Cloud Digital Leader', area:'Fundamentals', level:'Foundational', status:'Vigente', role:'Business / cloud fundamentals', focus:'Conocimiento amplio de conceptos cloud, capacidades, productos, casos de uso y valor de Google Cloud.', url:'https://cloud.google.com/learn/certification/cloud-digital-leader' },
  { provider:'Google Cloud', name:'Generative AI Leader', area:'AI & ML', level:'Foundational', status:'Vigente', role:'Business / AI Leader', focus:'Fundamentos de generative AI, oferta de Google Cloud, mejora de resultados y estrategia de negocio para soluciones de IA.', url:'https://cloud.google.com/learn/certification/generative-ai-leader' },

  { provider:'Google Cloud', name:'Associate Cloud Engineer', area:'Infrastructure', level:'Associate', status:'Vigente', role:'Cloud Engineer', focus:'Configuración de entornos, despliegue, operación, monitoreo, acceso y seguridad de soluciones Google Cloud.', url:'https://cloud.google.com/learn/certification/cloud-engineer' },
  { provider:'Google Cloud', name:'Associate Google Workspace Administrator', area:'Workspace', level:'Associate', status:'Vigente', role:'Google Workspace Administrator', focus:'Usuarios, servicios Workspace, gobierno de datos, seguridad, endpoints y troubleshooting de Google Workspace.', url:'https://cloud.google.com/learn/certification/associate-google-workspace-administrator' },
  { provider:'Google Cloud', name:'Associate Data Practitioner', area:'Data', level:'Associate', status:'Vigente', role:'Data Practitioner', focus:'Preparación e ingesta, análisis, visualización, pipelines y administración de datos sobre Google Cloud.', url:'https://cloud.google.com/learn/certification/data-practitioner' },

  { provider:'Google Cloud', name:'Professional Cloud Architect', area:'Architecture', level:'Professional', status:'Vigente', role:'Cloud Architect', focus:'Estrategia, arquitectura, migración, seguridad, operación, optimización y diseño de soluciones robustas sobre Google Cloud.', url:'https://cloud.google.com/learn/certification/cloud-architect/' },
  { provider:'Google Cloud', name:'Professional Cloud Database Engineer', area:'Data', level:'Professional', status:'Vigente', role:'Database Engineer', focus:'Diseño, despliegue, migración, administración y troubleshooting de bases de datos escalables y altamente disponibles.', url:'https://cloud.google.com/learn/certification/cloud-database-engineer/' },
  { provider:'Google Cloud', name:'Professional Cloud Developer', area:'Development', level:'Professional', status:'Vigente', role:'Cloud Developer', focus:'Diseño, construcción, testing, despliegue y operación de aplicaciones escalables, seguras y cloud-native.', url:'https://cloud.google.com/learn/certification/cloud-developer/' },
  { provider:'Google Cloud', name:'Professional Data Engineer', area:'Data', level:'Professional', status:'Vigente', role:'Data Engineer', focus:'Diseño de sistemas de procesamiento, ingestión, almacenamiento, preparación, uso, monitoreo y seguridad de datos.', url:'https://cloud.google.com/learn/certification/data-engineer/' },
  { provider:'Google Cloud', name:'Professional Cloud DevOps Engineer', area:'DevOps', level:'Professional', status:'Vigente', role:'DevOps / SRE Engineer', focus:'SRE, CI/CD de aplicaciones e infraestructura, observabilidad, troubleshooting y optimización de rendimiento y costos.', url:'https://cloud.google.com/learn/certification/cloud-devops-engineer/' },
  { provider:'Google Cloud', name:'Professional Cloud Security Engineer', area:'Security', level:'Professional', status:'Vigente', role:'Cloud Security Engineer', focus:'IAM, protección de datos, network security, monitoring, automatización, AI workloads, supply chain y compliance.', url:'https://cloud.google.com/learn/certification/cloud-security-engineer/' },
  { provider:'Google Cloud', name:'Professional Cloud Network Engineer', area:'Networking', level:'Professional', status:'Vigente', role:'Cloud Network Engineer', focus:'VPC, routing, load balancing, Cloud NAT, DNS, Interconnect, VPN, observabilidad y seguridad de red.', url:'https://cloud.google.com/learn/certification/cloud-network-engineer/' },
  { provider:'Google Cloud', name:'Professional Machine Learning Engineer', area:'AI & ML', level:'Professional', status:'Vigente', role:'Machine Learning Engineer', focus:'Diseño y producción de soluciones ML y generative AI, MLOps, modelos fundacionales, prompt/context engineering y gobierno.', url:'https://cloud.google.com/learn/certification/machine-learning-engineer/' },
  { provider:'Google Cloud', name:'Professional Security Operations Engineer', area:'Security', level:'Professional', status:'Vigente', role:'Security Operations Engineer', focus:'Platform operations, gestión de datos, threat hunting, detection engineering, incident response y observabilidad.', url:'https://cloud.google.com/learn/certification/security-operations-engineer' }

];

export const routes: CertificationRoute[] = [
  // Microsoft
  { provider:'Microsoft', title:'☁ Infraestructura y arquitectura Azure', steps:['AZ-900','AZ-104','AZ-305'], description:'Base sólida para administración y arquitectura. AZ-700 complementa la ruta cuando networking es parte central del rol.' },
  { provider:'Microsoft', title:'⌁ Networking Azure', steps:['AZ-900','AZ-104','AZ-700'], description:'Para VNets, DNS, Private Link, VPN, ExpressRoute, Firewall y application delivery.' },
  { provider:'Microsoft', title:'◇ Seguridad cloud', steps:['SC-900','SC-500','SC-100'], description:'SC-500 es la nueva credencial de seguridad cloud y AI. Revisa los prerequisites oficiales vigentes de SC-100.' },
  { provider:'Microsoft', title:'✦ Desarrollo Azure AI', steps:['AI-901','AI-103 / AI-200'], description:'AI-103 se enfoca en apps y agentes; AI-200 amplía hacia servicios back-end, integración, seguridad y operación cloud.' },
  { provider:'Microsoft', title:'◎ Agentes y arquitectura AI', steps:['AB-620','AB-100'], description:'Para builders y arquitectos de soluciones agentic. AB-100 exige además una credencial Associate aceptada por Microsoft.' },
  { provider:'Microsoft', title:'▤ Data y Fabric', steps:['DP-900','DP-300 / DP-600 / DP-700 / DP-750'], description:'La especialización depende de si trabajas con SQL, analytics en Fabric, data engineering o Databricks.' },
  { provider:'Microsoft', title:'▦ Microsoft 365 moderno', steps:['AB-900','MD-102 / MS-700','AB-650'], description:'AB-650 está en beta y refleja la transición hacia administración conjunta de Microsoft 365, Copilot y agentes.' },
  { provider:'Microsoft', title:'◫ Windows Server híbrido', steps:['AZ-800 + AZ-801','AZ-802 (beta)'], description:'AZ-800 y AZ-801 se retiran el 30 de septiembre de 2026; AZ-802 queda como la nueva ruta.' },

  // AWS: rutas editoriales; AWS no exige esta secuencia como prerequisite.
  { provider:'AWS', title:'☁ Fundamentos y arquitectura', steps:['CLF-C02','SAA-C03','SAP-C02'], description:'Ruta progresiva para pasar de fundamentos a diseño de soluciones y arquitectura empresarial avanzada.' },
  { provider:'AWS', title:'⚙ Operaciones y DevOps', steps:['CLF-C02 (opcional)','SOA-C03','DOP-C02'], description:'Para operación, observabilidad, automatización, resiliencia y prácticas DevOps sobre AWS.' },
  { provider:'AWS', title:'⌘ Desarrollo cloud', steps:['CLF-C02 (opcional)','DVA-C02','DOP-C02'], description:'Para developers que diseñan, despliegan y operan aplicaciones cloud-native y pipelines de entrega.' },
  { provider:'AWS', title:'✦ AI, ML y Generative AI', steps:['AIF-C01','MLA-C01 / DEA-C01','AIP-C01'], description:'AIF-C01 introduce AI; después puedes especializarte en ML engineering o datos y avanzar hacia Generative AI Developer Professional.' },
  { provider:'AWS', title:'◇ Seguridad', steps:['SAA-C03','SCS-C03'], description:'Una ruta práctica para combinar arquitectura general con especialización profunda en seguridad de workloads AWS.' },
  { provider:'AWS', title:'▤ Data Engineering', steps:['CLF-C02 (opcional)','DEA-C01','AIP-C01 (según rol)'], description:'Para pipelines, data stores y plataformas de datos; AIP-C01 tiene sentido cuando el rol evoluciona hacia aplicaciones generativas.' },
  { provider:'AWS', title:'⌁ Networking avanzado', steps:['SAA-C03','ANS-C01 hasta 25-ago-2026'], description:'ANS-C01 está a días de retirarse y AWS no ha publicado un reemplazo directo; no es una buena ruta nueva para quien parte desde cero.' },

  // Google Cloud: no existen prerequisites formales entre estas certificaciones.
  { provider:'Google Cloud', title:'☁ Infraestructura y arquitectura', steps:['Cloud Digital Leader (opcional)','Associate Cloud Engineer','Professional Cloud Architect'], description:'Ruta sugerida para construir base de plataforma y avanzar hacia arquitectura de soluciones empresariales.' },
  { provider:'Google Cloud', title:'⌁ Networking', steps:['Associate Cloud Engineer','Professional Cloud Network Engineer'], description:'Para diseño y operación de VPC, routing, load balancing, NAT, DNS, Interconnect, VPN y seguridad de red.' },
  { provider:'Google Cloud', title:'◇ Seguridad y SecOps', steps:['Associate Cloud Engineer (opcional)','Professional Cloud Security Engineer','Professional Security Operations Engineer'], description:'Security Engineer y Security Operations Engineer son especializaciones complementarias, no una jerarquía obligatoria.' },
  { provider:'Google Cloud', title:'▤ Data', steps:['Associate Data Practitioner','Professional Data Engineer','Professional Cloud Database Engineer'], description:'Data Practitioner es una base útil; después elige ingeniería de datos o bases de datos según tu rol.' },
  { provider:'Google Cloud', title:'✦ AI & Machine Learning', steps:['Generative AI Leader (negocio) / Data Practitioner','Professional Machine Learning Engineer'], description:'Generative AI Leader es business-oriented; ML Engineer es la ruta técnica para diseño y operación de soluciones ML y genAI.' },
  { provider:'Google Cloud', title:'⚙ Desarrollo y DevOps', steps:['Associate Cloud Engineer (opcional)','Professional Cloud Developer','Professional Cloud DevOps Engineer'], description:'Para desarrollo cloud-native, CI/CD, SRE, observabilidad y operación de aplicaciones.' },
  { provider:'Google Cloud', title:'▦ Google Workspace', steps:['Associate Google Workspace Administrator'], description:'Ruta específica de administración, seguridad, colaboración y gobierno de Google Workspace.' }
];

export const transitions: CertificationTransition[] = [
  { provider:'Microsoft', code:'AZ-500', title:'Azure Security Engineer Associate', detail:'Retiro: 31 ago 2026' },
  { provider:'Microsoft', code:'AZ-800 / 801', title:'Windows Server Hybrid', detail:'Exámenes se retiran: 30 sep 2026' },
  { provider:'Microsoft', code:'AZ-802', title:'Windows Server Administrator Associate', detail:'Nueva ruta en beta' },
  { provider:'Microsoft', code:'AI-900', title:'Examen anterior de Azure AI Fundamentals', detail:'Retirado: 30 jun 2026 · ahora AI-901' },
  { provider:'Microsoft', code:'AZ-204', title:'Azure Developer Associate', detail:'Certificación retirada: 31 jul 2026' },
  { provider:'Microsoft', code:'MS-900', title:'Microsoft 365 Fundamentals', detail:'Retirada: 31 mar 2026' },
  { provider:'Microsoft', code:'MS-102', title:'Microsoft 365 Administrator Expert', detail:'Retiro: 31 oct 2026' },

  { provider:'AWS', code:'ANS-C01', title:'Advanced Networking - Specialty', detail:'Último día del examen: 25 ago 2026; sin reemplazo directo anunciado.' },
  { provider:'AWS', code:'MLA-C02', title:'Machine Learning Engineer - Associate update', detail:'Registro beta abre 1 sep 2026; MLA-C01 en inglés termina 28 sep 2026.' },
  { provider:'AWS', code:'DVA-C03', title:'Developer - Associate update', detail:'Registro abre 1 dic 2026; DVA-C02 termina 30 nov 2026.' },
  { provider:'AWS', code:'SOA-C03', title:'CloudOps Engineer - Associate', detail:'Nombre vigente de la ruta operativa; reemplazó SysOps Administrator Associate.' },
  { provider:'AWS', code:'Skill Builder', title:'Maintenance beta', detail:'Certificaciones seleccionadas pueden extenderse 1 año mediante training + hands-on labs.' },
  { provider:'AWS', code:'MLS-C01', title:'Machine Learning - Specialty', detail:'Retirada el 31 mar 2026; la ruta actual es Machine Learning Engineer - Associate.' },
  { provider:'AWS', code:'Business', title:'AWS Certified AI Business Strategist', detail:'Ya aparece en la tabla oficial de recertificación de AWS; PatronTech no inventa código ni objetivos mientras AWS no publique una guía de examen individual completa.' },

  { provider:'Google Cloud', code:'Next ’26', title:'Objetivos de examen en actualización', detail:'Google está actualizando exámenes por cambios de Gemini Enterprise Agent Platform y su stack de data/analytics.' },
  { provider:'Google Cloud', code:'Google Skills', title:'Nueva opción de recertificación', detail:'Cloud Digital Leader, ACE, PCA y Professional Data Engineer pueden extender 1 año con rutas elegibles de skills.' },
  { provider:'Google Cloud', code:'SecOps', title:'Professional Security Operations Engineer', detail:'Ruta profesional vigente para detección, threat hunting, incident response y observabilidad.' },
  { provider:'Google Cloud', code:'Workspace', title:'Associate Google Workspace Administrator', detail:'Es la ruta vigente; Professional Google Workspace Administrator fue retirada el 31 dic 2024.' }
];

export const officialSources: CertificationSource[] = [
  { provider:'Microsoft', title:'Microsoft Credentials', description:'Catálogo oficial de Certifications y Applied Skills.', url:'https://learn.microsoft.com/en-us/credentials/' },
  { provider:'Microsoft', title:'Credential retirement', description:'Retiros anunciados y credenciales recientemente retiradas.', url:'https://learn.microsoft.com/en-us/credentials/support/credential-retirement' },
  { provider:'Microsoft', title:'Expiration policy', description:'Política oficial de expiración y renovación.', url:'https://learn.microsoft.com/en-us/credentials/support/credential-expiration-policy' },

  { provider:'AWS', title:'AWS Certification', description:'Catálogo oficial de AWS Certifications.', url:'https://aws.amazon.com/certification/' },
  { provider:'AWS', title:'AWS Certification Exam Guides', description:'Fuente consolidada con exámenes vigentes y versiones anunciadas.', url:'https://docs.aws.amazon.com/aws-certification/latest/examguides/aws-certification-exam-guides.html' },
  { provider:'AWS', title:'AWS Recertification', description:'Opciones oficiales de renovación y maintenance.', url:'https://aws.amazon.com/certification/recertification/' },
  { provider:'AWS', title:'Advanced Networking retirement', description:'Aviso oficial del retiro de ANS-C01 el 25 de agosto de 2026.', url:'https://aws.amazon.com/certification/certified-advanced-networking-specialty/' },
  { provider:'AWS', title:'MLA-C02 update', description:'Actualización oficial de Machine Learning Engineer - Associate.', url:'https://aws.amazon.com/certification/certified-machine-learning-engineer-associate/' },

  { provider:'Google Cloud', title:'Google Cloud Certifications', description:'Catálogo oficial completo de certificaciones vigentes.', url:'https://cloud.google.com/learn/certification' },
  { provider:'Google Cloud', title:'Google Skills recertification', description:'Nueva opción de renovación mediante cursos y skill badges para credenciales seleccionadas.', url:'https://cloud.google.com/blog/topics/training-certifications/new-ways-keep-google-cloud-certifications-current' },
  { provider:'Google Cloud', title:'Associate Cloud Engineer', description:'Referencia oficial de la ruta Associate principal de Google Cloud.', url:'https://cloud.google.com/learn/certification/cloud-engineer' },
  { provider:'Google Cloud', title:'Professional Cloud Architect', description:'Referencia oficial de arquitectura y política de renovación.', url:'https://cloud.google.com/learn/certification/cloud-architect/' }
];

export const providerNotes: Record<CertificationProvider, string> = {
  Microsoft: 'Microsoft combina Fundamentals, Associate, Expert y Specialty. Fundamentals no expira; las certificaciones role-based y specialty utilizan renovación periódica según la política de Microsoft Credentials.',
  AWS: 'AWS organiza las certificaciones técnicas en Foundational, Associate, Professional y Specialty. La vigencia estándar es de 3 años; en 2026 AWS abrió una opción beta de maintenance por Skill Builder para algunas credenciales, que agrega 1 año.',
  'Google Cloud': 'Google Cloud divide el portfolio en Foundational, Associate y Professional, sin prerequisites formales. Foundational y Associate tienen vigencia de 3 años; Professional, 2 años. Google Skills ya ofrece renovación de 1 año para algunas credenciales seleccionadas.'
};
