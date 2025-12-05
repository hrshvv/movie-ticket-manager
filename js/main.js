/**
 * Main Application Entry Point
 * Initializes the application and sets up event listeners
 */

import { initializeState, allMoviesData } from './state.js';
import { renderMovies } from './ui.js';
import { closeModal, openModal } from './modal.js';
import { updateModalUI, confirmBooking } from './booking.js';
import { initializeTheme, setupThemeToggle } from './theme.js';

// Make functions globally available for inline event handlers
window.openModal = openModal;
window.closeModal = closeModal;

/**
 * Initialize the application when the page loads
 */
// Initialize theme immediately when script loads (before DOM is ready)
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    setupThemeToggle();
});

window.onload = function() {
    // Ensure theme is applied
    initializeTheme();
    setupThemeToggle();
    
    // Initialize application state
    initializeState();
    
    // Render movies on page load
    renderMovies(allMoviesData);
    
    // Attach event listeners
    const cancelButton = document.getElementById('cancelBooking');
    if (cancelButton) {
        cancelButton.addEventListener('click', closeModal);
    }
    
    const confirmButton = document.getElementById('confirmBooking');
    if (confirmButton) {
        confirmButton.addEventListener('click', confirmBooking);
    }
    
    const numberOfTicketsInput = document.getElementById('numberOfTickets');
    if (numberOfTicketsInput) {
        numberOfTicketsInput.addEventListener('input', updateModalUI);
    }
};

