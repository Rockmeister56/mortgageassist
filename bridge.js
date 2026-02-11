// bridge.js - Clean minimal version
class MortgageBotemia {
    constructor() {
        this.widget = null;
        this.init();
    }

    async init() {
        // Find widget
        this.widget = document.querySelector('lemon-slice-widget');
        
        if (!this.widget) {
            setTimeout(() => this.init(), 500);
            return;
        }
        
        this.setupButton();
    }
    
    setupButton() {
        const btn = document.getElementById('hero-botemia-btn');
        const status = document.getElementById('botemia-status');
        
        if (!btn) return;
        
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            
            // Show status
            if (status) {
                status.style.display = 'block';
                status.textContent = 'Starting...';
            }
            
            try {
                // 1. Open widget
                this.widget.setAttribute('controlled-widget-state', 'active');
                
                // 2. Unmute audio
                await this.widget.unmute?.();
                
                // 3. Activate mic
                await this.widget.micOn?.();
                
                // 4. Send greeting
                setTimeout(() => {
                    this.widget.sendMessage?.("Hello! How can I help with your mortgage?");
                }, 1000);
                
                // Update status
                if (status) {
                    status.textContent = '✅ Ready to help!';
                    setTimeout(() => {
                        status.style.display = 'none';
                    }, 2000);
                }
                
            } catch (error) {
                console.log('Error:', error);
                if (status) {
                    status.textContent = 'Please refresh page';
                    status.style.color = '#ff6b6b';
                }
            }
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new MortgageBotemia();
});