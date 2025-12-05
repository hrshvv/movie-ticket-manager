/**
 * Utility Functions
 * Helper functions used throughout the application
 */

import { allMoviesData } from './state.js';
import { BOOKED_SEATS_SIM } from './state.js';

/**
 * Display a message box notification
 * @param {string} message - The message to display
 * @param {string} type - Message type: 'success' or 'error'
 */
export function showMessageBox(message, type = 'success') {
    const messageBox = document.getElementById('messageBox');
    const messageBoxText = document.getElementById('messageBoxText');
    
    if (!messageBox || !messageBoxText) return;
    
    // Set the message text
    messageBoxText.textContent = message;
    
    // Remove existing color classes
    messageBox.classList.remove('bg-green-500', 'bg-red-500', 'from-green-500', 'to-emerald-600', 'from-red-500', 'to-rose-600', 'bg-gradient-to-r');
    
    // Apply appropriate color based on type
    const messageIcon = document.getElementById('messageIcon');
    if (type === 'success') {
        messageBox.classList.add('bg-gradient-to-r', 'from-green-500', 'to-emerald-600');
        if (messageIcon) {
            messageIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>';
        }
    } else if (type === 'error') {
        messageBox.classList.add('bg-gradient-to-r', 'from-red-500', 'to-rose-600');
        if (messageIcon) {
            messageIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
        }
    }
    
    // Show the message box
    messageBox.classList.remove('hidden');
    
    // Hide after 3 seconds
    setTimeout(() => {
        messageBox.classList.add('hidden');
    }, 3000);
}

/**
 * Find a showtime by its ID
 * @param {string} showtimeId - The showtime ID to search for
 * @returns {Object|null} The showtime object or null if not found
 */
export function findShowtimeById(showtimeId) {
    for (const movie of allMoviesData) {
        const showtime = movie.showtimes.find(st => st.id === showtimeId);
        if (showtime) {
            return showtime;
        }
    }
    return null;
}

/**
 * Calculate available seats for a showtime
 * @param {string} showtimeId - The showtime ID
 * @returns {number} Number of available seats
 */
export function getAvailableSeats(showtimeId) {
    // Count booked seats for this showtime (assuming seat format: "showtimeId-seatIdentifier")
    const bookedCount = Array.from(BOOKED_SEATS_SIM).filter(seat => 
        seat.startsWith(showtimeId + '-')
    ).length;
    
    const showtime = findShowtimeById(showtimeId);
    if (!showtime) return 0;
    
    return Math.max(0, showtime.capacity - bookedCount);
}

/**
 * Format duration in minutes to readable format
 * @param {number} minutes - Duration in minutes
 * @returns {string} Formatted duration string
 */
export function formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
}

