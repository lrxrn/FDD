/**
 * Navigation and header animation functionality
 * This script handles the logo animation and sticky navigation when scrolling
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get the header and nav elements
    const header = document.querySelector('header');
    const sportsNav = document.querySelector('.sports-nav');
    const mainNav = document.querySelector('nav:not(.sports-nav)');
    const originalLogo = document.querySelector('header .logo');
    
    // Function to update main nav position based on current sports nav height
    function updateMainNavPosition() {
        if (sportsNav && mainNav) {
            // Get the actual rendered height including any padding
            const sportsNavHeight = sportsNav.getBoundingClientRect().height;
            mainNav.style.top = `${sportsNavHeight}px`;
            
            // Set a CSS variable that can be used in media queries
            document.documentElement.style.setProperty('--sports-nav-height', `${sportsNavHeight}px`);
        }
    }
    
    // Only proceed if we have all the necessary elements
    if (sportsNav && originalLogo) {
        // Create a clone of the logo for the navigation
        const navLogo = document.createElement('div');
        navLogo.className = 'nav-logo';
        
        // Make the logo clickable by wrapping it in an anchor tag
        const logoLink = document.createElement('a');
        logoLink.href = '/';
        logoLink.innerHTML = originalLogo.innerHTML;
        navLogo.appendChild(logoLink);
        
        // Insert the nav logo at the beginning of the sports navigation bar
        sportsNav.insertBefore(navLogo, sportsNav.firstChild);
        
        // Initial position setting
        updateMainNavPosition();
        
        // Variable to track if logo is currently animating
        let isLogoAnimating = false;
        
        // Function to handle scroll event
        function handleScroll() {
            const scrollPosition = window.scrollY;
            const headerBottom = header.offsetTop + header.offsetHeight;
            
            // Check if we've scrolled past the header
            if (scrollPosition > headerBottom - sportsNav.offsetHeight) {
                // Show the logo
                if (navLogo.classList.contains('disappearing') || getComputedStyle(navLogo).opacity === '0') {
                    // Remove disappearing class first if it exists
                    navLogo.classList.remove('disappearing');
                    
                    // Make element visible before starting transitions
                    navLogo.style.visibility = 'visible';
                    
                    // Trigger reflow to ensure the removal of the class takes effect before adding scrolled
                    void navLogo.offsetWidth;
                    
                    // Add scrolled class to trigger the appearance animation
                    sportsNav.classList.add('scrolled');
                }
            } else if (!isLogoAnimating && (sportsNav.classList.contains('scrolled') || getComputedStyle(navLogo).opacity !== '0')) {
                // Start the disappearing animation
                isLogoAnimating = true;
                
                // Add the disappearing class to trigger the animation
                navLogo.classList.add('disappearing');
                sportsNav.classList.remove('scrolled');
                
                // Wait for animation to complete before fully hiding
                setTimeout(() => {
                    // Only hide completely if we're still supposed to be hidden
                    if (scrollPosition <= headerBottom - sportsNav.offsetHeight) {
                        navLogo.style.visibility = 'hidden';
                    } else {
                        // If we've scrolled back down, revert to visible state
                        navLogo.classList.remove('disappearing');
                        sportsNav.classList.add('scrolled');
                    }
                    isLogoAnimating = false;
                }, 400); // Match this timing with CSS transition duration
            }
            
            // Always update the position after any potential height change
            updateMainNavPosition();
        }
        
        // Add transition end listener to the logo
        navLogo.addEventListener('transitionend', function(e) {
            if (e.propertyName === 'transform' || e.propertyName === 'opacity' || 
                e.propertyName === 'max-height') {
                updateMainNavPosition();
            }
        });
        
        // Use a MutationObserver to detect any changes to the sports nav
        // that might affect its height (like adding/removing classes or content)
        const observer = new MutationObserver(function() {
            updateMainNavPosition();
        });
        
        observer.observe(sportsNav, { 
            attributes: true, 
            childList: true, 
            subtree: true 
        });
        
        // Listen for scroll events with debounce for better performance
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (scrollTimeout) {
                window.cancelAnimationFrame(scrollTimeout);
            }
            scrollTimeout = window.requestAnimationFrame(handleScroll);
        });
        
        // Handle window resize to recalculate heights
        window.addEventListener('resize', updateMainNavPosition);
        
        // Also update on sports nav transition end
        sportsNav.addEventListener('transitionend', function(e) {
            if (e.propertyName === 'padding' || e.propertyName === 'height') {
                updateMainNavPosition();
            }
        });
        
        // Initial call to set the correct state
        handleScroll();
    }
});