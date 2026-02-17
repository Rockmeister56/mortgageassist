// Botemia Bridge for Mortgage Assist Demo
// Generated: 2/16/2026, 3:54:10 PM
// Client ID: mortgage-assist-demo
// Version: 5.0 - FULL SMART SCREEN WITH BACKDROP

(function() {
    "use strict";

    // ===== EMBEDDED CLIENT CONFIGURATION =====
    window.BotemiaConfig = {
    "id": "mortgage-assist-demo",
    "name": "Mortgage Assist Demo",
    "agentId": "",
    "widgetId": "",
    "apiKey": "",
    "environment": "production",
    "industry": "mortgage",
    "modules": {
        "testimonial": {
            "triggers": [
                "rates",
                "pre-approval",
                "credit score",
                "down payment",
                "closing costs",
                "fha",
                "va",
                "usda",
                "interest rate",
                "mortgage insurance",
                "pmi",
                "dti",
                "debt to income",
                "first-time buyer"
            ],
            "action": "showTestimonialPlayer",
            "group": "auto"
        },
        "videoVault": {
            "triggers": [
                "how to apply",
                "loan process",
                "closing timeline",
                "documents needed",
                "first-time buyer",
                "what is escrow",
                "appraisal",
                "underwriting",
                "pre-approval vs pre-qualification",
                "mortgage terms"
            ],
            "action": "showVideoGallery",
            "category": "auto"
        },
        "smartScreen": {
            "action": "showBestMatch",
            "images": [
                {
                    "name": "Botemia Intro",
                    "url": "https://fcgbusobfdwnpoqyuzoe.supabase.co/storage/v1/object/sign/Smart%20Screens%20Demo/botemia-intro.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wNjJjNGVkZS0wYzRiLTQyMzAtOGE5MC1jMDhmNjhlNDVkNTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTbWFydCBTY3JlZW5zIERlbW8vYm90ZW1pYS1pbnRyby5qcGciLCJpYXQiOjE3NzEyNTk2NjgsImV4cCI6MTgwMjc5NTY2OH0.KSQa5TdyL0ZV1sfTEFFzlhom-8WSFlieQtp5crmo6UM",
                    "caption": "",
                    "link": "",
                    "triggerMatch": [
                        "Hi",
                        "I'm Boteemia"
                    ]
                }
            ]
        },
        "websiteInfo": {
            "triggers": [
                "rates page",
                "loan programs",
                "about us",
                "contact",
                "locations",
                "calculators",
                "FAQs",
                "learn more",
                "more information",
                "website",
                "navigation"
            ],
            "infoType": "navigation",
            "action": "showSmartNavigation"
        }
    },
    "updatedAt": "2026-02-16T23:54:10.047Z"
};

    // ===== AUTO-TRIGGER CONTROL =====
    window.disableBridgeTriggers = false; // Can be toggled from TCS
    
    // ===== LISTEN FOR MESSAGES FROM TCS =====
    window.addEventListener('message', function(event) {
        // Handle control commands from TCS
        if (event.data.type === 'DASHBOARD_COMMAND') {
            if (event.data.command === 'toggleOverlays') {
                window.disableBridgeTriggers = event.data.disabled;
                console.log(`🔕 Overlays ${event.data.disabled ? 'disabled' : 'enabled'}`);
            }
            return;
        }
        
        // Handle module triggers
        if (event.data.type === 'MODULE_TRIGGERED' && !window.disableBridgeTriggers) {
            console.log('🎯 Module triggered:', event.data.module, event.data.triggerPhrase);
            window.showModule(event.data.module, event.data.triggerPhrase);
        }
    });

    // ===== SMART SCREEN DISPLAY FUNCTION =====
    window.showModule = function(moduleName, triggerPhrase) {
        console.log('🖥️ Showing module:', moduleName, triggerPhrase);
        
        // Remove any existing overlay first
        const existing = document.getElementById('botemia-overlay');
        if (existing) existing.remove();

        // Create backdrop with blur
        const backdrop = document.createElement('div');
        backdrop.id = 'botemia-overlay';
        backdrop.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(4px);
            z-index: 999998;
            display: flex;
            align-items: center;
            justify-content: center;
            pointer-events: none;
        `;

        // Create content card
        const card = document.createElement('div');
        card.style.cssText = `
            background: white;
            border-radius: 20px;
            padding: 30px;
            max-width: 400px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            z-index: 999999;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            border: 3px solid #f8c400;
            position: relative;
            pointer-events: auto;
            animation: slideUp 0.3s ease;
        `;

        // Add animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideUp {
                from { transform: translateY(30px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);

        // Close button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '✕';
        closeBtn.style.cssText = `
            position: absolute;
            top: 15px;
            right: 15px;
            background: #f0f0f0;
            border: none;
            width: 32px;
            height: 32px;
            border-radius: 16px;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            color: #333;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s;
            z-index: 100000;
        `;
        closeBtn.onmouseover = () => closeBtn.style.background = '#ddd';
        closeBtn.onmouseout = () => closeBtn.style.background = '#f0f0f0';
        closeBtn.onclick = () => backdrop.remove();

        // Module-specific content
        let content = '';

        if (moduleName === 'smartScreen') {
            const images = window.BotemiaConfig.modules?.smartScreen?.images || [];
            const matchedImage = images.find(img => 
                img.triggerMatch?.some(t => 
                    triggerPhrase.toLowerCase().includes(t.toLowerCase())
                )
            );
            
            if (matchedImage) {
                content = `
                    <h2 style="margin:0 0 15px 0; color:#333; font-size:24px;">${matchedImage.name}</h2>
                    <img src="${matchedImage.url}" style="width:100%; border-radius:12px; margin-bottom:15px; border:1px solid #eee;">
                    <p style="margin:0 0 15px 0; color:#666; line-height:1.5; font-size:16px;">${matchedImage.caption}</p>
                    ${matchedImage.link ? 
                        `<a href="${matchedImage.link}" target="_blank" 
                            style="display:inline-block; background:#f8c400; color:black; padding:12px 24px; border-radius:30px; text-decoration:none; font-weight:bold; margin-top:5px;">
                            🔗 Learn More →
                        </a>` : ''
                    }
                `;
            } else {
                content = `<p style="color:#999;">No matching image found for "${triggerPhrase}"</p>`;
            }
        } else {
            // Generic display for other modules
            content = `
                <h2 style="margin:0 0 15px 0; color:#333;">⚡ ${moduleName} Triggered</h2>
                <p style="color:#666;">Trigger phrase: "${triggerPhrase}"</p>
            `;
        }

        // Assemble
        card.innerHTML = content;
        card.appendChild(closeBtn);
        backdrop.appendChild(card);
        document.body.appendChild(backdrop);

        // Auto-remove after 8 seconds
        setTimeout(() => {
            const el = document.getElementById('botemia-overlay');
            if (el) el.remove();
        }, 8000);
    };

        // ===== AUTO-TRIGGER SYSTEM - LISTENS FOR BOTANIA'S SPEECH =====
    (function initTriggerSystem() {
        console.log('🎯 Auto-trigger system active for', window.BotemiaConfig.name);
        
        let lastTriggerTime = 0;
        const TRIGGER_COOLDOWN = 5000; // 5 seconds between triggers
        
        function checkForTriggers(transcript) {
            if (window.disableBridgeTriggers) return;
            
            const now = Date.now();
            if (now - lastTriggerTime < TRIGGER_COOLDOWN) return;
            
            const lowerTranscript = transcript.toLowerCase();
            const modules = window.BotemiaConfig.modules;
            
            // Check each module's triggers
            for (const [moduleName, moduleConfig] of Object.entries(modules)) {
                // Skip smartScreen - it uses per-image triggers
                if (moduleName === 'smartScreen') {
                    const images = moduleConfig.images || [];
                    for (const image of images) {
                        if (image.triggerMatch) {
                            for (const trigger of image.triggerMatch) {
                                if (lowerTranscript.includes(trigger.toLowerCase())) {
                                    console.log('🎯 SMART SCREEN TRIGGER:', image.name, trigger);
                                    lastTriggerTime = now;
                                    window.showModule('smartScreen', trigger);
                                    return;
                                }
                            }
                        }
                    }
                    continue;
                }
                
                // Check regular module triggers
                if (moduleConfig.triggers) {
                    for (const trigger of moduleConfig.triggers) {
                        if (lowerTranscript.includes(trigger.toLowerCase())) {
                            console.log('🎯 TRIGGER:', moduleName, trigger);
                            lastTriggerTime = now;
                            window.showModule(moduleName, trigger);
                            return;
                        }
                    }
                }
            }
        }
        
        // Watch for Botania's messages in the DOM
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    // Look for Botania's message bubbles
                    document.querySelectorAll('.message-bubble, .botania-message, [class*="message"], [class*="transcript"]').forEach(el => {
                        if (el.textContent && !el.dataset.botemiaProcessed) {
                            el.dataset.botemiaProcessed = 'true';
                            checkForTriggers(el.textContent);
                        }
                    });
                }
            });
        });
        
        // Start observing when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                observer.observe(document.body, { childList: true, subtree: true });
            });
        } else {
            observer.observe(document.body, { childList: true, subtree: true });
        }
    })();

    // ===== LOAD WIDGET =====
    function initWidget() {
        // Check if widget already exists
        if (document.querySelector('lemon-slice-widget')) {
            console.log('✅ Widget already exists');
            return;
        }

        // Load widget script
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/@lemonsliceai/lemon-slice-widget';
        script.type = 'module';
        script.onload = () => {
            const widget = document.createElement('lemon-slice-widget');
            widget.setAttribute('agent-id', window.BotemiaConfig.agentId);
            document.body.appendChild(widget);
            console.log('✅ Widget created for', window.BotemiaConfig.name);
        };
        script.onerror = () => console.error('❌ Failed to load widget');
        document.head.appendChild(script);
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }

    console.log('✅ Botemia Bridge v5.0 loaded for', window.BotemiaConfig.name);
})();