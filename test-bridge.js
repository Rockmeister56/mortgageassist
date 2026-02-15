// ============================================
// TEST BRIDGE - Just adds config, doesn't change working widget
// Upload to client's site as test-bridge.js
// ============================================

(function() {
    console.log('🧪 Test Bridge loading...');
    
    // STEP 1: Make config available globally
    window.BotemiaConfig = {
        id: 'mortgage-assist-demo',
        name: 'Mortgage Assist Demo',
        agentId: 'agent_7b0776ef6b855de5',  // MATCHES WORKING WIDGET!
        industry: 'mortgage',
        modules: {
            testimonial: {
                triggers: ["rates", "pre-approval", "credit score", "down payment"],
                action: "showTestimonialPlayer"
            },
            videoVault: {
                triggers: ["how to apply", "loan process", "closing timeline"],
                action: "showVideoGallery"
            },
            smartScreen: {
                triggers: ["show me an example", "success story", "580", "bad credit"],
                action: "showBestMatch",
                images: [
                    {
                        name: "Sarah's Success",
                        url: "https://xyz.supabase.co/storage/v1/object/public/botemia/sarah-580.jpg",
                        caption: "580 credit → closed FHA 3.5% down",
                        link: "https://mortgageassist.com/fha-loans",
                        triggerMatch: ["sarah", "580", "bad credit", "fha"]
                    },
                    {
                        name: "Marcus Self-Employed",
                        url: "https://xyz.supabase.co/storage/v1/object/public/botemia/marcus-se.jpg",
                        caption: "Self-employed, 10% down, bank statement loan",
                        link: "",
                        triggerMatch: ["self-employed", "1099", "business owner"]
                    }
                ]
            },
            websiteInfo: {
                triggers: ["rates page", "loan programs", "about us", "contact"],
                action: "showSmartNavigation"
            }
        }
    };
    
    // STEP 2: Verify widget exists
    setTimeout(function() {
        const widget = document.querySelector('lemon-slice-widget');
        if (widget) {
            console.log('✅ Widget found with agent ID:', widget.getAttribute('agent-id'));
            console.log('✅ Test Bridge ready - Config loaded');
        } else {
            console.log('❌ Widget not found on page');
        }
    }, 2000);
    
    console.log('✅ Test Bridge loaded - Config available at window.BotemiaConfig');
})();