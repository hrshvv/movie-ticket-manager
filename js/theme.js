/**
 * Theme Management
 * Handles light/dark theme switching and persistence
 */

/**
 * Initialize theme on page load
 */
export function initializeTheme() {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
}

/**
 * Apply theme to the document
 * @param {string} theme - 'light' or 'dark'
 */
export function applyTheme(theme) {
    const html = document.documentElement;
    
    if (theme === 'dark') {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }
    
    // Save theme preference
    localStorage.setItem('theme', theme);
    
    // Update toggle button icons
    updateThemeToggleIcons(theme);
}

/**
 * Toggle between light and dark theme
 */
export function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    
    applyTheme(newTheme);
}

/**
 * Update theme toggle button icons
 * @param {string} theme - Current theme
 */
function updateThemeToggleIcons(theme) {
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');
    
    if (sunIcon && moonIcon) {
        if (theme === 'dark') {
            sunIcon.classList.remove('hidden');
            sunIcon.classList.add('block');
            moonIcon.classList.remove('block');
            moonIcon.classList.add('hidden');
        } else {
            sunIcon.classList.remove('block');
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
            moonIcon.classList.add('block');
        }
    }
}

/**
 * Set up theme toggle button event listener
 */
export function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

