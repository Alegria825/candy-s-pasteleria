# Candy’s Pastelería: landing page

Landing mobile first hecha con [Astro](https://astro.build). Tiene dos diseños intercambiables, carrito que arma el mensaje de WhatsApp, y datos separados del diseño.

## Arrancar

```bash
npm install
npm run dev        # http://localhost:4321
```

Rutas: `/` (diseño elegido), `/propuesta-4` (Chocolate y Merengue), `/propuesta-5` (Cacao Nocturno).
La barra negra superior permite cambiar entre propuestas.

## Cambiar de diseño

Edita `design.config.mjs`:

- `design`: qué diseño se muestra en `/`.
- `showSwitcher`: `false` oculta la barra superior (hazlo al publicar).

## Dónde editar

| Qué | Dónde |
|---|---|
| Número de WhatsApp, dirección, horario, redes, menú | `src/data/site.ts` |
| Sabores del menú | `src/data/sabores.ts` |
| Rebanadas, postres, cupcakes, galletas | `src/data/antojos.ts` |
| Preguntas frecuentes | `src/data/faq.ts` |
| Testimonios | `src/data/testimonios.ts` |
| Fotos | `src/assets/images/` (se optimizan solas a WebP) |
| Colores y tipografías | `src/designs/<diseño>/styles.css` (variables en `:root`) |
| Estructura de cada sección | `src/designs/<diseño>/*.astro` |
| Lógica del carrito y mensaje de WhatsApp | `src/lib/cart.ts`, `src/lib/whatsapp.ts` |

## Pendientes antes de publicar

- Reemplazar el WhatsApp inventado en `site.ts`.
- Completar los marcadores `[POR CONFIRMAR]` (horario, anticipo, pagos, tamaños, testimonios).
- Fotos originales de rebanadas, postres, cupcakes y galletas (hoy son recortes del collage) y logo en PNG transparente o SVG.
- Confirmar la ciudad del mapa (`ciudad` y `mapsUrl` en `site.ts`).

## Publicar

```bash
npm run build      # genera /dist
```

En Cloudflare Pages o Netlify: comando `npm run build`, carpeta de salida `dist`. Cada rama de Git genera un enlace de vista previa para que la dueña revise los cambios.

`npm run format` ordena el código con Prettier.
