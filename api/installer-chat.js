/**
 * ONE-DNA™ Installer Chat API Endpoint
 * Vercel Serverless Function with Vision support
 *
 * This endpoint helps installers with step-by-step guidance
 * and can analyze uploaded photos for feedback.
 */

const INSTALLER_KNOWLEDGE = `
# ONE-DNA™ Installatie Kennisbank

## Installatie Stappen Overzicht

### Stap 1: Ondergrond Voorbereiding
**Kritisch voor succes - 80% van problemen ontstaat hier**

1. **Drainage controleren**
   - Minimaal 50 mm/uur doorlatendheid vereist
   - Geen plassen na regen

2. **Vlakheid meten**
   - Max 10mm afwijking per 3 meter rei
   - Geen hobbels of kuilen

3. **Verdichting**
   - Minimaal 95% Proctor verdichting
   - Test met penetrometer

4. **Materiaal**
   - Lava, gebroken puin of drainage zand
   - Korrelgrootte 0-8mm of 0-16mm

### Stap 2: Gras Uitrollen & Acclimatiseren
1. **Acclimatiseren**
   - Minimaal 2 uur voor installatie uitrollen
   - Bij warm weer: langer acclimatiseren
   - Voorkomt krimp/uitzetting na installatie

2. **Rolrichting**
   - ALLE rollen dezelfde vezelrichting
   - Check bij zijlicht: kleurverschil = verkeerde richting
   - Plan layout voor uitrollen

3. **Overlapping**
   - Rollen 5-10 cm laten overlappen
   - Nooit op spanning leggen

### Stap 3: Naden Snijden & Uitlijnen
1. **Snijden**
   - Scherp mes (vervang regelmatig)
   - Snij door beide lagen tegelijk
   - Rechte snijlijn met geleider

2. **Uitlijnen**
   - Max 3mm naadopening
   - Vezels niet in de naad
   - Beide zijden gelijkmatig

### Stap 4: Verlijmen met Naadband
1. **Voorwaarden**
   - Temperatuur: minimaal 5°C (optimaal 10-25°C)
   - Droog weer (geen regen verwacht binnen 24 uur)
   - Ondergrond en gras droog

2. **Naadband plaatsen**
   - Gecentreerd onder de naad
   - Plat en strak

3. **Lijm aanbrengen**
   - 2-componenten PU lijm
   - Gelijkmatig met getande spatel (350-450 g/m²)
   - Open tijd: 20-40 minuten (afhankelijk van temperatuur)

4. **Aansluiten**
   - Beide zijden tegelijk in de lijm drukken
   - Geen vezels in de lijm
   - Aandrukken met roller of gewichten
   - 24 uur uitharden voor belasting

### Stap 5: Randafwerking
1. **Opties**
   - Aluminium randprofielen
   - Kunststof randafwerking
   - Ingraven in grond
   - Bevestigen aan harde ondergrond

2. **Tips**
   - Rand 5-10mm boven gras niveau
   - Voorkomt opkruipen randen

### Stap 6: Infill Aanbrengen
1. **Hoeveelheid**
   - Zie productspecifieke datasheet
   - Vista 30: geen infill of 2-5 kg/m²
   - Play 24: 20-25 kg/m² (voor valdemping)

2. **Methode**
   - In dunne lagen aanbrengen (max 5 kg/laag)
   - Na elke laag inborstelen
   - Kruislings borstelen

3. **Materiaal types**
   - Zand (SBR-vrij)
   - Kurk
   - Kokos
   - Rubber (SBR of EPDM)

### Stap 7: Eindcontrole
1. **Visuele inspectie**
   - Naden vlak en onzichtbaar
   - Geen golven of bobbels
   - Vezelrichting consistent

2. **Functionele test**
   - Drainage controleren (water gieten)
   - Valbescherming testen (bij speelvelden)

3. **Documentatie**
   - Foto's maken van resultaat
   - Opleverdocument invullen
   - Registreren voor take-back programma

## Veelvoorkomende Problemen & Oplossingen

### Golven in het gras
**Oorzaken:**
- Niet geacclimatiseerd
- Spanning bij verlijmen
- Slechte ondergrond

**Oplossing:**
- Naden openmaken
- Opnieuw acclimatiseren
- Spanningvrij verlijmen

### Naden komen los
**Oorzaken:**
- Te weinig lijm
- Verlijmd bij te lage temperatuur
- Vocht in de naad
- Open tijd overschreden

**Oplossing:**
- Naad openmaken
- Lijmresten verwijderen
- Opnieuw verlijmen onder juiste condities

### Slechte drainage
**Oorzaken:**
- Verdichte ondergrond
- Perforaties verstopt
- Verkeerd ondergrondmateriaal

**Oplossing:**
- Perforaties controleren
- Ondergrond verbeteren

### Kleurverschil tussen banen
**Oorzaken:**
- Verschillende rolrichtingen
- Verschillende productiebatches

**Oplossing:**
- Controleer vezelrichting (niet meer te corrigeren na verlijmen)
- Productienummers matchen bij bestelling

## Weersomstandigheden

### Verlijmen
- Minimum: 5°C
- Optimaal: 10-25°C
- Maximum: 35°C (lijm droogt te snel)
- NIET bij regen of hoge luchtvochtigheid

### Uitrollen
- Kan bij alle temperaturen
- Bij vorst: gras is breekbaar, voorzichtig zijn

## Gereedschap Checklist
- Scherpe messen + reservemesjes
- Naadband (voldoende)
- 2K PU lijm
- Getande spatel
- Rei (3m)
- Waterpas
- Meetlint
- Krijt/stift voor markeren
- Roller of zandzakken
- Infillstrooier
- Veegmachine/borstel
- Camera voor documentatie

## Contact bij Problemen
Bij technische vragen: info@one-dna.com
Telefoon: +31 (0) 541 21 79 00
`;

const INSTALLER_SYSTEM_PROMPT = `Je bent de ONE-DNA™ Installatie Assistent. Je helpt professionele installateurs met het correct installeren van ONE-DNA kunstgras.

BELANGRIJKE REGELS:
1. Geef praktische, stapsgewijze instructies
2. Als er een foto wordt gedeeld, analyseer deze zorgvuldig:
   - Beschrijf wat je ziet
   - Identificeer de huidige installatiefase
   - Geef specifiek advies voor de volgende stap
   - Wijs op eventuele problemen of verbeterpunten
3. Wees duidelijk over weersvoorwaarden en vereisten
4. Bij problemen: geef concrete oplossingen
5. Verwijs naar de juiste stap in het installatieproces
6. Stimuleer het maken van foto's voor documentatie
7. Wees professioneel maar toegankelijk

BIJ FOTO-ANALYSE:
- Beschrijf eerst wat je ziet (ondergrond, gras, naden, etc.)
- Beoordeel de kwaliteit van het werk
- Geef de volgende actie of verbeterpunt
- Vraag om verduidelijking als de foto onduidelijk is

INSTALLATIE KENNIS:
${INSTALLER_KNOWLEDGE}`;

export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        console.error('OPENAI_API_KEY not configured');
        return res.status(500).json({ error: 'Server configuration error' });
    }

    try {
        const { messages, currentMessage, images } = req.body;

        // Build messages array
        const apiMessages = [
            { role: 'system', content: INSTALLER_SYSTEM_PROMPT }
        ];

        // Add conversation history (without images for context)
        if (messages && Array.isArray(messages)) {
            messages.slice(-8).forEach(msg => {
                apiMessages.push({
                    role: msg.role === 'assistant' ? 'assistant' : 'user',
                    content: msg.content
                });
            });
        }

        // Build current message content
        let currentContent = [];

        // Add text if present
        if (currentMessage) {
            currentContent.push({
                type: 'text',
                text: currentMessage
            });
        }

        // Add images if present
        if (images && images.length > 0) {
            images.forEach(imageBase64 => {
                currentContent.push({
                    type: 'image_url',
                    image_url: {
                        url: imageBase64,
                        detail: 'high'
                    }
                });
            });

            // Add analysis prompt if only images
            if (!currentMessage) {
                currentContent.unshift({
                    type: 'text',
                    text: 'Analyseer deze foto van mijn kunstgras installatie. Beschrijf wat je ziet, bij welke stap ik ben, en geef advies voor de volgende stap of verbeterpunten.'
                });
            }
        }

        // Add current message
        apiMessages.push({
            role: 'user',
            content: currentContent.length === 1 && currentContent[0].type === 'text'
                ? currentContent[0].text
                : currentContent
        });

        // Use GPT-4 Vision for image analysis
        const model = images && images.length > 0 ? 'gpt-4o' : 'gpt-4o-mini';

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: model,
                messages: apiMessages,
                max_tokens: 1000,
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
        console.error('Installer chat API error:', error);
        return res.status(500).json({
            error: 'Er is een fout opgetreden. Probeer het later opnieuw.'
        });
    }
}
