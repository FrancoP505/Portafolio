/**
 * FUNCIONES UTILITARIAS DEL PORTAFOLIO
 */

// ========================
// MODAL FUNCTIONS
// ========================

function openModal(projectId) {
  // Nuevo: soporte para carrusel. startIndex permite abrir en la imagen 0..N
  const modal = document.getElementById("projectModal");
  const modalContent = modal.querySelector(".modal-content");

  const project = window.projectsData.find(p => p.id === projectId);
  if (project) {
    const slidesHTML = project.gallery.map((img, i) => `
      <img class="carousel-slide" src="${img}" alt="${project.title} imagen ${i+1}" data-index="${i}">
    `).join('');

    const indicatorsHTML = project.gallery.map((_, i) => `
      <button class="carousel-indicator" aria-label="Ir a la imagen ${i+1}" data-index="${i}" onclick="carouselGoTo(${i})"></button>
    `).join('');

    modalContent.innerHTML = `
      <button class="modal-close" onclick="closeModal()" aria-label="Cerrar">&times;</button>
      <h2>${project.title}</h2>
      <p>${project.description}</p>

      <div class="carousel">
        <button class="carousel-btn prev" onclick="carouselPrev()" aria-label="Anterior">‹</button>
        <div class="carousel-viewport">
          <div class="carousel-track">
            ${slidesHTML}
          </div>
        </div>
        <button class="carousel-btn next" onclick="carouselNext()" aria-label="Siguiente">›</button>
        <div class="carousel-indicators">
          ${indicatorsHTML}
        </div>
      </div>

      <div class="links">
        <a rel="noopener" href="${project.links.live}" target="_blank">🌐 Ver página</a>
        <a rel="noopener" href="${project.links.github}" target="_blank">💻 Ver código en GitHub</a>
      </div>
    `;

    // Inicializar carrusel (por defecto en la primera imagen)
    carouselInit(0);
  }

  modal.style.display = "flex";
}

function closeModal() {
  const modal = document.getElementById("projectModal");
  modal.style.display = "none";
  // Limpiar listeners de teclado
  document.removeEventListener('keydown', carouselKeyHandler);
}

// ==========================
// Carousel implementation
// ==========================
const carouselState = {
  track: null,
  slides: [],
  indicators: [],
  current: 0,
  total: 0
};

function carouselInit(startIndex = 0) {
  const track = document.querySelector('.carousel-track');
  if (!track) return;
  carouselState.track = track;
  carouselState.slides = Array.from(track.querySelectorAll('.carousel-slide'));
  carouselState.total = carouselState.slides.length;
  carouselState.indicators = Array.from(document.querySelectorAll('.carousel-indicator'));
  carouselState.current = Math.min(Math.max(0, startIndex), carouselState.total - 1);

  // Set initial styles
  carouselState.track.style.width = `${carouselState.total * 100}%`;
  carouselState.slides.forEach(slide => {
    slide.style.width = `${100 / carouselState.total}%`;
  });

  updateCarousel();

  // Keyboard navigation
  document.addEventListener('keydown', carouselKeyHandler);

  // Touch support (simple)
  let startX = 0;
  const viewport = document.querySelector('.carousel-viewport');
  if (viewport) {
    viewport.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
    viewport.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - startX;
      if (dx > 40) carouselPrev();
      else if (dx < -40) carouselNext();
    });
  }
}

function updateCarousel() {
  if (!carouselState.track) return;
  const offsetPercent = -(carouselState.current * (100 / carouselState.total));
  carouselState.track.style.transform = `translateX(${offsetPercent}%)`;
  carouselState.slides.forEach((s, i) => s.setAttribute('aria-hidden', i !== carouselState.current));
  carouselState.indicators.forEach((btn, i) => btn.classList.toggle('active', i === carouselState.current));
}

function carouselNext() {
  if (!carouselState.total) return;
  carouselState.current = (carouselState.current + 1) % carouselState.total;
  updateCarousel();
}

function carouselPrev() {
  if (!carouselState.total) return;
  carouselState.current = (carouselState.current - 1 + carouselState.total) % carouselState.total;
  updateCarousel();
}

function carouselGoTo(index) {
  if (!carouselState.total) return;
  carouselState.current = Math.min(Math.max(0, index), carouselState.total - 1);
  updateCarousel();
}

function carouselKeyHandler(e) {
  if (e.key === 'ArrowLeft') carouselPrev();
  if (e.key === 'ArrowRight') carouselNext();
}

// ========================
// EMAIL FUNCTIONS
// ========================

const EMAIL = 'flpiedrabuena@gmail.com';

function handleEmailAction(action) {
  switch(action) {
    case 'send':
      window.location.href = `mailto:${EMAIL}`;
      break;
    case 'copy':
      copyToClipboard(EMAIL);
      break;
    default:
      console.warn('Acción de email no reconocida:', action);
  }
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showNotification(`Copiado: ${text}`);
  }).catch(err => {
    console.error('Error al copiar:', err);
  });
}

function showNotification(message) {
  alert(message);
}

// ========================
// PROJECT CARD RENDERING
// ========================

function renderProjectCards() {
  const gallery = document.querySelector('.project-gallery');
  
  if (!gallery || !window.projectsData) {
    console.error('Galería o datos de proyectos no encontrados');
    return;
  }
  
  // Limpiar galería existente (excepto modal)
  const modal = gallery.querySelector('.modal');
  gallery.innerHTML = '';
  if (modal) gallery.appendChild(modal);
  
  // Renderizar cada proyecto
  window.projectsData.forEach(project => {
    const card = createProjectCard(project);
    gallery.appendChild(card);
  });
}

function createProjectCard(project) {
  const div = document.createElement('div');
  div.className = 'project-card';
  div.id = project.id;
  
  const techIcons = {
    'html5': 'fab fa-html5',
    'css3-alt': 'fab fa-css3-alt',
    'js': 'fab fa-js',
    'php': 'fab fa-php',
    'database': 'fas fa-database',
    'bootstrap': 'fab fa-bootstrap',
    'react': 'fab fa-react',
    'git-alt': 'fab fa-git-alt',
    'wordpress': 'fab fa-wordpress'
  };
  
  const techHTML = project.technologies
    .map(tech => `<li><i class="${techIcons[tech] || 'fas fa-code'}"></i></li>`)
    .join('');
  
  const featuresHTML = project.features
    .map(feature => `<li>${feature}</li>`)
    .join('');
  
  div.innerHTML = `
    <h3 class="card-title">${project.title}</h3>
    <img class="card-img project-img" src="${project.image}" alt="${project.title}" onclick="openModal('${project.id}')">
    <label><strong>Tecnologías usadas:</strong></label>
    <ul class="card-tech">
      ${techHTML}
    </ul>
    <hr>
    <label><strong>Características principales:</strong></label>
    <ol class="card-features">
      ${featuresHTML}
    </ol>
    <p>${project.description} <a href="#" onclick="openModal('${project.id}'); return false;">...leer más</a></p>
  `;
  
  // Hacer clickeable toda la tarjeta
  div.addEventListener('click', () => openModal(project.id));
  
  return div;
}

// ========================
// INITIALIZATION
// ========================

document.addEventListener('DOMContentLoaded', () => {
  // Cargar datos de proyectos
  fetch('projects.json')
    .then(response => response.json())
    .then(data => {
      window.projectsData = data;
      renderProjectCards();
    })
    .catch(err => console.error('Error cargando proyectos:', err));
  
  // Attach email buttons
  const openMailBtn = document.getElementById('openMailBtn');
  const copyMailBtn = document.getElementById('copyMailBtn');
  
  if (openMailBtn) openMailBtn.addEventListener('click', () => handleEmailAction('send'));
  if (copyMailBtn) copyMailBtn.addEventListener('click', () => handleEmailAction('copy'));
  
  // Cerrar modal si se hace click fuera
  const modal = document.getElementById('projectModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
});
