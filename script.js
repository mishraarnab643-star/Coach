// =========================================
// Mobile Menu Toggle
// =========================================
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');
const navItems = document.querySelectorAll('.nav-link');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate Hamburger Menu
    const bars = document.querySelectorAll('.bar');
    if (navLinks.classList.contains('active')) {
        bars[0].style.transform = 'translateY(9px) rotate(45deg)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'translateY(-9px) rotate(-45deg)';
    } else {
        bars[0].style.transform = 'translateY(0) rotate(0)';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'translateY(0) rotate(0)';
    }
});

// Close mobile menu on link click
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            mobileMenu.click();
        }
    });
});

// =========================================
// Sticky Navbar
// =========================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// =========================================
// Scroll Reveal Animation (Intersection Observer)
// =========================================
const revealElements = document.querySelectorAll('.reveal');

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Stop observing once revealed
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealOnScroll.observe(el);
});

// =========================================
// Testimonials Slider
// =========================================
const slides = document.querySelectorAll('.slide');
const nextBtn = document.getElementById('next-slide');
const prevBtn = document.getElementById('prev-slide');
let currentSlide = 0;

function showSlide(index) {
    // Handle bounds
    if (index >= slides.length) currentSlide = 0;
    if (index < 0) currentSlide = slides.length - 1;
    
    // Remove active class from all
    slides.forEach(slide => slide.classList.remove('active'));
    
    // Add active to current
    slides[currentSlide].classList.add('active');
}

nextBtn.addEventListener('click', () => {
    currentSlide++;
    showSlide(currentSlide);
});

prevBtn.addEventListener('click', () => {
    currentSlide--;
    showSlide(currentSlide);
});

// Auto slide every 5 seconds
setInterval(() => {
    currentSlide++;
    showSlide(currentSlide);
}, 5000);

// =========================================
// Form Validation
// =========================================
const form = document.getElementById('enrollment-form');
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const courseSelect = document.getElementById('course');
const successMsg = document.getElementById('form-success');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;

    // Validate Name
    if (nameInput.value.trim() === '') {
        document.getElementById('name-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('name-error').style.display = 'none';
    }

    // Validate Phone (Simple 10 digit regex)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneInput.value.replace(/\D/g,''))) {
        document.getElementById('phone-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('phone-error').style.display = 'none';
    }

    // Validate Course Select
    if (courseSelect.value === '') {
        document.getElementById('course-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('course-error').style.display = 'none';
    }

    // On Success
    if (isValid) {
        successMsg.style.display = 'block';
        form.reset();
        
        // Hide success message after 4 seconds
        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 4000);
    }
});

