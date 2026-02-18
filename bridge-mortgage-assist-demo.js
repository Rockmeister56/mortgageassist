// Botemia Bridge for Mortgage Assist Demo
// Generated: 2/18/2026, 4:58:23 AM
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
            "groups": [
                {
                    "name": "Test Group",
                    "triggerPhrase": "Show me test testimonials",
                    "category": "rates",
                    "videos": [
                        "https://youtube.com/test1",
                        "https://youtube.com/test2"
                    ]
                }
            ]
        },
        "videoVault": {
            "videos": [
                {
                    "name": "Test Video",
                    "triggerPhrase": "Show me test video",
                    "url": "https://youtube.com/test",
                    "description": "This is a test video",
                    "category": "process"
                }
            ]
        },
        "smartScreen": {
            "action": "showBestMatch",
            "images": [
                {
                    "name": "Welcome Screen",
                    "url": "https://fcgbusobfdwnpoqyuzoe.supabase.co/storage/v1/object/sign/Smart%20Screens%20Demo/botemia-intro.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wNjJjNGVkZS0wYzRiLTQyMzAtOGE5MC1jMDhmNjhlNDVkNTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTbWFydCBTY3JlZW5zIERlbW8vYm90ZW1pYS1pbnRyby5qcGciLCJpYXQiOjE3NzE0MTAwMzEsImV4cCI6MTgwMjk0NjAzMX0.STLFHcQygbLPQBYk7Vll9stkFEJ71BoFN8lLZqi2Etw",
                    "caption": "",
                    "link": "",
                    "triggerMatch": [
                        "Hi I'm Botemia your Mortgage AI assistant."
                    ],
                    "imageSize": "full",
                    "bgColor": "rgba(0,0,0,0.7)",
                    "backdropOpacity": 0.5,
                    "showTitle": true,
                    "borderColor": "#f8c400"
                }
            ]
        },
        "websiteInfo": {
            "triggers": [],
            "infoType": "navigation",
            "action": "showSmartNavigation"
        }
    },
    "updatedAt": "2026-02-18T12:58:23.126Z"
};

    // ===== AUTO-TRIGGER CONTROL =====
    window.disableBridgeTriggers = false;
    
    // ===== LISTEN FOR MESSAGES FROM TCS =====
    window.addEventListener('message', function(event) {
        if (event.data.type === 'DASHBOARD_COMMAND') {
            if (event.data.command === 'toggleOverlays') {
                window.disableBridgeTriggers = event.data.disabled;
                console.log(`🔕 Overlays ${event.data.disabled ? 'disabled' : 'enabled'}`);
            }
            return;
        }
        
        if (event.data.type === 'MODULE_TRIGGERED' && !window.disableBridgeTriggers) {
            console.log('🎯 Module triggered:', event.data.module, event.data.triggerPhrase);
            window.showModule(event.data.module, event.data.triggerPhrase);
        }
    });

    // ===== SMART SCREEN DISPLAY FUNCTION =====
    window.showModule = function(moduleName, triggerPhrase) {
        console.log('🖥️ Showing module:', moduleName, triggerPhrase);
        
        const existing = document.getElementById('botemia-overlay');
        if (existing) existing.remove();

        let matchedImage = null;
        let bgColor = 'white';
        let backdropOpacity = 0.5;
        let imageSize = '400px';
        let showTitle = true;
        
        if (moduleName === 'smartScreen') {
            const images = window.BotemiaConfig.modules?.smartScreen?.images || [];
            matchedImage = images.find(img => 
                img.triggerMatch?.some(t => 
                    triggerPhrase.toLowerCase().includes(t.toLowerCase())
                )
            );
            
            if (matchedImage) {
                bgColor = matchedImage.bgColor || 'white';
                backdropOpacity = matchedImage.backdropOpacity || 0.5;
                imageSize = matchedImage.imageSize || '400px';
                showTitle = matchedImage.showTitle !== false;
            }
        }

        const backdrop = document.createElement('div');
        backdrop.id = 'botemia-overlay';
        backdrop.style.cssText = 
            'position: fixed;' +
            'top: 0; left: 0; width: 100%; height: 100%;' +
            'background: rgba(0, 0, 0, ' + backdropOpacity + ');' +
            'backdrop-filter: blur(4px);' +
            'z-index: 999998;' +
            'display: flex; align-items: center; justify-content: center;' +
            'pointer-events: none;';

        const textColor = bgColor.includes('black') || bgColor.includes('0,0,0') ? '#ffffff' : '#333333';
        const borderColor = '#f8c400';
        const closeBtnBg = bgColor.includes('black') ? '#333333' : '#f0f0f0';
        const closeBtnColor = bgColor.includes('black') ? '#ffffff' : '#333333';
        const closeBtnHover = bgColor.includes('black') ? '#555555' : '#dddddd';

        const card = document.createElement('div');
        card.style.cssText = 
            'background: ' + bgColor + ';' +
            'border-radius: 20px; padding: 30px;' +
            'max-width: ' + (imageSize === 'full' ? '90%' : imageSize) + ';' +
            'width: ' + (imageSize === 'full' ? '90%' : '100%') + ';' +
            'max-height: 80vh; overflow-y: auto;' +
            'box-shadow: 0 20px 60px rgba(0,0,0,0.3);' +
            'z-index: 999999;' +
            'font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif;' +
            'border: 3px solid ' + borderColor + ';' +
            'position: relative;' +
            'pointer-events: auto; animation: slideUp 0.3s ease;' +
            'color: ' + textColor + ';';

        const style = document.createElement('style');
        style.textContent = 
            '@keyframes slideUp {' +
            'from { transform: translateY(30px); opacity: 0; }' +
            'to { transform: translateY(0); opacity: 1; }' +
            '}';
        document.head.appendChild(style);

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '✕';
        closeBtn.style.cssText = 
            'position: absolute; top: 15px; right: 15px;' +
            'background: ' + closeBtnBg + '; border: none; width: 32px; height: 32px;' +
            'border-radius: 16px; font-size: 18px; font-weight: bold; cursor: pointer;' +
            'color: ' + closeBtnColor + '; display: flex; align-items: center; justify-content: center;' +
            'transition: background 0.2s; z-index: 100000;';
        closeBtn.onmouseover = () => closeBtn.style.background = closeBtnHover;
        closeBtn.onmouseout = () => closeBtn.style.background = closeBtnBg;
        closeBtn.onclick = () => backdrop.remove();

        let content = '';

        if (moduleName === 'smartScreen' && matchedImage) {
            content = (showTitle ? '<h2 style="margin:0 0 15px 0; font-size:24px; color:' + textColor + ';">' + matchedImage.name + '</h2>' : '') +
                '<img src="' + matchedImage.url + '" style="width:100%; border-radius:12px; margin-bottom:15px; border:1px solid ' + (bgColor.includes('black') ? '#444' : '#eee') + ';">' +
                '<p style="margin:0 0 15px 0; line-height:1.5; font-size:16px; color:' + textColor + ';">' + matchedImage.caption + '</p>' +
                (matchedImage.link ? '<a href="' + matchedImage.link + '" target="_blank" style="display:inline-block; background:#f8c400; color:black; padding:12px 24px; border-radius:30px; text-decoration:none; font-weight:bold; margin-top:5px;">🔗 Learn More →</a>' : '');
        } else if (moduleName === 'smartScreen') {
            content = '<p style="color:#999;">No matching image found for "' + triggerPhrase + '"</p>';
        } else {
            content = '<h2 style="margin:0 0 15px 0; color:' + textColor + ';">⚡ ' + moduleName + ' Triggered</h2>' +
                     '<p style="color:' + textColor + ';">Trigger phrase: "' + triggerPhrase + '"</p>';
        }

        card.innerHTML = content;
        card.appendChild(closeBtn);
        backdrop.appendChild(card);
        document.body.appendChild(backdrop);

        setTimeout(() => {
            const el = document.getElementById('botemia-overlay');
            if (el) el.remove();
        }, 8000);
    };

    // ===== TESTIMONIAL GROUP DISPLAY =====
    window.showTestimonialGroup = function(group) {
        console.log('📺 Showing testimonial group:', group.name);
        alert('Showing ' + group.videos.length + ' testimonials about ' + group.category);
    };

    // ===== SINGLE VIDEO DISPLAY =====
    window.showVideo = function(video) {
        console.log('📹 Playing video:', video.name);
        alert('Playing video: ' + video.name + '\n' + video.url);
    };

    // ===== AUTO-TRIGGER SYSTEM =====
    (function initTriggerSystem() {
        console.log('🎯 Auto-trigger system active for', window.BotemiaConfig.name);
        
        let lastTriggerTime = 0;
        const TRIGGER_COOLDOWN = 5000;
        let lastProcessedText = '';
        let pendingText = '';
        let sentenceTimer = null;
        
        function processCompleteSentence(fullText) {
            if (window.disableBridgeTriggers) return;
            
            const now = Date.now();
            if (now - lastTriggerTime < TRIGGER_COOLDOWN) return;
            if (fullText === lastProcessedText) return;
            
            lastProcessedText = fullText;
            const lowerTranscript = fullText.toLowerCase();
            const modules = window.BotemiaConfig.modules;
            
            if (modules.testimonial && modules.testimonial.groups) {
                for (const group of modules.testimonial.groups) {
                    if (lowerTranscript.includes(group.triggerPhrase.toLowerCase())) {
                        lastTriggerTime = now;
                        window.showTestimonialGroup(group);
                        return;
                    }
                }
            }
            
            if (modules.videoVault && modules.videoVault.videos) {
                for (const video of modules.videoVault.videos) {
                    if (lowerTranscript.includes(video.triggerPhrase.toLowerCase())) {
                        lastTriggerTime = now;
                        window.showVideo(video);
                        return;
                    }
                }
            }
            
            if (modules.smartScreen && modules.smartScreen.images) {
                for (const image of modules.smartScreen.images) {
                    if (image.triggerMatch) {
                        for (const trigger of image.triggerMatch) {
                            if (lowerTranscript.includes(trigger.toLowerCase())) {
                                lastTriggerTime = now;
                                window.showModule('smartScreen', trigger);
                                return;
                            }
                        }
                    }
                }
            }
        }
        
        function checkForTriggers(transcript) {
            if (window.disableBridgeTriggers) return;
            
            if (sentenceTimer) clearTimeout(sentenceTimer);
            pendingText = transcript;
            
            sentenceTimer = setTimeout(() => {
                if (pendingText.trim()) {
                    processCompleteSentence(pendingText);
                    pendingText = '';
                }
            }, 800);
        }
        
        document.querySelectorAll('.message-bubble, .ai-message, .user-message, .botania-message, [class*="message"]').forEach(el => {
            el.dataset.botemiaProcessed = 'true';
        });
        
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === 1) {
                            if (node.matches && (
                                node.matches('.message-bubble') || 
                                node.matches('.botania-message') || 
                                node.matches('.ai-message') ||
                                node.matches('.user-message') ||
                                node.matches('[class*="message"]')
                            )) {
                                if (node.textContent && !node.dataset.botemiaProcessed) {
                                    node.dataset.botemiaProcessed = 'true';
                                    checkForTriggers(node.textContent);
                                }
                            }
                            
                            if (node.querySelectorAll) {
                                node.querySelectorAll('.message-bubble, .botania-message, .ai-message, .user-message, [class*="message"]').forEach(el => {
                                    if (el.textContent && !el.dataset.botemiaProcessed) {
                                        el.dataset.botemiaProcessed = 'true';
                                        checkForTriggers(el.textContent);
                                    }
                                });
                            }
                        }
                    });
                }
            });
        });
        
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
        if (document.querySelector('lemon-slice-widget')) {
            console.log('✅ Widget already exists');
            return;
        }

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

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }

    console.log('✅ Botemia Bridge v5.0 loaded for', window.BotemiaConfig.name);
})();