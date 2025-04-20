// Number counter animation for stats
document.addEventListener('DOMContentLoaded', function() {
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Function to animate counting
    function animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 10); // Update every 10ms
        
        const timer = setInterval(function() {
            start += increment;
            
            // Display the current count
            if (start < target) {
                if (target > 100) {
                    // For large numbers, show without decimals
                    element.textContent = Math.floor(start);
                } else {
                    // For small numbers, round to integers
                    element.textContent = Math.round(start);
                }
            } else {
                // Ensure we end exactly at the target
                element.textContent = target;
                clearInterval(timer);
            }
            
            // Add the plus sign for numbers with plus in the original
            if (element.dataset.suffix) {
                element.textContent += element.dataset.suffix;
            }
        }, 10);
    }

    // Get all stat number elements
    const statNumbers = document.querySelectorAll('.stat-number');
    
    // Store original values and set to 0
    statNumbers.forEach(stat => {
        // Store the original text as a data attribute
        const originalText = stat.textContent;
        
        // Check if the text ends with a plus sign
        if (originalText.endsWith('+')) {
            const numericValue = parseInt(originalText.replace('+', ''));
            stat.dataset.target = numericValue;
            stat.dataset.suffix = '+';
        } else {
            stat.dataset.target = parseInt(originalText);
        }
        
        // Start at 0
        stat.textContent = '0';
    });
    
    // Function to start animations when scrolled into view
    function checkAndAnimate() {
        const statsSection = document.querySelector('.stats-section');
        
        if (isInViewport(statsSection) && !statsSection.classList.contains('animated')) {
            statsSection.classList.add('animated');
            
            // Animate each number with different durations for visual variety
            statNumbers.forEach((stat, index) => {
                const target = parseInt(stat.dataset.target);
                // Slightly different durations for visual variety
                const duration = 1500 + (index * 150);
                setTimeout(() => {
                    animateCounter(stat, target, duration);
                }, index * 100);
            });
        }
    }
    
    // Check on scroll
    window.addEventListener('scroll', checkAndAnimate);
    
    // Check on initial load
    checkAndAnimate();
});