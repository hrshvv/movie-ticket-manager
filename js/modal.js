/**
 * Modal Management Functions
 * Handles modal display, seat grid rendering, and seat selection
 */

import { allMoviesData, BOOKED_SEATS_SIM } from './state.js';
import { SEAT_ROWS, SEATS_PER_ROW } from './config.js';
import { findShowtimeById, showMessageBox } from './utils.js';
import { updateModalUI } from './booking.js';

// Local state for modal
let selectedShowtime = null;
let selectedSeats = new Set();

export function getSelectedShowtime() {
    return selectedShowtime;
}

export function setSelectedShowtime(showtime) {
    selectedShowtime = showtime;
}

export function getSelectedSeats() {
    return selectedSeats;
}

/**
 * Open the booking modal for a specific showtime
 * @param {string} showtimeId - The showtime ID
 */
export function openModal(showtimeId) {
    // Find the showtime
    const showtime = findShowtimeById(showtimeId);
    if (!showtime) {
        showMessageBox('Showtime not found', 'error');
        return;
    }
    
    // Set selected showtime
    selectedShowtime = showtime;
    
    // Reset selected seats
    selectedSeats.clear();
    
    // Update modal title with movie and showtime info
    const movie = allMoviesData.find(m => m.showtimes.some(st => st.id === showtimeId));
    if (movie) {
        const modalTitle = document.getElementById('modalTitle');
        if (modalTitle) {
            modalTitle.textContent = `Book Tickets - ${movie.title} (${showtime.theaterName})`;
        }
    }
    
    // Reset form fields
    const customerNameInput = document.getElementById('customerName');
    const numberOfTicketsInput = document.getElementById('numberOfTickets');
    if (customerNameInput) customerNameInput.value = '';
    if (numberOfTicketsInput) numberOfTicketsInput.value = '1';
    
    // Show modal
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.classList.remove('hidden');
    }
    
    // Render seat grid
    renderSeatGrid(showtimeId, showtime.capacity);
    
    // Update UI
    updateModalUI();
}

/**
 * Close the booking modal and reset state
 */
export function closeModal() {
    // Hide modal
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.classList.add('hidden');
    }
    
    // Reset global state variables
    selectedShowtime = null;
    selectedSeats.clear();
    
    // Reset form fields
    const customerNameInput = document.getElementById('customerName');
    const numberOfTicketsInput = document.getElementById('numberOfTickets');
    const totalPrice = document.getElementById('totalPrice');
    if (customerNameInput) customerNameInput.value = '';
    if (numberOfTicketsInput) numberOfTicketsInput.value = '1';
    if (totalPrice) totalPrice.textContent = '$0.00';
    
    // Reset modal title
    const modalTitle = document.getElementById('modalTitle');
    if (modalTitle) {
        modalTitle.textContent = 'Book Tickets';
    }
    
    // Clear seat grid
    const seatGrid = document.getElementById('seatGrid');
    if (seatGrid) {
        seatGrid.innerHTML = '';
    }
    
    // Disable confirm button
    const confirmButton = document.getElementById('confirmBooking');
    if (confirmButton) {
        confirmButton.disabled = true;
    }
}

/**
 * Render the seat grid for a showtime
 * @param {string} showtimeId - The showtime ID
 * @param {number} capacity - The theater capacity
 */
function renderSeatGrid(showtimeId, capacity) {
    const seatGrid = document.getElementById('seatGrid');
    if (!seatGrid) return;
    
    // Clear existing grid
    seatGrid.innerHTML = '';
    
    // Create container for the seat grid
    const gridContainer = document.createElement('div');
    gridContainer.className = 'mb-4';
    
    // Add legend
    const legend = document.createElement('div');
    legend.className = 'flex justify-center gap-6 mb-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 rounded-xl border border-gray-200 dark:border-slate-600 transition-all';
    legend.innerHTML = `
        <div class="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-700 rounded-lg shadow-sm transition-colors">
            <div class="w-5 h-5 bg-gray-300 dark:bg-slate-500 rounded border-2 border-gray-400 dark:border-slate-400 seat-button"></div>
            <span class="text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors">Available</span>
        </div>
        <div class="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-700 rounded-lg shadow-sm transition-colors">
            <div class="w-5 h-5 bg-red-500 rounded border-2 border-red-600"></div>
            <span class="text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors">Booked</span>
        </div>
        <div class="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-700 rounded-lg shadow-sm transition-colors">
            <div class="w-5 h-5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded border-2 border-indigo-600"></div>
            <span class="text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors">Selected</span>
        </div>
    `;
    gridContainer.appendChild(legend);
    
    // Create grid
    const grid = document.createElement('div');
    grid.className = 'grid gap-2 justify-center';
    grid.style.gridTemplateColumns = `repeat(${SEATS_PER_ROW}, minmax(0, 1fr))`;
    grid.style.maxWidth = '100%';
    
    // Generate seats
    const rowLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    for (let row = 0; row < SEAT_ROWS; row++) {
        for (let col = 0; col < SEATS_PER_ROW; col++) {
            const seatNumber = row * SEATS_PER_ROW + col;
            
            // Skip if we exceed the capacity
            if (seatNumber >= capacity) break;
            
            const rowLabel = rowLetters[row];
            const seatLabel = `${rowLabel}${col + 1}`;
            const seatKey = `${showtimeId}-${seatLabel}`;
            
            // Check if seat is booked
            const isBooked = BOOKED_SEATS_SIM.has(seatKey);
            const isSelected = selectedSeats.has(seatKey);
            
            // Create seat button
            const seatButton = document.createElement('button');
            seatButton.type = 'button';
            seatButton.className = `seat-button w-12 h-12 rounded-lg border-2 text-xs font-bold transition-all ${
                isBooked 
                    ? 'bg-red-500 border-red-600 text-white cursor-not-allowed shadow-md' 
                    : isSelected
                    ? 'bg-gradient-to-br from-indigo-500 to-purple-600 border-indigo-600 text-white shadow-lg scale-110'
                    : 'bg-gray-200 dark:bg-slate-600 border-gray-300 dark:border-slate-500 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-slate-500 hover:border-gray-400 dark:hover:border-slate-400 hover:shadow-md'
            }`;
            seatButton.textContent = seatLabel;
            seatButton.dataset.seatKey = seatKey;
            seatButton.dataset.seatLabel = seatLabel;
            
            // Add click handler only if not booked
            if (!isBooked) {
                seatButton.addEventListener('click', () => toggleSeatSelection(seatButton, seatKey));
            }
            
            grid.appendChild(seatButton);
        }
    }
    
    gridContainer.appendChild(grid);
    seatGrid.appendChild(gridContainer);
}

/**
 * Toggle seat selection
 * @param {HTMLElement} seatButton - The seat button element
 * @param {string} seatKey - The unique seat key
 */
function toggleSeatSelection(seatButton, seatKey) {
    if (!seatKey) return;
    
    // Get number of tickets requested
    const numberOfTicketsInput = document.getElementById('numberOfTickets');
    const numTickets = parseInt(numberOfTicketsInput?.value) || 1;
    
    // Check if seat is already selected
    if (selectedSeats.has(seatKey)) {
        // Remove from selection
        selectedSeats.delete(seatKey);
        seatButton.classList.remove('bg-gradient-to-br', 'from-indigo-500', 'to-purple-600', 'border-indigo-600', 'text-white', 'shadow-lg', 'scale-110');
        seatButton.classList.add('bg-gray-200', 'dark:bg-slate-600', 'border-gray-300', 'dark:border-slate-500', 'text-gray-700', 'dark:text-gray-200');
    } else {
        // Check if we've reached the limit
        if (selectedSeats.size >= numTickets) {
            showMessageBox(`You can only select ${numTickets} seat(s)`, 'error');
            return;
        }
        
        // Add to selection
        selectedSeats.add(seatKey);
        seatButton.classList.remove('bg-gray-200', 'dark:bg-slate-600', 'border-gray-300', 'dark:border-slate-500', 'text-gray-700', 'dark:text-gray-200');
        seatButton.classList.add('bg-gradient-to-br', 'from-indigo-500', 'to-purple-600', 'border-indigo-600', 'text-white', 'shadow-lg', 'scale-110');
    }
    
    // Update UI after selection change
    updateModalUI();
}

