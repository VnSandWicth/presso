// Mobile Navigation Implementation
document.addEventListener('DOMContentLoaded', function() {
    // Navbar Elements
    const navToggle = document.getElementById('nav-toggle');
    const navbar = document.getElementById('navbar');
    
    // Function to toggle mobile menu
    function toggleMobileMenu() {
        navbar.classList.toggle('show');
        document.body.classList.toggle('no-scroll');
    }

    // Function to close mobile menu
    function closeMobileMenu() {
        navbar.classList.remove('show');
        document.body.classList.remove('no-scroll');
    }

    // Initialize mobile menu
    if (navToggle && navbar) {
        // Toggle menu on button click
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMobileMenu();
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navbar.contains(e.target) && e.target !== navToggle) {
                closeMobileMenu();
            }
        });

        // Prevent body scroll when menu is open
        navbar.addEventListener('touchmove', function(e) {
            if (navbar.classList.contains('show')) {
                e.preventDefault();
            }
        }, { passive: false });
    }

    // Update active nav link
    function updateActiveNav() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav__link').forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage || 
                (currentPage === '' && linkPage === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Initialize active nav link
    updateActiveNav();

    // Mobile Product Card Interactions
    const productCards = document.querySelectorAll('.wrapper');
    productCards.forEach(card => {
        // Touch events for mobile
        card.addEventListener('touchstart', function() {
            this.classList.add('active-touch');
        });
        
        card.addEventListener('touchend', function() {
            this.classList.remove('active-touch');
            this.querySelector('.inside').classList.toggle('show-info');
        });

        // Click events for desktop
        card.addEventListener('click', function() {
            if (window.innerWidth > 768) {
                this.querySelector('.inside').classList.toggle('show-info');
            }
        });
    });

    // Responsive adjustments
    function handleResponsive() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
            // Hide all product info on desktop resize
            document.querySelectorAll('.inside').forEach(info => {
                info.classList.remove('show-info');
            });
        }
    }

    // Initial responsive check
    handleResponsive();
    window.addEventListener('resize', handleResponsive);
});
