// API Configuration
const API_URL = '/api'; // Change this to your deployed backend URL

// Contact Form Handler
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.querySelector('form');
  
  if (contactForm && window.location.pathname.includes('contact')) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('.form-submit');
      const originalText = submitBtn.textContent;
      
      // Get form data
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
      };
      
      // Show loading state
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      try {
        const response = await fetch(`${API_URL}/contact`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
          // Success
          showMessage('Message sent successfully! We\'ll get back to you soon.', 'success');
          contactForm.reset();
        } else {
          showMessage(data.error || 'Failed to send message. Please try again.', 'error');
        }
      } catch (error) {
        console.error('Error:', error);
        showMessage('Network error. Please check your connection and try again.', 'error');
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }
  
  // Book Order Form Handler
  const orderForm = document.getElementById('order-form');
  
  if (orderForm) {
    orderForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = orderForm.querySelector('.order-submit');
      const originalText = submitBtn.textContent;
      
      // Get form data
      const formData = {
        name: document.getElementById('order-name').value,
        email: document.getElementById('order-email').value,
        bookType: document.getElementById('book-type').value,
        address: document.getElementById('order-address')?.value || '',
        phone: document.getElementById('order-phone')?.value || ''
      };
      
      // Show loading state
      submitBtn.textContent = 'Processing...';
      submitBtn.disabled = true;
      
      try {
        const response = await fetch(`${API_URL}/order`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
          // Success
          showMessage('Order placed successfully! Check your email for confirmation.', 'success');
          orderForm.reset();
        } else {
          showMessage(data.error || 'Failed to place order. Please try again.', 'error');
        }
      } catch (error) {
        console.error('Error:', error);
        showMessage('Network error. Please check your connection and try again.', 'error');
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }
});

// Show message function
function showMessage(text, type = 'success') {
  // Remove existing messages
  const existing = document.querySelector('.form-message');
  if (existing) existing.remove();
  
  // Create message element
  const message = document.createElement('div');
  message.className = `form-message ${type}`;
  message.textContent = text;
  
  // Style the message
  message.style.cssText = `
    position: fixed;
    top: 80px;
    left: 50%;
    transform: translateX(-50%);
    padding: 16px 32px;
    background: ${type === 'success' ? '#34c759' : '#ff3b30'};
    color: white;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 500;
    z-index: 10000;
    animation: slideDown 0.3s ease;
  `;
  
  document.body.appendChild(message);
  
  // Remove after 5 seconds
  setTimeout(() => {
    message.style.animation = 'slideUp 0.3s ease';
    setTimeout(() => message.remove(), 300);
  }, 5000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translate(-50%, -20px);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }
  
  @keyframes slideUp {
    from {
      opacity: 1;
      transform: translate(-50%, 0);
    }
    to {
      opacity: 0;
      transform: translate(-50%, -20px);
    }
  }
`;
document.head.appendChild(style);
