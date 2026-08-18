/* JINYUE JEWELRY — Shared JS */
document.addEventListener('DOMContentLoaded', () => {

  /* Header scroll */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* Reveal on scroll */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
    reveals.forEach((el, i) => { el.style.transitionDelay = (i % 4 * 80) + 'ms'; io.observe(el); });
  }

  /* Mobile menu */
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      nav.style.cssText = open
        ? 'display:flex;position:fixed;top:64px;left:0;right:0;flex-direction:column;background:var(--bg-2);padding:24px;border-bottom:1px solid var(--line);gap:18px;z-index:999'
        : '';
    });
  }

  /* Carousel */
  const track = document.querySelector('.carousel-track');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  if (track && prevBtn && nextBtn) {
    const scrollAmt = () => Math.min(track.querySelector('.carousel-card')?.offsetWidth + 24 || 400, track.clientWidth);
    prevBtn.addEventListener('click', () => track.scrollBy({ left: -scrollAmt(), behavior: 'smooth' }));
    nextBtn.addEventListener('click', () => track.scrollBy({ left: scrollAmt(), behavior: 'smooth' }));
  }

  /* Product filter */
  const chips = document.querySelectorAll('.filter-chip');
  const cards = document.querySelectorAll('.product-card');
  if (chips.length && cards.length) {
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const cat = chip.dataset.cat;
        cards.forEach(card => {
          const show = cat === 'all' || card.dataset.cat === cat;
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* Contact form */
  const form = document.querySelector('#inquiryForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.innerHTML = '✓ Message Sent';
      btn.style.background = 'linear-gradient(135deg,#6BCB8A,#4FA876)';
      form.reset();
      setTimeout(() => { btn.innerHTML = original; btn.style.background = ''; }, 3000);
    });
  }
});
