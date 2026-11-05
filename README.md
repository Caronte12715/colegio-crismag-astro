# Colegio Crismag — Sitio web institucional

Sitio web del **Colegio Cristiano Profa. Martha Garay de Castillo (Crismag)**, ubicado en San Miguel, El Salvador.

**Sitio web:** https://colegiocrismag.com

## ¿Qué incluye?

- Presentación del colegio, su filosofía y su oferta educativa.
- Secciones para parvularia, ciclos educativos y bachillerato.
- Noticias y eventos cargados desde archivos Markdown y ordenados por fecha.
- Información de contacto, formulario de consultas y mapa de ubicación.
- Páginas organizadas mediante Astro y una plantilla de diseño compartida.

## Tecnologías

- **Astro 5** para la construcción del sitio.
- **HTML y CSS** para estructura y presentación.
- **Markdown** para contenido de noticias.
- **@astrojs/sitemap** para generar el mapa del sitio.
- **Sharp** como dependencia de desarrollo para el procesamiento de imágenes.

## Ejecutar localmente

Requisitos: Node.js y npm compatibles con la versión de Astro del proyecto.

```bash
npm install
npm run dev
```

Abrir la dirección local que muestre la terminal (habitualmente `http://localhost:4321`).

Para generar y revisar la versión de producción:

```bash
npm run build
npm run preview
```

**Nota:** el comando de compilación ejecuta previamente `scripts/compress-images.js` para procesar imágenes.

## Organización general

- `src/pages/`: páginas y noticias del sitio.
- `src/layouts/`: plantillas compartidas.
- `public/`: recursos estáticos.
- `scripts/`: tareas auxiliares del proyecto.

## Sobre el proyecto

Este repositorio forma parte del portafolio de desarrollo web de David Guevara. Se utilizan herramientas de inteligencia artificial como apoyo para tareas de implementación, revisión y resolución de problemas.

> La información institucional y los datos de contacto del sitio pertenecen al colegio. Para cambios de contenido, verificar previamente su vigencia.
