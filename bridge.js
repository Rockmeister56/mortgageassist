// bridge.js - SINGLE FILE - Handles Botemia + Smart Display System with Supabase Config
class MortgageBotemia {
    constructor() {
        this.widget = null;
        this.activeModule = null;
        this.config = null;
        this.supabase = null;
        this.clientId = 'mortgage-assist-demo'; // You can make this dynamic
        this.init();
    }

    async init() {
        // Initialize Supabase
        this.initSupabase();
        
        // Load config first
        await this.loadConfig();
        
        this.widget = document.querySelector('lemon-slice-widget');
        
        if (!this.widget) {
            setTimeout(() => this.init(), 500);
            return;
        }
        
        this.setupButton();
        this.initSmartDisplay();
        this.setupTriggerListeners();
        
        console.log('✅ Botemia + Smart Display ready with config');
    }

    initSupabase() {
        // Initialize Supabase client
        this.supabase = window.supabase?.createClient 
            ? window.supabase.createClient(
                'https://fcgbusobfdwnpoqyuzoe.supabase.co',
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjZ2J1c29iZmR3bnBvcXl1em9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzNDA2MjMsImV4cCI6MjA4NTkxNjYyM30.FHEZnxuGHSn_Z3gw9d_Txtfz5Jn55J6qonl8rnA3gPk'
            )
            : null;
            
        if (!this.supabase) {
            console.warn('Supabase not available, using fallback config');
        }
    }

    async loadConfig() {
        try {
            // Try to fetch from Supabase first
            if (this.supabase) {
                const { data, error } = await this.supabase
                    .from('clients')
                    .select('metadata')
                    .eq('name', 'Mortgage Assist Demo')
                    .single();

                if (!error && data?.metadata?.config) {
                    this.config = data.metadata.config;
                    console.log('✅ Config loaded from Supabase:', this.config.name);
                    return;
                }
            }
            
            // Fallback to hardcoded config for testing
            console.log('Using fallback config');
            this.config = this.getDefaultConfig();
            
        } catch (error) {
            console.error('Error loading config:', error);
            this.config = this.getDefaultConfig();
        }
    }

    getDefaultConfig() {
        return {
            "id": "mortgage-assist-demo",
            "name": "Mortgage Assist Demo",
            "modules": {
                "testimonial": {
                    "triggers": [
                        "success story",
                        "what others say",
                        "show me proof",
                        "results",
                        "testimonial"
                    ],
                    "action": "showTestimonialPlayer",
                    "displayType": "video"
                },
                "videoVault": {
                    "triggers": [
                        "how it works",
                        "show me a demo",
                        "explain the process",
                        "how does it work"
                    ],
                    "action": "showVideoGallery",
                    "displayType": "video"
                },
                "visualProof": {
                    "triggers": [
                        "show me an example",
                        "before after",
                        "success story",
                        "credit repair example"
                    ],
                    "action": "showBestMatch",
                    "displayType": "image",
                    "images": [
                        {
                            "name": "Sarah's Success",
                            "url": "https://xyz.supabase.co/storage/v1/object/public/botemia/sarah-580.jpg",
                            "caption": "580 credit → closed FHA 3.5% down",
                            "triggerMatch": ["sarah", "580", "bad credit"]
                        }
                    ]
                },
                "smartScreen": {
                    "triggers": [
                        "prequalify",
                        "get pre-qualified",
                        "call",
                        "phone",
                        "talk to someone",
                        "free guide",
                        "download",
                        "consultation",
                        "schedule"
                    ],
                    "displayType": "image",
                    "images": [
                        {
                            "name": "prequalify",
                            "url": "/images/prequalify.jpg",
                            "caption": "Get Pre-Qualified Today",
                            "triggers": ["prequalify", "qualify"]
                        },
                        {
                            "name": "call",
                            "url": "/images/phone-icon.jpg",
                            "caption": "Talk to a Specialist",
                            "triggers": ["call", "phone", "talk"]
                        },
                        {
                            "name": "leadMagnet",
                            "url": "/images/download-guide.jpg",
                            "caption": "Free Home Buyer Guide",
                            "triggers": ["free guide", "download"]
                        },
                        {
                            "name": "consultation",
                            "url": "/images/calendar.jpg",
                            "caption": "Schedule Your Consultation",
                            "triggers": ["consultation", "schedule"]
                        }
                    ]
                },
                "websiteInfo": {
                    "triggers": [
                        "rates page",
                        "loan programs",
                        "about us",
                        "contact",
                        "FAQs",
                        "learn more"
                    ],
                    "displayType": "web"
                }
            }
        };
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
        window.addEventListener('message', (event) => {
            if (event.data?.source === 'lemon-slice') {
                this.handleBotemiaMessage(event.data);
            }
        });

        this.monitorConversation();
    }

    monitorConversation() {
        setInterval(() => {
            const messages = document.querySelectorAll('[class*="message"], [class*="chat-bubble"]');
            messages.forEach((msg) => {
                if (msg.textContent && !msg.hasAttribute('data-checked')) {
                    msg.setAttribute('data-checked', 'true');
                    this.checkMessageForTriggers(msg.textContent);
                }
            });
        }, 1000);
    }

    checkMessageForTriggers(text) {
        if (!text || !this.config) return;
        
        const lowerText = text.toLowerCase();
        
        // Check each module's triggers
        for (const [moduleName, moduleConfig] of Object.entries(this.config.modules)) {
            const triggers = moduleConfig.triggers || [];
            if (triggers.some(trigger => lowerText.includes(trigger.toLowerCase()))) {
                this.showModule(moduleName, moduleConfig);
                break;
            }
        }
    }

    handleBotemiaMessage(data) {
        console.log('Botemia message:', data);
        // Handle direct commands if needed
    }

    showModule(moduleName, moduleConfig) {
        console.log(`🎯 Showing module: ${moduleName}`);
        
        const container = document.getElementById('smart-display-container');
        container.innerHTML = '';
        
        let content = '';
        
        switch(moduleConfig.displayType) {
            case 'video':
                content = this.buildVideoModule(moduleConfig);
                break;
            case 'image':
                content = this.buildImageModule(moduleConfig, moduleName);
                break;
            case 'web':
                content = this.buildWebModule(moduleConfig);
                break;
            default:
                content = this.buildFallbackModule(moduleName);
        }
        
        container.innerHTML = content;
        container.style.display = 'block';
        
        const closeBtn = container.querySelector('.close-module');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hideModule());
        }
    }

    buildVideoModule(config) {
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
                    border: none;
                ">✕</button>
                
                <div style="padding: 30px;">
                    <h2 style="margin-top: 0; color: #333;">Video Content</h2>
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
                            <p>🎥 Video player coming soon</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    buildImageModule(config, moduleName) {
        // Find the right image based on trigger or use first
        const image = config.images?.[0] || { 
            name: moduleName,
            url: '/images/placeholder.jpg',
            caption: moduleName
        };

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
                    border: none;
                ">✕</button>
                
                <div style="padding: 30px; text-align: center;">
                    <h2 style="margin-top: 0; color: #333;">${image.caption || image.name}</h2>
                    
                    <div style="
                        margin: 20px 0;
                        min-height: 250px;
                        background: #f5f5f5;
                        border-radius: 8px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    ">
                        <img src="${image.url}" 
                             alt="${image.name}"
                             style="max-width: 100%; max-height: 300px; border-radius: 4px;"
                             onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'200\\' height=\\'200\\' viewBox=\\'0 0 200 200\\'><rect width=\\'200\\' height=\\'200\\' fill=\\'%23e0e0e0\\'/><text x=\\'50%\\' y=\\'50%\\' dominant-baseline=\\'middle\\' text-anchor=\\'middle\\' fill=\\'%23999\\' font-family=\\'Arial\\' font-size=\\'16\\'>${image.name}</text></svg>'">
                    </div>
                </div>
            </div>
        `;
    }

    buildWebModule(config) {
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
                    border: none;
                ">✕</button>
                
                <div style="padding: 30px; text-align: center;">
                    <h2 style="margin-top: 0; color: #333;">Website Information</h2>
                    <p style="color: #666;">Web navigation module coming soon</p>
                </div>
            </div>
        `;
    }

    buildFallbackModule(moduleName) {
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
                    border: none;
                ">✕</button>
                
                <div style="padding: 30px; text-align: center;">
                    <h2 style="margin-top: 0; color: #333;">${moduleName}</h2>
                    <p>Module under construction</p>
                </div>
            </div>
        `;
    }

    hideModule() {
        const container = document.getElementById('smart-display-container');
        if (container) {
            container.style.display = 'none';
        }
        this.activeModule = null;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.mortgageBotemia = new MortgageBotemia();
});

// Manual test functions
window.testModule = function(moduleName = 'testimonial') {
    if (window.mortgageBotemia?.config) {
        const moduleConfig = window.mortgageBotemia.config.modules[moduleName];
        if (moduleConfig) {
            window.mortgageBotemia.showModule(moduleName, moduleConfig);
        } else {
            console.log(`Module ${moduleName} not found in config`);
        }
    } else {
        console.log('⏳ MortgageBotemia not ready yet, retrying...');
        setTimeout(() => window.testModule(moduleName), 1000);
    }
};

window.testAllModules = function() {
    if (!window.mortgageBotemia?.config) {
        console.log('⏳ Waiting for config...');
        setTimeout(testAllModules, 1000);
        return;
    }
    
    const modules = Object.keys(window.mortgageBotemia.config.modules);
    let i = 0;
    
    console.log('🎬 Testing all modules:', modules);
    
    const interval = setInterval(() => {
        if (i < modules.length) {
            const moduleName = modules[i];
            console.log(`Testing: ${moduleName}`);
            window.testModule(moduleName);
            i++;
        } else {
            clearInterval(interval);
            console.log('✅ Test complete');
        }
    }, 2000);
};