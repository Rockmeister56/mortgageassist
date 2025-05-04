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
    
    // Function to add user message to chat
    function addUserMessage(text) {
        const messageRow = document.createElement('div');
        messageRow.className = 'message-row';
        
        const messageRight = document.createElement('div');
        messageRight.className = 'message-right';
        
        const userMessage = document.createElement('div');
        userMessage.className = 'user-message';
        
        const messageBubble = document.createElement('div');
        messageBubble.className = 'message-bubble blue';
        messageBubble.textContent = text;
        
        userMessage.appendChild(messageBubble);
        messageRight.appendChild(userMessage);
        messageRow.appendChild(messageRight);
        chatMessages.appendChild(messageRow);
        
        // Scroll to the bottom of the chat
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Function to add AI message to chat
    function addAIMessage(text) {
        // Check if the last message row contains a message-right div
        const lastRow = chatMessages.lastChild;
        let messageContainer;
        
        if (lastRow && lastRow.querySelector('.message-right')) {
            // Add to the last message-right container
            messageContainer = lastRow.querySelector('.message-right');
        } else {
            // Create new row and left container
            const messageRow = document.createElement('div');
            messageRow.className = 'message-row';
            
            messageContainer = document.createElement('div');
            messageContainer.className = 'message-left';
            
            messageRow.appendChild(messageContainer);
            chatMessages.appendChild(messageRow);
        }
        
        const aiMessage = document.createElement('div');
        aiMessage.className = 'ai-message';
        
        const messageBubble = document.createElement('div');
        messageBubble.className = 'message-bubble white border-green';
        messageBubble.textContent = text;
        
        aiMessage.appendChild(messageBubble);
        messageContainer.appendChild(aiMessage);
        
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
            addUserMessage(message);
            
            // Clear input field
            messageInput.value = '';
            
            // Simulate AI thinking...
            setTimeout(() => {
                // Get and add AI response
                const response = getResponse(message);
                addAIMessage(response);
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
