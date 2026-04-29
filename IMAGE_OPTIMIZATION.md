# Optimizacion de Imagenes (Astro + WebP)

Esta guia explica como funciona la optimizacion de imagenes del proyecto y como agregar nuevas imagenes sin romper el build (incluyendo Cloudflare Pages).

## Resumen rapido

- El proyecto usa un script con `sharp` para convertir `png/jpg/jpeg` a `webp`.
- Comando: `npm run optimize:images`
- El script recorre carpetas especificas y crea archivos `.webp` junto al archivo original.
- Luego debes apuntar el codigo/frontmatter al nuevo `.webp`.

## Carpetas que optimiza el script

El script actual (`scripts/optimize-images.mjs`) procesa estas rutas:

- `public/products` (catalogo de productos)
- `public/courses` (imagenes de cursos)
- `src/assets/banner`
- `src/assets/mouthwashers`
- `src/assets` (logos y otros assets, con exclusiones internas para no reprocesar subcarpetas ya tratadas)

Si guardas una imagen fuera de esas carpetas, el script no la convertira.

## Flujo recomendado para agregar nuevas imagenes

## 1) Agregar imagen original

Coloca tu imagen fuente (`.png`, `.jpg` o `.jpeg`) en la carpeta correcta:

- Producto nuevo: `public/products/<marca>/mi-producto.png`
- Curso nuevo: `public/courses/mi-curso.jpg`
- Banner/logo/otros assets importados: en `src/assets/...`

## 2) Ejecutar conversion

Desde la raiz del proyecto:

```bash
npm run optimize:images
```

Esto creara el archivo `.webp` correspondiente.

Ejemplo:

- `public/products/importho/brackets-x.png`
- se convierte a `public/products/importho/brackets-x.webp`

## 3) Actualizar referencias en codigo/content

Muy importante: convertir el archivo no alcanza, tambien debes cambiar referencias.

- **Productos y cursos en Content Collections** (`src/content/**/*.md`):
  - actualizar `img:` para usar `.webp`
  - ejemplo: `img: /products/importho/brackets-x.webp`
- **Assets importados en componentes/paginas** (`src/**/*.astro`, `src/**/*.tsx`):
  - cambiar import de `.png/.jpg` a `.webp`
  - ejemplo: `import banner from "@/assets/banner/banner-2.webp";`

## 4) (Opcional pero recomendado) eliminar original pesado

Cuando verifiques que todo funciona, elimina el `.png/.jpg` antiguo para no inflar el repo ni el deploy.

## 5) Validar antes de subir

```bash
npm run build
```

Si compila bien, ya puedes commit/push.

## Respuesta corta a tu duda

> "Tendria que solo colocar las imagenes en public y correr el script?"

Casi: para **productos/cursos** si, pero faltan dos pasos clave:

1. Cambiar las referencias `img:` o imports a `.webp`.
2. Correr `npm run build` para validar.

Si solo conviertes y no actualizas referencias, la app puede seguir buscando `.png/.jpg`.

## Buenas practicas para UX en internet lento

- Mantener `loading="lazy"` en listados/carruseles.
- Usar `loading="eager"` solo en imagen principal above-the-fold.
- Mantener `decoding="async"`.
- Evitar subir fuentes gigantes; idealmente ya recortadas al tamaño visual final.

## Cloudflare Pages (para evitar problemas)

- Usar una sola herramienta de paquetes (recomendado `pnpm`) para builds consistentes.
- Configuracion sugerida:
  - Build command: `pnpm install --frozen-lockfile && pnpm run build`
  - Output directory: `dist`
  - Node version: `20` o superior (recomendado `20.11+`)
- Este repo usa lockfile de `pnpm` v9. Si Cloudflare usa `pnpm` v8, puede ignorar el lockfile y descargar versiones distintas.
- Para evitar eso, el proyecto declara:
  - `packageManager: pnpm@9.15.5` en `package.json`
  - `engines.node >= 20.10.0`
  - `.nvmrc` en Node 20
- Si hubo fallo raro de cache, usar "Clear build cache" y redeploy.

## Troubleshooting rapido

- **No se genero `.webp`**:
  - verifica que el archivo sea `.png/.jpg/.jpeg`
  - verifica que este dentro de una carpeta incluida por el script
- **La pagina sigue mostrando imagen vieja**:
  - revisa que el `img:`/import ya apunte a `.webp`
  - limpia cache del navegador
- **Build falla en CI/Cloudflare**:
  - confirmar version de Node
  - confirmar version de pnpm (que respete lockfile v9)
  - confirmar comando de build
  - limpiar cache del build

- **Error `node:util does not provide an export named styleText`**:
  - causa comun: dependencias nuevas instaladas por lockfile ignorado + Node 18
  - solucion: subir Node a 20+, asegurar `pnpm` v9, limpiar cache y redeploy

- **Error `ERR_PNPM_OUTDATED_LOCKFILE` con `--frozen-lockfile`**:
  - causa: `package.json` cambio (ej. version de `sharp`) pero `pnpm-lock.yaml` no se commiteo actualizado
  - solucion local: `pnpm install` (o `CI=true pnpm install --lockfile-only` si solo quieres sincronizar lockfile), commit de `pnpm-lock.yaml`, push

---

## Para otros agentes (AI / contribuidores)

Contexto minimo del repo:

- **Astro 5** + **Tailwind** + **React** en algunos componentes.
- Imagenes del catalogo viven en `public/products/...` y `public/courses/...`; las rutas en markdown son URLs publicas (`img: /products/...`).
- Componentes que muestran imagenes: `src/components/product/preview.astro`, `src/pages/[productId].astro`, `src/components/Carousel.tsx`, etc.
- Script de conversion: `scripts/optimize-images.mjs` / `npm run optimize:images`.
- Deploy estatico a **Cloudflare Pages**; salida `dist`.

Reglas utiles al tocar imagenes:

1. No dejar referencias a `.png/.jpg` si ya existe `.webp` y es la que se usa en produccion.
2. Tras cambiar `package.json` (dependencias), **siempre** regenerar y commitear `pnpm-lock.yaml`.
3. Preferir **pnpm** en CI; no mezclar `npm install` en el servidor si el lockfile es de pnpm.

### Checklist: nuevo producto (imagen + contenido)

1. Crear `src/content/products/<slug>.md` con frontmatter valido (`title`, `price`, `img`, `brand`, `name`, etc. segun `src/content/config.ts`).
2. Colocar imagen fuente en `public/products/<marca>/<archivo>.png` (o jpg).
3. `npm run optimize:images`
4. En el `.md`, `img:` debe apuntar al `.webp` generado (misma ruta, extension `.webp`).
5. `pnpm run build` o `npm run build` localmente.
6. Commit de archivos nuevos + lockfile si hubo cambios de deps.

### Checklist: nuevo curso

1. Crear `src/content/courses/<slug>.md` con `img:` apuntando a la ruta final en `public/courses/`.
2. Imagen en `public/courses/...`
3. `npm run optimize:images` + actualizar `img:` a `.webp`
4. Si el curso aparece en home/carousel, revisar `src/pages/index.astro` y colecciones que mapean `courses`.

### Checklist: banner, logos, mouthwashers u otros `src/assets`

1. Colocar archivo en la carpeta correcta (`src/assets/banner`, `src/assets/mouthwashers`, etc.).
2. `npm run optimize:images`
3. Actualizar **imports** en `.astro` / `.tsx` al `.webp`.
4. Si la carpeta nueva **no** esta en `TARGETS` de `scripts/optimize-images.mjs`, agregarla alli o documentar conversion manual.

### Extender el script a una carpeta nueva

Editar `TARGETS` en `scripts/optimize-images.mjs` con `{ dir: "ruta/relativa", maxWidth: N, quality: Q }`. Valores orientativos: productos ~1200px ancho max, banners ~1920.

---

## Deploy en Cloudflare Pages (referencia completa)

### Ajustes en el dashboard (Build)

| Campo | Valor recomendado |
|-------|-------------------|
| Framework preset | **Astro** (o None si prefieres explicito) |
| Build command | `pnpm install --frozen-lockfile && pnpm run build` |
| Build output directory | `dist` (sin barra inicial) |
| Root directory | vacio (raiz del repo) |

### Variables de entorno (Settings > Environment variables)

Incluir al menos para **Production** (y Preview si aplica):

| Variable | Ejemplo | Motivo |
|----------|---------|--------|
| `NODE_VERSION` | `20.11.1` | Astro/toolchain modernos; evita errores como `styleText` en Node 18 |
| `PNPM_VERSION` | `9.15.5` | Lockfile `pnpm` v9; evita que Pages use pnpm 8 e ignore el lockfile |

El repo tambien declara `packageManager` y `engines` en `package.json` y `.nvmrc` para alinear versiones.

### Que revisar en el log de build (exitoso)

- `Detected ... nodejs@20.x` y `pnpm@9.x`
- **No** debe aparecer: `Ignoring not compatible lockfile`
- `pnpm install` completa sin `ERR_PNPM_OUTDATED_LOCKFILE`
- `astro build` termina sin errores

### Si el deploy falla despues de cambiar dependencias

1. Localmente: `pnpm install` y commit de `pnpm-lock.yaml`.
2. Push y redeploy.
3. Opcional: **Clear build cache** en Cloudflare y volver a desplegar.

### URLs del sitio y secrets

Las URLs de redes (`FACEBOOK_URL`, `WHATSAPP_URL`, etc.) suelen ir como variables en Pages; no estan en este documento por seguridad. Mantenerlas igual entre entornos salvo que necesites valores distintos por preview.
