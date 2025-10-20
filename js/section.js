// === 🧭 Меню помощи (вопросительный знак) ===
const helpBubble = document.querySelector('.help-bubble');
const helpMenu = document.getElementById('helpMenu');
const helpMenuButtons = document.querySelectorAll('.help-menu-btn');

const infoModal = document.getElementById('infoModal');
const infoModalTitle = document.getElementById('infoModalTitle');
const infoModalText = document.getElementById('infoModalText');
const infoModalCloseBtn = document.querySelector('.info-modal-close-btn');

// === 🧩 Контент для модальных окон ===
const infoContent = {
  certificate: {
    title: '🔐 Что такое Сертификат?',
    text: `
      Сертификат — это цифровая подпись, позволяющая вашему <strong>iOS-устройству</strong>
      безопасно устанавливать <strong>IPA-приложения</strong> без App Store.<br><br>
      <ul>
        <li>📲 Безопасная установка сторонних игр и программ</li>
        <li>🛡️ Полная защита данных и устройства</li>
        <li>⚙️ Совместимость со всеми моделями</li>
      </ul>
    `
  },
  warranty: {
    title: '⚠️ Гарантия',
    text: `
      <p>Гарантия распространяется на все типы сертификатов:</p>
      <ul>
        <li><strong>Обычный iPhone:</strong> 3 месяца</li>
        <li><strong>Моментальный iPhone:</strong> 3 месяца</li>
        <li><strong>Супермоментальный:</strong> 6 месяцев</li>
        <li><strong>Парный:</strong> 3 месяца</li>
        <li><strong>iPad:</strong> 3 месяца</li>
      </ul>
      <p><em>Действует с 16.09.2025</em></p>
      <p>
        Возврат средств не производится при неверно выбранном типе сертификата.
        Ознакомьтесь с полными условиями по ссылке ниже:
      </p>
      <a href="https://teletype.in/@bbarne77/3x38UdfRftp"
         target="_blank" rel="noopener"
         class="modal-btn confirm-btn"
         style="display:block;text-align:center;margin-top:12px;">
         Пользовательское соглашение
      </a>
    `
  }
};

// === 🧩 Показывает модальное окно ===
function showModal(title, html) {
  infoModalTitle.innerHTML = title;
  infoModalText.innerHTML = html;
  infoModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// === Закрытие модалки ===
function closeModal() {
  infoModal.classList.remove('active');
  document.body.style.overflow = '';
}

// === Обработчики меню помощи ===
if (helpBubble) {
  helpBubble.addEventListener('click', () => {
    helpMenu.classList.toggle('show');
  });
}

helpMenuButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const key = btn.getAttribute('data-info');
    if (infoContent[key]) {
      showModal(infoContent[key].title, infoContent[key].text);
      helpMenu.classList.remove('show');
    }
  });
});

if (infoModalCloseBtn) {
  infoModalCloseBtn.addEventListener('click', closeModal);
}

window.addEventListener('click', (e) => {
  if (e.target === infoModal) closeModal();
});

// === 🧩 BUY МОДАЛКА ===
const buyButtons = document.querySelectorAll('.card-btn');
const buyModal = document.getElementById('buyModal');
if (buyModal) {
  const buyModalTitle = buyModal.querySelector('.modal-title');
  const buyModalDescription = buyModal.querySelector('.modal-description');
  const confirmBtn = buyModal.querySelector('.confirm-btn');
  const closeBtn = buyModal.querySelector('.close-btn');
  const cancelBtn = buyModal.querySelector('.cancel-btn');

  buyButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const title = button.getAttribute('data-title') || button.parentElement.previousElementSibling?.querySelector('h3')?.innerText || 'Покупка';
      const description = button.getAttribute('data-description') || 'Вы уверены, что хотите купить данный сертификат?';
      const link = button.getAttribute('data-link') || button.href;

      buyModalTitle.textContent = title;
      buyModalDescription.textContent = description;
      confirmBtn.href = link;

      buyModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  closeBtn?.addEventListener('click', () => {
    buyModal.classList.remove('active');
    document.body.style.overflow = '';
  });
  cancelBtn?.addEventListener('click', () => {
    buyModal.classList.remove('active');
    document.body.style.overflow = '';
  });
  window.addEventListener('click', (e) => {
    if (e.target === buyModal) {
      buyModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// === 🧩 Кнопка "Гарантия" под Telegram кнопками ===
const openWarrantyBtn = document.getElementById('openWarrantyBtn');
if (openWarrantyBtn) {
  openWarrantyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const c = infoContent.warranty;
    showModal(c.title, c.text);
  });
}

// === 💫 Анимация появления карточек ===
const cards = document.querySelectorAll('.card, .vpn-card');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });

cards.forEach(c => observer.observe(c));

// === ✅ Safari Fix: если observer не сработал — показываем карточки вручную ===
setTimeout(() => {
  cards.forEach(c => c.classList.add('visible'));
}, 800);

// === 🌀 Автопрокрутка иконок (если есть баннер) ===
const iconCarousel = document.querySelector('.icon-carousel-inner');
if (iconCarousel) {
  let offset = 0;
  setInterval(() => {
    offset -= 1;
    if (offset < -iconCarousel.scrollWidth / 2) offset = 0;
    iconCarousel.style.transform = `translateX(${offset}px)`;
  }, 25);
}
