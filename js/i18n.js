// ==============================
// Language Switcher + i18n Loader
// ==============================

// Default Language (fallback)
const DEFAULT_LANG = "en";

// Load previously selected language OR default
let currentLang = localStorage.getItem("lang") || DEFAULT_LANG;

// ------------------------------
// Load Language JSON File
// ------------------------------
function loadLanguage(lang) {
    fetch(`./js/i18n/${lang}.json`)
        .then(res => res.json())
        .then(data => {
            // Replace all elements with data-i18n
            document.querySelectorAll("[data-i18n]").forEach(el => {
                const key = el.getAttribute("data-i18n");
                if (data[key]) el.innerHTML = data[key];
            });

            // Update HTML attributes
            document.documentElement.lang = lang;
            document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

            // Remember selected language
            localStorage.setItem("lang", lang);

            // Update button text
            const switcher = document.getElementById("languageSwitcher");
            if (switcher) {
                const langBtn = switcher.querySelector(".lang-btn");
                const selectedOption = switcher.querySelector(`[data-lang="${lang}"]`);
                if (selectedOption) langBtn.textContent = selectedOption.textContent;
            }
        })
        .catch(err => console.error("Translation file error:", err));
}

// ------------------------------
// Setup Language Switcher
// ------------------------------
function setupLanguageSwitcher() {
    const switcher = document.getElementById("languageSwitcher");
    if (!switcher) return;

    const langBtn = switcher.querySelector(".lang-btn");
    const dropdown = switcher.querySelector(".lang-dropdown");

    // Toggle dropdown
    langBtn.addEventListener("click", () => {
        dropdown.classList.toggle("active");
    });

    // On Language Select
    switcher.querySelectorAll("[data-lang]").forEach(option => {
        option.addEventListener("click", () => {
            const lang = option.getAttribute("data-lang");

            // Update button text
            langBtn.textContent = option.textContent;

            dropdown.classList.remove("active");

            // Load new language
            loadLanguage(lang);
        });
    });

    // Close dropdown on outside click
    document.addEventListener("click", (e) => {
        if (!switcher.contains(e.target)) {
            dropdown.classList.remove("active");
        }
    });
}

// ------------------------------
// Initialize Everything
// ------------------------------
document.addEventListener("DOMContentLoaded", () => {
    setupLanguageSwitcher();
    loadLanguage(currentLang);
});
