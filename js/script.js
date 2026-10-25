/* Vanilla JS: mobile menu, scroll reveal, active nav, form validation */
document.documentElement.classList.add('js');

/* 1. Mobile hamburger menu (updates aria-expanded for screen readers) */
const burger = document.getElementById('burger'), menu = document.getElementById('menu');
const closeMenu = () => { menu.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); };
burger.addEventListener('click', () => burger.setAttribute('aria-expanded', menu.classList.toggle('open')));
menu.addEventListener('click', e => { if (e.target.tagName === 'A') closeMenu(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

/* 2. Scroll reveal via IntersectionObserver (CSS disables it for reduced motion) */
const io = new IntersectionObserver(items => items.forEach(i => { if (i.isIntersecting) { i.target.classList.add('in'); io.unobserve(i.target); } }), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* 3. Highlight the nav link of the section currently in view */
const links = [...document.querySelectorAll('.menu a[href^="#"]:not(.btn)')];
const spy = new IntersectionObserver(items => items.forEach(i => {
  if (i.isIntersecting) links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + i.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
links.forEach(a => { const s = document.querySelector(a.getAttribute('href')); if (s) spy.observe(s); });

/* 4. Contact form: client-side validation */
const form = document.getElementById('contact-form'), status = document.getElementById('status');
const rules = {
  name: v => v.trim().length >= 2 || 'Enter your name (at least 2 characters).',
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Enter a valid email, like name@example.com.',
  type: v => v !== '' || 'Choose your business type.',
  message: v => v.trim().length >= 10 || 'Tell us a little more (at least 10 characters).'
};
function check(f) {
  const r = rules[f.name](f.value), err = document.getElementById(f.id + '-err');
  err.textContent = r === true ? '' : r; f.setAttribute('aria-invalid', String(r !== true)); return r === true;
}
form.querySelectorAll('input,select,textarea').forEach(f => f.addEventListener('blur', () => check(f)));
form.addEventListener('submit', e => {
  e.preventDefault();
  const ok = [...form.elements].filter(f => rules[f.name]).map(check).every(Boolean);
  if (!ok) { status.textContent = 'Please fix the highlighted fields.'; form.querySelector('[aria-invalid=true]').focus(); return; }
  /* EDIT: connect a backend here (see README.txt, e.g. Formspree via fetch). Until then this is a demo. */
  status.textContent = 'Form is valid. Connect a backend to receive messages (see README.txt).';
});
document.getElementById('year').textContent = new Date().getFullYear();
