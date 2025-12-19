// Password Gate Controller
class PasswordController {
    constructor() {
        this.correctPassword = '22/07/2002'; // Boyfriend's birthday
        this.attempts = 0;
        this.maxAttempts = 3;
        this.hintLevel = 0;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupHints();
    }
    
    setupEventListeners() {
        const passwordInput = document.getElementById('passwordInput');
        const passwordSubmit = document.getElementById('passwordSubmit');
        
        // Enter key submission
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.checkPassword();
            }
        });
        
        // Button submission
        passwordSubmit.addEventListener('click', () => {
            this.checkPassword();
        });
        
        // Input formatting (auto-add slashes)
        passwordInput.addEventListener('input', (e) => {
            this.formatDateInput(e.target);
        });
        
        // Focus input on load
        setTimeout(() => {
            passwordInput.focus();
        }, 500);
    }
    
    setupHints() {
        const hintButton = document.getElementById('hintButton');
        
        hintButton.addEventListener('click', () => {
            this.showNextHint();
        });
    }
    
    formatDateInput(input) {
        let value = input.value.replace(/\D/g, ''); // Remove non-digits
        
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2);
        }
        if (value.length >= 5) {
            value = value.substring(0, 5) + '/' + value.substring(5, 9);
        }
        
        input.value = value;
    }
    
    checkPassword() {
        const input = document.getElementById('passwordInput');
        const errorMessage = document.getElementById('errorMessage');
        const enteredPassword = input.value.trim();
        
        if (enteredPassword === this.correctPassword) {
            this.handleCorrectPassword();
        } else {
            this.handleIncorrectPassword();
        }
    }
    
    handleCorrectPassword() {
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.textContent = '✨ So my gf does remember my birthday 😁...';
        errorMessage.style.color = '#90EE90';
        
        // Add success animation
        const passwordContainer = document.querySelector('.password-container');
        passwordContainer.classList.add('glow');
        
        // Transition to first slide after delay
        setTimeout(() => {
            if (window.wizardController) {
                window.wizardController.goToSlide(1);
            }
        }, 1500);
    }
    
    handleIncorrectPassword() {
        this.attempts++;
        const errorMessage = document.getElementById('errorMessage');
        
        const playfulMessages = [
            "Hmm, that's not quite right, bubu... 💭",
            "Close, but not quite there yet! 😊",
            "Try again, you've got this, bubu! 💕",
            "Think about someone special's birthday... 🎂",
            "The date we first celebrated together... 🎉",
            "When did someone very important come into this world? 🌟"
        ];
        
        const messageIndex = Math.min(this.attempts - 1, playfulMessages.length - 1);
        errorMessage.textContent = playfulMessages[messageIndex];
        errorMessage.style.color = '#FFB6C1';
        
        // Add shake animation to input
        const input = document.getElementById('passwordInput');
        input.classList.add('shake');
        setTimeout(() => {
            input.classList.remove('shake');
        }, 500);
        
        // Clear input after wrong attempt
        setTimeout(() => {
            input.value = '';
            input.focus();
        }, 1000);
    }
    
    showNextHint() {
        const hintButton = document.getElementById('hintButton');
        const hint1 = document.getElementById('hint1');
        const hint2 = document.getElementById('hint2');
        
        if (this.hintLevel === 0) {
            // First click: show first hint
            this.hintLevel = 1;
            hintButton.textContent = '💡 Another hint?';
            hint1.classList.remove('hidden');
            hint1.classList.add('visible');
        } else if (this.hintLevel === 1) {
            // Second click: show second hint and hide button
            this.hintLevel = 2;
            hint2.classList.remove('hidden');
            hint2.classList.add('visible');
            hintButton.style.display = 'none';
        }
    }
    
    // Remove the old showHint method as it's no longer needed
    
    // Easter egg: Konami code or special sequence
    setupEasterEgg() {
        let sequence = [];
        const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];
        
        document.addEventListener('keydown', (e) => {
            sequence.push(e.code);
            sequence = sequence.slice(-konamiCode.length);
            
            if (sequence.join(',') === konamiCode.join(',')) {
                this.triggerEasterEgg();
            }
        });
    }
    
    triggerEasterEgg() {
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.textContent = '🎮 Konami code detected, bubu! But you still need the real password 😉';
        errorMessage.style.color = '#FFD700';
        
        // Add special effect
        document.body.style.animation = 'pulse 0.5s ease-in-out 3';
    }
}

// Add shake animation CSS
const shakeCSS = `
.shake {
    animation: shake 0.5s ease-in-out;
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
}
`;

// Inject shake CSS
const style = document.createElement('style');
style.textContent = shakeCSS;
document.head.appendChild(style);

// Initialize password controller when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.passwordController = new PasswordController();
    console.log('🔐 Password gate initialized!');
});