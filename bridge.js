// bridge.js - SINGLE FILE - Handles Botemia + Smart Display System
class MortgageBotemia {
    constructor() {
        this.widget = null;
        this.activeModule = null;
        this.init();
    }

    async init() {
        this.widget = document.querySelector('lemon-slice-widget');
        
        if (!this.widget) {
            setTimeout(() => this.init(), 500);
            return;
        }
        
        this.setupButton();
        this.initSmartDisplay();
        this.setupTriggerListeners();
        
        console.log('✅ Botemia + Smart Display ready');
    }
    
    setupButton() {
        const btn = document.getElementById('hero-botemia-btn');
        const status = document.getElementById('botemia-status');
        
        if (!btn) return;
        
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            
            if (status) {
                status.style.display = 'block';
                status.textContent = 'Starting mortgage assistant...';
            }
            
            try {
                this.widget.setAttribute('controlled-widget-state', 'active');
                await this.widget.unmute?.();
                await this.widget.micOn?.();
                
                if (status) {
                    status.textContent = '✅ Ready! Speak your question.';
                    setTimeout(() => {
                        status.style.display = 'none';
                    }, 2000);
                }
                
                console.log('✅ Botemia activated');
                
            } catch (error) {
                console.log('Error:', error);
                if (status) {
                    status.textContent = 'Please refresh page';
                    status.style.color = '#ff6b6b';
                }
            }
        });
    }

    // ===== SMART DISPLAY SYSTEM =====
    
    initSmartDisplay() {
        // Create container if it doesn't exist
        if (!document.getElementById('smart-display-container')) {
            const container = document.createElement('div');
            container.id = 'smart-display-container';
            container.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 80%;
                max-width: 800px;
                max-height: 80vh;
                background: white;
                border-radius: 12px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                z-index: 9999;
                display: none;
                overflow: hidden;
            `;
            document.body.appendChild(container);
        }
    }

    setupTriggerListeners() {
        // Listen for messages from Botemia
        window.addEventListener('message', (event) => {
            if (event.data?.source === 'lemon-slice') {
                this.handleBotemiaMessage(event.data);
            }
        });

        // Monitor conversation for keywords
        this.monitorConversation();
    }

    monitorConversation() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    const messages = document.querySelectorAll('.lemon-slice-message, [class*="message"]');
                    messages.forEach((msg) => {
                        this.checkMessageForTriggers(msg.textContent);
                    });
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    checkMessageForTriggers(text) {
        if (!text) return;
        
        const lowerText = text.toLowerCase();
        
        const triggers = {
            'testimonial': ['testimonial', 'success story', 'what others say', 'proof', 'results'],
            'prequalify': ['prequalify', 'get pre-qualified', 'loan approval', 'qualify'],
            'call': ['call', 'phone', 'talk to someone', 'speak with'],
            'leadmagnet': ['free guide', 'download', 'resource', 'ebook', 'report'],
            'consultation': ['consultation', 'schedule', 'appointment', 'meeting']
        };

        for (const [module, keywords] of Object.entries(triggers)) {
            if (keywords.some(keyword => lowerText.includes(keyword))) {
                this.showModule(module);
                break;
            }
        }
    }

    handleBotemiaMessage(data) {
        console.log('Botemia message:', data);
        
        const commandMap = {
            'show_testimonial': 'testimonial',
            'show_prequalify': 'prequalify',
            'show_call': 'call',
            'show_lead_magnet': 'leadmagnet',
            'show_consultation': 'consultation'
        };

        const moduleName = commandMap[data.command] || data.command;
        if (moduleName) {
            this.showModule(moduleName, data.data);
        }
    }

    showModule(moduleName, data = {}) {
        console.log(`🎯 Showing module: ${moduleName}`);
        
        const container = document.getElementById('smart-display-container');
        container.innerHTML = '';
        
        let content = '';
        
        if (moduleName === 'testimonial') {
            content = this.buildTestimonialModule();
        } else {
            content = this.buildImageModule(moduleName);
        }
        
        container.innerHTML = content;
        container.style.display = 'block';
        
        const closeBtn = container.querySelector('.close-module');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hideModule());
        }

        this.activeModule = moduleName;
        this.signalToBotemia('module_opened', { module: moduleName });
    }

    buildTestimonialModule() {
        return `
            <div style="position: relative; height: 100%;">
                <button class="close-module" style="
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    z-index: 10;
                    background: #ff4444;
                    color: white;
                    border: none;
                    border-radius: 50%;
                    width: 35px;
                    height: 35px;
                    font-size: 20px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                ">✕</button>
                
                <div style="padding: 30px;">
                    <h2 style="margin-top: 0; color: #333;">Success Stories</h2>
                    
                    <div style="
                        background: #000;
                        border-radius: 8px;
                        overflow: hidden;
                        margin: 20px 0;
                        position: relative;
                        padding-top: 56.25%;
                    ">
                        <div style="
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            background: #1a1a1a;
                            color: white;
                        ">
                            <p>🎥 Testimonial video player will go here</p>
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 10px; justify-content: center;">
                        <button style="padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">Previous</button>
                        <button style="padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">Next</button>
                    </div>
                </div>
            </div>
        `;
    }

    buildImageModule(moduleName) {
        const config = {
            'prequalify': { title: 'Get Pre-Qualified', image: '/images/prequalify.jpg' },
            'call': { title: 'Talk to a Specialist', image: '/images/phone-icon.jpg' },
            'leadmagnet': { title: 'Free Mortgage Guide', image: '/images/download-guide.jpg' },
            'consultation': { title: 'Schedule a Consultation', image: '/images/calendar.jpg' }
        };

        const moduleConfig = config[moduleName] || { title: moduleName, image: '/images/default.jpg' };

        return `
            <div style="position: relative;">
                <button class="close-module" style="
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    z-index: 10;
                    background: #ff4444;
                    color: white;
                    border: none;
                    border-radius: 50%;
                    width: 35px;
                    height: 35px;
                    font-size: 20px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                ">✕</button>
                
                <div style="padding: 30px; text-align: center;">
                    <h2 style="margin-top: 0; color: #333;">${moduleConfig.title}</h2>
                    
                    <div style="
                        margin: 20px 0;
                        min-height: 250px;
                        background: #f5f5f5;
                        border-radius: 8px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border: 2px dashed #ccc;
                    ">
                        <img src="${moduleConfig.image}" 
                             alt="${moduleConfig.title}"
                             style="max-width: 100%; max-height: 300px; border-radius: 4px;"
                             onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'200\\' height=\\'200\\' viewBox=\\'0 0 200 200\\'><rect width=\\'200\\' height=\\'200\\' fill=\\'%23e0e0e0\\'/><text x=\\'50%\\' y=\\'50%\\' dominant-baseline=\\'middle\\' text-anchor=\\'middle\\' fill=\\'%23999\\' font-family=\\'Arial\\' font-size=\\'16\\'>${moduleConfig.title}</text></svg>'">
                    </div>
                    
                    <button style="
                        padding: 12px 30px;
                        background: linear-gradient(135deg, #667eea, #764ba2);
                        color: white;
                        border: none;
                        border-radius: 25px;
                        font-size: 16px;
                        cursor: pointer;
                        margin-top: 10px;
                    " onclick="this.innerText='Coming Soon!'">
                        Get Started
                    </button>
                </div>
            </div>
        `;
    }

    hideModule() {
        const container = document.getElementById('smart-display-container');
        container.style.display = 'none';
        this.activeModule = null;
        this.signalToBotemia('module_closed', {});
    }

    signalToBotemia(command, data) {
        if (this.widget?.contentWindow) {
            this.widget.contentWindow.postMessage({
                source: 'mortgage-botemia',
                command: command,
                data: data
            }, '*');
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    window.mortgageBotemia = new MortgageBotemia();
});

// Manual test functions
window.testModule = function(moduleName = 'testimonial') {
    if (window.mortgageBotemia) {
        window.mortgageBotemia.showModule(moduleName);
    }
};

window.testAllModules = function() {
    const modules = ['testimonial', 'prequalify', 'call', 'leadmagnet', 'consultation'];
    let i = 0;
    
    const interval = setInterval(() => {
        if (i < modules.length) {
            console.log(`Testing: ${modules[i]}`);
            window.mortgageBotemia.showModule(modules[i]);
            i++;
        } else {
            clearInterval(interval);
        }
    }, 2000);
};