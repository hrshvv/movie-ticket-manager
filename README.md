# Movie Manager DBMS Simulation

A comprehensive database management system simulation for managing movie bookings, including seat selection, booking confirmation, and database record generation.

## Features

- **Movie Display**: View available movies with their showtimes, theaters, and pricing
- **Seat Selection**: Interactive seat grid with visual indicators for available, booked, and selected seats
- **Booking System**: Complete booking workflow with customer information and ticket selection
- **Database Simulation**: Generates SQL INSERT statements for Booking and Seat_Reserved tables
- **Real-time Updates**: Available seat counts update automatically after bookings

## Project Structure

```
DBMS/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # Custom styles
├── js/
│   ├── main.js         # Application entry point
│   ├── config.js       # Configuration constants
│   ├── data.js         # Mock movie data
│   ├── state.js        # Global state management
│   ├── utils.js        # Utility functions
│   ├── ui.js           # UI rendering functions
│   ├── modal.js        # Modal and seat grid management
│   └── booking.js      # Booking logic and confirmation
└── README.md           # Project documentation
```

## File Descriptions

### JavaScript Modules

- **main.js**: Initializes the application and sets up event listeners
- **config.js**: Defines seating layout constants (rows, seats per row)
- **data.js**: Contains mock movie and showtime data
- **state.js**: Manages global application state (movies, selected showtime, seats, booked seats)
- **utils.js**: Helper functions (message box, showtime lookup, seat availability)
- **ui.js**: Functions for rendering movie cards and UI components
- **modal.js**: Handles modal display, seat grid rendering, and seat selection
- **booking.js**: Manages booking confirmation, UI updates, and SQL generation

### HTML

- **index.html**: Main application structure with movie list, booking modal, and message box

### CSS

- **styles.css**: Custom styles and scrollbar customization

## Usage

1. Open `index.html` in a web browser
2. Browse available movies and showtimes
3. Click "Book" on a showtime to open the booking modal
4. Select seats from the interactive seat grid
5. Enter customer name and number of tickets
6. Click "Confirm Booking" to complete the booking
7. View SQL INSERT statements in the browser console

## Technologies

- **HTML5**: Structure and semantics
- **CSS3**: Styling with Tailwind CSS (CDN)
- **JavaScript (ES6 Modules)**: Modular application logic
- **Inter Font**: Google Fonts typography

## Browser Compatibility

- Modern browsers with ES6 module support
- Chrome, Firefox, Safari, Edge (latest versions)

## Notes

- This is a simulation and does not connect to a real database
- SQL statements are logged to the console for demonstration purposes
- Booked seats are tracked in memory and persist during the session

