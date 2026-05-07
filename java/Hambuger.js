// JS para Toggle do menu mobile
const toggle = document.querySelector('.navbar__toggle');
const menu = document.querySelector('.navbar__menu');
toggle.addEventListener('click', () => {
 const isOpen = menu.classList.toggle('navbar__menu--open');
 toggle.setAttribute('aria-expanded', isOpen); // atualiza estado ARIA
});

// Fechar o menu ao pressionar Escape (acessibilidade de teclado)
document.addEventListener('keydown', (e) => {
 if (e.key === 'Escape' && menu.classList.contains('navbar__menu--open')) {
   menu.classList.remove('navbar__menu--open');
   toggle.setAttribute('aria-expanded', 'false');
   toggle.focus(); // devolve foco ao botão
 }
});