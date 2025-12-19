// Candle Controller - Manages the 30 birthday candles
class CandleController {
    constructor() {
        this.totalCandles = 30;
        this.litCandles = 0;
        this.candles = [];
        
        this.init();
    }
    
    init() {
        this.createCandles();
        this.setupCandleEffects();
    }
    
    createCandles() {
        const candlesContainer = document.getElementById('candlesContainer');
        
        // Clear existing candles
        candlesContainer.innerHTML = '';
        
        // Create 30 candles in a nice arrangement
        for (let i = 0; i < this.totalCandles; i++) {
            const candle = document.createElement('div');
            candle.className = 'candle';
            candle.id = `candle-${i}`;
            candle.dataset.candleIndex = i;
            
            // Position candles in rows
            this.positionCandle(candle, i);
            
            candlesContainer.appendChild(candle);
            this.candles.push(candle);
        }
    }
    
    positionCandle(candle, index) {
        // Arrange candles in 3 rows: 12, 10, 8 candles
        const rows = [
            { count: 12, startIndex: 0 },
            { count: 10, startIndex: 12 },
            { count: 8, startIndex: 22 }
        ];
        
        let row = 0;
        let positionInRow = index;
        
        // Determine which row this candle belongs to
        for (let i = 0; i < rows.length; i++) {
            if (index < rows[i].startIndex + rows[i].count) {
                row = i;
                positionInRow = index - rows[i].startIndex;
                break;
            }
        }
        
        // Calculate position
        const rowWidth = rows[row].count;
        const spacing = 100 / (rowWidth + 1); // Percentage spacing
        const left = spacing * (positionInRow + 1);
        const top = row * 8; // 8px between rows
        
        candle.style.position = 'absolute';
        candle.style.left = `${left}%`;
        candle.style.top = `${top}px`;
        candle.style.transform = 'translateX(-50%)';
        
        // Add slight random variation for natural look
        const randomOffset = (Math.random() - 0.5) * 2; // -1 to 1px
        candle.style.left = `calc(${left}% + ${randomOffset}px)`;
    }
    
    setupCandleEffects() {
        // Add click interaction to candles
        this.candles.forEach((candle, index) => {
            candle.addEventListener('click', () => {
                this.toggleCandle(index);
            });
            
            // Add hover effect
            candle.addEventListener('mouseenter', () => {
                if (!candle.classList.contains('lit')) {
                    candle.style.opacity = '0.6';
                }
            });
            
            candle.addEventListener('mouseleave', () => {
                if (!candle.classList.contains('lit')) {
                    candle.style.opacity = '0.3';
                }
            });
        });
    }
    
    lightCandles(count) {
        const targetCount = Math.min(count, this.totalCandles);
        
        // Light candles progressively with animation
        for (let i = 0; i < targetCount; i++) {
            if (!this.candles[i].classList.contains('lit')) {
                setTimeout(() => {
                    this.lightCandle(i);
                }, i * 100); // Stagger the lighting
            }
        }
        
        this.litCandles = targetCount;
    }
    
    lightCandle(index) {
        if (index >= 0 && index < this.candles.length) {
            const candle = this.candles[index];
            candle.classList.add('lit');
            
            // Add lighting sound effect (if audio is enabled)
            this.playLightingSound();
            
            // Add special effect for milestone candles
            if (this.isMilestoneCandle(index)) {
                this.addMilestoneEffect(candle);
            }
        }
    }
    
    toggleCandle(index) {
        const candle = this.candles[index];
        if (candle.classList.contains('lit')) {
            this.extinguishCandle(index);
        } else {
            this.lightCandle(index);
        }
    }
    
    extinguishCandle(index) {
        if (index >= 0 && index < this.candles.length) {
            const candle = this.candles[index];
            candle.classList.remove('lit');
            this.litCandles = Math.max(0, this.litCandles - 1);
        }
    }
    
    lightAllCandles() {
        this.candles.forEach((candle, index) => {
            setTimeout(() => {
                this.lightCandle(index);
            }, index * 50); // Faster lighting for final reveal
        });
        
        this.litCandles = this.totalCandles;
        
        // Special celebration effect when all candles are lit
        setTimeout(() => {
            this.celebrateAllCandles();
        }, this.totalCandles * 50 + 500);
    }
    
    celebrateAllCandles() {
        // Make all candles flicker in unison briefly
        this.candles.forEach(candle => {
            candle.classList.add('celebrate');
        });
        
        setTimeout(() => {
            this.candles.forEach(candle => {
                candle.classList.remove('celebrate');
            });
        }, 2000);
    }
    
    isMilestoneCandle(index) {
        // Special candles: 1st, 10th, 20th, 30th
        return [0, 9, 19, 29].includes(index);
    }
    
    addMilestoneEffect(candle) {
        candle.classList.add('milestone');
        setTimeout(() => {
            candle.classList.remove('milestone');
        }, 3000);
    }
    
    playLightingSound() {
        // Create a subtle audio cue (optional)
        if (typeof Audio !== 'undefined') {
            try {
                // Create a simple beep using Web Audio API
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.1);
            } catch (e) {
                // Audio not supported or blocked
            }
        }
    }
    
    // Method to get current lighting progress
    getProgress() {
        return this.litCandles / this.totalCandles;
    }
    
    // Method to reset all candles
    reset() {
        this.candles.forEach(candle => {
            candle.classList.remove('lit', 'celebrate', 'milestone');
        });
        this.litCandles = 0;
    }
}

// Add milestone and celebration CSS
const candleCSS = `
.candle.milestone {
    animation: milestoneGlow 3s ease-in-out;
}

@keyframes milestoneGlow {
    0%, 100% { 
        filter: brightness(1);
        transform: scale(1);
    }
    50% { 
        filter: brightness(1.5) drop-shadow(0 0 10px #FFD700);
        transform: scale(1.1);
    }
}

.candle.celebrate {
    animation: celebrate 2s ease-in-out infinite;
}

@keyframes celebrate {
    0%, 100% { transform: scale(1) rotate(0deg); }
    25% { transform: scale(1.05) rotate(1deg); }
    50% { transform: scale(1.1) rotate(0deg); }
    75% { transform: scale(1.05) rotate(-1deg); }
}

.candles-container {
    position: relative;
    width: 120px;
    height: 30px;
}

@media (max-width: 768px) {
    .candles-container {
        width: 100px;
        height: 25px;
    }
    
    .candle {
        width: 2px;
        height: 15px;
    }
}
`;

// Inject candle CSS
const candleStyle = document.createElement('style');
candleStyle.textContent = candleCSS;
document.head.appendChild(candleStyle);

// Initialize candle controller when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.candleController = new CandleController();
    console.log('🕯️ Candle controller initialized!');
});