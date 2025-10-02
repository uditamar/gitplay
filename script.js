// Language Management
let currentLanguage = 'en';

// Theme Management
let currentTheme = 'light';

// Language data
const languageData = {
    en: {
        direction: 'ltr',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    },
    he: {
        direction: 'rtl',
        fontFamily: 'Heebo, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    }
};

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeLanguage();
    initializeTheme();
    initializeNavigation();
    initializeAnimations();
    initializeCodeBlocks();
});

// Language switching functionality
function toggleLanguageDropdown() {
    const dropdown = document.getElementById('lang-dropdown');
    dropdown.classList.toggle('active');
}

function switchLanguage(lang) {
    currentLanguage = lang;
    updateLanguage();
    updateLanguageSwitcher();
    closeLanguageDropdown();
}

function updateLanguage() {
    const html = document.documentElement;
    const body = document.body;
    const langData = languageData[currentLanguage];
    
    // Update HTML attributes
    html.setAttribute('lang', currentLanguage);
    html.setAttribute('dir', langData.direction);
    
    // Update font family
    body.style.fontFamily = langData.fontFamily;
    
    // Update all elements with data attributes
    const elements = document.querySelectorAll('[data-en], [data-he]');
    elements.forEach(element => {
        const text = element.getAttribute(`data-${currentLanguage}`);
        if (text) {
            element.textContent = text;
        }
    });
    
    // Update page title
    const title = currentLanguage === 'en' 
        ? 'Learn Crossplane - DevOps Platform Engineering'
        : 'למד Crossplane - הנדסת פלטפורמות DevOps';
    document.title = title;
    
    // Store language preference
    localStorage.setItem('preferredLanguage', currentLanguage);
}

function updateLanguageSwitcher() {
    const currentLangSpan = document.getElementById('current-lang');
    const langOptions = document.querySelectorAll('.lang-option');
    
    if (currentLangSpan) {
        currentLangSpan.textContent = currentLanguage === 'en' ? 'English' : 'עברית';
    }
    
    // Update active state of language options
    langOptions.forEach(option => {
        const lang = option.getAttribute('data-lang');
        if (lang === currentLanguage) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
}

function closeLanguageDropdown() {
    const dropdown = document.getElementById('lang-dropdown');
    dropdown.classList.remove('active');
}

function initializeLanguage() {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'he')) {
        currentLanguage = savedLanguage;
    }
    
    // Apply initial language
    updateLanguage();
    updateLanguageSwitcher();
}

// Theme switching functionality
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    updateTheme();
    updateThemeIcon();
    localStorage.setItem('preferredTheme', currentTheme);
}

function updateTheme() {
    const html = document.documentElement;
    html.setAttribute('data-theme', currentTheme);
}

function updateThemeIcon() {
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
        if (currentTheme === 'dark') {
            themeIcon.className = 'fas fa-moon';
        } else {
            themeIcon.className = 'fas fa-sun';
        }
    }
}

function initializeTheme() {
    // Load saved theme preference
    const savedTheme = localStorage.getItem('preferredTheme');
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        currentTheme = savedTheme;
    } else {
        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            currentTheme = 'dark';
        }
    }
    
    // Apply initial theme
    updateTheme();
    updateThemeIcon();
}

// Navigation functionality
function initializeNavigation() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Close language dropdown when clicking outside
    document.addEventListener('click', function(e) {
        const languageSwitcher = document.querySelector('.language-switcher');
        const dropdown = document.getElementById('lang-dropdown');
        
        if (languageSwitcher && !languageSwitcher.contains(e.target)) {
            closeLanguageDropdown();
        }
    });
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }
    
    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.nav-menu .nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });
    
    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Scroll to section function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Animation on scroll
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .tutorial-card, .resource-card, .step');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Code block functionality
function initializeCodeBlocks() {
    const codeBlocks = document.querySelectorAll('.code-block code');
    codeBlocks.forEach(block => {
        // Add copy button
        const copyButton = document.createElement('button');
        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
        copyButton.className = 'copy-button';
        copyButton.title = currentLanguage === 'en' ? 'Copy code' : 'העתק קוד';
        
        // Style the copy button
        copyButton.style.cssText = `
            position: absolute;
            top: 8px;
            right: 8px;
            background: rgba(255, 255, 255, 0.1);
            border: none;
            color: #e2e8f0;
            padding: 4px 8px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            transition: background 0.2s ease;
        `;
        
        copyButton.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(255, 255, 255, 0.2)';
        });
        
        copyButton.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255, 255, 255, 0.1)';
        });
        
        copyButton.addEventListener('click', function() {
            navigator.clipboard.writeText(block.textContent).then(() => {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i>';
                this.style.background = 'rgba(0, 255, 0, 0.2)';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.background = 'rgba(255, 255, 255, 0.1)';
                }, 2000);
            });
        });
        
        // Make code block container relative for absolute positioning
        const container = block.parentElement;
        container.style.position = 'relative';
        container.appendChild(copyButton);
    });
}

// Interactive tutorial cards
function initializeTutorialCards() {
    const tutorialCards = document.querySelectorAll('.tutorial-card');
    tutorialCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Here you could add functionality to open tutorial content
            console.log('Tutorial clicked:', this.querySelector('h3').textContent);
        });
    });
}

// Resource card interactions
function initializeResourceCards() {
    const resourceCards = document.querySelectorAll('.resource-card');
    resourceCards.forEach(card => {
        const link = card.querySelector('.resource-link');
        if (link) {
            card.addEventListener('click', function(e) {
                if (e.target !== link) {
                    link.click();
                }
            });
        }
    });
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    }
    
    // Alt + L toggles language dropdown
    if (e.altKey && e.key === 'l') {
        e.preventDefault();
        toggleLanguageDropdown();
    }
    
    // Alt + T toggles theme
    if (e.altKey && e.key === 't') {
        e.preventDefault();
        toggleTheme();
    }
    
    // ESC key closes language dropdown
    if (e.key === 'Escape') {
        closeLanguageDropdown();
    }
});

// Mobile menu toggle function (called from HTML)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const icon = mobileMenuToggle.querySelector('i');
    
    navMenu.classList.toggle('active');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
}

// Add mobile menu styles dynamically
const mobileMenuStyles = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 20px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transform: translateY(-100%);
            transition: transform 0.3s ease;
            z-index: 999;
        }
        
        .nav-menu.active {
            transform: translateY(0);
        }
        
        .nav-menu .nav-link {
            padding: 10px 0;
            border-bottom: 1px solid #e2e8f0;
            width: 100%;
            text-align: center;
        }
        
        .nav-menu .nav-link:last-child {
            border-bottom: none;
        }
    }
`;

// Inject mobile menu styles
const styleSheet = document.createElement('style');
styleSheet.textContent = mobileMenuStyles;
document.head.appendChild(styleSheet);

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initializeTutorialCards();
    initializeResourceCards();
});

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Error handling for missing elements
function safeQuerySelector(selector) {
    try {
        return document.querySelector(selector);
    } catch (error) {
        console.warn(`Element not found: ${selector}`);
        return null;
    }
}

// Console welcome message
console.log(`
🚀 Learn Crossplane - DevOps Platform Engineering
📚 Master the cloud-native framework for platform engineering
🌐 Available in English and Hebrew
🌙 Dark mode available - click the moon/sun icon or press Alt+T
⌨️  Press Alt+L to toggle language, Alt+T to toggle theme
`);

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker can be added here for offline functionality
        console.log('Service Worker support detected');
    });
}
