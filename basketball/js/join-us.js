/**
 * JavaScript for the Join Us page
 * Handles form validation and submission to a Google Apps Script
 */

document.addEventListener('DOMContentLoaded', function() {
    const joinForm = document.getElementById('join-form');
    const formStatus = document.getElementById('form-status');
    
    // Google Apps Script URL
    const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbwTqmdAK3JKzMrcMuRfxaKiK0oA0DuPY7X-tqh4_WzYFFfTwv-aliyrfOfQughPrkxUNA/exec';
    
    if (joinForm) {
        joinForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Validate form before submission
            if (validateForm()) {
                submitForm();
            }
        });
    }
    
    /**
     * Validate the form fields
     * @returns {boolean} True if all required fields are valid, false otherwise
     */
    function validateForm() {
        // Reset previous validation states
        formStatus.innerHTML = '';
        formStatus.className = 'hidden';
        
        // Check for availability checkboxes
        const availabilityCheckboxes = document.querySelectorAll('input[name="availability"]:checked');
        if (availabilityCheckboxes.length === 0) {
            showFormStatus('Please select at least one day for training availability.', 'error');
            return false;
        }
        
        // Check if agreement checkbox is checked
        const agreementCheckbox = document.getElementById('agreement');
        if (!agreementCheckbox.checked) {
            showFormStatus('You must agree to the terms to submit the application.', 'error');
            return false;
        }
        
        // All validation passed
        return true;
    }
    
    /**
     * Submit the form data to Google Apps Script
     */
    function submitForm() {
        // Disable the submit button and show loading state
        const submitBtn = joinForm.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.classList.add('submitting');
        submitBtn.innerHTML = 'Submitting...';
        
        // Collect form data and create a hidden iframe for submission
        submitToGoogleScriptWithIframe(submitBtn);
    }
    
    /**
     * Submit form data to Google Apps Script using a hidden iframe to avoid CORS issues
     */
    function submitToGoogleScriptWithIframe(submitBtn) {
        // Create a hidden iframe for the form submission
        let tempIframe = document.getElementById('temp-iframe');
        if (!tempIframe) {
            tempIframe = document.createElement('iframe');
            tempIframe.id = 'temp-iframe';
            tempIframe.name = 'temp-iframe';
            tempIframe.style.display = 'none';
            document.body.appendChild(tempIframe);
        }
        
        // Set up response handling
        tempIframe.onload = function() {
            try {
                // Wait a moment for the iframe to fully load
                setTimeout(() => {
                    showFormStatus('Thank you for your application! We\'ll be in touch soon about the next steps.', 'success');
                    joinForm.reset();
                    
                    // Reset button state
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('submitting');
                    submitBtn.innerHTML = 'Submit Application';
                    
                    // Scroll to the form status message
                    formStatus.scrollIntoView({ behavior: 'smooth' });
                }, 1000);
            } catch (error) {
                console.error('Error:', error);
                showFormStatus('There was an error submitting your application. Please try again later or contact us directly using the button below.', 'error');
                
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.classList.remove('submitting');
                submitBtn.innerHTML = 'Submit Application';
            }
        };
        
        // Modify the form to submit to the iframe
        joinForm.target = 'temp-iframe';
        joinForm.action = googleScriptUrl;
        joinForm.method = 'POST';
        
        // Add a flag for the Google Script to know this is a form submission
        const formFlag = document.createElement('input');
        formFlag.type = 'hidden';
        formFlag.name = 'formSubmitted';
        formFlag.value = 'true';
        joinForm.appendChild(formFlag);
        
        // Submit the form
        joinForm.submit();
        
        // Clean up by removing the flag
        setTimeout(() => {
            joinForm.removeChild(formFlag);
        }, 100);
    }
    
    /**
     * Show a status message to the user
     * @param {string} message - The message to display
     * @param {string} type - The type of message ('success' or 'error')
     */
    function showFormStatus(message, type) {
        formStatus.innerHTML = message;
        formStatus.className = type;
        formStatus.classList.remove('hidden');
    }
});