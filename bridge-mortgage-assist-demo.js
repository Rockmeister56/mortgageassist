// Botemia Bridge for Mortgage Assist Demo
// Generated: 2/15/2026, 2:12:14 AM
// Client ID: mortgage-assist-demo
// Version: 4.0 - EMBEDDED CONFIG

(function() {
    "use strict";

    // ===== EMBEDDED CLIENT CONFIGURATION =====
    window.BotemiaConfig = {
    "id": "mortgage-assist-demo",
    "name": "Mortgage Assist Demo",
    "agentId": "agent_1db77d60ec132469",
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
    "updatedAt": "2026-02-15T10:12:14.340Z"
};

// ===== LISTEN FOR TRIGGER COMMANDS =====
window.addEventListener('message', function(event) {
    // Only accept messages from your trigger system
    if (event.data.type === 'BOTEMIA_TRIGGER') {
        console.log('🎯 Trigger received:', event.data.module, event.data.triggerPhrase);
        
        // Find the widget
        const widget = document.querySelector('lemon-slice-widget');
        if (!widget) {
            console.log('Widget not found yet');
            return;
        }
        
        // Pass the config to widget if needed
        if (!widget.botemiaConfig) {
            widget.botemiaConfig = window.BotemiaConfig;
        }
        
        // Tell widget to show the module
        // The widget needs to have these methods - if not, we'll need to create them
        try {
            switch(event.data.module) {
                case 'smartScreen':
                    // Find matching image and display it
                    const images = window.BotemiaConfig.modules.smartScreen.images;
                    const matchedImage = images.find(img => 
                        img.triggerMatch.some(t => 
                            event.data.triggerPhrase.toLowerCase().includes(t.toLowerCase())
                        )
                    );
                    
                    if (matchedImage) {
                        // Create and show smart screen
                        const smartScreen = document.createElement('div');
                        smartScreen.className = 'botemia-smart-screen';
                        smartScreen.innerHTML = `
                            <div style="background: white; border-radius: 12px; padding: 20px; margin: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.15);">
                                <h3>${matchedImage.name}</h3>
                                <img src="${matchedImage.url}" style="max-width:100%; border-radius:8px;">
                                <p>${matchedImage.caption}</p>
                                ${matchedImage.link ? `<a href="${matchedImage.link}" target="_blank" style="color:#f8c400;">Learn More</a>` : ''}
                            </div>
                        `;
                        widget.appendChild(smartScreen);
                    }
                    break;
                    
                case 'testimonial':
                    console.log('Show testimonial module');
                    // Add testimonial display logic here
                    break;
                    
                case 'videoVault':
                    console.log('Show video vault');
                    // Add video display logic here
                    break;
                    
                case 'websiteInfo':
                    console.log('Show website info');
                    // Add website info logic here
                    break;
            }
        } catch (error) {
            console.error('Error displaying module:', error);
        }
    }
});

// Also make config available to widget immediately
if (document.querySelector('lemon-slice-widget')) {
    document.querySelector('lemon-slice-widget').botemiaConfig = window.BotemiaConfig;
}

    // ===== LOAD OR UPDATE WIDGET =====
    function initWidget() {
        // Check if widget already exists
        let widget = document.querySelector('lemon-slice-widget');
        if (widget) {
            console.log('✅ Updating existing widget');
            widget.setAttribute('agent-id', window.BotemiaConfig.agentId);
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