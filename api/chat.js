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
ONE-DNA™ is 's werelds eerste 100% mono-materiaal kunstgras, geproduceerd in Oldenzaal, Nederland.

### Unieke Kenmerken:
- 100% polyethyleen (PE) - zowel vezels als backing
- Geen latex of polyurethaan coating nodig
- Thermofixatie in plaats van droogovens
- Tot 60% lagere CO₂-uitstoot in productie (EPD-gecertificeerd, scope A1-A3)
- Ontworpen voor recycleerbaarheid

## Productlijnen

### ONE-DNA™ Landscaping (Siertuin):
- Vista 30 - ECI: €0.38/m², CFL-S1 brandclassificatie
- Vista 27 - ECI: €0.38/m², BFL-S1 brandclassificatie
- Elan 35 - ECI: €0.77/m², CFL-S1 brandclassificatie
- Orion 40 - ECI: €0.80/m², CFL-S1 brandclassificatie
- Velvet 40 - CFL-S1 brandclassificatie

### ONE-DNA™ Play (Speeltuinen):
- Play 24 - ECI: €0.38/m², CFL-S1, met valhoogte certificering (EN 1177)
- Pure PT Play 28 - BFL-S1 brandclassificatie, tot 51% gerecycled materiaal

### ONE-DNA™ Multisport:
- Matrix 35 - voor multifunctionele sportvelden

### ONE-DNA™ Event & Indoor:
- Elan 35 - CFL-S1, geschikt voor evenementen
- Vista 30 - BFL-S1, geschikt voor beurzen en indoor

### ONE-DNA™ Padel:
- Padel TX - BFL-S1, speciaal voor padelbanen

## Downloadbare Documenten (one-dna.com)

### EPD Certificaten (Environmental Product Declaration):
- Vista 30: https://one-dna.com/wp-content/uploads/2023/12/MRPI_EPD-ONE-DNA™-Vista-30.pdf
- Vista 27: Deelt EPD met Vista 30
- Elan 35: https://one-dna.com/wp-content/uploads/2023/12/MRPI_EPD-ONE-DNA™-Elan-35.pdf
- Orion 40: https://one-dna.com/wp-content/uploads/2023/12/MRPI_EPD-ONE-DNA™-Orion-40.pdf
- Play 24: EPD-ONE-DNA™-Play24.pdf (beschikbaar via productpagina)

### Brandveiligheid Certificaten (BFL-S1 / CFL-S1):
- Vista 30: https://one-dna.com/wp-content/uploads/2023/12/VISTA-30-10KG-INFILL-Bfl-S1.pdf
- Elan 35: https://one-dna.com/wp-content/uploads/2023/12/ELAN-35-NO-INFILL-Bfl-S1.pdf
- Orion 40: https://one-dna.com/wp-content/uploads/2023/12/ORION-40-15-KG-INFILL-Bfl-S1.pdf
- Play 24: PLAY-24-25KG-INFILL-Bfl-S1.pdf (beschikbaar via productpagina)

### Valhoogte Certificaten (NEN-EN 1177:2018):
- Play 24: Valhoogte testrapport beschikbaar - geschikt voor speeltoestellen

### Product Passports:
- Vista: https://one-dna.com/wp-content/uploads/2023/12/Product-Passport-ONE-DNA™-Vista.pdf
- Elan: https://one-dna.com/wp-content/uploads/2023/12/Product-Passport-ONE-DNA™-Elan.pdf
- Orion: https://one-dna.com/wp-content/uploads/2023/12/Product-Passport-ONE-DNA™-Orion.pdf
- Play: https://one-dna.com/wp-content/uploads/2023/12/Product-Passport-ONE-DNA™-Play.pdf

### Technische Datasheets:
- Vista 30: https://one-dna.com/wp-content/uploads/2023/12/Specsheet-ONE-DNA-Vista-30-TF-ENG-vs2-3.pdf
- Vista 27: https://one-dna.com/wp-content/uploads/2023/10/Specsheet-ONE-DNA-Vista-27-TF-ENG-vs2_01.pdf
- Elan 35: https://one-dna.com/wp-content/uploads/2023/12/Specsheet-ONE-DNA-Elan-35-TF-ENG-vs2_01.pdf
- Orion 40: https://one-dna.com/wp-content/uploads/2023/12/Specsheet-ONE-DNA-Orion-40-TF-ENG-vs2-1.pdf
- Play 24: https://one-dna.com/wp-content/uploads/2023/12/Specsheet-ONE-DNA-Play-24-TF-ENG-vs2.pdf

### Bestekteksten:
- Play 24: https://one-dna.com/wp-content/uploads/2023/12/Bestekinformatie-ONE-DNA-Play-24-NL.pdf
- Overige producten: op aanvraag via info@one-dna.com

### Take-back Portal:
- Officieel portaal: https://one-dna.com/nl/take-back/
- Registratie en informatie over Collection Points

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
4. NEN-EN 71-3 - Kindveiligheid certificaat

### Productcertificaten (beschikbaar):
1. Valhoogte Testrapport - NEN-EN 1177:2018, per systeemconfiguratie (Play-lijn)
2. EPD Certificaat - ISO 14025, EN 15804 (scope A1-A3, C1-C4, Module D)
3. Brandveiligheid - ISO 9239-1, BFL-S1 en CFL-S1 classificatie
4. Bestekteksten - RAW en STABU compatible
5. Technische Datasheets - Specificaties per product
6. EN 15343 - Gerecycled materiaal certificaat (tot 51%)

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
- Garantie Landscaping: 15 jaar

## PFAS Statement
- Geen intentioneel toegevoegde PFAS in productie
- Getest conform EU 2013/1272
- Achtergrondniveaus kunnen niet volledig worden uitgesloten

## Contact & Bedrijfsinfo
- Bedrijf: ONE-DNA™ (Limegreen Holding B.V.)
- Adres: Textielstraat 14, 7575 CA Oldenzaal, Nederland
- E-mail: info@one-dna.com
- Telefoon: +31 (0) 541 21 79 00
- Commerciële website: www.one-dna.com
- Kennisplatform: support.one-dna.com

## Pagina Navigatie (Kennisplatform)
- Home: index.html - Overzicht kennisplatform
- Technologie: products.html - Productieproces en impact
- Circulariteit: circularity.html - Take-back systeem en partners
- Certificaten: documentation.html - Alle certificeringen
- Inzichten: blog.html - Artikelen over CMP, regelgeving

## Pagina Navigatie (one-dna.com)
- Play collectie: https://one-dna.com/nl/one-dna-play/
- Multisport collectie: https://one-dna.com/nl/one-dna-multisport/
- Landscaping collectie: https://one-dna.com/nl/one-dna-landscaping/
- Event & Indoor: https://one-dna.com/nl/one-dna-event/
- Padel: https://one-dna.com/nl/one-dna-kunstgras-voor-padel/
- R&D: https://one-dna.com/nl/r-en-d/

## Regelgeving Context
- CMP (Circulair Materialen Plan) - EU regelgeving
- CSRD - Corporate Sustainability Reporting Directive
- EPR - Extended Producer Responsibility
- REACH - EU chemische stoffen verordening
`;

// System prompt for the AI
const SYSTEM_PROMPT = `Je bent de ONE-DNA™ Kennisplatform Assistent. Je helpt bezoekers met vragen over ONE-DNA kunstgras, circulariteit, certificaten en installatie.

BELANGRIJKE REGELS:
1. Gebruik informatie uit de kennisbank hieronder en de officiële websites (support.one-dna.com en one-dna.com). Verzin NOOIT informatie.
2. Als je iets niet weet, zeg dan eerlijk: "Die informatie heb ik niet beschikbaar. Neem contact op met info@one-dna.com"
3. Wees beknopt maar volledig. Gebruik bullet points waar nuttig.
4. Verwijs naar relevante pagina's wanneer gepast (bijv. "Zie de Technologie pagina voor meer details").
5. Gebruik een professionele maar vriendelijke toon.
6. Voor productinformatie en certificaat downloads, verwijs naar de specifieke productpagina's op one-dna.com
7. Antwoord in het Nederlands tenzij anders gevraagd.
8. Houd antwoorden kort en bondig - max 3-4 alinea's.
9. Geef directe links naar EPD's, brandveiligheid certificaten en andere documenten wanneer relevant.

ANTI-GREENWASHING:
- Wees eerlijk over beperkingen
- "Recyclebaar" betekent ontworpen voor recycling, niet dat het automatisch gebeurt
- Take-back is een mogelijkheid, geen garantie
- Percentages (zoals 60% CO₂ reductie) variëren per product

BRONNEN:
- Dit kennisplatform (support.one-dna.com)
- Commerciële website (one-dna.com)
- Officiële certificaten en documenten op one-dna.com/wp-content/uploads/

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
