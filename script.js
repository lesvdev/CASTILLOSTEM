/* ============================================
   APRENDE+ · script.js
   Navbar, scroll reveal, accordion, bar anim
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── NAVBAR SCROLL ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  /* ── HAMBURGER ── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });

  /* ── SCROLL REVEAL ── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ── BAR ANIMATIONS ── */
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.bar-fill').forEach(bar => {
          setTimeout(() => bar.classList.add('animated'), 200);
        });
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.ie-bars').forEach(el => barObserver.observe(el));

  /* ── ACCORDION ── */
  document.querySelectorAll('.acc-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.acc-item');
      const body = item.querySelector('.acc-body');
      const isOpen = body.classList.contains('open');

      // Close all within same accordion
      const accordion = trigger.closest('.accordion');
      accordion.querySelectorAll('.acc-body').forEach(b => b.classList.remove('open'));
      accordion.querySelectorAll('.acc-trigger').forEach(t => t.classList.remove('open'));

      if (!isOpen) {
        body.classList.add('open');
        trigger.classList.add('open');
      }
    });
  });

  /* ── ACTIVE NAV LINK (highlight on scroll) ── */
  const sections = document.querySelectorAll('.topic-section, #hero');
  const navLinks = document.querySelectorAll('.nav-links a');

  const activeSectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.style.background = '';
          link.style.color = '';
          if (link.getAttribute('href') === '#' + id) {
            link.style.background = 'var(--green-200)';
            link.style.color = 'var(--green-700)';
          }
        });
      }
    });
  }, { threshold: 0.45 });

  sections.forEach(s => activeSectionObserver.observe(s));

  /* ── CARD TILT ON HOVER ── */
  document.querySelectorAll('.info-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
      card.style.transform = `translateY(-6px) rotateX(${y}deg) rotateY(${x}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ── SMOOTH HERO CARDS STAGGER ── */
  const heroCards = document.querySelectorAll('.hcard');
  heroCards.forEach((card, i) => {
    card.style.animationDelay = `${i * 0.1}s`;
  });

});

/* ── EASTER EGG: Konami code = rainbow mode ── */
const konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIndex = 0;
document.addEventListener('keydown', (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      document.body.style.filter = 'hue-rotate(180deg)';
      setTimeout(() => document.body.style.filter = '', 3000);
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});
