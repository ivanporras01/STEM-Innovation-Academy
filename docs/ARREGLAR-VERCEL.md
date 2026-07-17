# 🔧 Arreglar el error de Vercel (P1012 — DATABASE_URL)

Tu build falló porque **falta la base de datos**. Sigue estos pasos **en orden**:

---

## PASO 1 — Crear base de datos (2 min)

1. Abre: **https://console.neon.tech**
2. Inicia sesión con **GitHub**
3. Click **New Project** → nombre: `nova-lms`
4. Click **Connection string** → copia la URL que empieza con:
   ```
   postgresql://neondb_owner:xxxx@ep-xxxx.neon.tech/neondb?sslmode=require
   ```
5. **Guarda esa URL** — la necesitas en el Paso 2

---

## PASO 2 — Agregar variables en Vercel (2 min)

1. Abre: **https://vercel.com/dashboard**
2. Click en tu proyecto **nova-lms** (o como lo hayas llamado)
3. Arriba click **Settings**
4. Menú izquierdo: **Environment Variables**
5. Agrega **una por una** (click Add New):

### Variable 1
- **Key:** `DATABASE_URL`
- **Value:** pega la URL de Neon del Paso 1
- Marca: ✅ Production ✅ Preview ✅ Development
- Click **Save**

### Variable 2
- **Key:** `AUTH_SECRET`
- **Value:** `nova-stem-innovation-academy-secret-2026`
- Marca: ✅ Production ✅ Preview ✅ Development
- Click **Save**

### Variable 3
- **Key:** `NEXTAUTH_URL`
- **Value:** tu URL de Vercel, ejemplo: `https://nova-lms.vercel.app`
  (La ves en Vercel → Project → Domains)
- Marca: ✅ Production ✅ Preview ✅ Development
- Click **Save**

---

## PASO 3 — Volver a desplegar (1 min)

1. En Vercel, click **Deployments** (arriba)
2. En el deploy que falló (rojo), click los **3 puntos ⋯**
3. Click **Redeploy**
4. Espera 2-3 minutos hasta que diga **Ready** ✅

---

## PASO 4 — Probar tu link público

Cuando termine, abre la URL que te da Vercel, por ejemplo:

**https://nova-lms.vercel.app**

Login de prueba:
- Email: `student@steminnovationacademy.org`
- Password: `nova2026`

---

## ¿Sigue fallando?

Manda captura del error. Lo más común:

| Error | Solución |
|-------|----------|
| DATABASE_URL not found | No guardaste la variable en Vercel — repite Paso 2 |
| Can't reach database | Revisa que la URL de Neon esté completa con `?sslmode=require` |
| Login no funciona | `NEXTAUTH_URL` debe ser exactamente tu URL de Vercel (con https://) |

---

## Mientras tanto — probar en tu PC

El LMS **sí funciona** en local:

**http://localhost:3000**

Mismo login: `student@steminnovationacademy.org` / `nova2026`
