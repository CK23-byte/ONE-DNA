# ONE-DNA™ Scandinavia - Deployment Guide

## Overview

This is a static website for ONE-DNA™ targeting the Norwegian and Swedish markets.
It uses folder-based routing with `/no/` (Norwegian, default) and `/sv/` (Swedish).

## Folder Structure

```
/site
├── assets/
│   ├── css/
│   │   └── style.css       # Main stylesheet
│   ├── js/
│   │   └── site.js         # JavaScript for navigation & UX
│   ├── img/                # Product images, logos (add your files here)
│   └── docs/               # PDFs and documents (add your files here)
├── no/
│   └── index.html          # Norwegian landing page
├── sv/
│   └── index.html          # Swedish landing page
├── index.html              # Root redirector → /no/
├── 404.html                # Custom 404 page
├── robots.txt              # SEO robots configuration
├── sitemap.xml             # XML sitemap for search engines
├── vercel.json             # Vercel configuration
└── DEPLOY.md               # This file
```

## Deployment to Vercel

### Option 1: Via GitHub (Recommended)

1. Push this `/site` folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "New Project" and import your repository
4. Configure the project:
   - **Root Directory**: `site` (if in subfolder) or leave empty
   - **Framework Preset**: Other
   - **Build Command**: (leave empty - static site)
   - **Output Directory**: `.` or `site`
5. Click "Deploy"

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to site folder
cd site

# Deploy
vercel

# For production
vercel --prod
```

## Domain Configuration

After deployment, connect your custom domain:

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add `one-dna.cloud` (or your domain)
3. Configure DNS at your registrar (GoDaddy):
   - **A Record**: `@` → `76.76.21.21`
   - **CNAME**: `www` → `cname.vercel-dns.com`

## Adding Assets

### Images
Place product images and logos in `/assets/img/`:
- `one-dna-logo.svg` - Logo
- `one-dna-play-24.jpg` - Product image
- `one-dna-pure-pt-28.jpg` - Product image
- `og-image-no.jpg` - Open Graph image (1200x630px)
- `og-image-sv.jpg` - Open Graph image (1200x630px)
- `favicon.svg` - SVG favicon
- `favicon-32x32.png` - PNG favicon

### Documents
Place PDFs and documents in `/assets/docs/`:
- Product datasheets
- EPD certificates
- Technical specifications

## Video Configuration

To add the Vimeo video:

1. Get your Vimeo video ID and hash
2. Edit both `/no/index.html` and `/sv/index.html`
3. Replace `YOUR_VIDEO_ID` and `YOUR_HASH` in the video section:

```html
<div class="video-container" data-src="https://player.vimeo.com/video/123456789?h=abc123def&autoplay=0">
```

## Environment-Specific Notes

### Production Checklist

- [ ] Add product images to `/assets/img/`
- [ ] Add Open Graph images (1200x630px)
- [ ] Update Vimeo video ID
- [ ] Verify all external links work
- [ ] Test language switching
- [ ] Test on mobile devices
- [ ] Submit sitemap to Google Search Console
- [ ] Verify Schema.org markup with Google Rich Results Test

### Security Headers

The `vercel.json` file includes security headers:
- X-Content-Type-Options: nosniff
- X-Frame-Options: SAMEORIGIN
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

### Caching

Static assets in `/assets/` are cached for 1 year (immutable).
HTML pages have no cache headers by default.

## Troubleshooting

### 404 on refresh
The `vercel.json` configuration handles client-side routing.

### Images not loading
Ensure image paths start with `/assets/img/` (absolute paths).

### CSS not updating
Clear browser cache or add cache-busting query parameter.

## Contact

For technical questions:
- Main website: [one-dna.com](https://www.one-dna.com)
- Contact: [one-dna.com/contact](https://www.one-dna.com/contact)

---

*ONE-DNA™ is a registered trademark of LimeGreen®*
*Last updated: January 2026*
