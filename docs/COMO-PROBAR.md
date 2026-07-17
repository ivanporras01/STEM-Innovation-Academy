# Cómo probar NOVA LMS — Guía simple

## Link público (internet)

### https://stem-innovation-academy.vercel.app

---

## Login de prueba

Password para todas las cuentas: **`nova2026`**

| Rol | Email |
|-----|-------|
| Estudiante | student@steminnovationacademy.org |
| Mentor | mentor@steminnovationacademy.org |
| Admin | admin@steminnovationacademy.org |

---

## Qué probar (en orden)

1. **Homepage** — https://stem-innovation-academy.vercel.app
2. **Login** — https://stem-innovation-academy.vercel.app/login
3. **Dashboard estudiante** — después de login, deberías ver tus cursos y estadísticas
4. **Cursos** — https://stem-innovation-academy.vercel.app/courses
5. **Lección** — abre un curso → click en una lección → **Mark as Complete**
6. **Mentor** — cierra sesión → entra con mentor@steminnovationacademy.org
7. **Admin** — cierra sesión → entra con admin@steminnovationacademy.org

---

## En tu PC (local)

```bash
cd C:\Users\Laptop9\Documents\GitHub\STEM-Innovation-Academy
npm run dev
```

Abre: **http://localhost:3000**

> Si el puerto 3000 no funciona, mira la terminal: puede decir `3001` o `3002`. Usa ese número.

---

## NO uses esto para probar el LMS completo

| Archivo / link | Qué es |
|----------------|--------|
| `website/index.html` | Solo landing estática (sin login ni cursos) |
| GitHub repo | Solo código, no ejecuta la app |
| GitHub Pages | Solo README |

---

## Si ves errores en localhost (pantalla roja / webpack)

Eso pasa cuando hay servidores viejos corriendo. Haz esto:

```bash
cd C:\Users\Laptop9\Documents\GitHub\STEM-Innovation-Academy
npm run dev:clean
```

Espera `✓ Ready` y abre **http://localhost:3000/login**

---

## Si el login no funciona en Vercel

En Vercel → Settings → Environment Variables, verifica:

| Variable | Valor correcto |
|----------|----------------|
| `NEXTAUTH_URL` | `https://stem-innovation-academy.vercel.app` |
| `AUTH_SECRET` | cualquier texto largo (ej: `nova-stem-innovation-academy-secret-2026`) |
| `DATABASE_URL` | tu URL de Neon (`postgresql://...`) |

Después: **Deployments** → **⋯** → **Redeploy**
