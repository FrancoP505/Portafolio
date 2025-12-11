/**
 * Aplicar clase de tema a un grupo de elementos
 * @param {string} selector - Selector CSS
 * @param {string} className - Clase a aplicar/remover
 * @param {boolean} isDark - Si está activado el tema oscuro
 */
function applyThemeToElements(selector, className, isDark) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
        isDark ? el.classList.add(className) : el.classList.remove(className);
    });
}

/**
 * Toggle entre tema claro y oscuro
 */
const toggleTheme = () => {
    const body = document.body;
    const isDark = body.classList.toggle('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Aplicar tema a elementos
    applyThemeToElements('h2', 'dark-theme', isDark);
    applyThemeToElements('i', 'dark-theme', isDark);
    applyThemeToElements('.project-card', 'dark-theme', isDark);
};

// Aplicar tema guardado al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        applyThemeToElements('h2', 'dark-theme', true);
        applyThemeToElements('i', 'dark-theme', true);
        applyThemeToElements('.project-card', 'dark-theme', true);
    }
});

// Adjuntar event listener al botón
document.getElementById('themeBtn').addEventListener('click', () => {
    toggleTheme();
});