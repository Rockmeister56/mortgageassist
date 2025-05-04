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

    // Handle form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const businessName = document.getElementById('businessName').value;
        const phone = document.getElementById('phone').value;
        const bestTime = document.getElementById('bestTime').value;
        const preferredDate = document.getElementById('preferredDate').value;
        
        // Here you would typically send this data to a server
        // For demo purposes, we'll just log it and show a success message
        console.log({
            name,
            businessName,
            phone,
            bestTime,
            preferredDate
        });
        
        // Show success message
        alert('Thank you for your inquiry! We will contact you shortly.');
        
        // Reset form and close modal
        contactForm.reset();
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Enable scrolling again
    });

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
