// ===== Preloader =====
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('preloader').classList.add('hidden');
    }, 1800);
});

// ===== Custom Cursor =====
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

function animateFollower() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
}
animateFollower();

// Cursor hover effects
document.querySelectorAll('a, button, .skill-pill, .tech-badge, .project-card, .cert-card, .achievement-card, .dock-icon-wrapper, .stat-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
        cursorFollower.classList.add('active');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
        cursorFollower.classList.remove('active');
    });
});

// ===== Theme Toggle =====
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// ===== Navbar Scroll =====
const navbar = document.getElementById('navbar');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollY = scrollY;
    
    // Back to top button
    const btt = document.getElementById('backToTop');
    if (scrollY > 500) {
        btt.classList.add('visible');
    } else {
        btt.classList.remove('visible');
    }
    
    // Active nav item based on scroll
    updateActiveNav();
});

// ===== Active Navigation =====
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id], .hero-section');
    const navItems = document.querySelectorAll('.nav-item');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-section') === currentSection) {
            item.classList.add('active');
        }
    });
}

// ===== Mobile Menu =====
const mobileToggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');
const hamburger = document.getElementById('hamburger');
const mobileItems = document.querySelectorAll('.mobile-item');

mobileToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open');
});

mobileItems.forEach(item => {
    item.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
    });
});

mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
    }
});

// ===== Typewriter Effect =====
const typewriterEl = document.getElementById('typewriter');
const titles = [
    'ML Engineer',
    'Full Stack Developer',
    'Python Developer',
    'Data Analyst',
    'AI Enthusiast'
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeWriter() {
    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
        typewriterEl.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typewriterEl.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentTitle.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeWriter, typeSpeed);
}

typeWriter();

// ===== Scroll Reveal =====
const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

scrollRevealElements.forEach(el => revealObserver.observe(el));

// ===== Counter Animation =====
const statNumbers = document.querySelectorAll('.stat-number[data-count]');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const count = parseInt(target.getAttribute('data-count'));
            animateCounter(target, count);
            counterObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(el => counterObserver.observe(el));

function animateCounter(el, target) {
    let current = 0;
    const increment = target / 30;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            el.textContent = target + '+';
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current);
        }
    }, 50);
}

// ===== Particles =====
const particlesContainer = document.getElementById('particles');

function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 8 + 6) + 's';
    particle.style.animationDelay = Math.random() * 4 + 's';
    particle.style.width = (Math.random() * 4 + 2) + 'px';
    particle.style.height = particle.style.width;
    particle.style.opacity = Math.random() * 0.3 + 0.1;
    particlesContainer.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 14000);
}

// Create initial particles
for (let i = 0; i < 20; i++) {
    setTimeout(() => createParticle(), Math.random() * 3000);
}

// Continuously create particles
setInterval(createParticle, 800);

// ===== Back to Top =====
document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Smooth scroll for nav links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        // Skip if it's just "#" (placeholder links)
        if (href === '#') return;
        // Only smooth scroll for internal section links
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== Contact Form =====
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    
    const name = document.getElementById('nameInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const subject = document.getElementById('subjectInput').value.trim() || 'Portfolio Contact';
    const message = document.getElementById('messageInput').value.trim();
    
    if (!name || !email || !message) {
        toast.style.display = 'flex';
        toast.className = 'toast error';
        toast.innerHTML = '⚠️ Please fill in all required fields.';
        setTimeout(() => { toast.style.display = 'none'; }, 3000);
        return;
    }
    
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    btnText.textContent = 'Sending...';
    
    // Build mailto body and open email client
    const mailBody = `Hi Nikhil,%0D%0A%0D%0AMy name is ${encodeURIComponent(name)}.%0D%0AEmail: ${encodeURIComponent(email)}%0D%0A%0D%0A${encodeURIComponent(message)}%0D%0A%0D%0ABest regards,%0D%0A${encodeURIComponent(name)}`;
    const mailtoUrl = `mailto:nikhilmanikanta.44@gmail.com?subject=${encodeURIComponent(subject)}&body=${mailBody}`;
    
    // Open mailto link
    window.location.href = mailtoUrl;
    
    setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        btnText.textContent = 'Send Message';
        
        // Show success toast
        toast.style.display = 'flex';
        toast.className = 'toast success';
        toast.innerHTML = '✅ Your email client should have opened. Send the email to reach me!';
        
        contactForm.reset();
        
        setTimeout(() => {
            toast.style.display = 'none';
        }, 5000);
    }, 1500);
});

// ===== Magnetic Hover for Social Circles =====
document.querySelectorAll('.social-circle').forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    el.addEventListener('mouseleave', () => {
        el.style.transform = '';
    });
});

// ===== Dock hover effect (magnification) =====
const dockIcons = document.querySelectorAll('.dock-icon-wrapper');

dockIcons.forEach((icon, index) => {
    icon.addEventListener('mouseenter', () => {
        dockIcons.forEach((otherIcon, otherIndex) => {
            const distance = Math.abs(index - otherIndex);
            if (distance === 0) return;
            
            let scale = 1;
            if (distance === 1) scale = 1.05;
            else if (distance === 2) scale = 1.02;
            
            otherIcon.style.transform = `scale(${scale})`;
        });
    });
    
    icon.addEventListener('mouseleave', () => {
        dockIcons.forEach(otherIcon => {
            otherIcon.style.transform = '';
        });
    });
});

// ===== Tilt effect on project cards =====
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        const tiltX = (y - 0.5) * 5;
        const tiltY = (x - 0.5) * -5;
        
        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ===== Initialize =====
updateActiveNav();
