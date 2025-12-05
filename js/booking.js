/**
 * Booking Management Functions
 * Handles booking confirmation, UI updates, and database simulation
 */

import { getSelectedShowtime, getSelectedSeats } from './modal.js';
import { BOOKED_SEATS_SIM } from './state.js';
import { showMessageBox } from './utils.js';
import { closeModal } from './modal.js';
import { renderMovies } from './ui.js';
import { allMoviesData } from './state.js';

/**
 * Update the modal UI based on current selections
 */
export function updateModalUI() {
    const selectedShowtime = getSelectedShowtime();
    if (!selectedShowtime) return;
    
    const numberOfTicketsInput = document.getElementById('numberOfTickets');
    const totalPriceElement = document.getElementById('totalPrice');
    const confirmButton = document.getElementById('confirmBooking');
    
    if (!numberOfTicketsInput || !totalPriceElement || !confirmButton) return;
    
    // Get number of tickets requested
    const numberOfTickets = parseInt(numberOfTicketsInput.value) || 1;
    
    // Get number of selected seats
    const selectedSeats = getSelectedSeats();
    const selectedSeatsCount = selectedSeats.size;
    
    // Calculate total price
    const totalPrice = selectedSeatsCount * selectedShowtime.ticketPrice;
    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
    
    // Update confirm button state
    // Enable only if selected seats match the number of tickets
    if (selectedSeatsCount === numberOfTickets && selectedSeatsCount > 0) {
        confirmButton.disabled = false;
    } else {
        confirmButton.disabled = true;
    }
}

/**
 * Confirm and process the booking
 */
export function confirmBooking() {
    const selectedShowtime = getSelectedShowtime();
    const selectedSeats = getSelectedSeats();
    
    if (!selectedShowtime || selectedSeats.size === 0) {
        showMessageBox('Please select seats before confirming', 'error');
        return;
    }
    
    // Get customer name
    const customerNameInput = document.getElementById('customerName');
    const customerName = customerNameInput?.value.trim() || '';
    
    if (!customerName) {
        showMessageBox('Please enter customer name', 'error');
        return;
    }
    
    // Generate random booking ID
    const newBookingId = `BK${Date.now()}${Math.floor(Math.random() * 1000)}`;
    
    // Calculate total amount
    const totalAmount = selectedSeats.size * selectedShowtime.ticketPrice;
    
    // Create booking record (matching Booking table structure)
    const bookingRecord = {
        bookingId: newBookingId,
        showtimeId: selectedShowtime.id,
        customerName: customerName,
        totalAmount: totalAmount,
        bookingDate: new Date().toISOString().split('T')[0] // Format: YYYY-MM-DD
    };
    
    // Create seat reservations array (matching Seat_Reserved table structure)
    const seatReservations = [];
    let reservationCounter = 1;
    
    selectedSeats.forEach(seatKey => {
        // Parse seat key: format is "showtimeId-seatLabel" (e.g., "st1-A1")
        const parts = seatKey.split('-');
        if (parts.length >= 2) {
            const seatLabel = parts.slice(1).join('-'); // Handle cases where seatLabel might have dashes
            
            // Extract row (letter) and number from seatLabel (e.g., "A1" -> row: "A", number: 1)
            const rowMatch = seatLabel.match(/^([A-Z]+)(\d+)$/);
            if (rowMatch) {
                const row = rowMatch[1];
                const number = parseInt(rowMatch[2]);
                
                const reservationId = `SR${Date.now()}${reservationCounter++}`;
                seatReservations.push({
                    reservationId: reservationId,
                    bookingId: newBookingId,
                    row: row,
                    number: number
                });
            }
        }
    });
    
    // Add all selected seats to BOOKED_SEATS_SIM
    selectedSeats.forEach(seatKey => {
        BOOKED_SEATS_SIM.add(seatKey);
    });
    
    // Log SQL INSERT statements
    console.log('--- Booking Record ---');
    console.log(`INSERT INTO Booking (bookingId, showtimeId, customerName, totalAmount, bookingDate) VALUES ('${bookingRecord.bookingId}', '${bookingRecord.showtimeId}', '${bookingRecord.customerName}', ${bookingRecord.totalAmount}, '${bookingRecord.bookingDate}');`);
    
    console.log('--- Seat Reserved Records ---');
    seatReservations.forEach(reservation => {
        console.log(`INSERT INTO Seat_Reserved (reservationId, bookingId, row, number) VALUES ('${reservation.reservationId}', '${reservation.bookingId}', '${reservation.row}', ${reservation.number});`);
    });
    
    // Show success message
    showMessageBox(`Booking confirmed! Booking ID: ${newBookingId}`, 'success');
    
    // Close modal
    closeModal();
    
    // Refresh movie list to update available seat counts
    renderMovies(allMoviesData);
}

