const toggleTheme = () => {
    const body = document.body;
    const isDark = body.classList.toggle('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

// Apply saved theme on load
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
});

// Create button
const themeBtn = document.createElement('Button');
themeBtn.id = 'themeBtn';
themeBtn.textContent = 'Cambiar tema';
themeBtn.onclick = toggleTheme;
document.body.appendChild(themeBtn);

// Example CSS (add to your CSS file)
/*
body.dark-theme {
    background: #222;
    color: #eee;
}
body {
    background: #fff;
    color: #222;
}
button {
    position: fixed;
    top: 1rem;
    right: 1rem;
    padding: 0.5rem 1rem;
}
*/