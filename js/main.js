// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const modal = document.getElementById('contactModal');
    const btn = document.getElementById('howMuchBtn');
    const closeBtn = document.querySelector('.close-btn');
    const contactForm = document.getElementById('contactForm');

    // Chat options dropdown
    const optionsBtn = document.getElementById('optionsBtn');
    const chatOptions = document.getElementById('chatOptions');
    const startNewChatBtn = document.getElementById('startNewChat');
    const endChatBtn = document.getElementById('endChat');
    const viewRecentChatsBtn = document.getElementById('viewRecentChats');

    // Open modal when "How Much?" button is clicked
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    });
    

    // Close modal when X is clicked
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Enable scrolling again
    });

    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Enable scrolling again
        }
    });

    // Toggle chat options dropdown
    optionsBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        chatOptions.classList.toggle('show');
    });

    // Close dropdown when clicking elsewhere
    document.addEventListener('click', function() {
        chatOptions.classList.remove('show');
    });

    // Chat dropdown options functionality
    startNewChatBtn.addEventListener('click', function() {
        const chatMessages = document.getElementById('chatMessages');
        // Clear all messages except the intro message
        while (chatMessages.firstChild) {
            chatMessages.removeChild(chatMessages.firstChild);
        }
        
        // Add back the intro message
        const introMessage = document.createElement('div');
        introMessage.className = 'intro-message';
        introMessage.textContent = 'Hi! What can I help you with?';
        chatMessages.appendChild(introMessage);
        
        chatOptions.classList.remove('show');
    });

    endChatBtn.addEventListener('click', function() {
        const chatMessages = document.getElementById('chatMessages');
        // Clear all messages
        while (chatMessages.firstChild) {
            chatMessages.removeChild(chatMessages.firstChild);
        }
        
        // Add end message
        const endMessage = document.createElement('div');
        endMessage.className = 'intro-message';
        endMessage.textContent = 'Chat ended. Thank you for using our service.';
        chatMessages.appendChild(endMessage);
        
        chatOptions.classList.remove('show');
    });

    viewRecentChatsBtn.addEventListener('click', function() {
        alert('View recent chats functionality would connect to your chat history database.');
        chatOptions.classList.remove('show');
    });

    // Form submission is now handled by FormSubmit.co
    // We will still add an event listener for logging purposes
    contactForm.addEventListener('submit', function(e) {
        // Don't prevent default - let the form submit to FormSubmit.co
        console.log('Form submitted to ' + contactForm.action);
    });

    function startAIDemo() {
    // 1. Disable the demo button
    document.getElementById('aiDemoButton').disabled = true;
    document.getElementById('aiDemoButton').innerHTML = '🤖 AI Working...';
    
    // 2. Start the AI form filling sequence
    simulateAIFormFilling();
}

function simulateAIFormFilling() {
    // Get form fields by their actual names/selectors
    const fields = [
        {element: document.querySelector('input[name="name"]'), value: "John Smith", delay: 1000},
        {element: document.querySelector('input[name="business"]'), value: "Tech Solutions LLC", delay: 2000}, 
        {element: document.querySelector('input[name="phone"]'), value: "(555) 123-4567", delay: 3000},
        {element: document.querySelector('input[name="bestTime"]'), value: "Morning 9-11 AM", delay: 4000},
        {element: document.querySelector('input[name="preferredDate"]'), value: "2024-12-20", delay: 5000}
    ];
    
    // Fill each field with realistic typing animation
    fields.forEach(field => {
        if (field.element) {
            setTimeout(() => {
                typeText(field.element, field.value);
            }, field.delay);
        }
    });
    
    // Reset button after demo completes
    setTimeout(() => {
        const button = document.getElementById('aiDemoButton');
        button.innerHTML = '✅ Demo Complete! Try Again?';
        button.disabled = false;
        button.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
    }, 6000);
}

function typeText(element, text) {
    element.focus();
    element.value = '';
    let i = 0;
    const timer = setInterval(() => {
        element.value += text[i];
        i++;
        if (i >= text.length) {
            clearInterval(timer);
            element.blur();
        }
    }, 100); // Typing speed
}

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Account for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
});
