// Smooth reveal animations using IntersectionObserver
const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => observer.observe(item));

// Typing animation for the hero subtitle
const typingText = document.getElementById('typing-text');
const titles = ['SEO Specialist', 'Digital Marketer', 'Web Developer'];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  if (!typingText) return;

  const currentTitle = titles[titleIndex];
  typingText.textContent = isDeleting
    ? currentTitle.substring(0, charIndex--)
    : currentTitle.substring(0, charIndex++);

  if (!isDeleting && charIndex === currentTitle.length + 1) {
    setTimeout(() => {
      isDeleting = true;
      typeEffect();
    }, 1100);
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    titleIndex = (titleIndex + 1) % titles.length;
  }

  setTimeout(typeEffect, isDeleting ? 60 : 100);
}

typeEffect();

// Animate circular skill rings when visible
const CIRCUMFERENCE = 2 * Math.PI * 34; // r=34

const ringObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progress = entry.target.getAttribute('data-progress');
        const offset = CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE;
        entry.target.style.strokeDashoffset = offset;
        ringObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);

document.querySelectorAll('.ring-fill').forEach((ring) => ringObserver.observe(ring));

// Theme toggle (light/dark)
const themeToggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'light') {
  document.body.classList.add('dark');
  if (themeToggle) themeToggle.textContent = '☀️';
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isLight = document.body.classList.contains('dark');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    themeToggle.textContent = isLight ? '☀️' : '🌙';
  });
}

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Footer year
const yearLabel = document.getElementById('year');
if (yearLabel) {
  yearLabel.textContent = new Date().getFullYear();
}
