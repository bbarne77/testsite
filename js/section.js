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
  'certificate': {
    title: '🔐 Что такое Сертификат?',
    text: `
      Сертификат — это специальное программное обеспечение для вашего <strong>iOS-устройства</strong>, 
      которое открывает доступ к установке <strong>сторонних приложений и игр</strong> 
      из альтернативных источников, помимо App Store.<br><br>
      Вы можете <strong>безопасно</strong> загружать нужные вам приложения:<br>
      <ul>
        <li>📲 не нарушая при этом никаких <strong>правил</strong> и <strong>законов</strong>;</li>
        <li>🛡️ сохраняя <strong>полную безопасность</strong> ваших данных и устройства.</li>
      </ul>
      Это надежный способ получить больше свободы без риска!
    `
  },
  'get-certificate': {
    title: '📦 Инструкция по установке сертификата',
    text: `
      <div class="step-container">
        <div class="step" data-step-id="1">
          <strong>Как получить сертификат в боте.</strong>
          <p>Отправляете <strong>/start</strong> боту. Нажимаете на кнопку "Проверить UDID". 
          После сообщения "Отправьте UDID", отправляете свой UDID, указанный при оплате сертификата. 
          Затем выбираете "Получить сертификат [Имя сертификата]". 
          Бот пришлет два файла — <strong>P12</strong> и <strong>Mobileprovision</strong>.</p>
          <div class="step-buttons">
            <button class="next-step-btn">Следующий шаг</button>
          </div>
        </div>

        <div class="step hidden" data-step-id="2">
          <strong>Как сохранить сертификат на устройство.</strong>
          <p>После получения файлов нажмите на один из них и выберите кнопку вверху "Поделиться".</p>
          <img src="https://github.com/viibbee/Info/blob/main/cert1.png?raw=true" alt="Шаг 1">
          <div class="step-buttons">
            <button class="prev-step-btn">Назад</button>
            <button class="next-step-btn">Следующий шаг</button>
          </div>
        </div>

        <div class="step hidden" data-step-id="3">
          <p>Далее выберите "Сохранить в Файлы" и укажите место хранения сертификата.</p>
          <img src="https://github.com/viibbee/Info/blob/main/cert2.png?raw=true" alt="Шаг 2">
          <p>Нажмите "Сохранить" слева вверху. Повторите для второго файла.</p>
          <div class="step-buttons">
            <button class="prev-step-btn">Назад</button>
            <button class="close-modal-btn">Закрыть</button>
          </div>
        </div>
      </div>
    `
  },
  'warranty': {
    title: '⚠️ Гарантия',
    text: `
      <p>Наш магазин предоставляет гарантию на все сертификаты:</p>
      <ul>
        <li><strong>Обычный iPhone:</strong> 3 месяца</li>
        <li><strong>Моментальный iPhone:</strong> 3 месяца</li>
        <li><strong>Супермоментальный iPhone:</strong> 6 месяцев</li>
        <li><strong>Парный сертификат:</strong> 3 месяца</li>
        <li><strong>iPad сертификат:</strong> 3 месяца</li>
      </ul>

      <p><em>Действует с 16.09.2025 г.</em></p>

      <p>
        Возврат средств невозможен при неверно выбранном типе сертификата. 
        Ознакомьтесь с полными условиями:
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

// === 🧩 Пошаговая навигация внутри модалки ===
function setupStepNavigation() {
  const steps = infoModal.querySelectorAll('.step');
  let currentStep = 0;

  function showStep(stepIndex) {
    steps.forEach((step, index) => {
      step.classList.toggle('hidden', index !== stepIndex);
    });
  }

  infoModal.addEventListener('click', (e) => {
    if (e.target.classList.contains('next-step-btn')) {
      if (currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
      }
    } else if (e.target.classList.contains('prev-step-btn')) {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    } else if (e.target.classList.contains('close-modal-btn')) {
      infoModal.classList.remove('active');
      currentStep = 0;
      showStep(currentStep);
    }
  });

  showStep(currentStep);
}

// === 🧩 Функция для показа модалки ===
function showModal(title, html, key) {
  infoModalTitle.innerHTML = title;
  infoModalText.innerHTML = html;
  infoModal.classList.add('active');
  document.body.style.overflow = 'hidden';

  if (key === 'get-certificate') setupStepNavigation();
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
      showModal(infoContent[key].title, infoContent[key].text, key);
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

// === 🔥 Модалка "Купить" ===
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

  closeBtn?.addEventListener('click', closeModalBuy);
  cancelBtn?.addEventListener('click', closeModalBuy);

  function closeModalBuy() {
    buyModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  window.addEventListener('click', (e) => {
    if (e.target === buyModal) closeModalBuy();
  });
}

// === Кнопка "Гарантия" ===
const openWarrantyBtn = document.getElementById('openWarrantyBtn');
if (openWarrantyBtn) {
  openWarrantyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const c = infoContent['warranty'];
    showModal(c.title, c.text, 'warranty');
  });
}

// === 💫 Анимация карточек ===
const cards = document.querySelectorAll('.card, .vpn-card');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });

cards.forEach(c => observer.observe(c));

// === ✅ Safari Fix — показать все карточки, если observer не сработал ===
setTimeout(() => {
  cards.forEach(c => c.classList.add('visible'));
}, 800);

// === 🌀 Автопрокрутка иконок ===
const iconCarousel = document.querySelector('.icon-carousel-inner');
if (iconCarousel) {
  let offset = 0;
  setInterval(() => {
    offset -= 1;
    if (offset < -iconCarousel.scrollWidth / 2) offset = 0;
    iconCarousel.style.transform = `translateX(${offset}px)`;
  }, 25);
}
