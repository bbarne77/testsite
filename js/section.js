// === 🧩 Элементы помощи ===
const helpBubble = document.querySelector('.help-bubble');
const helpMenu = document.getElementById('helpMenu');

const infoModal = document.getElementById('infoModal');
const infoModalTitle = document.getElementById('infoModalTitle');
const infoModalText = document.getElementById('infoModalText');
const infoModalCloseBtn = document.querySelector('.info-modal-close-btn');

const helpMenuButtons = document.querySelectorAll('.help-menu-btn');

// === 🧠 Контент для инфо-модалок ===
const infoContent = {
  certificate: {
    title: '🔐 Что такое Сертификат?',
    text: 'Сертификат — это специальное программное обеспечение для вашего <strong>iOS-устройства</strong>, которое открывает доступ к установке <strong>сторонних приложений и игр</strong> из альтернативных источников, помимо App Store.<br><br>Вы можете <strong>безопасно</strong> загружать нужные вам приложения:<br><ul><li>📲 не нарушая при этом никаких <strong>правил</strong> и <strong>законов</strong>;</li><li>🛡️ сохраняя <strong>полную безопасность</strong> ваших данных и устройства.</li></ul><br>Это надежный способ получить больше свободы без риска!'
  },

  'get-certificate': {
    title: 'Инструкция по установке сертификата',
    text: `
      <div class="step-container">
        <div class="step" data-step-id="1">
          <strong>Как получить сертификат в боте.</strong>
          <p>Отправьте <strong>/start</strong> боту. Нажмите кнопку "Проверить UDID". После сообщения "Отправьте UDID", отправьте свой UDID, который указывали при оплате сертификата. Затем нажмите кнопку "Получить сертификат". Бот пришлёт вам файлы <strong>P12</strong> и <strong>Mobileprovision</strong>.</p>
          <div class="step-buttons">
            <button class="next-step-btn">Следующий шаг</button>
          </div>
        </div>
        <div class="step hidden" data-step-id="2">
          <strong>Как сохранить сертификат на устройство.</strong>
          <p>Когда бот прислал вам два файла сертификата, нажмите на один из них. В открывшемся окне выберите "Поделиться" → "Сохранить в файлы".</p>
          <img src="https://github.com/viibbee/Info/blob/main/cert1.png?raw=true" alt="Шаг 1">
          <div class="step-buttons">
            <button class="prev-step-btn">Назад</button>
            <button class="next-step-btn">Далее</button>
          </div>
        </div>
        <div class="step hidden" data-step-id="3">
          <p>Сохраните оба файла в безопасное место. Они понадобятся для установки вашего профиля.</p>
          <img src="https://github.com/viibbee/Info/blob/main/cert2.png?raw=true" alt="Шаг 2">
          <div class="step-buttons">
            <button class="prev-step-btn">Назад</button>
            <button class="close-modal-btn">Закрыть</button>
          </div>
        </div>
      </div>
    `
  },

  warranty: {
    title: '⚠️ Гарантия',
    text: `
      <p>Наш магазин предоставляет гарантию на все сертификаты:</p>
      <ul>
        <li><strong>Обычный сертификат iPhone:</strong> 3 месяца</li>
        <li><strong>Моментальный сертификат:</strong> 3 месяца</li>
        <li><strong>Супермоментальный сертификат:</strong> 6 месяцев</li>
        <li><strong>Парный сертификат:</strong> 3 месяца</li>
        <li><strong>Сертификат iPad:</strong> 3 месяца</li>
      </ul>

      <p><em>Данные условия гарантии вступают в силу с 16.09.2025 г.</em></p>
      <p>Возврат или частичное возмещение средств не производится. Ознакомьтесь с нашим пользовательским соглашением:</p>

      <a href="https://teletype.in/@bbarne77/3x38UdfRftp" target="_blank" rel="noopener"
        class="modal-btn confirm-btn" style="display:block; text-align:center; margin-top:12px;">
        Пользовательское соглашение
      </a>
    `
  }
};

// === 🚀 Пошаговая навигация ===
function setupStepNavigation() {
  const steps = infoModal.querySelectorAll('.step');
  let currentStep = 0;

  function showStep(stepIndex) {
    steps.forEach((step, index) => {
      step.classList.toggle('hidden', index !== stepIndex);
    });
  }

  infoModal.addEventListener('click', e => {
    if (e.target.classList.contains('next-step-btn')) {
      if (currentStep < steps.length - 1) currentStep++;
      showStep(currentStep);
    } else if (e.target.classList.contains('prev-step-btn')) {
      if (currentStep > 0) currentStep--;
      showStep(currentStep);
    } else if (e.target.classList.contains('close-modal-btn')) {
      infoModal.classList.remove('active');
      currentStep = 0;
      showStep(currentStep);
    }
  });

  showStep(currentStep);
}

// === 📖 Показ инфо-модалки ===
function showModal(title, text, infoKey) {
  infoModalTitle.innerHTML = title;
  infoModalText.innerHTML = text;
  infoModal.classList.add('active');

  if (infoKey === 'get-certificate') setupStepNavigation();
}

// === ❔ Меню помощи ===
helpBubble.addEventListener('click', () => {
  helpMenu.classList.toggle('show');
});

helpMenuButtons.forEach(button => {
  button.addEventListener('click', e => {
    e.preventDefault();
    const infoKey = button.getAttribute('data-info');
    if (infoContent[infoKey]) {
      showModal(infoContent[infoKey].title, infoContent[infoKey].text, infoKey);
      helpMenu.classList.remove('show');
    }
  });
});

infoModalCloseBtn.addEventListener('click', () => {
  infoModal.classList.remove('active');
});
window.addEventListener('click', e => {
  if (e.target === infoModal) infoModal.classList.remove('active');
});
document.addEventListener('click', e => {
  const isInsideMenu = helpMenu.contains(e.target);
  const isOnButton = helpBubble.contains(e.target);
  if (!isInsideMenu && !isOnButton && helpMenu.classList.contains('show'))
    helpMenu.classList.remove('show');
});

// === 💳 МОДАЛКА ПОКУПКИ (для сертификатов и VPN) ===
const buyButtons = document.querySelectorAll('.card-btn');
const buyModal = document.getElementById('buyModal');
const buyModalTitle = buyModal.querySelector('.modal-title');
const buyModalDescription = buyModal.querySelector('.modal-description');
const buyModalCloseBtn = buyModal.querySelector('.close-btn');
const buyModalCancelBtn = buyModal.querySelector('.cancel-btn');
const confirmBtn = buyModal.querySelector('.confirm-btn');

buyButtons.forEach(button => {
  button.addEventListener('click', e => {
    e.preventDefault();
    const title = button.getAttribute('data-title');
    const description = button.getAttribute('data-description');
    const link = button.getAttribute('data-link');
    buyModalTitle.textContent = title;
    buyModalDescription.textContent = description;
    confirmBtn.href = link;
    buyModal.classList.add('active');
  });
});

buyModalCloseBtn.addEventListener('click', () => {
  buyModal.classList.remove('active');
});
buyModalCancelBtn.addEventListener('click', () => {
  buyModal.classList.remove('active');
});
window.addEventListener('click', e => {
  if (e.target === buyModal) buyModal.classList.remove('active');
});

// === 🧷 КНОПКА "Гарантия" ===
const openWarrantyBtn = document.getElementById('openWarrantyBtn');
if (openWarrantyBtn) {
  openWarrantyBtn.addEventListener('click', e => {
    e.preventDefault();
    const c = infoContent['warranty'];
    showModal(c.title, c.text, 'warranty');
  });
}

// === 💫 Анимация появления VPN-блока при скролле ===
const vpnSection = document.querySelector('.vpn-section');
if (vpnSection) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        vpnSection.style.opacity = '1';
        vpnSection.style.transform = 'translateY(0)';
        observer.unobserve(vpnSection);
      }
    });
  }, { threshold: 0.2 });
  observer.observe(vpnSection);
}
