document.addEventListener('DOMContentLoaded', function() {
    // Helper function to safely toggle classes
    function safeToggleClass(element, className) {
        if (element && element.classList) {
            element.classList.toggle(className);
            return true;
        }
        console.error('Cannot toggle class on invalid element', element);
        return false;
    }
    
    // Helper function to safely check if element has class
    function safeHasClass(element, className) {
        return element && element.classList && element.classList.contains(className);
    }
    
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    
    // Log what we found to help with debugging
    console.log('Mobile menu button found:', !!mobileMenuBtn);
    console.log('Mobile nav found:', !!mobileNav);
    
    // Mobile menu button click
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function(event) {
            event.stopPropagation();
            safeToggleClass(mobileNav, 'active');
        });
        
        // Touch event
        mobileMenuBtn.addEventListener('touchstart', function(event) {
            event.stopPropagation();
            event.preventDefault();
            safeToggleClass(mobileNav, 'active');
        }, { passive: false });
    }
    
    // Outside click
    document.addEventListener('click', function(event) {
        if (safeHasClass(mobileNav, 'active') && 
            !event.target.closest('.mobile-nav') && 
            !event.target.closest('.mobile-menu-btn')) {
            
            if (mobileNav && mobileNav.classList) {
                mobileNav.classList.remove('active');
            }
        }
    });
    
    // Resize handler
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && safeHasClass(mobileNav, 'active')) {
            if (mobileNav && mobileNav.classList) {
                mobileNav.classList.remove('active');
            }
        }
    });
});