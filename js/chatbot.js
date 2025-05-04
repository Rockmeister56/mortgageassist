// chatbot.js

// This file contains functionality specific to the Chatbase.co chatbot
// The exact implementation will depend on the Chatbase configuration

document.addEventListener('DOMContentLoaded', function() {
    // Sample chatbot interactions for demonstration
    const sampleQuestions = [
        {
            question: "What's my loan's interest rate?",
            answer: "Your rate is 6.25% (30-year fixed)."
        },
        {
            question: "What documents do I need to upload?",
            answer: "You're missing your 2023 W-2. <a href='#'>Upload here</a>."
        }
    ];
    
    // Function to simulate chatbot responses
    function simulateChatbot() {
        const chatMessages = document.querySelector('.chatbot-messages');
        const messageInput = document.querySelector('.chatbot-input input');
        const sendButton = document.querySelector('.chatbot-input button');
        
        // Add sample messages to the chat interface
        sampleQuestions.forEach(item => {
            // Add user question
            const userMessage = document.createElement('div');
            userMessage.className = 'message user-message';
            userMessage.textContent = item.question;
            chatMessages.appendChild(userMessage);
            
            // Add bot response
            const botMessage = document.createElement('div');
            botMessage.className = 'message bot-message';
            botMessage.innerHTML = item.answer;
            chatMessages.appendChild(botMessage);
        });
        
        // Handle sending new messages
        function sendMessage() {
            const message = messageInput.value.trim();
            if (!message) return;
            
            // Add user message
            const userMessage = document.createElement('div');
            userMessage.className = 'message user-message';
            userMessage.textContent = message;
            chatMessages.appendChild(userMessage);
            
            // Clear input
            messageInput.value = '';
            
            // Simulate bot thinking
            setTimeout(() => {
                // Add bot response
                const botMessage = document.createElement('div');
                botMessage.className = 'message bot-message';
                
                // Simple pattern matching for demo purposes
                if (message.toLowerCase().includes('refinance')) {
                    botMessage.innerHTML = `
                        When considering refinancing your mortgage, here are some options that might be suitable for you:
                        
                        <ol>
                            <li><strong>Fixed-Rate Mortgage</strong>: This option offers a stable interest rate and consistent monthly payments over the life of the loan, making it a good choice if you plan to stay in your home long term.</li>
                            <li><strong>Adjustable Rate Mortgage (ARM)</strong>: If you expect to move or refinance again in a few years, an ARM might offer lower initial rates, but keep in mind that rates can change after the initial period.</li>
                            <li><strong>Cash-Out Refinance</strong>: If you need cash for home improvements or other expenses, this option allows you to borrow more than you owe on your current mortgage and take the difference in cash.</li>
                            <li><strong>FHA Streamline Refinance</strong>: If you have an existing FHA loan, this option allows you to refinance with less documentation and no appraisal, making it a quicker process.</li>
                            <li><strong>VA Refinance</strong>: If you're a veteran, you may qualify for a VA loan, which can offer favorable terms and no down payment.</li>
                        </ol>
                    `;
                } else if (message.toLowerCase().includes('rate')) {
                    botMessage.textContent = "Current rates range from 5.75% to 7.25% depending on your credit score, loan type, and term. Would you like me to check your specific rate options?";
                } else if (message.toLowerCase().includes('document') || message.toLowerCase().includes('upload')) {
                    botMessage.innerHTML = "For your application, we'll need: 1) Last 2 years of W-2s, 2) Last 2 months of pay stubs, 3) Last 2 months of bank statements, and 4) A copy of your driver's license. You can upload them <a href='#'>here</a>.";
                } else {
                    botMessage.textContent = "I'm here to help with your mortgage questions. You can ask about rates, documents needed, application status, or loan types.";
                }
                
                chatMessages.appendChild(botMessage);
                
                // Scroll to bottom
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        }
        
        // Event listeners
        sendButton.addEventListener('click', sendMessage);
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Initialize chatbot (this would normally be replaced by Chatbase's script)
    // In production, you would remove this code and use Chatbase's embed instead
    simulateChatbot();
});
