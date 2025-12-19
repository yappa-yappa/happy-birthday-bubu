// Wizard System - Main Controller
class WizardController {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 8; // 0-7
        this.isTransitioning = false;
        this.backgroundImages = [
            'assets/images/her pic (1).jpg',
            'assets/images/her pic (2).jpg',
            'assets/images/her pic (3).jpg'
        ];
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateBackgroundBlur();
        this.rotateBackgroundImages();
    }
    
    setupEventListeners() {
        // Global keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && this.currentSlide > 0) {
                this.nextSlide();
            }
        });
        
        // Make nextSlide globally available
        window.nextSlide = () => this.nextSlide();
    }
    
    nextSlide() {
        if (this.isTransitioning || this.currentSlide >= this.totalSlides - 1) {
            return;
        }
        
        this.isTransitioning = true;
        
        // Hide current slide
        const currentSlideEl = document.getElementById(`slide-${this.currentSlide}`);
        currentSlideEl.classList.add('exiting');
        
        setTimeout(() => {
            currentSlideEl.classList.remove('active', 'exiting');
            this.currentSlide++;
            
            // Show next slide
            const nextSlideEl = document.getElementById(`slide-${this.currentSlide}`);
            nextSlideEl.classList.add('active');
            
            // Update visual effects
            this.updateBackgroundBlur();
            this.updateCandles();
            this.updateDecorations();
            
            // Special handling for final slide
            if (this.currentSlide === this.totalSlides - 1) {
                this.triggerFinalSlideEffects();
            }
            
            this.isTransitioning = false;
        }, 600);
    }
    
    updateBackgroundBlur() {
        const backgroundEl = document.getElementById('backgroundImage');
        const maxBlur = 50;
        const minBlur = 0;
        const progress = this.currentSlide / (this.totalSlides - 1);
        const blurAmount = maxBlur - (progress * (maxBlur - minBlur));
        
        backgroundEl.style.filter = `blur(${Math.max(blurAmount, minBlur)}px)`;
    }
    
    updateCandles() {
        if (window.candleController) {
            const candlesToLight = Math.floor((this.currentSlide / (this.totalSlides - 1)) * 30);
            window.candleController.lightCandles(candlesToLight);
        }
    }
    
    updateDecorations() {
        const balloons = document.querySelectorAll('.balloon');
        const streamers = document.querySelectorAll('.streamer');
        
        // Show balloons starting from slide 2
        if (this.currentSlide >= 2) {
            balloons.forEach((balloon, index) => {
                setTimeout(() => {
                    balloon.classList.add('visible');
                }, index * 200);
            });
        }
        
        // Show streamers starting from slide 4
        if (this.currentSlide >= 4) {
            streamers.forEach((streamer, index) => {
                setTimeout(() => {
                    streamer.classList.add('visible');
                }, index * 300);
            });
        }
    }
    
    triggerFinalSlideEffects() {
        // Light all candles
        if (window.candleController) {
            window.candleController.lightAllCandles();
        }
        
        // Start confetti
        setTimeout(() => {
            if (window.confettiController) {
                window.confettiController.startConfetti();
            }
        }, 500);
        
        // Initialize photo collage
        setTimeout(() => {
            if (window.collageController) {
                window.collageController.initializeCollage();
            }
        }, 1000);
        
        // Show all decorations
        const decorativeElements = document.querySelectorAll('.balloon, .streamer');
        decorativeElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, index * 100);
        });
    }
    
    rotateBackgroundImages() {
        let imageIndex = 0;
        const backgroundEl = document.getElementById('backgroundImage');
        
        setInterval(() => {
            imageIndex = (imageIndex + 1) % this.backgroundImages.length;
            backgroundEl.style.backgroundImage = `url('${this.backgroundImages[imageIndex]}')`;
        }, 10000); // Change every 10 seconds
    }
    
    // Method to jump to specific slide (for password success)
    goToSlide(slideNumber) {
        if (slideNumber < 0 || slideNumber >= this.totalSlides) {
            return;
        }
        
        // Hide current slide
        const currentSlideEl = document.getElementById(`slide-${this.currentSlide}`);
        currentSlideEl.classList.remove('active');
        
        // Update slide number
        this.currentSlide = slideNumber;
        
        // Show target slide
        const targetSlideEl = document.getElementById(`slide-${this.currentSlide}`);
        targetSlideEl.classList.add('active');
        
        // Update effects
        this.updateBackgroundBlur();
        this.updateCandles();
        this.updateDecorations();
    }
}

// Confetti Controller
class ConfettiController {
    constructor() {
        this.container = document.getElementById('confettiContainer');
        this.isActive = false;
        this.confettiInterval = null;
    }
    
    startConfetti() {
        if (this.isActive) return;
        
        this.isActive = true;
        this.createConfettiBurst();
        
        // Continue creating confetti
        this.confettiInterval = setInterval(() => {
            this.createConfettiPiece();
        }, 150);
        
        // Stop after 10 seconds
        setTimeout(() => {
            this.stopConfetti();
        }, 10000);
    }
    
    stopConfetti() {
        this.isActive = false;
        if (this.confettiInterval) {
            clearInterval(this.confettiInterval);
            this.confettiInterval = null;
        }
    }
    
    createConfettiBurst() {
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                this.createConfettiPiece();
            }, i * 50);
        }
    }
    
    createConfettiPiece() {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        
        // Random type
        const types = ['confetti-square', 'confetti-circle', 'confetti-triangle'];
        const type = types[Math.floor(Math.random() * types.length)];
        piece.classList.add(type);
        
        // Random position and properties
        piece.style.left = Math.random() * 100 + '%';
        piece.style.animationDelay = Math.random() * 2 + 's';
        piece.style.animationDuration = (2.5 + Math.random() * 1) + 's';
        
        // Random colors for different types
        if (type === 'confetti-square') {
            const colors = ['#FFD700', '#FF69B4', '#FF1493', '#FFB6C1'];
            piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        }
        
        this.container.appendChild(piece);
        
        // Remove after animation
        setTimeout(() => {
            if (piece.parentNode) {
                piece.parentNode.removeChild(piece);
            }
        }, 4000);
    }
}

// Initialize controllers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize wizard controller
    window.wizardController = new WizardController();
    
    // Initialize confetti controller
    window.confettiController = new ConfettiController();
    
    console.log('🎂 Birthday wizard initialized!');
});