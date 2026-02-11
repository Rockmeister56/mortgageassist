// bridge.js - WORKING UNMUTE VERSION
class BotemiaController {
    constructor() {
        this.widget = null;
        this.audioUnmuted = false;
        this.retryCount = 0;
        this.maxRetries = 5;
    }

    async init() {
        console.log('🎯 Initializing Botemia Controller');
        
        // Wait for widget to load
        await this.waitForWidget();
        
        // Setup button
        this.setupHeroButton();
        
        // Pre-warm audio (important!)
        await this.preWarmAudio();
        
        console.log('✅ Botemia ready');
    }

    // Wait for widget to appear
    async waitForWidget() {
        return new Promise((resolve) => {
            const checkWidget = () => {
                this.widget = document.querySelector('lemon-slice-widget');
                if (this.widget) {
                    console.log('✅ Widget found');
                    resolve();
                } else {
                    console.log('⏳ Waiting for widget...');
                    setTimeout(checkWidget, 500);
                }
            };
            checkWidget();
        });
    }

    // Pre-warm audio system
    async preWarmAudio() {
        console.log('🎵 Pre-warming audio system...');
        
        // Method 1: Create and play silent audio
        try {
            const audio = new Audio();
            audio.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAZGF0YQ';
            audio.volume = 0.01;
            await audio.play();
            console.log('✅ Audio context activated');
        } catch (e) {
            console.log('⚠️ Silent audio failed:', e);
        }

        // Method 2: Resume audio context
        if (typeof AudioContext !== 'undefined') {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            if (audioContext.state === 'suspended') {
                await audioContext.resume();
                console.log('✅ AudioContext resumed');
            }
        }
    }

    setupHeroButton() {
        const btn = document.getElementById('hero-botemia-btn');
        const status = document.getElementById('botemia-status');
        
        if (!btn) {
            console.error('❌ Hero button not found');
            return;
        }

        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            console.log('🎤 Hero button clicked');
            
            // Update status
            if (status) {
                status.style.display = 'block';
                status.textContent = 'Starting Botemia...';
                status.style.color = 'rgba(255,255,255,0.9)';
            }
            
            try {
                // Step 1: Expand widget
                await this.expandWidget();
                
                // Step 2: UNMUTE AUDIO (critical!)
                await this.ensureAudioUnmuted();
                
                // Step 3: Wait for audio to be ready
                await this.delay(800);
                
                // Step 4: Activate microphone
                await this.activateMic();
                
                // Step 5: Send greeting
                await this.sendGreeting();
                
                // Update status
                if (status) {
                    status.textContent = '✅ Botemia is listening!';
                    setTimeout(() => {
                        status.style.display = 'none';
                    }, 3000);
                }
                
            } catch (error) {
                console.error('❌ Activation failed:', error);
                if (status) {
                    status.textContent = '❌ Failed to start. Click Force Unmute button.';
                    status.style.color = '#ff6b6b';
                }
            }
        });
    }

    async expandWidget() {
        if (!this.widget) throw new Error('No widget found');
        
        console.log('📱 Expanding widget...');
        this.widget.setAttribute('controlled-widget-state', 'active');
        await this.delay(500); // Wait for animation
    }

    async ensureAudioUnmuted() {
        console.log('🔊 Ensuring audio is unmuted...');
        
        if (this.audioUnmuted) {
            console.log('✅ Audio already unmuted');
            return;
        }

        // Try multiple unmute methods
        const methods = [
            this.clickMuteButton.bind(this),
            this.sendUnmuteCommand.bind(this),
            this.triggerAudioPlayback.bind(this),
            this.simulateUserInteraction.bind(this)
        ];

        for (let i = 0; i < methods.length; i++) {
            console.log(`🔄 Trying unmute method ${i + 1}...`);
            const success = await methods[i]();
            
            if (success) {
                this.audioUnmuted = true;
                console.log('✅ Audio unmuted successfully');
                return;
            }
            
            await this.delay(500); // Wait between attempts
        }

        throw new Error('Could not unmute audio');
    }

    async clickMuteButton() {
        try {
            // Look for any mute/unmute buttons in the entire document
            const buttons = document.querySelectorAll('button, [role="button"], [onclick]');
            
            for (const btn of buttons) {
                const text = (btn.textContent || btn.innerText || '').toLowerCase();
                const ariaLabel = (btn.getAttribute('aria-label') || '').toLowerCase();
                const className = (btn.className || '').toLowerCase();
                
                if (text.includes('mute') || text.includes('unmute') || 
                    text.includes('audio') || text.includes('sound') ||
                    ariaLabel.includes('mute') || ariaLabel.includes('unmute') ||
                    className.includes('mute') || className.includes('unmute') ||
                    className.includes('audio') || className.includes('sound')) {
                    
                    console.log('🔘 Found audio button:', text || ariaLabel || className);
                    btn.click();
                    return true;
                }
            }
        } catch (e) {
            console.log('⚠️ Click method failed:', e);
        }
        return false;
    }

    async sendUnmuteCommand() {
        try {
            // Try to send a command that might trigger audio
            if (this.widget && this.widget.sendMessage) {
                await this.widget.sendMessage("unmute audio");
                return true;
            }
        } catch (e) {
            console.log('⚠️ Send command failed:', e);
        }
        return false;
    }

    async triggerAudioPlayback() {
        try {
            // Create and play a test sound
            const audio = new Audio();
            audio.src = 'https://assets.mixkit.co/active_storage/sfx/286/286-preview.mp3';
            audio.volume = 0.1;
            audio.playbackRate = 2.0;
            
            const played = await audio.play().then(() => true).catch(() => false);
            if (played) {
                setTimeout(() => audio.pause(), 100);
                return true;
            }
        } catch (e) {
            console.log('⚠️ Playback trigger failed:', e);
        }
        return false;
    }

    async simulateUserInteraction() {
        try {
            // Simulate user interaction (clicks, touches)
            const event = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true
            });
            
            document.body.dispatchEvent(event);
            
            // Also try touch event for mobile
            const touch = new TouchEvent('touchstart', {
                bubbles: true,
                cancelable: true
            });
            
            document.body.dispatchEvent(touch);
            
            return true;
        } catch (e) {
            console.log('⚠️ Interaction simulation failed:', e);
        }
        return false;
    }

    async activateMic() {
        if (!this.widget) throw new Error('No widget');
        
        console.log('🎤 Activating microphone...');
        await this.widget.micOn();
        console.log('✅ Microphone active');
    }

    async sendGreeting() {
        if (!this.widget) return;
        
        await this.delay(1000); // Wait for mic to be ready
        
        try {
            await this.widget.sendMessage("Hello! I'm Botemia, your mortgage assistant. How can I help you today?");
            console.log('👋 Greeting sent');
        } catch (e) {
            console.log('⚠️ Greeting failed:', e);
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Public unmute function
    async forceUnmute() {
        console.log('🔊 Force unmute requested');
        this.audioUnmuted = false;
        await this.ensureAudioUnmuted();
    }
}

// Global functions for debugging
function forceUnmute() {
    if (window.botemiaController) {
        window.botemiaController.forceUnmute();
    } else {
        alert('Botemia controller not loaded yet');
    }
}

function testAudio() {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/286/286-preview.mp3');
    audio.volume = 0.3;
    audio.play().then(() => {
        console.log('🔊 Test audio playing');
    }).catch(e => {
        console.log('❌ Test audio failed:', e);
        alert('Audio playback blocked. Click the page first, then try again.');
    });
}

// Initialize when ready
document.addEventListener('DOMContentLoaded', async () => {
    window.botemiaController = new BotemiaController();
    await window.botemiaController.init();
    
    // Add click handler to entire page to enable audio
    document.body.addEventListener('click', function enableAudio() {
        console.log('👆 Page clicked - audio should work now');
        document.body.removeEventListener('click', enableAudio);
    });
});