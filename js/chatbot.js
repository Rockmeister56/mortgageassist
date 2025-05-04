// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const chatMessages = document.getElementById('chatMessages');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendMessage');
    
    // Sample responses for demo purposes
    const responses = {
        "hello": "Hello! How can I help with your mortgage questions today?",
        "hi": "Hi there! What mortgage questions can I answer for you?",
        "rate": "Current rates for a 30-year fixed mortgage start at 6.25%. Would you like me to check your specific rate?",
        "document": "Based on your application, we need your W-2, recent pay stubs, and bank statements. Is there a specific document you're asking about?",
        "closing": "Your closing is scheduled for March 15th. All required documents should be submitted by March 10th.",
        "payment": "Your estimated monthly payment is $1,850 including principal, interest, taxes, and insurance.",
        "appraisal": "Your home appraisal is scheduled for next Tuesday at 2:00 PM. The appraiser will need access to all areas of the home.",
        "lock": "Yes, you can lock your rate today. Current rate is 6.25% for a 30-year fixed mortgage. Would you like to proceed with locking?",
        "process": "Your application is currently in underwriting. We expect a decision within 3-5 business days.",
        "default": "I don't have specific information about that. Would you like me to connect you with a loan officer for more assistance?"
    };
    
    // Function to add a message to the chat
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'ai'}`;
        
        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = 'message-bubble';
        bubbleDiv.textContent = text;
        
        messageDiv.appendChild(bubbleDiv);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to the bottom of the chat
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Function to get AI response
    function getResponse(message) {
        // Convert message to lowercase and remove punctuation for matching
        const cleanMessage = message.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
        
        // Check if the message contains any keywords
        for (const keyword in responses) {
            if (cleanMessage.includes(keyword)) {
                return responses[keyword];
            }
        }
        
        // If no keywords match, return default response
        return responses.default;
    }
    
    // Function to handle sending a message
    function sendMessage() {
        const message = messageInput.value.trim();
        
        if (message !== '') {
            // Add user message to chat
            addMessage(message, true);
            
            // Clear input field
            messageInput.value = '';
            
            // Simulate AI thinking...
            setTimeout(() => {
                // Get and add AI response
                const response = getResponse(message);
                addMessage(response);
            }, 1000);
        }
    }
    
    // Event listeners
    sendButton.addEventListener('click', sendMessage);
    
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});
