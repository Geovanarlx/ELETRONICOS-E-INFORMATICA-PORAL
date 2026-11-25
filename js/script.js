const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
const themeToggle = document.querySelector('.theme-toggle');
const toast = document.querySelector('.toast');
let toastTimer;

function announce(message) {
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2600);
}

menuToggle.addEventListener('click', () => {
  const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isExpanded));
  menuToggle.setAttribute('aria-label', isExpanded ? 'Abrir menu' : 'Fechar menu');
  mobileNav.hidden = isExpanded;
});

mobileNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileNav.hidden = true;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu');
  });
});

function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark', isDark);
  themeToggle.setAttribute('aria-label', isDark ? 'Ativar modo claro' : 'Ativar modo escuro');
  localStorage.setItem('nexora-theme', theme);
}

applyTheme(localStorage.getItem('nexora-theme') || 'light');
themeToggle.addEventListener('click', () => applyTheme(document.body.classList.contains('dark') ? 'light' : 'dark'));

document.querySelectorAll('.favorite-button').forEach((button) => {
  button.addEventListener('click', () => {
    const isFavorite = button.getAttribute('aria-pressed') === 'true';
    button.setAttribute('aria-pressed', String(!isFavorite));
    button.textContent = isFavorite ? '♡' : '♥';
    announce(isFavorite ? 'Produto removido dos favoritos.' : 'Produto salvo nos favoritos.');
  });
});

document.querySelectorAll('.add-button').forEach((button) => {
  button.addEventListener('click', () => announce(`${button.dataset.product} adicionado à sua seleção.`));
});

const productCarousel = document.querySelector('#product-carousel');
document.querySelector('.carousel-prev').addEventListener('click', () => productCarousel.scrollBy({ left: -productCarousel.clientWidth * 0.82, behavior: 'smooth' }));
document.querySelector('.carousel-next').addEventListener('click', () => productCarousel.scrollBy({ left: productCarousel.clientWidth * 0.82, behavior: 'smooth' }));

document.querySelector('.newsletter-form').addEventListener('submit', (event) => {
  event.preventDefault();
  announce('Obrigado! Seu cadastro foi recebido neste protótipo.');
  event.currentTarget.reset();
});

