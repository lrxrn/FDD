/**
 * Navigation and header animation functionality
 * This script handles the logo animation when scrolling
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get the header and nav elements
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    const originalLogo = document.querySelector('header .logo');
    
    // Create a clone of the logo for the navigation
    const navLogo = document.createElement('div');
    navLogo.className = 'nav-logo';
    
    // Make the logo clickable by wrapping it in an anchor tag
    const logoLink = document.createElement('a');
    logoLink.href = '/';
    logoLink.innerHTML = originalLogo.innerHTML;
    navLogo.appendChild(logoLink);
    
    navLogo.style.opacity = '0';
    navLogo.style.visibility = 'hidden';
    
    // Insert the nav logo at the beginning of the navigation
    nav.insertBefore(navLogo, nav.firstChild);
    
    // Function to handle scroll event
    function handleScroll() {
        const scrollPosition = window.scrollY;
        const headerBottom = header.offsetTop + header.offsetHeight;
        
        // Check if we've scrolled past the header
        if (scrollPosition > headerBottom - nav.offsetHeight) {
            // Show the nav logo
            navLogo.style.opacity = '1';
            navLogo.style.visibility = 'visible';
            nav.classList.add('scrolled');
        } else {
            // Hide the nav logo
            navLogo.style.opacity = '0';
            navLogo.style.visibility = 'hidden';
            nav.classList.remove('scrolled');
        }
    }
    
    // Listen for scroll events
    window.addEventListener('scroll', handleScroll);
    
    // Initial call to set the correct state
    handleScroll();
});