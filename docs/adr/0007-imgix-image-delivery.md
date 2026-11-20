# Serve images from Prismic's imgix CDN

Images are rendered with `asImageSrc`/`asImageWidthSrcSet` (responsive `srcset` + `sizes`, lazy loading) directly from Prismic's CDN. No build-time image optimization, keeping builds fast and letting the CDN handle resizing.
