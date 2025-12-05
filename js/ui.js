/**
 * UI Rendering Functions
 * Handles rendering of movies and other UI components
 */

import { allMoviesData } from './state.js';
import { getAvailableSeats, formatDuration } from './utils.js';

/**
 * Render movie cards in the movie list
 * @param {Array} movies - Array of movie objects
 */
export function renderMovies(movies) {
    const movieList = document.getElementById('movieList');
    if (!movieList) return;
    
    // Clear existing content
    movieList.innerHTML = '';
    
    // Iterate through movies and their showtimes
    movies.forEach(movie => {
        movie.showtimes.forEach(showtime => {
            const availableSeats = getAvailableSeats(showtime.id);
            
            // Create card element
            const card = document.createElement('div');
            card.className = 'movie-card';
            
            // Format duration
            const durationText = formatDuration(movie.duration);
            
            card.innerHTML = `
                <div class="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div class="flex-1 w-full">
                        <div class="flex items-start justify-between mb-3">
                            <h3 class="text-3xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent transition-all">${movie.title}</h3>
                            <span class="rating-badge">${movie.rating}</span>
                        </div>
                        <div class="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4 transition-colors">
                            <span class="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-slate-700 rounded-lg transition-colors">
                                <svg class="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <span class="font-semibold">${durationText}</span>
                            </span>
                        </div>
                        <div class="space-y-3 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 p-4 rounded-xl border border-gray-100 dark:border-slate-600 transition-all">
                            <div class="flex items-center justify-between">
                                <span class="text-gray-600 dark:text-gray-300 font-medium flex items-center gap-2 transition-colors">
                                    <svg class="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                    </svg>
                                    Theater
                                </span>
                                <span class="theater-badge">${showtime.theaterName}</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-gray-600 dark:text-gray-300 font-medium flex items-center gap-2 transition-colors">
                                    <svg class="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    Price
                                </span>
                                <span class="price-display">${showtime.ticketPrice.toFixed(2)}</span>
                            </div>
                            <div class="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-slate-600 transition-colors">
                                <span class="text-gray-600 dark:text-gray-300 font-medium flex items-center gap-2 transition-colors">
                                    <svg class="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                    </svg>
                                    Available Seats
                                </span>
                                <span class="flex items-center gap-2">
                                    <span class="text-sm text-gray-500 dark:text-gray-400 transition-colors">${availableSeats}</span>
                                    <span class="text-gray-300 dark:text-gray-600 transition-colors">/</span>
                                    <span class="text-sm text-gray-500 dark:text-gray-400 transition-colors">${showtime.capacity}</span>
                                    <span class="ml-2 w-3 h-3 rounded-full ${availableSeats > 0 ? 'bg-green-500 animate-pulse' : 'bg-red-500'}"></span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="flex-shrink-0 w-full md:w-auto">
                        <button 
                            onclick="window.openModal('${showtime.id}')"
                            class="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${availableSeats === 0 ? 'opacity-50 cursor-not-allowed' : ''}"
                            ${availableSeats === 0 ? 'disabled' : ''}
                        >
                            <span class="flex items-center justify-center gap-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 002 2h3a2 2 0 002-2V7a2 2 0 00-2-2H5zM5 13a2 2 0 00-2 2v3a2 2 0 002 2h3a2 2 0 002-2v-3a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h3a2 2 0 012 2v3a2 2 0 01-2 2h-3a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h3a2 2 0 012 2v7a2 2 0 01-2 2h-3a2 2 0 01-2-2v-7z"></path>
                                </svg>
                                Book Now
                            </span>
                        </button>
                    </div>
                </div>
            `;
            
            movieList.appendChild(card);
        });
    });
}

