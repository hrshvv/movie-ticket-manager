/**
 * Global State Management
 * Manages application-wide state variables
 */

import { MOCK_MOVIES_DATA } from './data.js';

// Application State
export let allMoviesData = [];
export const BOOKED_SEATS_SIM = new Set();

/**
 * Initialize application state
 */
export function initializeState() {
    allMoviesData = [...MOCK_MOVIES_DATA];
}

