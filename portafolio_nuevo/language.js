const translations = {
    es: {
        greeting: "Hola, bienvenido a mi portafolio",
        button: "Cambiar a Inglés"
    },
    en: {
        greeting: "Hello, welcome to my portfolio",
        button: "Switch to Spanish"
    }
};

let currentLang = "es";

// Create greeting element if not exists
let greeting = document.getElementById("greeting");
if (!greeting) {
    greeting = document.createElement("div");
    greeting.id = "greeting";
    document.body.appendChild(greeting);
}

// Create langBtn element if not exists
let langBtn = document.getElementById("langBtn");
if (!langBtn) {
    langBtn = document.createElement("button");
    langBtn.id = "langBtn";
    document.body.appendChild(langBtn);
}

function setLanguage(lang) {
    greeting.textContent = translations[lang].greeting;
    langBtn.textContent = translations[lang].button;
    currentLang = lang;
}

document.addEventListener("DOMContentLoaded", () => {
    setLanguage(currentLang);
    langBtn.addEventListener("click", () => {
        setLanguage(currentLang === "es" ? "en" : "es");
    });
});