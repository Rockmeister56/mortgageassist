// Botemia Bridge for Mortgage Assist Demo
// Generated: 2/15/2026, 3:01:16 PM
// Client ID: mortgage-assist-demo
// Version: 4.0 - EMBEDDED CONFIG

(function() {
    "use strict";

    // ===== EMBEDDED CLIENT CONFIGURATION =====
    window.BotemiaConfig = {
    "id": "mortgage-assist-demo",
    "name": "Mortgage Assist Demo",
    "agentId": "agent_7b0776ef6b855de5",
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
            "triggers": [
                "show me an example",
                "success story",
                "before after",
                "what does sarah look like",
                "credit repair example",
                "first-time buyer success",
                "self-employed approval",
                "bad credit approval"
            ],
            "action": "showBestMatch",
            "images": [
                {
                    "name": "Sarah's Success",
                    "url": "https://xyz.supabase.co/storage/v1/object/public/botemia/sarah-580.jpg",
                    "caption": "580 credit → closed FHA 3.5% down",
                    "link": "https://mortgageassist.com/fha-loans",
                    "triggerMatch": [
                        "sarah",
                        "580",
                        "bad credit",
                        "fha"
                    ]
                },
                {
                    "name": "Marcus Self-Employed",
                    "url": "https://xyz.supabase.co/storage/v1/object/public/botemia/marcus-se.jpg",
                    "caption": "Self-employed, 10% down, bank statement loan",
                    "link": "",
                    "triggerMatch": [
                        "self-employed",
                        "1099",
                        "business owner"
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
    "updatedAt": "2026-02-15T23:01:16.056Z"
};

    // ===== LISTEN FOR TRIGGERS FROM CONTROL SYSTEM =====
    window.addEventListener('message', function(event) {
        if (event.data.type === 'MODULE_TRIGGERED') {
            console.log('🎯 Module triggered:', event.data.module, event.data.triggerPhrase);
            
            // Show popup notification
            const div = document.createElement('div');
            div.style.cssText = 'position:fixed; bottom:20px; right:20px; background:#f8c400; color:black; padding:20px; border-radius:12px; z-index:9999; font-family:Arial; box-shadow:0 4px 20px rgba(0,0,0,0.3);';
            div.innerHTML = `<strong>⚡ ${event.data.module}</strong><br>${event.data.triggerPhrase}`;
            document.body.appendChild(div);
            setTimeout(() => div.remove(), 3000);
            
            // Find the widget
            const widget = document.querySelector('lemon-slice-widget');
            if (!widget) return;
            
            // Pass config to widget
            widget.botemiaConfig = window.BotemiaConfig;
            
            // Handle different module types
            switch(event.data.module) {
                case 'smartScreen':
                    const images = window.BotemiaConfig.modules.smartScreen.images;
                    const matchedImage = images.find(img => 
                        img.triggerMatch.some(t => 
                            event.data.triggerPhrase.toLowerCase().includes(t.toLowerCase())
                        )
                    );
                    
                    if (matchedImage) {
                        const smartScreen = document.createElement('div');
                        smartScreen.className = 'botemia-smart-screen';
                        smartScreen.style.cssText = 'position:fixed; bottom:80px; right:20px; background:white; border-radius:12px; padding:20px; max-width:300px; box-shadow:0 4px 20px rgba(0,0,0,0.2); z-index:9998;';
                        smartScreen.innerHTML = `
                            <h3 style="margin:0 0 10px 0; color:#333;">${matchedImage.name}</h3>
                            <img src="${matchedImage.url}" style="width:100%; border-radius:8px; margin-bottom:10px;">
                            <p style="margin:0 0 10px 0; color:#666;">${matchedImage.caption}</p>
                            ${matchedImage.link ? `<a href="${matchedImage.link}" target="_blank" style="color:#f8c400; text-decoration:none; font-weight:bold;">Learn More →</a>` : ''}
                        `;
                        document.body.appendChild(smartScreen);
                        setTimeout(() => smartScreen.remove(), 8000);
                    }
                    break;
                    
                case 'testimonial':
                    console.log('Show testimonial');
                    break;
                    
                case 'videoVault':
                    console.log('Show video vault');
                    break;
                    
                case 'websiteInfo':
                    console.log('Show website info');
                    break;
            }
        }
    });

    // ===== LOAD OR UPDATE WIDGET =====
    function initWidget() {
        // Check if widget already exists
        let widget = document.querySelector('lemon-slice-widget');
        if (widget) {
            console.log('✅ Updating existing widget');
            widget.setAttribute('agent-id', window.BotemiaConfig.agentId);
            widget.botemiaConfig = window.BotemiaConfig;
            return;
        }

        // Check if script is loaded
        if (!document.querySelector('script[src*="lemon-slice-widget"]')) {
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/@lemonsliceai/lemon-slice-widget';
            script.type = 'module';
            script.onload = createWidget;
            document.head.appendChild(script);
        } else {
            createWidget();
        }
    }

    function createWidget() {
        if (document.querySelector('lemon-slice-widget')) return;
        const widget = document.createElement('lemon-slice-widget');
        widget.setAttribute('agent-id', window.BotemiaConfig.agentId);
        widget.botemiaConfig = window.BotemiaConfig;
        document.body.appendChild(widget);
        console.log('✅ Widget created for', window.BotemiaConfig.name);
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }
})();