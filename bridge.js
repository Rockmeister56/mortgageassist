// bridge.js - ONLY REMOVES INTRO TEXT
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
        this.hideIntroText();
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
                
                // 2. Hide intro text immediately
                this.hideIntroText();
                
                // 3. Unmute audio
                await this.widget.unmute?.();
                
                // 4. Activate mic
                await this.widget.micOn?.();
                
                // 5. Send our greeting (replaces default)
                setTimeout(() => {
                    this.widget.sendMessage?.("Hello! I'm your mortgage assistant. How can I help with loans, rates, or documents?");
                    // Hide intro again after greeting
                    setTimeout(() => this.hideIntroText(), 500);
                }, 800);
                
                // 6. Keep checking for intro text (widget loads async)
                const checkInterval = setInterval(() => {
                    this.hideIntroText();
                }, 500);
                
                // Stop checking after 5 seconds
                setTimeout(() => clearInterval(checkInterval), 5000);
                
                // Update status
                if (status) {
                    status.textContent = '✅ Ready! Ask your question.';
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
    
    // Hide intro text function
    hideIntroText() {
        // Method 1: Target first chat message bubble
        const messageBubbles = document.querySelectorAll('[class*="message"], [class*="bubble"], [class*="chat"]');
        
        if (messageBubbles.length > 0) {
            // Hide the first message (intro text)
            const firstMessage = messageBubbles[0];
            if (firstMessage && 
                (firstMessage.textContent.includes('Hi') || 
                 firstMessage.textContent.includes('hello') ||
                 firstMessage.textContent.includes('I\'m') ||
                 firstMessage.textContent.length < 100)) { // Short intro messages
                firstMessage.style.display = 'none';
                firstMessage.style.visibility = 'hidden';
                firstMessage.style.height = '0';
                firstMessage.style.opacity = '0';
                firstMessage.style.margin = '0';
                firstMessage.style.padding = '0';
            }
        }
        
        // Method 2: Hide by LemonSlice class patterns
        document.querySelectorAll('[class*="lemonslice"]').forEach(el => {
            const text = el.textContent || '';
            if (text.includes('Hi I\'m') || text.includes('I\'m here to help')) {
                el.style.display = 'none';
            }
        });
        
        // Method 3: Hide first child of chat container
        const chatContainers = document.querySelectorAll('[class*="chat-container"], [class*="messages"]');
        chatContainers.forEach(container => {
            if (container.firstElementChild) {
                container.firstElementChild.style.display = 'none';
            }
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new MortgageBotemia();
});