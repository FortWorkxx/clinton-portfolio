const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
  menuButton.querySelector('use').setAttribute('href', isOpen ? '#menu-icon' : '#close-icon');
  navigation.classList.toggle('open', !isOpen);
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
    menuButton.querySelector('use').setAttribute('href', '#menu-icon');
    navigation.classList.remove('open');
  });
});

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}

document.querySelectorAll('.division-card').forEach((card) => {
  card.addEventListener('click', () => {
    const serviceSelect = document.querySelector('select[name="service"]');
    const service = card.dataset.service;
    const option = [...serviceSelect.options].find((item) => item.textContent.includes(service));
    if (option) serviceSelect.value = option.value || option.textContent;
  });
});

document.querySelector('#enquiry-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const subject = `CGI website enquiry — ${form.get('service')}`;
  const body = [
    `Name: ${form.get('name')}`,
    `Email: ${form.get('email')}`,
    `Service: ${form.get('service')}`,
    '',
    'Message:',
    form.get('message'),
  ].join('\n');
  window.location.href = `mailto:godpowerclinton075@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

document.querySelector('#year').textContent = new Date().getFullYear();
