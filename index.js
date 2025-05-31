document.addEventListener('DOMContentLoaded', function () {
            // Header scroll effect
            const header = document.getElementById('page-header');
            if (header) {
                const handleScroll = () => {
                    if (window.scrollY > 10) {
                        header.classList.add('bg-white/80', 'backdrop-blur-lg', 'shadow-md', 'border-slate-200');
                        header.classList.remove('bg-transparent', 'border-transparent');
                    } else {
                        header.classList.remove('bg-white/80', 'backdrop-blur-lg', 'shadow-md', 'border-slate-200');
                        header.classList.add('bg-transparent', 'border-transparent');
                    }
                };
                window.addEventListener('scroll', handleScroll);
                handleScroll(); // Initial check
            }

            // Mobile menu toggle
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            const iconBars = document.getElementById('icon-bars');
            const iconXMark = document.getElementById('icon-xmark');

            if (mobileMenuButton && mobileMenu && iconBars && iconXMark) {
                mobileMenuButton.addEventListener('click', () => {
                    const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true' || false;
                    mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
                    mobileMenu.classList.toggle('hidden');
                    iconBars.classList.toggle('hidden');
                    iconXMark.classList.toggle('hidden');
                });

                // Close mobile menu on link click
                const mobileMenuLinks = mobileMenu.querySelectorAll('.mobile-menu-link');
                mobileMenuLinks.forEach(link => {
                    link.addEventListener('click', () => {
                        mobileMenuButton.setAttribute('aria-expanded', 'false');
                        mobileMenu.classList.add('hidden');
                        iconBars.classList.remove('hidden');
                        iconXMark.classList.add('hidden');
                    });
                });
            }

            // HeroSection "Learn More" smooth scroll
            const learnMoreButton = document.getElementById('learn-more-button');
            if (learnMoreButton) {
                learnMoreButton.addEventListener('click', function (e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href').substring(1); // Get 'how-it-works'
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                });
            }
            
            // Set current year in footer
            const yearSpan = document.getElementById('currentYear');
            if (yearSpan) {
                yearSpan.textContent = new Date().getFullYear();
            }
        });