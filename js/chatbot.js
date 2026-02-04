/**
 * ONE-DNA™ Knowledge Platform Chatbot
 * Powered by OpenAI GPT
 *
 * This chatbot only uses information from the ONE-DNA knowledge platform.
 * It helps users navigate the site and answers questions about:
 * - ONE-DNA technology (mono-material, thermofixation)
 * - Circularity & take-back system
 * - Certificates & documentation
 * - Installation & practical information
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
4. Verwijs naar relevante pagina's wanneer gepast.
5. Gebruik een professionele maar vriendelijke toon.
6. Bij commerciële vragen, verwijs naar www.one-dna.com
7. Antwoord in het Nederlands tenzij anders gevraagd.

ANTI-GREENWASHING:
- Wees eerlijk over beperkingen
- "Recyclebaar" betekent ontworpen voor recycling, niet dat het automatisch gebeurt
- Take-back is een mogelijkheid, geen garantie
- Percentages (zoals 60% CO₂ reductie) variëren per product

${SITE_KNOWLEDGE}`;

// Chat state
let chatHistory = [];
let isProcessing = false;

// DOM Elements
const chatWidget = document.getElementById('chatWidget');
const chatToggle = document.getElementById('chatToggle');
const chatWindow = document.getElementById('chatWindow');
const chatMessages = document.getElementById('chatMessages');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatSuggestions = document.getElementById('chatSuggestions');

// Initialize chat
function initChat() {
    if (chatToggle) {
        chatToggle.addEventListener('click', toggleChat);
    }

    // Load chat history from session storage
    const savedHistory = sessionStorage.getItem('onedna_chat_history');
    if (savedHistory) {
        chatHistory = JSON.parse(savedHistory);
        // Restore messages to UI (skip the welcome message)
        chatHistory.forEach(msg => {
            if (msg.role !== 'system') {
                addMessageToUI(msg.content, msg.role === 'user' ? 'user' : 'bot', false);
            }
        });
    }
}

// Toggle chat window
function toggleChat() {
    chatWidget.classList.toggle('is-open');
    const isOpen = chatWidget.classList.contains('is-open');
    chatToggle.setAttribute('aria-expanded', isOpen);
    chatWindow.setAttribute('aria-hidden', !isOpen);

    if (isOpen) {
        chatInput.focus();
        scrollToBottom();
    }
}

// Handle chat form submission
async function handleChatSubmit(event) {
    event.preventDefault();

    const message = chatInput.value.trim();
    if (!message || isProcessing) return;

    await sendMessage(message);
}

// Send a suggestion
async function sendSuggestion(message) {
    if (isProcessing) return;
    await sendMessage(message);

    // Hide suggestions after first use
    if (chatSuggestions) {
        chatSuggestions.style.display = 'none';
    }
}

// Send message to AI
async function sendMessage(message) {
    isProcessing = true;
    chatInput.value = '';
    chatInput.disabled = true;

    // Add user message to UI
    addMessageToUI(message, 'user');

    // Add to history
    chatHistory.push({ role: 'user', content: message });

    // Show typing indicator
    const typingIndicator = addTypingIndicator();

    try {
        const response = await callOpenAI(message);

        // Remove typing indicator
        typingIndicator.remove();

        // Add bot response to UI
        addMessageToUI(response, 'bot');

        // Add to history
        chatHistory.push({ role: 'assistant', content: response });

        // Save to session storage
        sessionStorage.setItem('onedna_chat_history', JSON.stringify(chatHistory));

    } catch (error) {
        console.error('Chat error:', error);
        typingIndicator.remove();

        let errorMessage = 'Er is een fout opgetreden. Probeer het later opnieuw.';
        if (error.message.includes('API key')) {
            errorMessage = 'De chatbot is momenteel niet beschikbaar. Neem contact op via info@one-dna.com';
        }

        addMessageToUI(errorMessage, 'bot');
    }

    isProcessing = false;
    chatInput.disabled = false;
    chatInput.focus();
}

// Call OpenAI API
async function callOpenAI(userMessage) {
    // Build messages array
    const messages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...chatHistory.slice(-10), // Keep last 10 messages for context
        { role: 'user', content: userMessage }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAPIKey()}`
        },
        body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: messages,
            max_tokens: 500,
            temperature: 0.7
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'API request failed');
    }

    const data = await response.json();
    return data.choices[0].message.content;
}

// Get API key (in production, use a backend proxy)
function getAPIKey() {
    // Check for environment variable or config
    if (typeof OPENAI_API_KEY !== 'undefined') {
        return OPENAI_API_KEY;
    }

    // For demo purposes - in production, NEVER expose API keys client-side
    // Use a serverless function or backend proxy instead
    const key = window.__OPENAI_KEY__ || localStorage.getItem('openai_api_key');

    if (!key) {
        throw new Error('API key not configured');
    }

    return key;
}

// Add message to UI
function addMessageToUI(content, type, scroll = true) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message chat-message--${type}`;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'chat-message__content';

    // Parse markdown-like formatting
    const formattedContent = formatMessage(content);
    contentDiv.innerHTML = formattedContent;

    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);

    if (scroll) {
        scrollToBottom();
    }
}

// Format message with basic markdown support
function formatMessage(content) {
    // Convert line breaks to paragraphs
    let formatted = content
        .split('\n\n')
        .map(para => `<p>${para}</p>`)
        .join('');

    // Convert single line breaks within paragraphs
    formatted = formatted.replace(/\n/g, '<br>');

    // Bold text
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Links - convert URLs to clickable links
    formatted = formatted.replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener">$1</a>'
    );

    // Convert bullet points
    formatted = formatted.replace(
        /<p>[-•]\s*(.*?)<\/p>/g,
        '<li>$1</li>'
    );

    // Wrap consecutive list items in ul
    formatted = formatted.replace(
        /(<li>.*?<\/li>)+/g,
        '<ul>$&</ul>'
    );

    // Internal page links
    const pageLinks = {
        'technologie': 'products.html',
        'circulariteit': 'circularity.html',
        'take-back': 'circularity.html#take-back',
        'certificaten': 'documentation.html',
        'praktijk': 'praktijk.html',
        'inzichten': 'blog.html',
        'contact': 'mailto:info@one-dna.com'
    };

    Object.entries(pageLinks).forEach(([keyword, url]) => {
        const regex = new RegExp(`\\b(${keyword}\\s*pagina)\\b`, 'gi');
        formatted = formatted.replace(regex, `<a href="${url}">$1</a>`);
    });

    return formatted;
}

// Add typing indicator
function addTypingIndicator() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message chat-message--bot chat-message--typing';
    messageDiv.innerHTML = `
        <div class="chat-message__content">
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
    return messageDiv;
}

// Scroll to bottom of messages
function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChat);
} else {
    initChat();
}

// Expose toggle function globally for onclick handlers
window.toggleChat = toggleChat;
window.sendSuggestion = sendSuggestion;
window.handleChatSubmit = handleChatSubmit;
