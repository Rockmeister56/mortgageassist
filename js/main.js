// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const modal = document.getElementById('contactModal');
    const btn = document.getElementById('howMuchBtn');
    const closeBtn = document.querySelector('.close-btn');
    const contactForm = document.getElementById('contactForm');

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

    // Handle form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const loanType = document.getElementById('loanType').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send this data to a server
        // For demo purposes, we'll just log it and show a success message
        console.log({
            name,
            email,
            phone,
            loanType,
            message
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
