import { animate, inView, stagger } from '@motionone/dom';

// Wait for DOM to be ready
function ready(fn: () => void) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(() => {
  // Respect user's motion preferences
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    return; // Skip animations if user prefers reduced motion
  }

  // Hero section animations
  const heroElements = document.querySelectorAll<HTMLElement>('.animate-fade-in');
  heroElements.forEach((el) => {
    animate(
      el,
      { opacity: [0, 1], transform: ['translateY(40px)', 'translateY(0px)'] },
      { duration: 0.8, easing: 'ease-out' }
    );
  });

  // Staggered section reveals
  const sections = document.querySelectorAll<HTMLElement>('section');
  sections.forEach((section) => {
    inView(section, () => {
      const cards = section.querySelectorAll<HTMLElement>('.group, .animate-slide-up');
      if (cards.length > 0) {
        animate(
          cards,
          { opacity: [0, 1], transform: ['translateY(30px)', 'translateY(0px)'] },
          { duration: 0.6, delay: stagger(0.1), easing: 'ease-out' }
        );
      }
    });
  });

  // Button hover animations
  const buttons = document.querySelectorAll<HTMLElement>('a[class*="bg-dental-blue"], button[class*="bg-dental-blue"]');
  buttons.forEach((button) => {
    button.addEventListener('mouseenter', () => {
      animate(button, { scale: 1.05 }, { duration: 0.2 });
    });
    
    button.addEventListener('mouseleave', () => {
      animate(button, { scale: 1 }, { duration: 0.2 });
    });
  });

  // Card hover effects
  const cards = document.querySelectorAll<HTMLElement>('.group');
  cards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      animate(
        card,
        { transform: 'translateY(-8px)', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' },
        { duration: 0.3, easing: 'ease-out' }
      );
    });
    
    card.addEventListener('mouseleave', () => {
      animate(
        card,
        { transform: 'translateY(0px)', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' },
        { duration: 0.3, easing: 'ease-out' }
      );
    });
  });

  // Navbar scroll effect
  const header = document.querySelector<HTMLElement>('header');
  if (header) {
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        header.style.backdropFilter = 'blur(10px)';
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
      } else {
        header.style.backdropFilter = 'blur(0px)';
        header.style.backgroundColor = 'rgba(255, 255, 255, 1)';
      }
      
      lastScrollY = currentScrollY;
    });
  }

  // Smooth scroll for anchor links
  const anchorLinks = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
  anchorLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href')?.substring(1);
      const targetElement = targetId ? document.getElementById(targetId) : null;
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Form focus animations
  const formInputs = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>('input, textarea, select');
  formInputs.forEach((input) => {
    input.addEventListener('focus', () => {
      animate(
        input,
        { scale: 1.02, borderColor: '#1E88E5' },
        { duration: 0.2 }
      );
    });
    
    input.addEventListener('blur', () => {
      animate(
        input,
        { scale: 1, borderColor: '#D1D5DB' },
        { duration: 0.2 }
      );
    });
  });
});