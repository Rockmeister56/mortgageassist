// File: bridge.js - WITH UNMUTE FUNCTIONALITY
class BotemiaHeroController {
    constructor() {
        this.widget = null;
        this.isMicActive = false;
        this.isAudioMuted = true; // Widget starts muted
    }

    // Initialize when page loads
    init() {
        console.log('🔧 Setting up Botemia Hero Controller');
        
        // Find widget (poll for it since it loads async)
        const findWidget = () => {
            this.widget = document.querySelector('lemon-slice-widget');
            
            if (this.widget) {
                console.log('✅ Botemia widget found');
                this.setupHeroButton();
                this.setupAudioMonitoring();
            } else {
                setTimeout(findWidget, 500);
            }
        };
        
        findWidget();
    }

    // Setup audio monitoring (check mute state)
    setupAudioMonitoring() {
        // Check every second for mute state changes
        setInterval(() => {
            this.checkAudioState();
        }, 1000);
    }

    // Check and fix audio state
    async checkAudioState() {
        if (!this.widget) return;
        
        // Try to detect if audio is muted
        // Note: This depends on LemonSlice's internal API
        // We'll try multiple approaches
        
        // Approach 1: Check for mute icon/state in DOM
        const muteElements = document.querySelectorAll('[class*="mute"], [class*="Mute"]');
        if (muteElements.length > 0) {
            this.isAudioMuted = true;
            console.log('🔇 Audio appears muted');
        }
    }

    // Setup the hero button
    setupHeroButton() {
        const heroBtn = document.getElementById('hero-botemia-btn');
        const statusDiv = document.getElementById('botemia-status');
        
        if (!heroBtn) {
            console.log('❌ Hero button not found');
            return;
        }

        heroBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            console.log('🎯 Hero button clicked - activating Botemia');
            
            // Show status
            if (statusDiv) {
                statusDiv.style.display = 'block';
                statusDiv.textContent = 'Activating Botemia...';
            }
            
            try {
                // 1. Expand avatar (skip minimized state)
                this.widget.setAttribute('controlled-widget-state', 'active');
                console.log('📱 Avatar expanded');
                
                // 2. Wait for widget to fully load
                await this.sleep(1000);
                
                // 3. UNMUTE AUDIO FIRST (CRITICAL STEP!)
                await this.unmuteAudio();
                
                // 4. Wait for audio to unmute
                await this.sleep(500);
                
                // 5. Activate microphone
                await this.widget.micOn();
                this.isMicActive = true;
                console.log('🎤 Microphone activated');
                
                // 6. Update status
                if (statusDiv) {
                    statusDiv.textContent = 'Botemia is listening...';
                    setTimeout(() => {
                        statusDiv.style.display = 'none';
                    }, 2000);
                }
                
                // 7. Send greeting (audio should now work)
                setTimeout(async () => {
                    try {
                        await this.widget.sendMessage("Hi! I'm ready to help with your mortgage questions. What would you like to know?");
                    } catch (e) {
                        console.log('⚠️ Greeting message failed:', e);
                    }
                }, 1000);
                
            } catch (error) {
                console.log('❌ Error activating Botemia:', error);
                if (statusDiv) {
                    statusDiv.textContent = 'Error - please refresh page';
                    statusDiv.style.color = '#ff6b6b';
                }
            }
        });
    }

    // UNMUTE FUNCTION - CRITICAL!
    async unmuteAudio() {
        console.log('🔊 Attempting to unmute audio...');
        
        if (!this.widget) {
            console.log('❌ No widget for unmute');
            return;
        }
        
        try {
            // METHOD 1: Try to click mute button in widget (if exists)
            this.clickMuteButton();
            
            // METHOD 2: Wait and try to send audio-related command
            await this.sleep(300);
            
            // METHOD 3: Check if audio context needs resuming
            this.resumeAudioContext();
            
            // METHOD 4: Send empty message to trigger audio
            try {
                await this.widget.sendMessage(" "); // Space to trigger audio
            } catch (e) {
                // Ignore if fails
            }
            
            this.isAudioMuted = false;
            console.log('✅ Audio unmute attempted');
            
        } catch (error) {
            console.log('⚠️ Unmute attempt failed:', error);
        }
    }

    // Try to find and click mute button in widget
    clickMuteButton() {
        // Look for mute/unmute buttons in the widget
        const selectors = [
            'button[class*="mute"]',
            'button[class*="Mute"]',
            '[aria-label*="mute"]',
            '[aria-label*="Mute"]',
            '.audio-control button',
            'button svg path[d*="M16.5 12"]' // Common mute icon path
        ];
        
        for (const selector of selectors) {
            const muteBtn = document.querySelector(selector);
            if (muteBtn) {
                console.log('🔘 Found mute button:', selector);
                muteBtn.click();
                return true;
            }
        }
        
        // Try to find by text content
        const allButtons = document.querySelectorAll('button');
        for (const btn of allButtons) {
            const text = btn.textContent || btn.innerText || '';
            if (text.toLowerCase().includes('mute') || 
                text.toLowerCase().includes('unmute') ||
                text.toLowerCase().includes('audio')) {
                console.log('🔘 Found audio button by text:', text);
                btn.click();
                return true;
            }
        }
        
        return false;
    }

    // Resume audio context if suspended
    resumeAudioContext() {
        if (window.AudioContext || window.webkitAudioContext) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            
            // Create a silent sound to resume context
            const audioContext = new AudioContext();
            if (audioContext.state === 'suspended') {
                audioContext.resume().then(() => {
                    console.log('🎵 Audio context resumed');
                });
            }
        }
    }

    // Toggle mute/unmute (for manual control if needed)
    async toggleAudio() {
        if (this.isAudioMuted) {
            await this.unmuteAudio();
        } else {
            // You could add mute functionality here if needed
            console.log('Mute toggle - currently unmuted');
        }
    }

    // Helper: sleep function
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
    window.botemiaController = new BotemiaHeroController();
    window.botemiaController.init();
    
    // Optional: Add global function for manual unmute
    window.unmuteBotemia = function() {
        if (window.botemiaController) {
            window.botemiaController.unmuteAudio();
        }
    };
});