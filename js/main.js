// ===========================
// FILTRADO DE CATEGORÍAS
// ===========================
function filterCategory(category, element) {
    const cards = document.querySelectorAll('.product-card');
    const tabs = document.querySelectorAll('.category-tab');
    
    // Actualizar tab activo
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Si se pasa el elemento, usarlo; si no, usar event.target
    const activeTab = element || event.target;
    activeTab.classList.add('active');
    
    // Filtrar tarjetas con animación
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 10);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// ===========================
// SMOOTH SCROLL
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    // Navegación suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ===========================
    // INTERSECTION OBSERVER
    // ===========================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar todas las tarjetas
    document.querySelectorAll('.product-card, .cortina-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
    
    // ===========================
    // ANIMACIÓN DE NÚMEROS
    // ===========================
    function animateNumber(element, start, end, duration) {
        let startTime = null;
        
        function animation(currentTime) {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value;
            
            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        }
        
        requestAnimationFrame(animation);
    }
    
    // ===========================
    // NAVBAR SCROLL EFFECT
    // ===========================
    const nav = document.querySelector('nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Efecto de sombra al hacer scroll
        if (currentScroll > 100) {
            nav.classList.add('scrolled');
            nav.style.boxShadow = '0 6px 40px rgba(0, 0, 0, 0.15)';
        } else {
            nav.classList.remove('scrolled');
            nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
        }
        
        // Esconder/mostrar navbar al hacer scroll
        if (currentScroll > 300) {
            if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
                // Scrolling down
                nav.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                nav.style.transform = 'translateY(0)';
            }
        }
        
        lastScroll = currentScroll;
    });
    
    // ===========================
    // LAZY LOADING DE IMÁGENES
    // ===========================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // ===========================
    // CONTADOR DE PRODUCTOS
    // ===========================
    const productCount = document.querySelectorAll('.product-card').length;
    const cortinaCount = document.querySelectorAll('.cortina-card').length;
    
    console.log(`✓ Sitio cargado correctamente`);
    console.log(`✓ ${productCount} productos de aberturas`);
    console.log(`✓ ${cortinaCount} tipos de cortinas`);
    
    // ===========================
    // EFECTO PARALLAX EN HERO
    // ===========================
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            const parallaxSpeedContent = 0.3;
            
            if (scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
                if (heroContent) {
                    heroContent.style.transform = `translateY(${scrolled * parallaxSpeedContent}px)`;
                    heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
                }
            }
        });
    }
    
    // ===========================
    // ANIMACIÓN DE ENTRADA PARA SECCIONES
    // ===========================
    const sections = document.querySelectorAll('.section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, {
        threshold: 0.15
    });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // ===========================
    // MENU MOBILE (si se agrega)
    // ===========================
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuButton.classList.toggle('active');
        });
    }
    
    // ===========================
    // FORM VALIDATION (para futuro formulario de contacto)
    // ===========================
    const contactForm = document.querySelector('#contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación básica
            const name = document.querySelector('#name').value;
            const email = document.querySelector('#email').value;
            const message = document.querySelector('#message').value;
            
            if (name && email && message) {
                // Aquí iría la lógica de envío
                alert('¡Mensaje enviado correctamente! Nos pondremos en contacto pronto.');
                contactForm.reset();
            } else {
                alert('Por favor, complete todos los campos.');
            }
        });
    }
    
    // ===========================
    // TOOLTIP FUNCTIONALITY
    // ===========================
    const badges = document.querySelectorAll('.product-badge');
    
    badges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // ===========================
    // PERFORMANCE OPTIMIZATION
    // ===========================
    // Preload de fuentes críticas
    const fontPreload = document.createElement('link');
    fontPreload.rel = 'preload';
    fontPreload.as = 'font';
    fontPreload.type = 'font/woff2';
    fontPreload.crossOrigin = 'anonymous';
    
    // ===========================
    // ANALYTICS & TRACKING (placeholder)
    // ===========================
    function trackEvent(category, action, label) {
        console.log(`Event tracked: ${category} - ${action} - ${label}`);
        // Aquí se integraría Google Analytics o similar
    }
    
    // Tracking de clicks en botones
    document.querySelectorAll('.product-button, .cta-button').forEach(button => {
        button.addEventListener('click', function() {
            trackEvent('Engagement', 'Click', this.textContent);
        });
    });
    
    // ===========================
    // EASTER EGG (opcional)
    // ===========================
    let clickCount = 0;
    const logo = document.querySelector('.logo');
    
    if (logo) {
        logo.addEventListener('click', () => {
            clickCount++;
            if (clickCount === 5) {
                console.log('🎉 ¡Sitio desarrollado con atención al detalle!');
                clickCount = 0;
            }
        });
    }
});

// ===========================
// UTILIDADES GLOBALES
// ===========================

// Debounce function para optimizar eventos
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Scroll optimizado
const optimizedScroll = throttle(() => {
    // Lógica de scroll
}, 100);

window.addEventListener('scroll', optimizedScroll);

// ===========================
// EXPORT FUNCTIONS (si se usa como módulo)
// ===========================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        filterCategory,
        debounce,
        throttle
    };
}