// Bubu Images Controller - Manages the progressive appearance of bubu images
class BubuController {
    constructor() {
        this.container = document.getElementById('bubuContainer');
        this.imagePath = 'assets/images/bubududu-removebg-preview.png';
        this.bubuImages = [];
        this.totalImages = 30; // Final slide will have 30 images
        this.currentVisibleCount = 0;
        
        this.init();
    }
    
    init() {
        this.createAllBubuImages();
    }
    
    createAllBubuImages() {
        // Create all 30 bubu images but keep them hidden initially
        for (let i = 0; i < this.totalImages; i++) {
            const bubuDiv = document.createElement('div');
            bubuDiv.className = 'bubu-image';
            bubuDiv.id = `bubu-${i}`;
            
            const img = document.createElement('img');
            img.src = this.imagePath;
            img.alt = 'Bubu';
            img.loading = 'lazy';
            
            // Handle image load errors gracefully
            img.onerror = () => {
                console.warn(`Failed to load bubu image: ${this.imagePath}`);
                bubuDiv.style.display = 'none';
            };
            
            bubuDiv.appendChild(img);
            
            // Position and style each image randomly
            this.positionBubuImage(bubuDiv, i);
            
            this.container.appendChild(bubuDiv);
            this.bubuImages.push(bubuDiv);
        }
    }
    
    positionBubuImage(bubuDiv, index) {
        // Random positioning across the viewport
        const positions = this.generatePositions();
        const position = positions[index % positions.length];
        
        // Apply position
        bubuDiv.style.top = position.top;
        bubuDiv.style.left = position.left;
        
        // Random rotation (-30 to 30 degrees)
        const rotation = (Math.random() - 0.5) * 60;
        
        // Random size (25px to 45px)
        const size = 25 + Math.random() * 20;
        
        // Random animation delay
        const delay = Math.random() * 4;
        
        bubuDiv.style.transform = `rotate(${rotation}deg)`;
        bubuDiv.style.width = `${size}px`;
        bubuDiv.style.animationDelay = `${delay}s`;
        
        // Add some variety to positioning for overlapping prevention
        const offsetX = (Math.random() - 0.5) * 100;
        const offsetY = (Math.random() - 0.5) * 100;
        bubuDiv.style.marginLeft = `${offsetX}px`;
        bubuDiv.style.marginTop = `${offsetY}px`;
    }
    
    generatePositions() {
        // Pre-defined positions to ensure good distribution
        return [
            { top: '10%', left: '15%' },
            { top: '20%', left: '80%' },
            { top: '35%', left: '25%' },
            { top: '45%', left: '70%' },
            { top: '60%', left: '10%' },
            { top: '75%', left: '85%' },
            { top: '15%', left: '50%' },
            { top: '30%', left: '90%' },
            { top: '50%', left: '5%' },
            { top: '70%', left: '60%' },
            { top: '85%', left: '30%' },
            { top: '25%', left: '40%' },
            { top: '40%', left: '15%' },
            { top: '55%', left: '75%' },
            { top: '80%', left: '50%' },
            { top: '5%', left: '65%' },
            { top: '65%', left: '35%' },
            { top: '90%', left: '80%' },
            { top: '12%', left: '30%' },
            { top: '28%', left: '60%' },
            { top: '42%', left: '85%' },
            { top: '58%', left: '20%' },
            { top: '72%', left: '45%' },
            { top: '88%', left: '70%' },
            { top: '18%', left: '75%' },
            { top: '38%', left: '55%' },
            { top: '52%', left: '90%' },
            { top: '68%', left: '25%' },
            { top: '82%', left: '65%' },
            { top: '95%', left: '40%' }
        ];
    }
    
    showBubuImages(slideNumber) {
        // Calculate how many images to show based on slide
        let targetCount;
        
        switch(slideNumber) {
            case 0: // Password slide
                targetCount = 0;
                break;
            case 1: // Welcome slide
                targetCount = 3;
                break;
            case 2: // Eating slide
                targetCount = 6;
                break;
            case 3: // Sleeping slide
                targetCount = 10;
                break;
            case 4: // Creating slide
                targetCount = 15;
                break;
            case 5: // Hair slide
                targetCount = 20;
                break;
            case 6: // Final slide
                targetCount = 30;
                break;
            default:
                targetCount = Math.min(slideNumber * 4, 30);
        }
        
        // Show images progressively with staggered animation
        for (let i = this.currentVisibleCount; i < targetCount; i++) {
            if (i < this.bubuImages.length) {
                setTimeout(() => {
                    this.bubuImages[i].classList.add('visible');
                }, (i - this.currentVisibleCount) * 200);
            }
        }
        
        this.currentVisibleCount = targetCount;
    }
    
    hideAllBubuImages() {
        this.bubuImages.forEach(img => {
            img.classList.remove('visible');
        });
        this.currentVisibleCount = 0;
    }
    
    // Special effect for final slide
    celebrateBubu() {
        // Make all bubu images pulse and glow
        this.bubuImages.forEach((img, index) => {
            setTimeout(() => {
                img.classList.add('pulse', 'glow');
            }, index * 50);
        });
        
        // Remove effects after celebration
        setTimeout(() => {
            this.bubuImages.forEach(img => {
                img.classList.remove('pulse', 'glow');
            });
        }, 5000);
    }
    
    // Method to add special hover effects
    addInteractivity() {
        this.bubuImages.forEach(img => {
            img.style.pointerEvents = 'auto';
            img.style.cursor = 'pointer';
            
            img.addEventListener('click', () => {
                // Add a little bounce effect when clicked
                img.style.animation = 'none';
                setTimeout(() => {
                    img.style.animation = '';
                    img.classList.add('pulse');
                    setTimeout(() => {
                        img.classList.remove('pulse');
                    }, 1000);
                }, 10);
            });
        });
    }
}

// Initialize bubu controller when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.bubuController = new BubuController();
    console.log('🥰 Bubu images initialized!');
});