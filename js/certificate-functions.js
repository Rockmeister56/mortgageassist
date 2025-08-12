// Certificate functionality
function downloadCertificate() {
    // Create a temporary link to download the certificate image
    const link = document.createElement('a');
    link.href = 'https://page.gensparksite.com/file_format_converter/tooluse_RjkU2CB1QwG_q9g_9L4yxg/file-1.png';
    link.download = 'AI4Loans-500-Dollar-Certificate.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show success message
    showNotification('Certificate downloaded successfully! 🎉');
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 1000;
        font-weight: bold;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease;
    `;
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
        style.remove();
    }, 3000);
}

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Certificate hover effect
    const certificate = document.querySelector('.certificate-image');
    if (certificate) {
        certificate.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        certificate.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // Add click tracking for analytics (optional)
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent.trim();
            console.log('Button clicked:', action);
            // Add your analytics tracking here if needed
        });
    });
});

// Print function enhancement
function printCertificate() {
    window.print();
    showNotification('Print dialog opened! 🖨️');
}