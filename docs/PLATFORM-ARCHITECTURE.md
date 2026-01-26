# ONE-DNA™ Global Knowledge Platform

## Architectuur Documentatie

Versie: 1.0
Laatste update: Januari 2026

---

## 1. Platform Overzicht

Het ONE-DNA™ Knowledge Platform is ontworpen als een **globaal kennissysteem**, niet als een traditionele website. Het platform ondersteunt de positionering van ONE-DNA™ als systeemoplossing en versterkt de hoofdsite www.one-dna.com.

### Kernprincipes
- **Systeem-denken**: Alle content benadert ONE-DNA™ vanuit levenscyclus- en systeemperspectief
- **Anti-greenwashing**: Elke claim wordt onderbouwd met context, scope en beperkingen
- **Multi-taal**: Eén structuur, 8 talen (NL, EN, DE, SV, NO, ES, IT, PT)
- **Privacy-first**: GDPR-ready, cookie consent, regionale compliance

---

## 2. Mappenstructuur

```
/home/user/ONE-DNA/
├── index.html              # Homepage / Knowledge Platform entry
├── blog.html               # Inzichten / Artikelen
├── what-is-one-dna.html    # Wat is ONE-DNA™
├── solutions.html          # Oplossingen per doelgroep
├── policy.html             # Beleid & Inkoop
├── circularity.html        # Take-back & Circulariteit
├── specifications.html     # Technische specificaties
├── privacy.html            # Privacybeleid
├── cookies.html            # Cookiebeleid
├── terms.html              # Gebruiksvoorwaarden
├── disclaimer.html         # Disclaimer
│
├── css/
│   └── style.css           # Hoofd stylesheet
│
├── js/
│   ├── main.js             # Core JavaScript
│   └── translations.js     # Vertalingen (8 talen)
│
├── assets/
│   ├── images/
│   │   ├── one-dna-logo-dark.svg
│   │   └── one-dna-logo-white.svg
│   └── icons/
│
├── components/             # Herbruikbare HTML componenten
├── content/                # Content modules per taal/land
├── data/                   # JSON data bestanden
└── docs/                   # Documentatie
```

---

## 3. Navigatiestructuur

De verplichte top-level structuur (7 secties):

| Sectie | URL | Doel |
|--------|-----|------|
| Wat is ONE-DNA™ | `/what-is-one-dna.html` | Systeem uitleg, ontwerp principes |
| Oplossingen | `/solutions.html` | Per doelgroep/applicatie |
| Beleid & Inkoop | `/policy.html` | CMP, CSRD, EPR, aanbestedingen |
| Take-back & Circulariteit | `/circularity.html` | Take-back programma, verwerkingsroutes |
| Specificaties | `/specifications.html` | Technische data, bestekteksten |
| Inzichten | `/blog.html` | Artikelen, nieuws, analyses |
| Vind een Partner | Extern: `one-dna.com/changemakers` | Partner netwerk |

---

## 4. Content Systeem

### 4.1 Content Types

1. **Core Pages** - Evergreen kennis (wat, waarom, hoe)
2. **Audience Pages** - Per doelgroep (beleid, architecten, aannemers, retailers)
3. **Country Modules** - Regionale context (lokale regelgeving, partners)
4. **Evidence Objects** - EPD, LCA, tests, certificeringen
5. **Articles** - Inzichten, nieuws, analyses
6. **Specification Objects** - Bestekteksten, technische data

### 4.2 Verplichte Metadata per Content Object

```javascript
{
    "id": "unique-id",
    "type": "article|page|evidence|specification",
    "language": "nl|en|de|sv|no|es|it|pt",
    "country": "NL|BE|DE|...",  // optioneel
    "audience": ["policy", "architects", "developers"],
    "theme": ["circularity", "regulation", "technical"],
    "evidenceRefs": ["EPD-123", "LCA-456"],
    "lastReviewed": "2026-01-15",
    "contentOwner": "Team/Persoon"
}
```

---

## 5. Anti-Greenwashing Framework

### 5.1 Verplichte Structuur per Substantieve Pagina

Elke pagina met duurzaamheidsclaims MOET bevatten:

```html
<!-- Evidence Block Component -->
<section class="evidence-section">
    <div class="evidence-block">
        <h2>Onderbouwing & Context</h2>

        <!-- Wat het mogelijk maakt -->
        <div class="evidence-card evidence-enables">
            <h3>Wat ONE-DNA™ mogelijk maakt</h3>
            <ul>
                <li>Claim 1 met specifieke scope</li>
                <li>Claim 2 met specifieke scope</li>
            </ul>
        </div>

        <!-- Wat het NIET garandeert -->
        <div class="evidence-card evidence-limitations">
            <h3>Wat het niet garandeert</h3>
            <ul>
                <li>Beperking 1</li>
                <li>Beperking 2</li>
            </ul>
        </div>

        <!-- Certificeringen -->
        <div class="evidence-references">
            <h4>Certificeringen & Verificatie</h4>
            <div class="ref-badges">
                <span class="ref-badge">EPD Gecertificeerd</span>
                <!-- meer badges -->
            </div>
            <p class="evidence-note">
                * Disclaimer over implementatie-afhankelijkheid
            </p>
        </div>
    </div>
</section>
```

### 5.2 Taalgebruik Richtlijnen

| Niet gebruiken | Wel gebruiken |
|----------------|---------------|
| "100% circulair" | "Ontworpen voor circulariteit" |
| "Volledig duurzaam" | "Bijdragend aan duurzaamheidsdoelen" |
| "Gegarandeerd recyclebaar" | "Ontworpen voor recycleerbaarheid" |
| "Zonder milieu-impact" | "Met lagere milieu-impact volgens LCA" |

---

## 6. Schema.org Implementatie

### 6.1 Verplichte Schema Types

```html
<!-- Organization -->
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ONE-DNA™",
    "url": "https://www.one-dna.com",
    "logo": "...",
    "sameAs": [
        "https://www.instagram.com/onednaartificialgrass/",
        "https://www.linkedin.com/company/onednaartificialgrass/",
        "https://www.facebook.com/ONEDNA.artificialgrass"
    ]
}
</script>

<!-- WebPage (per pagina) -->
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Pagina Titel",
    "description": "Beschrijving",
    "isPartOf": { "@type": "WebSite", "url": "https://one-dna.cloud" }
}
</script>

<!-- Article (voor blog posts) -->
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Artikel Titel",
    "datePublished": "2025-12-01",
    "author": { "@type": "Organization", "name": "LimeGreen®" }
}
</script>
```

---

## 7. Meertaligheid

### 7.1 Vertaalsysteem

Vertalingen worden beheerd in `/js/translations.js`:

```javascript
const translations = {
    nl: {
        nav_what: "Wat is ONE-DNA™",
        nav_solutions: "Oplossingen",
        // ... meer keys
    },
    en: {
        nav_what: "What is ONE-DNA™",
        nav_solutions: "Solutions",
        // ...
    }
    // 6 andere talen
};
```

### 7.2 HTML Implementatie

```html
<h1 data-i18n="page_title">Standaard Nederlandse tekst</h1>
```

### 7.3 Nieuwe Vertaling Toevoegen

1. Voeg de key toe aan alle 8 talen in `translations.js`
2. Gebruik `data-i18n="key"` in HTML
3. Test in elke taal

---

## 8. Security

### 8.1 HTTP Headers (Server Configuratie)

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; frame-src https://www.youtube.com https://player.vimeo.com;
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

### 8.2 HTTPS

Alle pagina's MOETEN via HTTPS worden geserveerd.

---

## 9. Nieuwe Pagina Toevoegen

### Stap 1: Maak HTML bestand

Kopieer de template structuur met:
- Correcte `<head>` sectie met meta tags
- Schema.org markup
- Header component
- Main content met evidence blocks waar nodig
- Footer component

### Stap 2: Voeg navigatie toe

Update de navigatie in alle HTML bestanden.

### Stap 3: Vertalingen

Voeg alle benodigde vertalingen toe aan `translations.js`.

### Stap 4: Validatie

- Test in alle 8 talen
- Valideer Schema.org met Google Rich Results Test
- Test accessibility met WAVE of axe
- Controleer anti-greenwashing compliance

---

## 10. Onderhoud

### Maandelijks
- Review "lastReviewed" dates
- Check broken links
- Valideer certificering referenties

### Quarterly
- Regelgeving updates controleren
- Partner netwerk updates
- Performance audit (Core Web Vitals)

---

## Contact

Voor vragen over deze architectuur:
- Hoofdsite: [one-dna.com](https://www.one-dna.com)
- Contact: [one-dna.com/contact](https://www.one-dna.com/contact)

---

*Document versie 1.0 - Januari 2026*
*ONE-DNA™ is een geregistreerd handelsmerk van LimeGreen®*
