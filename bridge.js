// File: bridge.js - SIMPLIFIED VERSION
class BotemiaHeroController {
    constructor() {
        this.widget = null;
        this.isMicActive = false;
    }

    // Initialize when page loads
    init() {
        console.log('🔧 Setting up Botemia Hero Controller');
        
        // Find widget (poll for it since it loads async)
        const findWidget = () => {
            this.widget = document.querySelector('lemon-slice-widget');
            
            if (this.widget) {
                console.log('✅ Botemia widget found');
                this.setupHeroButton();
            } else {
                setTimeout(findWidget, 500);
            }
        };
        
        findWidget();
    }

    // Setup the hero button
    setupHeroButton() {
        const heroBtn = document.getElementById('hero-botemia-btn');
        const statusDiv = document.getElementById('botemia-status');
        
        if (!heroBtn) {
            console.log('❌ Hero button not found');
            return;
        }

        heroBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            console.log('🎯 Hero button clicked - activating Botemia');
            
            // Show status
            if (statusDiv) {
                statusDiv.style.display = 'block';
                statusDiv.textContent = 'Activating Botemia...';
            }
            
            try {
                // 1. Expand avatar (skip minimized state)
                this.widget.setAttribute('controlled-widget-state', 'active');
                console.log('📱 Avatar expanded');
                
                // 2. Wait briefly for animation
                await this.sleep(800);
                
                // 3. Activate microphone (skips intro)
                await this.widget.micOn();
                this.isMicActive = true;
                console.log('🎤 Microphone activated');
                
                // 4. Update status
                if (statusDiv) {
                    statusDiv.textContent = 'Botemia is listening...';
                    setTimeout(() => {
                        statusDiv.style.display = 'none';
                    }, 2000);
                }
                
                // 5. Optional: Send quick message
                setTimeout(async () => {
                    try {
                        await this.widget.sendMessage("Hi! I'm ready to help with your mortgage questions. What would you like to know?");
                    } catch (e) {
                        // Ignore if message fails
                    }
                }, 1000);
                
            } catch (error) {
                console.log('❌ Error activating Botemia:', error);
                if (statusDiv) {
                    statusDiv.textContent = 'Error - please refresh page';
                    statusDiv.style.color = '#ff6b6b';
                }
            }
        });
    }

    // Helper: sleep function
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
    window.botemiaController = new BotemiaHeroController();
    window.botemiaController.init();
});