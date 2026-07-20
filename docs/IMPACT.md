# NOVA STEM HUB Impact & Scholarships (Becas)

Documento de misión, modelo de becas y filosofía de elegibilidad. Actualizado julio 2026.

## Misión

NOVA STEM HUB existe para cerrar la brecha entre talento y oportunidad en LATAM. **NOVA College** es el producto de entrada: formación técnica verificable (~120h por track), alineada a certificaciones industry (CompTIA, ETA, IBM Quantum), orientada al **primer empleo tech**.

Prioridad: estudiantes **sin acceso** a programas privados equivalentes — no promesas vacías, sino empleabilidad real con certificados consultables en `verify.novahub.education` (roadmap).

Página pública: `/mission`

## Pilares de impacto

| Pilar | Enfoque |
|-------|---------|
| **Empleabilidad real** | Tracks alineados a CompTIA, ETA, IBM Quantum — primer empleo tech |
| **Certificados verificables** | Código único en verify.novahub.education |
| **Guiado por facilitadores** | Sin expertos requeridos — escala en colegios con recursos limitados |
| **LATAM-first** | Español neutro, contexto regional, alianzas locales |

Constantes: `src/lib/novahub-impact.ts`

## Formas de acceso (4 tiers)

| Tier | ID | Estado | Descripción |
|------|-----|--------|-------------|
| **Institucional** | `institutional` | Activo (piloto) | B2B — licencia currículo + plataforma + guía facilitador |
| **Beca** | `scholarship` | Piloto | Subsidiado/gratis para estudiantes vulnerables LATAM |
| **Matrícula directa** | `direct` | Roadmap | B2C individual — financia becas y contenido abierto |
| **Recursos abiertos** | `open` | Roadmap | Módulos intro gratuitos — sin certificado verificable |

Programa institucional: `src/data/novahub/access-programs.ts` (`NOVAHUB_INSTITUTIONAL_PROGRAM`)

## Programas de beca

Datos: `src/data/novahub/scholarships.ts`  
Hub: `/scholarships` · Solicitud: `/scholarships/apply`

| Programa | Cobertura | Tracks |
|----------|-----------|--------|
| **NOVA STEM HUB Beca** | Completa o parcial | Tier 1 (7 tracks entry) |
| **Beca Quantum** | Parcial, cupos limitados | Tier 2 Quantum Workforce |
| **Beca Institucional** | Por nominación escolar | Tier 1 + Tier 2 |

### Filosofía de elegibilidad

- **Honestidad:** cumplir criterios no garantiza aprobación — evaluamos necesidad, motivación y cupos.
- **LATAM first:** estudiantes 16–25+ en la región, con necesidad económica real.
- **Compromiso:** disposición a completar ~120h y obtener certificado verificable.
- **Sin aprobación instantánea:** cada solicitud pasa por revisión humana; respuesta objetivo 2–4 semanas.

### Proceso de solicitud (MVP)

1. Estudiante completa formulario en `/scholarships/apply`
2. `POST /api/scholarships/apply` valida con Zod
3. Solicitud se registra en consola + archivo JSONL (`data/scholarship-applications/applications.jsonl`)
4. Equipo NOVA STEM HUB contacta al solicitante — **no hay enrollment automático**

Campos: nombre, email, edad, país, track de interés, motivación, institución (opcional).

## Metas de impacto (objetivos)

Etiquetados como **objetivo** en UI — aspiracionales, sujetos a fondos:

| Meta | Horizonte |
|------|-----------|
| 10,000+ estudiantes formados | 2030 |
| 500+ becas NOVA STEM HUB | 2028 |
| 50+ instituciones aliadas | 2028 |
| 8 tracks NOVA College publicados | 2026 |

**Regla de UI:** Siempre etiquetar como "objetivo" o "meta" — nunca presentar como contadores en vivo.

## Roadmap

| Fase | Entrega |
|------|---------|
| **MVP (actual)** | Páginas becas + misión, formulario, log JSONL |
| **Fase 2** | Stripe matrícula directa + becas parciales automatizadas |
| **Fase 3** | Portal verify.novahub.education — verificación pública de certs |
| **Fase 4** | Dashboard institucional + nominaciones Beca Institucional |
| **Fase 5** | Email transaccional + CRM de solicitudes |

## Punto de entrada en código

```typescript
import {
  NOVAHUB_MISSION,
  NOVAHUB_IMPACT,
  SCHOLARSHIP_PROGRAMS,
  getScholarshipBySlug,
} from "@/lib/novahub";
```

## Docs relacionados

- [NOVA-STEM-HUB.md](./NOVA-STEM-HUB.md) — Arquitectura de marca
- [nova-college/README.md](./nova-college/README.md) — Currículo College
