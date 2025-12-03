const toggleTheme = () => {
    const body = document.body;
    const h2 = document.querySelectorAll('h2');
    const icons = document.querySelectorAll('i');
    const isDark = body.classList.toggle('dark-theme');
    h2.forEach(header => {
        if (isDark) {
            header.classList.add('dark-theme');
        } else {
            header.classList.remove('dark-theme');
        }
    });
    icons.forEach(icon => {
        if (isDark) {
            icon.classList.add('dark-theme');
        } else {
            icon.classList.remove('dark-theme');
        }
    });
    // themeBtn.forEach(btn => {
    //     if (isDark) {
    //         btn.classList.add('dark-theme');
    // localStorage.setItem('theme', isDark ? 'dark' : 'light');
    //     } else {
    //         btn.classList.remove('dark-theme');
    //     }
    // });
};

// Apply saved theme on load
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
});

// Attach event listener to button
document.getElementById('themeBtn').addEventListener('click', () => {
    toggleTheme();
});

// // Create button
// const themeBtn = document.createElement('Button');
// themeBtn.id = 'themeBtn';
// themeBtn.textContent = 'Cambiar tema';
// themeBtn.onclick = toggleTheme;
// document.body.appendChild(themeBtn);

