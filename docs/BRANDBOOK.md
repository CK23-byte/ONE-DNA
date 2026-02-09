# ONE-DNA™ Kennisplatform Brandbook

Dit document beschrijft de visuele en tekstuele richtlijnen voor het ONE-DNA™ Kennisplatform, gebaseerd op neuro-copywriting principes.

---

## 1. Typografie Hiërarchie

| Element | Grootte (Mobile) | Grootte (Desktop) | Gewicht | Kleur | Toepassing |
|---------|------------------|-------------------|---------|-------|------------|
| **H1** | 2rem (32px) | 3.5rem (56px) | 800 (Extra Bold) | `#2f3f45` (donkergrijs) | Pagina hero titels, één per pagina |
| **H2** | 1.5rem (24px) | 2.5rem (40px) | 700 (Bold) | `#265149` (primary groen) | Sectie titels, hoofdvragen |
| **H3** | 1.25rem (20px) | 1.5rem (24px) | 700 (Bold) | `#265149` (primary groen) | Card titels, subsecties |
| **H4** | 1.125rem (18px) | 1.125rem (18px) | 600 (Semi Bold) | `#2f3f45` (donkergrijs) | Labels, kleine koppen |
| **Body** | 1rem (16px) | 1rem (16px) | 400 (Regular) | `#5a6a70` (text-light) | Lopende tekst |
| **Small** | 0.875rem (14px) | 0.875rem (14px) | 400 | `#7a8a90` (muted) | Bijschriften, metadata |

**Font Family:** Montserrat (Google Fonts)
**Line Height:** 1.2 voor headings, 1.6-1.7 voor body text

### Highlight Spans

```html
<h1>Vraag of statement<br><span class="highlight">Emotioneel kernpunt</span></h1>
```

De `.highlight` class geeft de tekst de primary groene kleur (`#265149`).

---

## 2. Kleurenpalet

| Naam | HEX | CSS Variable | Toepassing |
|------|-----|--------------|------------|
| **Primary** | `#265149` | `--color-primary` | H2, H3 koppen, CTA buttons, accenten, links |
| **Primary Dark** | `#1d3f39` | `--color-primary-dark` | Hover states |
| **Secondary** | `#569e82` | `--color-secondary` | Overtitles, badges, secundaire accenten |
| **Text** | `#2f3f45` | `--color-text` | H1, H4, body tekst |
| **Text Light** | `#5a6a70` | `--color-text-light` | Lead tekst, beschrijvingen |
| **Text Muted** | `#7a8a90` | `--color-text-muted` | Bijschriften, hints |
| **Background** | `#ffffff` | `--color-background` | Primaire achtergrond |
| **Background Alt** | `#f2f0eb` | `--color-background-alt` | Sectie achtergrond (afwisselend) |
| **Border** | `#e0e0e0` | `--color-border` | Card borders, dividers |
| **Success** | `#10b981` | `--color-success` | Positieve indicatoren (checkmarks) |
| **Warning** | `#f59e0b` | `--color-warning` | Waarschuwingen, nuances |
| **Error** | `#ef4444` | `--color-error` | Foutmeldingen |

---

## 3. Spacing Systeem (8px grid)

| Variable | Waarde | Toepassing |
|----------|--------|------------|
| `--spacing-4` | 1rem (16px) | Kleine padding, gaps |
| `--spacing-6` | 1.5rem (24px) | Card padding, kleine marges |
| `--spacing-8` | 2rem (32px) | Grid gaps, medium marges |
| `--spacing-10` | 2.5rem (40px) | Intro margin-bottom |
| `--spacing-12` | 3rem (48px) | Sectie intro naar content |
| `--spacing-16` | 4rem (64px) | Compacte sectie padding |
| `--spacing-20` | 5rem (80px) | **Standaard sectie padding** |

### Regel
Secties gebruiken `padding: var(--spacing-20) 0` voor voldoende ademruimte tussen blokken.

---

## 4. Componenten

### Buttons

```css
/* Primary Button */
.btn-primary {
    background: var(--color-primary);  /* #265149 */
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
}

/* Secondary Button */
.btn-secondary {
    background: transparent;
    border: 2px solid var(--color-primary);
    color: var(--color-primary);
}

/* Outline Button */
.btn-outline {
    background: transparent;
    border: 1px solid var(--color-border);
    color: var(--color-text);
}
```

### Cards

**Solution/Complexity Card:**
```css
.card {
    padding: 1.5rem;
    background: white;
    border-radius: 12px;
    border-left: 4px solid var(--color-primary);
    box-shadow: 0 4px 6px rgba(0,0,0,0.07);
}
```

**Evidence Card (Wel/Niet):**
- Groene border-left (`#265149`) voor "Dit kan wel"
- Oranje border-left (`#f59e0b`) voor "Dit kan (nog) niet"

### Section Labels

```css
.section-label {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--color-primary);
    background: rgba(38, 81, 73, 0.1);
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
}
```

---

## 5. Sectie Structuur

```
┌─────────────────────────────────────────────┐
│  SECTIE (padding: 5rem 0)                   │
│                                             │
│  ┌─ INTRO (max-width: 800px) ────────────┐  │
│  │  [Section Label]                       │  │
│  │  H2: Vraag of statement               │  │
│  │  Lead: Uitleg in 2-3 zinnen           │  │
│  └────────────────── margin-bottom: 3rem ┘  │
│                                             │
│  ┌─ GRID (2 kolommen op desktop) ────────┐  │
│  │  [Card] [Card]                        │  │
│  │  [Card] [Card]                        │  │
│  └───────────────────────────────────────┘  │
│                                             │
│  ┌─ NOTE (optioneel) ────────────────────┐  │
│  │  Belangrijke nuance of disclaimer      │  │
│  └───────────────────────────────────────┘  │
│                                             │
│  [CTA Buttons]                              │
└─────────────────────────────────────────────┘
```

---

## 6. Neuro-Copywriting Principes

### Why-How-What Flow (Golden Circle)

1. **WHY (Emotie):** Begin met het probleem/pijn → "Waarom belandt kunstgras in de verbrandingsoven?"
2. **HOW (Logica):** Leg de oplossing uit → "Wat als scheiding niet meer nodig is?"
3. **WHAT (Bewijs):** Toon certificeringen en feiten → "Elke claim is geverifieerd"

### Headline Formules

| Type | Voorbeeld | Effect |
|------|-----------|--------|
| **Vraag-gebaseerd** | "Weet jij zeker dat...?" | Triggert onzekerheid |
| **Wat-als** | "Wat als [probleem] niet meer nodig is?" | Opent mogelijkheden |
| **Contrast** | "Niet [claim], maar [realiteit]" | Bouwt vertrouwen |

### Tone of Voice

- **Jij/Je** in plaats van U (persoonlijk, direct)
- Actieve zinnen (niet passief)
- Korte paragrafen (max 3 zinnen)
- Bullet points voor opsommingen
- **Transparant over beperkingen** → anti-greenwashing

### Interpunctie

- **NOOIT em dashes (—) gebruiken** in teksten
- Gebruik in plaats daarvan: dubbele punt (:), komma (,), of punt (.) gevolgd door nieuwe zin
- Voorbeeld fout: "Vezels, backing én coating — alles is hetzelfde materiaal"
- Voorbeeld goed: "Vezels, backing én coating: alles is hetzelfde materiaal"

### Card Copy Structuur

```
H3: Korte, krachtige stelling (max 6 woorden)
P: Één zin uitleg met concrete details
```

---

## 7. Afwisseling Achtergronden

| Sectie | Achtergrond |
|--------|-------------|
| Hero | Video/gradient overlay |
| Start hier (Role Selection) | `#f2f0eb` (alt) |
| Probleem | `#ffffff` (wit) |
| Oplossing | `#f2f0eb` (alt) |
| Transparantie | `#f2f0eb` (alt) |
| Certificeringen | `#ffffff` (wit) |
| Explore | `#265149` (primary dark) |
| AI Assistant | `#f2f0eb` (alt) |

---

## 8. Responsieve Breakpoints

| Breakpoint | Pixels | Toepassing |
|------------|--------|------------|
| **Mobile** | < 768px | 1 kolom, kleinere headings |
| **Tablet** | 768px - 1023px | 2 kolommen |
| **Desktop** | ≥ 1024px | Volledige grootte, max-width 1200px |

---

## 9. Pagina Templates

### Homepage Flow

1. **Video Hero** - Emotionele vraag + CTA
2. **Role Selection** - "Start hier" cards per doelgroep
3. **Problem Section** - Waarom het probleem bestaat
4. **Solution Section** - ONE-DNA als antwoord
5. **Transparency Section** - Wel/niet kunnen waarmaken
6. **Certifications** - Bewijs en downloads
7. **Explore Section** - Verdere verdieping
8. **AI Assistant** - Chat ondersteuning

### Subpagina Flow

1. **Hero** - Breadcrumb + emotionele vraag
2. **Video/Visual** - Uitleg content
3. **Problem Context** - Achtergrond
4. **Solution Details** - Specifieke oplossing
5. **Evidence/Specs** - Technische details
6. **CTA Section** - Volgende stappen

---

## 10. Anti-Greenwashing Richtlijnen

1. **Nooit "100% recyclebaar" zonder nuance** - altijd context geven over infrastructuur
2. **Certificeringen tonen** - EPD, ISO referenties
3. **Beperkingen benoemen** - "Dit kunnen wij (nog) niet garanderen"
4. **Derden-verificatie** - geen eigen claims zonder onafhankelijke bevestiging
5. **Geografische nuance** - beschikbaarheid verschilt per regio

---

*Laatste update: Februari 2026*
