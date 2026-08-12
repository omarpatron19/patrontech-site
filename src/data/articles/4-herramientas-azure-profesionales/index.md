---
schemaVersion: 1
contentType: "article"
title: "4 herramientas que todo profesional de Azure debería conocer"
description: "Cuatro recursos prácticos para elegir máquinas virtuales, comparar costos, revisar latencia entre regiones e inventariar ambientes Microsoft Azure."
summary: "Una colección práctica para acelerar decisiones de compute, FinOps, networking y assessment sin reemplazar la validación técnica que requiere una arquitectura real."
category: "Azure"
tags: ["Azure", "Arquitectura Cloud", "FinOps", "Networking", "Azure Resource Inventory"]
publishedAt: "2026-08-10"
updatedAt: "2026-08-10"
author: "Irving Omar Patron Padron"
draft: false
featured: false
reviewStatus: "approved"
cover: "./cover.webp"
coverAlt: "Azure Toolkit de PatronTech con cuatro bloques para compute, FinOps, networking e inventario de recursos"
---

Trabajar con Azure implica tomar decisiones constantemente: qué familia de máquina virtual utilizar, en qué región desplegar, cuánto puede costar una alternativa y cómo entender rápidamente un ambiente que ya existe. Para varias de esas preguntas hay herramientas que reducen mucho el tiempo de exploración inicial.

Esta colección reúne cuatro recursos que recomiendo tener a la mano. Ninguno sustituye un assessment ni una prueba de rendimiento, pero todos pueden acelerar el camino hacia una decisión mejor informada.

## 1. Azure VM Series: empieza por la familia correcta

Antes de comparar SKUs individuales conviene entender **qué familia de máquina virtual corresponde al tipo de carga**.

La página oficial de Microsoft para las series de Azure Virtual Machines permite revisar las familias disponibles y el perfil para el que fueron diseñadas. Por ejemplo, Microsoft presenta la familia B para cargas con uso de CPU bajo o moderado que ocasionalmente necesitan ráfagas, la familia D como propósito general y la familia E para cargas con mayor demanda de memoria.

**Cuándo la utilizaría:**

- durante un ejercicio de sizing inicial;
- al migrar una VM y buscar una familia equivalente o más adecuada;
- cuando una VM está sobredimensionada y quieres evaluar alternativas;
- para explicar a un equipo por qué dos SKUs con el mismo número de vCPU pueden estar orientados a necesidades distintas.

**Consejo del arquitecto:** no selecciones una VM únicamente por vCPU y RAM. Revisa también arquitectura del procesador, almacenamiento soportado, IOPS, throughput, red, disponibilidad regional y restricciones específicas del workload.

[Consultar Azure VM Series](https://azure.microsoft.com/es-es/pricing/details/virtual-machines/series/)

## 2. CloudPrice: acelera la comparación de tamaños y costos

Una vez identificada una familia o un rango de recursos, **CloudPrice** resulta útil para explorar alternativas. Permite filtrar máquinas virtuales por características como vCPU, memoria y región, y comparar opciones de precio de forma rápida.

Esto puede ser especialmente práctico en sesiones de FinOps o assessments, donde necesitas reducir una lista de cientos de SKUs a un conjunto manejable de candidatos.

### Un flujo práctico

Imagina que estás revisando una VM que actualmente tiene 2 vCPU y necesitas entre 9 y 17 GB de RAM. Puedes usar esos valores como filtros, revisar las alternativas y después regresar a la documentación oficial de Azure para validar capacidades y disponibilidad.

**Importante:** CloudPrice es una herramienta de terceros. Úsala para exploración y comparación, pero valida precios finales y condiciones comerciales con las fuentes oficiales de Microsoft antes de tomar una decisión financiera.

[Explorar CloudPrice](https://cloudprice.net/?region=southcentralus&cores=2,3&ram=9,17)

## 3. AzureSpeed: la latencia también importa al elegir región

La región más barata no necesariamente es la mejor región para una aplicación. Para workloads sensibles a latencia, **AzureSpeed** permite ejecutar pruebas desde el navegador hacia distintos datacenters de Azure y comparar resultados.

Puede ayudarte a crear un shortlist de regiones para pruebas posteriores. Por ejemplo, desde México podrías comparar Mexico Central, South Central US y otras regiones candidatas antes de realizar una prueba más completa con la aplicación.

**No usaría AzureSpeed como único criterio.** La selección de región también debe considerar:

| Criterio | Pregunta que debes responder |
|---|---|
| Servicios | ¿Todos los servicios requeridos están disponibles? |
| Resiliencia | ¿La región y el diseño cumplen el objetivo de disponibilidad y DR? |
| Datos | ¿Existen requisitos de residencia o cumplimiento? |
| Costos | ¿Cómo cambia el costo de compute, storage, red y servicios administrados? |
| Latencia | ¿El desempeño es suficiente desde las ubicaciones de los usuarios y sistemas dependientes? |

[Medir latencia con AzureSpeed](https://www.azurespeed.com/Azure/Latency)

## 4. Azure Resource Inventory: entiende primero el ambiente

Cuando llegas a un tenant o suscripción que no conoces, antes de recomendar cambios necesitas saber **qué existe realmente**.

**Azure Resource Inventory (ARI)** es un proyecto mantenido en GitHub bajo la organización de Microsoft que permite generar inventarios de recursos Azure con PowerShell. Es especialmente útil para assessments, documentación, análisis de gobierno y revisiones de FinOps.

Una instalación básica puede comenzar con:

```powershell
Install-Module -Name AzureResourceInventory
Import-Module AzureResourceInventory
Invoke-ARI
```

La herramienta puede ayudarte a generar una fotografía técnica del ambiente que después puedes complementar con Azure Cost Management, Azure Advisor, Azure Monitor y entrevistas con los equipos responsables de las aplicaciones.

**Consejo del arquitecto:** inventario no significa contexto. Que una VM exista no explica por qué existe, qué SLA soporta ni si puede apagarse. El reporte es el inicio del assessment, no la conclusión.

[Ver Azure Resource Inventory en GitHub](https://github.com/microsoft/ARI)

## Cómo combinar las cuatro herramientas

El mayor valor aparece cuando dejan de utilizarse de forma aislada.

Un flujo sencillo podría ser:

1. **ARI:** identifica las VMs y características actuales del ambiente.
2. **Azure VM Series:** determina qué familias encajan mejor con cada tipo de workload.
3. **CloudPrice:** compara rápidamente candidatos de sizing y costo.
4. **AzureSpeed:** incorpora latencia cuando estás evaluando regiones o nuevas ubicaciones.
5. **Documentación y herramientas oficiales:** valida disponibilidad, cuotas, precios, restricciones y arquitectura antes del cambio.

Este flujo es especialmente útil en **assessments, migraciones, ejercicios de right-sizing y revisiones FinOps**, porque separa la exploración rápida de la validación necesaria para producción.

## Qué no debemos hacer

El error sería convertir cualquiera de estas herramientas en una decisión automática. Un SKU más barato puede tener menor capacidad de I/O; una región con menor latencia puede no tener el servicio necesario; y un recurso aparentemente sin uso puede formar parte de un proceso de contingencia.

Las herramientas reducen tiempo. **La arquitectura sigue necesitando contexto.**

## Fuentes y herramientas

- [Microsoft Azure — Series de máquinas virtuales](https://azure.microsoft.com/es-es/pricing/details/virtual-machines/series/)
- [CloudPrice — Azure VM Pricing Comparison](https://cloudprice.net/?region=southcentralus&cores=2,3&ram=9,17)
- [AzureSpeed — Azure Latency Test](https://www.azurespeed.com/Azure/Latency)
- [Microsoft GitHub — Azure Resource Inventory](https://github.com/microsoft/ARI)
