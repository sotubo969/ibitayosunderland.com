    document.addEventListener('DOMContentLoaded', function() {
        // Add an event listener to each "Learn More" button
        document.querySelectorAll('.learn-more').forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault();  // Prevent the default anchor link behavior

                const solutionCard = this.closest('.solution-card');  // Get the closest solution card
                const extraInfo = solutionCard.querySelector('.extra-info');  // Get the extra-info div

                // Toggle the opacity of the extra-info
                if (extraInfo.style.opacity === '1') {
                    extraInfo.style.opacity = '0';
                } else {
                    extraInfo.style.opacity = '1';
                }
            });
        });
    });

    document.addEventListener('DOMContentLoaded', function() {
        // Get the button and form container
        const contactSalesButton = document.getElementById('contact-sales');
        const contactFormContainer = document.getElementById('contact-form-container');
        
        // Add event listener for the Contact Sales button
        contactSalesButton.addEventListener('click', function() {
            // Toggle the visibility of the contact form
            contactFormContainer.classList.toggle('active');
        });
    
        // Optionally, handle form submission logic
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                const formData = new FormData(contactForm);
                try {
                    const response = await fetch('/process_form.php', {
                        method: 'POST',
                        body: formData
                    });
                    
                    const result = await response.json();
                    if (result.success) {
                        alert('Thank you for your message. We will get back to you soon!');
                        contactForm.reset();
                    } else {
                        alert(result.message || 'An error occurred. Please try again.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('An error occurred. Please try again.');
                }
            });
        }
    });
    

    // Animate elements on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    fadeElements.forEach(element => observer.observe(element));
    