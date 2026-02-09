/**
 * ONE-DNA Site-wide Password Protection
 * Provides authentication overlay for the entire knowledge platform
 */
(function() {
    'use strict';

    const CORRECT_PASSWORD = '1234';
    const SESSION_KEY = 'onedna_site_auth';

    // Check if already authenticated
    if (sessionStorage.getItem(SESSION_KEY) === 'true') {
        return; // Already authenticated, no overlay needed
    }

    // Create and inject the password overlay
    const overlayHTML = `
        <div id="passwordOverlay" class="password-overlay">
            <div class="password-modal">
                <div class="password-modal__icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                        <path d="M7 11V7a5 5 0 0110 0v4"/>
                    </svg>
                </div>
                <h2>Beveiligde Omgeving</h2>
                <p>Dit kennisplatform is alleen toegankelijk voor geautoriseerde gebruikers.</p>
                <form id="passwordForm">
                    <div class="password-input-group">
                        <input type="password" id="passwordInput" placeholder="Voer wachtwoord in" autocomplete="off" required>
                        <button type="submit" class="btn btn-primary">Toegang</button>
                    </div>
                    <p id="passwordError" class="password-error" style="display: none;">Onjuist wachtwoord. Probeer opnieuw.</p>
                </form>
                <p class="password-modal__hint">Neem contact op met ONE-DNA™ voor toegang.</p>
            </div>
        </div>
    `;

    const overlayStyles = `
        <style id="auth-styles">
            .password-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
            }
            .password-overlay.hidden {
                display: none;
            }
            .password-modal {
                background: #fff;
                padding: 3rem;
                border-radius: 12px;
                max-width: 420px;
                width: 90%;
                text-align: center;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            }
            .password-modal__icon {
                margin-bottom: 1.5rem;
                color: #2d5a27;
            }
            .password-modal h2 {
                font-family: 'Montserrat', sans-serif;
                font-size: 1.5rem;
                margin-bottom: 0.5rem;
                color: #1a1a1a;
            }
            .password-modal > p {
                color: #666;
                margin-bottom: 1.5rem;
                font-size: 0.95rem;
            }
            .password-input-group {
                display: flex;
                gap: 0.5rem;
                margin-bottom: 1rem;
            }
            .password-input-group input {
                flex: 1;
                padding: 0.875rem 1rem;
                border: 2px solid #e0e0e0;
                border-radius: 8px;
                font-size: 1rem;
                font-family: 'Montserrat', sans-serif;
                transition: border-color 0.2s;
            }
            .password-input-group input:focus {
                outline: none;
                border-color: #2d5a27;
            }
            .password-input-group .btn {
                padding: 0.875rem 1.5rem;
                white-space: nowrap;
                background: #2d5a27;
                color: #fff;
                border: none;
                border-radius: 8px;
                font-family: 'Montserrat', sans-serif;
                font-weight: 600;
                cursor: pointer;
                transition: background 0.2s;
            }
            .password-input-group .btn:hover {
                background: #234a1f;
            }
            .password-error {
                color: #dc3545;
                font-size: 0.875rem;
                margin-bottom: 1rem;
            }
            .password-modal__hint {
                font-size: 0.8rem;
                color: #999;
                margin-top: 1rem;
                margin-bottom: 0;
            }
            body.password-locked {
                overflow: hidden;
            }
        </style>
    `;

    // Inject styles into head
    document.head.insertAdjacentHTML('beforeend', overlayStyles);

    // Inject overlay into body
    document.body.insertAdjacentHTML('afterbegin', overlayHTML);
    document.body.classList.add('password-locked');

    // Set up form handler
    const form = document.getElementById('passwordForm');
    const input = document.getElementById('passwordInput');
    const error = document.getElementById('passwordError');
    const overlay = document.getElementById('passwordOverlay');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        if (input.value === CORRECT_PASSWORD) {
            sessionStorage.setItem(SESSION_KEY, 'true');
            overlay.classList.add('hidden');
            document.body.classList.remove('password-locked');
        } else {
            error.style.display = 'block';
            input.value = '';
            input.focus();
        }
    });

    // Focus input on load
    setTimeout(function() {
        input.focus();
    }, 100);
})();
