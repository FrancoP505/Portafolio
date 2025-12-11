/**
 * FUNCIONES UTILITARIAS DEL PORTAFOLIO
 */

// ========================
// MODAL FUNCTIONS
// ========================

function openModal(projectId) {
  const modal = document.getElementById("projectModal");
  const modalContent = document.querySelector(".modal-content");
  
  // Buscar proyecto en array global
  const project = window.projectsData.find(p => p.id === projectId);
  
  if (project) {
    // Actualizar contenido del modal
    modalContent.innerHTML = `
      <span class="close" onclick="closeModal()">&times;</span>
      <h2>${project.title}</h2>
      <p>${project.description}</p>
      
      <div class="gallery">
        ${project.gallery.map(img => `<img src="${img}" alt="Imagen del proyecto">`).join('')}
      </div>

      <div class="links">
        <a rel="noopener" href="${project.links.live}" target="_blank">🌐 Ver página</a>
        <a rel="noopener" href="${project.links.github}" target="_blank">💻 Ver código en GitHub</a>
      </div>
    `;
  }
  
  modal.style.display = "flex";
}

function closeModal() {
  document.getElementById("projectModal").style.display = "none";
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
