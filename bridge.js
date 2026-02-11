// bridge.js - NO TEXT AT BOTTOM
class MortgageBotemia {
    constructor() {
        this.widget = null;
        this.init();
    }

    async init() {
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
                status.textContent = 'Starting mortgage assistant...';
            }
            
            try {
                // 1. Open widget
                this.widget.setAttribute('controlled-widget-state', 'active');
                
                // 2. Unmute audio FIRST
                await this.widget.unmute?.();
                
                // 3. Activate mic
                await this.widget.micOn?.();
                
                // 4. DO NOT send message - let Botemia's default audio play
                // (Her default greeting will play automatically when mic activates)
                
                // 5. Update status
                if (status) {
                    status.textContent = '✅ Ready! Speak your question.';
                    setTimeout(() => {
                        status.style.display = 'none';
                    }, 2000);
                }
                
                console.log('✅ Botemia activated - audio only, no text');
                
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