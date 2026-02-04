/**
 * ONE-DNA™ Chatbot API Endpoint
 * Vercel Serverless Function
 *
 * This endpoint proxies requests to OpenAI, keeping the API key secure server-side.
 * Environment variable required: OPENAI_API_KEY
 */

// Site Knowledge Base - All information the bot can use
const SITE_KNOWLEDGE = `
# ONE-DNA™ Kennisplatform - Volledige Kennisbank

## Over ONE-DNA™
ONE-DNA™ is 's werelds eerste 100% mono-materiaal kunstgras, geproduceerd door LimeGreen® B.V. in Oldenzaal, Nederland.

### Unieke Kenmerken:
- 100% polyethyleen (PE) - zowel vezels als backing
- Geen latex of polyurethaan coating nodig
- Thermofixatie in plaats van droogovens
- Tot 60% lagere CO₂-uitstoot in productie (EPD-gecertificeerd, scope A1-A3)
- Ontworpen voor recycleerbaarheid

## Technologie

### Het Probleem met Traditioneel Kunstgras:
- Polypropyleen (PP) backing + PE vezels + latex coating = multi-materiaal
- Droogovens van 120 meter lang en 5 meter breed nodig
- Indirecte warmteoverdracht: enorme energiebehoefte
- Materialen niet meer te scheiden aan einde levensduur

### De ONE-DNA™ Oplossing:
- PE vezels + PE backing = één materiaalstroom (mono-materiaal)
- Thermofixatie met verhitte wals van 1 meter doorsnee
- Directe warmteoverdracht: lokale energie-input
- Geen coating, geen droogoven nodig
- Mechanische recycling mogelijk zonder scheiding

### Impact:
- Tot 60% lagere productie-uitstoot (A1-A3 scope)
- Percentage varieert per producttype
- Geverifieerd via EPD-certificering

## Circulariteit & Take-back Systeem

### Belangrijk:
- Take-back is een MOGELIJKHEID, geen recht
- Deelname vereist registratie bij aanschaf
- Regionale voorwaarden zijn van toepassing

### 7-Stappen Journey:
1. Registratie - Installatie registreren met unieke ID
2. Certificaten - Productcertificaten en EPD ontvangen
3. Materiaal Identiteit - QR-code voor tracking
4. Gebruik - Onderhoud en monitoring
5. End-of-Life - Take-back aanvraag indienen
6. Inzamelpunt - Transport naar regionaal punt
7. Verwerking - Mechanische recycling

### Scope - Wat WEL:
- ONE-DNA™ kunstgras
- Geregistreerde installaties
- Binnen netwerk Changemakers
- Normale slijtage

### Scope - Wat NIET:
- Traditioneel multi-materiaal kunstgras
- Niet-geregistreerde installaties
- Infill materialen (apart verwerken)
- Contaminatie met andere materialen

### Partners (Changemakers):
- Gecertificeerde installateurs
- Regionale inzamelpunten
- Verwerkingspartners
- Beschikbaarheid varieert per regio

## Certificaten & Documentatie

### Algemene Certificaten (op aanvraag):
1. Circulariteitsrapport - Take-back data en materiaalstromen
2. Leaching Test - Uitloging analyse (zware metalen, organische verbindingen)
3. REACH Verklaring - EU compliance chemische stoffen

### Productcertificaten (beschikbaar):
1. Valhoogte Testrapport - EN 1177, per systeemconfiguratie
2. EPD Certificaat - ISO 14025, EN 15804 (scope A1-A3, C1-C4, Module D)
3. Brandveiligheid - EN 13501-1 classificatie
4. Bestekteksten - RAW en STABU compatible
5. Technische Datasheets - Specificaties per product

### Belangrijke Context:
- Certificaten zijn momentopnames
- Testomstandigheden wijken af van praktijk
- EPD's vergelijken vereist identieke systeemgrenzen
- "Recyclebaar" ≠ daadwerkelijke recycling

## Praktische Informatie

### Installatie Tips:
1. Acclimatiseren - Min. 2 uur voor installatie
2. Rolrichting - Alle rollen zelfde vezelrichting
3. Weer - Droog, >5°C voor verlijmen
4. Lijm - Gelijkmatige applicatie met getande spatel
5. Infill - In lagen aanbrengen, borstelen na elke laag
6. Documenteren - Foto's van elke fase maken

### Veelgestelde Vragen:
- Minimale temperatuur verlijmen: 5°C
- Infill hoeveelheid: zie productspecifieke datasheet
- Over bestaand gras: NIET aanbevolen
- Installatietijd sportveld: 5-7 werkdagen (ca. 7.000 m²)
- Garantie: alleen bij gecertificeerde installatie

## PFAS Statement
- Geen intentioneel toegevoegde PFAS in productie
- Getest conform gangbare analysemethoden
- Achtergrondniveaus kunnen niet volledig worden uitgesloten

## Contact & Bedrijfsinfo
- Bedrijf: LimeGreen® B.V.
- Adres: Textielstraat 14, 7575 CA Oldenzaal, Nederland
- E-mail: info@one-dna.com
- Telefoon: +31 (0) 541 21 79 00
- Website: www.one-dna.com (commercieel)
- Kennisplatform: support.one-dna.com

## Pagina Navigatie
- Home: index.html - Overzicht kennisplatform
- Technologie: products.html - Productieproces en impact
- Circulariteit: circularity.html - Take-back systeem en partners
- Certificaten: documentation.html - Alle certificeringen
- Praktijk: praktijk.html - Installatie video's en tips
- Inzichten: blog.html - Artikelen over CMP, regelgeving

## Regelgeving Context
- CMP (Circulair Materialen Plan) - EU regelgeving
- CSRD - Corporate Sustainability Reporting Directive
- EPR - Extended Producer Responsibility
- REACH - EU chemische stoffen verordening
`;

// System prompt for the AI
const SYSTEM_PROMPT = `Je bent de ONE-DNA™ Kennisplatform Assistent. Je helpt bezoekers met vragen over ONE-DNA kunstgras, circulariteit, certificaten en installatie.

BELANGRIJKE REGELS:
1. Gebruik ALLEEN informatie uit de kennisbank hieronder. Verzin NOOIT informatie.
2. Als je iets niet weet, zeg dan eerlijk: "Die informatie heb ik niet beschikbaar. Neem contact op met info@one-dna.com"
3. Wees beknopt maar volledig. Gebruik bullet points waar nuttig.
4. Verwijs naar relevante pagina's wanneer gepast (bijv. "Zie de Technologie pagina voor meer details").
5. Gebruik een professionele maar vriendelijke toon.
6. Bij commerciële vragen, verwijs naar www.one-dna.com
7. Antwoord in het Nederlands tenzij anders gevraagd.
8. Houd antwoorden kort en bondig - max 3-4 alinea's.

ANTI-GREENWASHING:
- Wees eerlijk over beperkingen
- "Recyclebaar" betekent ontworpen voor recycling, niet dat het automatisch gebeurt
- Take-back is een mogelijkheid, geen garantie
- Percentages (zoals 60% CO₂ reductie) variëren per product

${SITE_KNOWLEDGE}`;

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // Handle preflight request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Check for API key
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        console.error('OPENAI_API_KEY not configured');
        return res.status(500).json({ error: 'Server configuration error' });
    }

    try {
        const { messages } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: 'Messages array required' });
        }

        // Build full messages array with system prompt
        const fullMessages = [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages.slice(-10) // Keep last 10 messages for context
        ];

        // Call OpenAI API
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: fullMessages,
                max_tokens: 500,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('OpenAI API error:', error);
            return res.status(response.status).json({
                error: error.error?.message || 'API request failed'
            });
        }

        const data = await response.json();

        return res.status(200).json({
            message: data.choices[0].message.content,
            usage: data.usage
        });

    } catch (error) {
        console.error('Chat API error:', error);
        return res.status(500).json({
            error: 'Er is een fout opgetreden. Probeer het later opnieuw.'
        });
    }
}
