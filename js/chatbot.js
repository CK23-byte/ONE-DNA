/**
 * ONE-DNA™ Knowledge Platform Chatbot
 * Uses Vercel Serverless Function for OpenAI API
 *
 * This chatbot only uses information from the ONE-DNA knowledge platform.
 * It helps users navigate the site and answers questions about:
 * - ONE-DNA technology (mono-material, thermofixation)
 * - Circularity & take-back system
 * - Certificates & documentation
 * - Installation & practical information
 */

// Chat state
let chatHistory = [];
let isProcessing = false;

// DOM Elements (will be set on init)
let chatMessages;
let chatForm;
let chatInput;
let chatSuggestions;

// Initialize chat
function initChat() {
    chatMessages = document.getElementById('chatMessages');
    chatForm = document.getElementById('chatForm');
    chatInput = document.getElementById('chatInput');
    chatSuggestions = document.getElementById('chatSuggestions');

    if (!chatMessages || !chatForm || !chatInput) {
        console.log('Chat elements not found on this page');
        return;
    }

    // Load chat history from session storage
    const savedHistory = sessionStorage.getItem('onedna_chat_history');
    if (savedHistory) {
        chatHistory = JSON.parse(savedHistory);
        // Restore messages to UI
        chatHistory.forEach(msg => {
            addMessageToUI(msg.content, msg.role === 'user' ? 'user' : 'bot', false);
        });
        // Hide suggestions if there's history
        if (chatHistory.length > 0 && chatSuggestions) {
            chatSuggestions.style.display = 'none';
        }
    }

    // Set up form submission
    chatForm.addEventListener('submit', handleChatSubmit);

    // Don't auto-focus input on page load to prevent scrolling
    // Focus will happen when user clicks on the input field
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
        const response = await callChatAPI(message);

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

        const errorMessage = 'Er is een fout opgetreden. Probeer het later opnieuw of neem contact op via info@one-dna.com';
        addMessageToUI(errorMessage, 'bot');
    }

    isProcessing = false;
    chatInput.disabled = false;
    chatInput.focus();
}

// Call the serverless API endpoint
async function callChatAPI(userMessage) {
    // Build messages array for context
    const messages = [
        ...chatHistory.slice(-10), // Keep last 10 messages for context
        { role: 'user', content: userMessage }
    ];

    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'API request failed');
    }

    const data = await response.json();
    return data.message;
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

    // Internal page links based on keywords
    const pageLinks = {
        'technologie pagina': 'products.html',
        'circulariteit pagina': 'circularity.html',
        'take-back pagina': 'circularity.html#take-back',
        'certificaten pagina': 'documentation.html',
        'praktijk pagina': 'praktijk.html',
        'inzichten pagina': 'blog.html'
    };

    Object.entries(pageLinks).forEach(([keyword, url]) => {
        const regex = new RegExp(`(${keyword})`, 'gi');
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

// Clear chat history
function clearChat() {
    chatHistory = [];
    sessionStorage.removeItem('onedna_chat_history');
    chatMessages.innerHTML = `
        <div class="chat-message chat-message--bot">
            <div class="chat-message__content">
                <p>Welkom bij het ONE-DNA™ Kennisplatform! 👋</p>
                <p>Ik help u graag met vragen over:</p>
                <ul>
                    <li>Mono-materiaal technologie</li>
                    <li>Take-back systeem & circulariteit</li>
                    <li>Certificaten & documentatie</li>
                    <li>Installatie & praktijk</li>
                </ul>
                <p>Waar kan ik u mee helpen?</p>
            </div>
        </div>
    `;
    if (chatSuggestions) {
        chatSuggestions.style.display = 'flex';
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChat);
} else {
    initChat();
}

// Expose functions globally for onclick handlers
window.sendSuggestion = sendSuggestion;
window.handleChatSubmit = handleChatSubmit;
window.clearChat = clearChat;
