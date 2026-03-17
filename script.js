/* ============================================================
   Portfolio Script — Ashley Gem W. Baje
   Enhanced interactions: cursor, tilt, reveal, skill bars
   ============================================================ */

// ── Custom Cursor ──────────────────────────────────────────
const cursorDot  = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

let mouseX = -100, mouseY = -100;
let ringX  = -100, ringY  = -100;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top  = mouseY + 'px';
});

function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
}
animateRing();

// Cursor hover states
document.querySelectorAll('a, button, .project-3d-card, .edu-card, .hex-skill').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorDot.style.transform  = 'translate(-50%,-50%) scale(2)';
        cursorRing.style.width     = '48px';
        cursorRing.style.height    = '48px';
        cursorRing.style.borderColor = 'rgba(212,175,55,.7)';
    });
    el.addEventListener('mouseleave', () => {
        cursorDot.style.transform  = 'translate(-50%,-50%) scale(1)';
        cursorRing.style.width     = '32px';
        cursorRing.style.height    = '32px';
        cursorRing.style.borderColor = 'rgba(212,175,55,.5)';
    });
});

// ── Navbar ─────────────────────────────────────────────────
const navbar    = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu   = document.querySelector('.nav-menu');
const navLinks  = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.pageYOffset > 60);
    highlightNav();
});

// ── Smooth Scroll ──────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
        }
    });
});

// ── Active Nav Highlight ───────────────────────────────────
const sections = document.querySelectorAll('section[id]');

function highlightNav() {
    const y = window.pageYOffset + 120;
    sections.forEach(sec => {
        const top = sec.offsetTop;
        const bot = top + sec.offsetHeight;
        const id  = sec.getAttribute('id');
        const lnk = document.querySelector(`.nav-link[href="#${id}"]`);
        if (lnk) {
            lnk.classList.toggle('active-link', y >= top && y < bot);
        }
    });
}

// ── Scroll Reveal ──────────────────────────────────────────
const revealElements = document.querySelectorAll(
    '.edu-card, .info-card, .project-3d-card, .hex-skill, .skills-panel, .contact-card, .timeline-item'
);

revealElements.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 4) * 0.1}s`;
});

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ── Skill Bars ─────────────────────────────────────────────
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fill = entry.target;
            const w    = getComputedStyle(fill).getPropertyValue('--w').trim();
            fill.style.width = '0%';
            requestAnimationFrame(() => {
                setTimeout(() => { fill.style.width = w; }, 80);
            });
            skillObserver.unobserve(fill);
        }
    });
}, { threshold: 0.4 });

skillFills.forEach(f => skillObserver.observe(f));

// ── 3D Card Tilt ───────────────────────────────────────────
document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect   = card.getBoundingClientRect();
        const x      = e.clientX - rect.left;
        const y      = e.clientY - rect.top;
        const cx     = rect.width  / 2;
        const cy     = rect.height / 2;
        const rotateX = ((y - cy) / cy) * -6;
        const rotateY = ((x - cx) / cx) *  8;
        card.style.transform = `translateY(-12px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ── Parallax Shapes ────────────────────────────────────────
const shapes = document.querySelectorAll('.shape');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    shapes.forEach((s, i) => {
        const speed = (i + 1) * 0.03;
        s.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ── Hero Card Interaction ──────────────────────────────────
const heroCard = document.querySelector('.hero-card-3d .card-face');
if (heroCard) {
    document.addEventListener('mousemove', e => {
        if (window.innerWidth < 1100) return;
        const x = (e.clientX / window.innerWidth - .5) * 10;
        const y = (e.clientY / window.innerHeight - .5) * -10;
        heroCard.style.transform = `translateY(${-6 + y * 0.5}px) rotateX(${2 + y * 0.3}deg) rotateY(${-4 + x * 0.5}deg)`;
    });
}

// ── Contact Form ───────────────────────────────────────────
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        const btn = contactForm.querySelector('.form-submit');
        const span = btn.querySelector('span');
        const orig = span.textContent;

        span.textContent = 'Sending…';
        btn.disabled = true;

        setTimeout(() => {
            span.textContent = '✓ Sent!';
            btn.style.background = 'linear-gradient(135deg,#48bb78,#38a169)';

            setTimeout(() => {
                span.textContent = orig;
                btn.style.background = '';
                btn.disabled = false;
                contactForm.reset();
            }, 2500);
        }, 1200);
    });
}

// ── Calculator Button Micro-interaction ────────────────────
document.querySelectorAll('.cb').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.style.transform = 'scale(.88)';
        btn.style.transition = 'transform .08s';
        setTimeout(() => { btn.style.transform = ''; }, 120);
    });
});

// ── Typing effect for hero subtitle ───────────────────────
const subtitle = document.querySelector('.hero-subtitle');
if (subtitle) {
    const text = subtitle.textContent;
    subtitle.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i++);
            setTimeout(typeWriter, 60);
        }
    }
    setTimeout(typeWriter, 1400);
}

// ── Page Load Fade ─────────────────────────────────────────
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity .4s ease';
    requestAnimationFrame(() => {
        setTimeout(() => { document.body.style.opacity = '1'; }, 50);
    });
});

// ── Console Easter Egg ─────────────────────────────────────
console.log(
    '%c✨ Ashley Gem W. Baje — Portfolio',
    'color:#d4af37; font-size:18px; font-weight:bold; font-family:serif;'
);
console.log(
    '%cBuilt with passion & code. Say hi → ashleygem02072006@gmail.com',
    'color:#4a5568; font-size:13px;'
);