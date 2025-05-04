// main.js

// Modal functionality for "How Much?" button
document.addEventListener('DOMContentLoaded', function() {
    // Get the modal
    const modal = document.getElementById('quoteModal');
    
    // Get the button that opens the modal
    const btn = document.getElementById('howMuchBtn');
    
    // Get the <span> element that closes the modal
    const closeBtn = document.getElementsByClassName('close')[0];
    
    // When the user clicks the button, open the modal 
    btn.onclick = function() {
        modal.style.display = 'block';
    }
    
    // When the user clicks on <span> (x), close the modal
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
    
    // Form submission handling
    const quoteForm = document.getElementById('quoteForm');
    quoteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(quoteForm);
        const formEntries = Object.fromEntries(formData.entries());
        
        // Send data to the email address
        emailFormData(formEntries);
        
        // Close the modal and show confirmation
        modal.style.display = 'none';
        alert('Thank you! Your information has been submitted.');
        quoteForm.reset();
    });
    
    // Function to send form data to email
    function emailFormData(data) {
        // In a real implementation, you would use a serverless function or service
        // to send this data to the specified email address
        console.log('Sending data to brett@ca-foundation.us', data);
        
        // This is where you would integrate with Netlify Forms or a similar service
        // For example with Netlify, the form would automatically capture submissions
    }
    
    // Smooth scrolling for "Ask Your Mortgage Question" button
    const askBtn = document.querySelector('a[href="#chatbot"]');
    if (askBtn) {
        askBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const chatbotSection = document.getElementById('chatbot');
            chatbotSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
});
