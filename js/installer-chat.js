/**
 * ONE-DNA™ Installer Chat
 * AI-powered installation guidance with image analysis
 * Uses OpenAI Vision API for photo analysis
 */

// Chat state
let installerChatHistory = [];
let installerIsProcessing = false;
let uploadedFiles = [];

// DOM Elements
let installerMessages;
let installerForm;
let installerInput;
let installerFileInput;
let installerPreview;

// Initialize installer chat
function initInstallerChat() {
    installerMessages = document.getElementById('installerChatMessages');
    installerForm = document.getElementById('installerChatForm');
    installerInput = document.getElementById('installerChatInput');
    installerFileInput = document.getElementById('installerFileInput');
    installerPreview = document.getElementById('installerPreview');

    if (!installerMessages || !installerForm || !installerInput) {
        console.log('Installer chat elements not found');
        return;
    }

    // Load chat history from session storage
    const savedHistory = sessionStorage.getItem('onedna_installer_history');
    if (savedHistory) {
        installerChatHistory = JSON.parse(savedHistory);
        installerChatHistory.forEach(msg => {
            if (msg.role === 'user') {
                addInstallerMessage(msg.content, 'user', msg.images || []);
            } else {
                addInstallerMessage(msg.content, 'bot');
            }
        });
    }

    // Set up form submission
    installerForm.addEventListener('submit', handleInstallerSubmit);

    // Set up file input
    installerFileInput.addEventListener('change', handleFileSelect);

    // Set up drag and drop
    const uploadArea = document.getElementById('installerUploadArea');
    if (uploadArea) {
        uploadArea.addEventListener('dragover', handleDragOver);
        uploadArea.addEventListener('drop', handleDrop);
    }
}

// Handle form submission
async function handleInstallerSubmit(event) {
    event.preventDefault();

    const message = installerInput.value.trim();
    if ((!message && uploadedFiles.length === 0) || installerIsProcessing) return;

    installerIsProcessing = true;
    installerInput.disabled = true;

    // Get base64 images
    const images = await getBase64Images();

    // Add user message to UI
    addInstallerMessage(message || 'Foto geüpload voor analyse', 'user', images);

    // Add to history
    installerChatHistory.push({
        role: 'user',
        content: message || 'Analyseer deze foto en geef installatie-advies.',
        images: images
    });

    // Clear input and files
    installerInput.value = '';
    clearUploadedFiles();

    // Show typing indicator
    const typingIndicator = showTypingIndicator();

    try {
        const response = await callInstallerAPI(message, images);

        // Remove typing indicator
        typingIndicator.remove();

        // Add bot response
        addInstallerMessage(response, 'bot');

        // Save to history
        installerChatHistory.push({
            role: 'assistant',
            content: response
        });

        // Save to session storage
        sessionStorage.setItem('onedna_installer_history', JSON.stringify(installerChatHistory));

    } catch (error) {
        console.error('Installer chat error:', error);
        typingIndicator.remove();
        addInstallerMessage('Er is een fout opgetreden. Probeer het opnieuw.', 'bot');
    }

    installerIsProcessing = false;
    installerInput.disabled = false;
    installerInput.focus();
}

// Call the installer API endpoint
async function callInstallerAPI(message, images) {
    const response = await fetch('/api/installer-chat.js', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            messages: installerChatHistory.slice(-10),
            currentMessage: message || 'Analyseer deze foto en geef installatie-advies.',
            images: images
        })
    });

    if (!response.ok) {
        throw new Error('API request failed');
    }

    const data = await response.json();
    return data.message;
}

// Add message to UI
function addInstallerMessage(content, type, images = []) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message chat-message--${type}`;

    let imagesHtml = '';
    if (images && images.length > 0) {
        imagesHtml = '<div class="chat-message__images">';
        images.forEach(img => {
            imagesHtml += `<img src="${img}" alt="Uploaded image" class="chat-message__image">`;
        });
        imagesHtml += '</div>';
    }

    const contentDiv = document.createElement('div');
    contentDiv.className = 'chat-message__content';
    contentDiv.innerHTML = imagesHtml + formatInstallerMessage(content);

    messageDiv.appendChild(contentDiv);
    installerMessages.appendChild(messageDiv);

    scrollInstallerToBottom();
}

// Format message with markdown support
function formatInstallerMessage(content) {
    if (!content) return '';

    return content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/^### (.*$)/gim, '<h4>$1</h4>')
        .replace(/^## (.*$)/gim, '<h3>$1</h3>')
        .replace(/^- (.*$)/gim, '<li>$1</li>')
        .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
        .replace(/^\d+\. (.*$)/gim, '<li>$1</li>')
        .replace(/\n/g, '<br>');
}

// Show typing indicator
function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'chat-message chat-message--bot chat-message--typing';
    indicator.innerHTML = `
        <div class="chat-message__content">
            <div class="typing-indicator">
                <span></span><span></span><span></span>
            </div>
        </div>
    `;
    installerMessages.appendChild(indicator);
    scrollInstallerToBottom();
    return indicator;
}

// Scroll to bottom
function scrollInstallerToBottom() {
    installerMessages.scrollTop = installerMessages.scrollHeight;
}

// Handle file selection
function handleFileSelect(event) {
    const files = Array.from(event.target.files);
    addFilesToPreview(files);
}

// Handle drag over
function handleDragOver(event) {
    event.preventDefault();
    event.currentTarget.classList.add('drag-over');
}

// Handle drop
function handleDrop(event) {
    event.preventDefault();
    event.currentTarget.classList.remove('drag-over');
    const files = Array.from(event.dataTransfer.files);
    addFilesToPreview(files);
}

// Add files to preview
function addFilesToPreview(files) {
    files.forEach(file => {
        if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
            uploadedFiles.push(file);

            const previewItem = document.createElement('div');
            previewItem.className = 'preview-item';

            if (file.type.startsWith('image/')) {
                const img = document.createElement('img');
                img.src = URL.createObjectURL(file);
                previewItem.appendChild(img);
            } else {
                const videoIcon = document.createElement('div');
                videoIcon.className = 'video-icon';
                videoIcon.innerHTML = '🎬';
                previewItem.appendChild(videoIcon);
            }

            const removeBtn = document.createElement('button');
            removeBtn.className = 'preview-remove';
            removeBtn.innerHTML = '×';
            removeBtn.onclick = () => {
                const index = uploadedFiles.indexOf(file);
                if (index > -1) uploadedFiles.splice(index, 1);
                previewItem.remove();
            };
            previewItem.appendChild(removeBtn);

            installerPreview.appendChild(previewItem);
        }
    });
}

// Get base64 images
async function getBase64Images() {
    const images = [];
    for (const file of uploadedFiles) {
        if (file.type.startsWith('image/')) {
            const base64 = await fileToBase64(file);
            images.push(base64);
        }
    }
    return images;
}

// Convert file to base64
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

// Clear uploaded files
function clearUploadedFiles() {
    uploadedFiles = [];
    installerPreview.innerHTML = '';
    installerFileInput.value = '';
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initInstallerChat);
