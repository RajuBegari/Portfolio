document.addEventListener('DOMContentLoaded', () => {
    /* ====================================================
       1. STICKY HEADER & SCROLL TRACKING
       ==================================================== */
    const navbar = document.getElementById('navbar');
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            if (navbar) navbar.classList.add('scrolled');
            if (header) header.classList.add('scrolled');
        } else {
            if (navbar) navbar.classList.remove('scrolled');
            if (header) header.classList.remove('scrolled');
        }
    });

    /* ====================================================
       2. MOBILE MENU TOGGLE
       ==================================================== */
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const isOpen = navMenu.classList.contains('open');
            navToggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars-staggered"></i>';
        });

        // Close menu when clicking nav link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                navToggle.innerHTML = '<i class="fa-solid fa-bars-staggered"></i>';
                
                // Active link class updates
                navLinks.forEach(item => item.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    /* ====================================================
       3. THEME INITIALIZATION (Light Theme Default)
       ==================================================== */
    document.body.className = 'theme-light';

    /* ====================================================
       4. DYNAMIC ROLE TYPING EFFECT
       ==================================================== */
    const typingText = document.getElementById('typingText');
    const roles = [
        'Python Full-Stack Apps',
        'AI Agent Workflows',
        'RAG Applications',
        'ML Modeling',
        'UI/UX Design Systems'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        if (!typingText) return;
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            // Delete character
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            // Add character
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150;
        }

        // Handle states
        if (!isDeleting && charIndex === currentRole.length) {
            // Wait before starting delete
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500;
        }
        
        setTimeout(typeEffect, typingSpeed);
    }

    if (typingText) {
        typeEffect();
    }

    /* ====================================================
       5. CUSTOM SMOOTH TRAILING MOUSE CURSOR
       ==================================================== */
    const cursorFollower = document.getElementById('cursorFollower');
    const cursorDot = document.getElementById('cursorDot');
    
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    
    let followerX = mouseX;
    let followerY = mouseY;
    
    if (cursorDot || cursorFollower) {
        // Update cursor target coordinates on mousemove
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Immediate update for the tiny inner dot
            if (cursorDot) {
                cursorDot.style.left = `${mouseX}px`;
                cursorDot.style.top = `${mouseY}px`;
            }
        });
        
        // Animate trailing follower cursor using linear interpolation (LERP)
        function animateCursor() {
            const ease = 0.12; // Lower value = smoother trailing delay
            
            followerX += (mouseX - followerX) * ease;
            followerY += (mouseY - followerY) * ease;
            
            if (cursorFollower) {
                cursorFollower.style.left = `${followerX}px`;
                cursorFollower.style.top = `${followerY}px`;
            }
            
            requestAnimationFrame(animateCursor);
        }
        
        animateCursor();
        
        // Hover state styling helpers
        const hoverElements = document.querySelectorAll('a, button, .theme-toggle, #themeToggle, input, textarea, .project-row');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('hover-link');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('hover-link');
            });
        });
    }

    /* ====================================================
       6. HERO INTERACTIVE MOUSE PARALLAX BLOB
       ==================================================== */
    const heroSection = document.getElementById('home');
    const heroBgBlob = document.querySelector('.hero-bg-shape');
    
    if (heroSection && heroBgBlob) {
        heroSection.addEventListener('mousemove', (e) => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            
            // Calculate relative offset (-0.5 to 0.5)
            const offX = (e.clientX / width) - 0.5;
            const offY = (e.clientY / height) - 0.5;
            
            // Move blob slightly inside the hero viewport area
            const maxMove = 40; // Max pixels
            const moveX = offX * maxMove;
            const moveY = (offY * maxMove) - 50; // accounting for original translateY(-50%)
            
            heroBgBlob.style.transform = `translate(${moveX}px, ${moveY}px) rotate(15deg)`;
        });
        
        // Reset when mouse leaves hero
        heroSection.addEventListener('mouseleave', () => {
            heroBgBlob.style.transform = `translateY(-50%) rotate(0deg)`;
            heroBgBlob.style.transition = 'transform 0.8s ease';
        });
        
        heroSection.addEventListener('mouseenter', () => {
            heroBgBlob.style.transition = 'none'; // disable transitions while interactive
        });
    }

    /* ====================================================
       7. PROJECTS FILTER LOGIC
       ==================================================== */
    const tabButtons = document.querySelectorAll('.tab-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (tabButtons.length > 0 && projectCards.length > 0) {
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active tab button
                tabButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filterValue = btn.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.classList.remove('hidden');
                        // Add fade-in-up transition animations dynamically
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(10px)';
                        setTimeout(() => {
                            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }



    /* ====================================================
       9. INTERSECTION OBSERVER FOR SCROLL REVEAL ANIMATIONS
       ==================================================== */
    const fadeElements = document.querySelectorAll('.about-stats, .timeline-item, .skills-category-card, .project-card, .contact-item, .contact-form-card');
    const scrollItems = document.querySelectorAll('.scroll-trigger, .skills');
    
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal');
                    
                    // If skills section is revealed, animate the bar expansions
                    if (entry.target.classList.contains('skills')) {
                        entry.target.classList.add('animate-in');
                    }
                    
                    observer.unobserve(entry.target); // Reveal only once
                }
            });
        }, observerOptions);

        fadeElements.forEach(el => {
            // Setup base styling state for scroll reveal
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            
            observer.observe(el);
        });

        scrollItems.forEach(item => {
            observer.observe(item);
        });
        
        // CSS class helper added to execute anims
        const styleSheet = document.createElement('style');
        styleSheet.innerText = `
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(styleSheet);
    } else {
        // Fallback for older legacy browsers
        fadeElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
        scrollItems.forEach(item => {
            item.classList.add('reveal');
            if (item.classList.contains('skills')) {
                item.classList.add('animate-in');
            }
        });
    }

    /* ====================================================
       10. MINIMALIST CONTACT FORM HANDLER & WHATSAPP REDIRECT
       ==================================================== */
    const contactForm = document.getElementById('portfolioContactForm');
    const formFeedback = document.getElementById('formFeedback');
    
    if (contactForm && formFeedback) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form inputs
            const name = document.getElementById('formName').value;
            const email = document.getElementById('formEmail').value;
            const subject = document.getElementById('formSubject').value;
            const message = document.getElementById('formMessage').value;
            
            // Format WhatsApp text payload
            const formattedMessage = `Hello Raju!\n\nNew message from portfolio:\n*Name:* ${name}\n*Email:* ${email}\n*Subject:* ${subject}\n*Message:* ${message}`;
            const encodedText = encodeURIComponent(formattedMessage);
            
            const submitBtn = contactForm.querySelector('.btn-submit-arrow');
            const submitText = submitBtn ? submitBtn.querySelector('span') : null;
            
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.style.pointerEvents = 'none';
            }
            if (submitText) {
                submitText.textContent = 'SENDING...';
            }
            
            // Simulate API request/submission states
            setTimeout(() => {
                contactForm.classList.add('hidden');
                formFeedback.classList.remove('hidden');
                
                // Replace with your actual WhatsApp phone number (with country code, e.g. 919876543210)
                const WHATSAPP_NUMBER = '918688393886'; 
                const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;
                
                // Redirect user to WhatsApp chat
                window.open(whatsappUrl, '_blank');
                
                // Reset form values
                contactForm.reset();
            }, 1800);
        });
    }
});
