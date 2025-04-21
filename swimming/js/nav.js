/**
 * Navigation functionality for APUFit Swimming
 * Handles responsive behavior for sports-nav and main navigation
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const sportsNav = document.querySelector('.sports-nav');
    const mainNav = document.querySelector('nav:not(.sports-nav)');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLogo = document.querySelector('.sports-nav .nav-logo');
    const mainNavMenu = document.querySelector('nav:not(.sports-nav) ul');
    
    // Set sports nav height variable for sticky positioning
    if (sportsNav) {
        // Add a small delay to ensure proper calculation after layout
        setTimeout(() => {
            const sportsNavHeight = sportsNav.offsetHeight;
            document.documentElement.style.setProperty('--sports-nav-height', sportsNavHeight + 'px');
        }, 100);
        
        // Update on window resize to ensure proper stacking
        window.addEventListener('resize', () => {
            const sportsNavHeight = sportsNav.offsetHeight;
            document.documentElement.style.setProperty('--sports-nav-height', sportsNavHeight + 'px');
        });
    }
    
    // Mobile menu toggle functionality
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            // Toggle active class for menu visibility
            mainNavMenu.classList.toggle('active');
            
            // Toggle aria-expanded attribute for accessibility
            const expanded = mainNavMenu.classList.contains('active');
            mobileMenuToggle.setAttribute('aria-expanded', expanded);
            
            // Add icon toggle for visual feedback
            mobileMenuToggle.innerHTML = expanded ? 
                '<i class="fas fa-times"></i>' : 
                '<i class="fas fa-bars"></i>';
        });
        
        // Initial state
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileMenuToggle.setAttribute('aria-label', 'Toggle navigation menu');
    }
    
    // Scrolling behavior for sports nav
    window.addEventListener('scroll', function() {
        if (sportsNav && navLogo) {
            if (window.scrollY > 100) {
                sportsNav.classList.add('scrolled');
                navLogo.classList.remove('disappearing');
            } else {
                sportsNav.classList.remove('scrolled');
                navLogo.classList.add('disappearing');
            }
        }
    });
    
    // Handle window resize to ensure nav menu state is correct
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mainNavMenu) {
            // Reset menu to normal state on desktop
            mainNavMenu.classList.remove('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = mainNav && mainNav.contains(event.target);
        const isClickOnToggle = mobileMenuToggle && mobileMenuToggle.contains(event.target);
        
        if (mainNavMenu && mainNavMenu.classList.contains('active') && !isClickInsideNav && !isClickOnToggle) {
            mainNavMenu.classList.remove('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });
    
    // Trigger scroll event to initialize nav states
    window.dispatchEvent(new Event('scroll'));
});