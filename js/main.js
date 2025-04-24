// Main JavaScript for CheckAPet website
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle enhancement
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        // Add smooth transition for mobile menu
        navbarCollapse.style.transition = 'height 0.3s ease-in-out';
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInside = navbarToggler.contains(event.target) || 
                                navbarCollapse.contains(event.target);
                                
            if (!isClickInside && navbarCollapse.classList.contains('show')) {
                // Use Bootstrap's collapse API to hide the menu
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    }
    
    // Active link highlighting based on current page
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        // Remove any existing active classes
        link.classList.remove('active');
        
        // Get the path from the href
        const linkPath = new URL(link.href, window.location.origin).pathname;
        
        // Check if the current location includes this link's path
        // Exclude the home link's special case when on another page
        if (currentLocation.includes(linkPath) && 
            !(linkPath === '/Checkapet/' && currentLocation !== '/Checkapet/')) {
            link.classList.add('active');
        }
    });
});
