// Function to toggle navigation visibility
function toggleNav() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('hidden');
}

// Function to hide navigation
function hideNav() {
    const nav = document.querySelector('nav');
    nav.classList.add('hidden');
}

// Function to show navigation
function showNav() {
    const nav = document.querySelector('nav');
    nav.classList.remove('hidden');
}

// Event listener for toggle button
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('.nav-toggle');
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleNav);
    }
});