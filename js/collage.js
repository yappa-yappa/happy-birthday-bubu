// Photo Collage Controller - Manages the final slide photo collage
class CollageController {
    constructor() {
        this.collageImages = [
            {
                src: 'assets/images/her pic (1).jpg',
                alt: 'Beautiful Jiya 1',
                special: true
            },
            {
                src: 'assets/images/her pic (2).jpg',
                alt: 'Beautiful Jiya 2',
                special: true
            },
            {
                src: 'assets/images/her pic (3).jpg',
                alt: 'Beautiful Jiya 3',
                special: true
            },
            {
                src: 'assets/images/her eating pizza (1).jpg',
                alt: 'Pizza moment 1',
                special: true
            },
            {
                src: 'assets/images/her eating pizza (2).jpg',
                alt: 'Pizza moment 2',
                special: true
            }
        ];
        
        this.isInitialized = false;
    }
    
    initializeCollage() {
        if (this.isInitialized) return;
        
        const collageContainer = document.getElementById('photoCollage');
        if (!collageContainer) return;
        
        this.isInitialized = true;
        
        // Add loading state
        collageContainer.innerHTML = '<div class="collage-loading">Loading our memories, bubu...</div>';
        
        // Simulate loading delay for dramatic effect
        setTimeout(() => {
            this.createCollage(collageContainer);
        }, 800);
    }
    
    createCollage(container) {
        container.innerHTML = '';
        container.classList.add('fade-in');
        
        this.collageImages.forEach((imageData, index) => {
            const collageItem = this.createCollageItem(imageData, index);
            container.appendChild(collageItem);
            
            // Animate items in sequence
            setTimeout(() => {
                collageItem.classList.add('animate-in');
            }, index * 200);
        });
        
        // Add interaction effects after all items are loaded
        setTimeout(() => {
            this.setupCollageInteractions();
        }, this.collageImages.length * 200 + 500);
    }
    
    createCollageItem(imageData, index) {
        const item = document.createElement('div');
        item.className = 'collage-item';
        
        if (imageData.special) {
            item.classList.add('special');
        }
        
        const img = document.createElement('img');
        img.className = 'collage-image';
        img.src = imageData.src;
        img.alt = imageData.alt;
        img.loading = 'lazy';
        
        // Handle image load errors gracefully
        img.onerror = () => {
            console.warn(`Failed to load image: ${imageData.src}`);
            item.innerHTML = `
                <div class="collage-placeholder">
                    <span>💕</span>
                    <p>Memory loading...</p>
                </div>
            `;
        };
        
        // Add image load success handler
        img.onload = () => {
            item.classList.add('loaded');
        };
        
        item.appendChild(img);
        return item;
    }
    
    setupCollageInteractions() {
        const collageItems = document.querySelectorAll('.collage-item');
        
        collageItems.forEach((item, index) => {
            // Click to focus/expand
            item.addEventListener('click', () => {
                this.focusImage(item, index);
            });
            
            // Double-click for special effect
            item.addEventListener('dblclick', () => {
                this.addHeartEffect(item);
            });
            
            // Touch support for mobile
            let touchStartTime = 0;
            item.addEventListener('touchstart', () => {
                touchStartTime = Date.now();
            });
            
            item.addEventListener('touchend', () => {
                const touchDuration = Date.now() - touchStartTime;
                if (touchDuration < 300) { // Quick tap
                    this.focusImage(item, index);
                } else if (touchDuration > 500) { // Long press
                    this.addHeartEffect(item);
                }
            });
        });
    }
    
    focusImage(item, index) {
        // Remove focus from other items
        document.querySelectorAll('.collage-item.focused').forEach(el => {
            el.classList.remove('focused');
        });
        
        // Focus this item
        item.classList.add('focused');
        
        // Add temporary highlight
        setTimeout(() => {
            item.classList.remove('focused');
        }, 2000);
        
        // Show image caption/message
        this.showImageMessage(index);
    }
    
    showImageMessage(index) {
        const messages = [
            "This is how I see you every day, bubu ✨",
            "Your smile lights up my world 💕",
            "Beautiful inside and out ❤️",
            "Pizza dates with you are the best dates, bubu 🍕",
            "Every moment with you is precious 💖"
        ];
        
        const message = messages[index] || "A beautiful memory ✨";
        
        // Create temporary message overlay
        const messageEl = document.createElement('div');
        messageEl.className = 'collage-message';
        messageEl.textContent = message;
        messageEl.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 1rem 2rem;
            border-radius: 25px;
            font-style: italic;
            z-index: 1000;
            animation: messageAppear 2s ease-out forwards;
        `;
        
        document.body.appendChild(messageEl);
        
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.parentNode.removeChild(messageEl);
            }
        }, 2000);
    }
    
    addHeartEffect(item) {
        // Create floating hearts
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.createFloatingHeart(item);
            }, i * 100);
        }
        
        // Add pulse effect to item
        item.classList.add('pulse');
        setTimeout(() => {
            item.classList.remove('pulse');
        }, 1000);
    }
    
    createFloatingHeart(parentItem) {
        const heart = document.createElement('div');
        heart.textContent = '❤️';
        heart.style.cssText = `
            position: absolute;
            font-size: 1.5rem;
            pointer-events: none;
            z-index: 100;
            animation: floatingHeart 2s ease-out forwards;
        `;
        
        // Position relative to parent item
        const rect = parentItem.getBoundingClientRect();
        heart.style.left = (rect.left + Math.random() * rect.width) + 'px';
        heart.style.top = (rect.top + Math.random() * rect.height) + 'px';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 2000);
    }
    
    // Method to add new images dynamically
    addImage(imageData) {
        this.collageImages.push(imageData);
        
        if (this.isInitialized) {
            const container = document.getElementById('photoCollage');
            const newItem = this.createCollageItem(imageData, this.collageImages.length - 1);
            container.appendChild(newItem);
            
            setTimeout(() => {
                newItem.classList.add('animate-in');
            }, 100);
        }
    }
    
    // Method to shuffle collage layout
    shuffleLayout() {
        const container = document.getElementById('photoCollage');
        const items = Array.from(container.children);
        
        // Shuffle array
        for (let i = items.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [items[i], items[j]] = [items[j], items[i]];
        }
        
        // Re-append in new order
        items.forEach(item => {
            container.appendChild(item);
        });
    }
}

// Add collage-specific CSS animations
const collageAnimationCSS = `
@keyframes messageAppear {
    0% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.8);
    }
    20% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
    }
    80% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
    }
    100% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.9);
    }
}

@keyframes floatingHeart {
    0% {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
    100% {
        opacity: 0;
        transform: translateY(-100px) scale(1.5);
    }
}

.collage-item.focused {
    transform: scale(1.1) rotate(0deg) !important;
    z-index: 50;
    box-shadow: 0 15px 40px rgba(255, 105, 180, 0.6) !important;
}

.collage-item.loaded {
    animation: itemLoaded 0.5s ease-out;
}

@keyframes itemLoaded {
    from {
        opacity: 0.5;
        filter: blur(2px);
    }
    to {
        opacity: 1;
        filter: blur(0);
    }
}

.collage-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 150px;
    background: rgba(255, 105, 180, 0.2);
    color: #FFB6C1;
    font-style: italic;
}

.collage-placeholder span {
    font-size: 2rem;
    margin-bottom: 0.5rem;
}
`;

// Inject collage animation CSS
const collageAnimationStyle = document.createElement('style');
collageAnimationStyle.textContent = collageAnimationCSS;
document.head.appendChild(collageAnimationStyle);

// Initialize collage controller when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.collageController = new CollageController();
    console.log('📸 Collage controller initialized!');
});