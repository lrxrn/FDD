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
        
        // Collect form data
        const formData = new FormData(joinForm);
        const formDataObj = {};
        
        // Convert FormData to a regular object
        formData.forEach((value, key) => {
            // Handle multiple values for the same key (like checkboxes)
            if (key === 'availability') {
                if (!formDataObj[key]) {
                    formDataObj[key] = [];
                }
                formDataObj[key].push(value);
            } else {
                formDataObj[key] = value;
            }
        });
        
        // Create URL parameters for Google Apps Script
        const params = new URLSearchParams({
            fullName: formDataObj.fullName,
            email: formDataObj.email,
            phone: formDataObj.phone,
            academicProgram: formDataObj.academicProgram,
            yearOfStudy: formDataObj.yearOfStudy,
            team: formDataObj.team,
            position: formDataObj.position,
            experience: formDataObj.experience + " years",
            availability: Array.isArray(formDataObj.availability)
                ? formDataObj.availability.join(", ")
                : formDataObj.availability,
            motivation: formDataObj.motivation
        });
        
        // Submit to Google Apps Script
        submitToGoogleScript(params, submitBtn);
    }
    
    /**
     * Submit form data to Google Apps Script
     */
    function submitToGoogleScript(params, submitBtn) {
        console.log('Submitting data to Google Apps Script:', params.toString());
        
        fetch(googleScriptUrl + "?" + params.toString())
            .then(response => response.text())
            .then(message => {
                showFormStatus('Thank you for your application! We\'ll be in touch soon about the next steps.', 'success');
                joinForm.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                showFormStatus('There was an error submitting your application. Please try again later or contact us directly.', 'error');
            })
            .finally(() => {
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.classList.remove('submitting');
                submitBtn.innerHTML = 'Submit Application';
                
                // Scroll to the form status message
                formStatus.scrollIntoView({ behavior: 'smooth' });
            });
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