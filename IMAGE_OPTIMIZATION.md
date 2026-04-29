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
