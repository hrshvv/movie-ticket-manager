# Movie Manager DBMS Simulation

A comprehensive, modern web-based database management system simulation for managing movie bookings. This application provides an interactive interface for browsing movies, selecting seats, and processing bookings with real-time seat availability tracking and SQL statement generation for database integration.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Usage Guide](#usage-guide)
- [Architecture](#architecture)
- [Module Documentation](#module-documentation)
- [Database Schema](#database-schema)
- [Configuration](#configuration)
- [Technologies Used](#technologies-used)
- [Browser Compatibility](#browser-compatibility)
- [Development](#development)
- [Troubleshooting](#troubleshooting)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

Movie Manager DBMS Simulation is a client-side web application that simulates a complete movie theater booking system. It demonstrates database management concepts by generating SQL INSERT statements for booking records and seat reservations. The application features a modern, responsive UI with dark mode support, interactive seat selection, and real-time availability updates.

### Key Highlights

- **No Backend Required**: Fully client-side application that runs entirely in the browser
- **Database Simulation**: Generates SQL statements for `Booking` and `Seat_Reserved` tables
- **Real-time Updates**: Seat availability updates automatically after each booking
- **Modern UI/UX**: Beautiful gradient designs, smooth animations, and responsive layout
- **Dark Mode**: Full dark mode support with theme persistence
- **Modular Architecture**: Clean, maintainable codebase with ES6 modules

## ✨ Features

### Core Functionality

#### 1. **Movie Display**
- View all available movies with their details
- Display movie information including:
  - Title and rating (e.g., PG-13, R)
  - Duration in hours and minutes format
  - Multiple showtimes per movie
  - Theater assignments
  - Ticket pricing
  - Real-time seat availability

#### 2. **Interactive Seat Selection**
- Visual seat grid with 10 rows × 10 seats (configurable)
- Three seat states with distinct visual indicators:
  - **Available**: Gray seats that can be selected
  - **Booked**: Red seats that are already reserved
  - **Selected**: Purple gradient seats currently selected by the user
- Seat legend for easy understanding
- Click to toggle seat selection
- Automatic validation to match selected seats with ticket count

#### 3. **Booking System**
- Complete booking workflow:
  1. Select a showtime
  2. Choose seats from the interactive grid
  3. Enter customer name
  4. Specify number of tickets (1-10)
  5. Review total price
  6. Confirm booking
- Real-time price calculation
- Booking validation:
  - Ensures customer name is provided
  - Validates seat selection matches ticket count
  - Prevents booking when no seats are available
- Unique booking ID generation (format: `BK{timestamp}{random}`)
- Automatic seat reservation ID generation (format: `SR{timestamp}{counter}`)

#### 4. **Database Simulation**
- Generates SQL INSERT statements for:
  - **Booking Table**: Stores booking information
  - **Seat_Reserved Table**: Stores individual seat reservations
- SQL statements logged to browser console
- Ready-to-use SQL format for database integration

#### 5. **Real-time Updates**
- Available seat counts update automatically after bookings
- Seat grid reflects current booking status
- Movie cards refresh to show updated availability
- Visual indicators (green/red dots) show seat availability status

#### 6. **Theme Management**
- Light and dark mode support
- Theme toggle button in top-right corner
- Theme preference saved in localStorage
- Smooth transitions between themes
- Prevents flash of incorrect theme on page load

#### 7. **User Experience Enhancements**
- Toast notifications for success/error messages
- Smooth animations and transitions
- Responsive design for mobile and desktop
- Custom scrollbar styling
- Loading states and hover effects
- Disabled states for unavailable actions

## 📁 Project Structure

```
DBMS/
├── index.html          # Main HTML file with application structure
├── css/
│   └── styles.css      # Custom styles, animations, and theme support
├── js/
│   ├── main.js         # Application entry point and initialization
│   ├── config.js       # Configuration constants (seating layout)
│   ├── data.js         # Mock movie and showtime data
│   ├── state.js        # Global state management
│   ├── utils.js        # Utility functions (messages, lookups, formatting)
│   ├── ui.js           # UI rendering functions (movie cards)
│   ├── modal.js        # Modal and seat grid management
│   ├── booking.js      # Booking logic and confirmation
│   └── theme.js        # Theme management (light/dark mode)
└── README.md           # Project documentation
```

## 🚀 Installation & Setup

### Prerequisites

- A modern web browser with ES6 module support
- No server or build tools required (runs directly in browser)
- No dependencies to install (uses CDN for Tailwind CSS)

### Quick Start

1. **Clone or download the repository**
   ```bash
   git clone <repository-url>
   cd DBMS
   ```

2. **Open the application**
   - Simply open `index.html` in your web browser
   - Or use a local web server (recommended for development):
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js (http-server)
     npx http-server
     
     # Using PHP
     php -S localhost:8000
     ```

3. **Access the application**
   - Direct file: `file:///path/to/DBMS/index.html`
   - Local server: `http://localhost:8000`

### Development Setup

For development with live reload and better debugging:

1. **Using VS Code Live Server**
   - Install "Live Server" extension
   - Right-click `index.html` → "Open with Live Server"

2. **Using Browser DevTools**
   - Open browser developer tools (F12)
   - Check console for SQL statements and debugging info

## 📖 Usage Guide

### Basic Workflow

1. **Browse Movies**
   - View all available movies and their showtimes
   - Each movie card displays:
     - Movie title and rating
     - Duration
     - Theater name
     - Ticket price
     - Available seats count

2. **Start Booking**
   - Click the "Book Now" button on any available showtime
   - The booking modal will open

3. **Select Seats**
   - View the interactive seat grid
   - Click on available (gray) seats to select them
   - Selected seats turn purple
   - Booked seats (red) cannot be selected
   - Use the legend to understand seat states

4. **Enter Booking Details**
   - Enter customer name in the text field
   - Adjust number of tickets (1-10) using the number input
   - Selected seats must match the number of tickets
   - Total price updates automatically

5. **Confirm Booking**
   - Click "Confirm Booking" when ready
   - A success message will appear
   - SQL statements will be logged to the console
   - The modal will close
   - Movie list will refresh with updated availability

6. **View SQL Statements**
   - Open browser console (F12)
   - Navigate to the Console tab
   - View generated INSERT statements for:
     - Booking record
     - Seat reservation records

### Advanced Features

#### Theme Switching
- Click the theme toggle button (top-right)
- Theme preference is saved automatically
- Works across page refreshes

#### Seat Selection Tips
- You can deselect seats by clicking them again
- The number of selected seats must match the ticket count
- Maximum 10 tickets per booking
- Seats are booked immediately upon confirmation

#### Console Output Example
```
--- Booking Record ---
INSERT INTO Booking (bookingId, showtimeId, customerName, totalAmount, bookingDate) 
VALUES ('BK1234567890123', 'st1', 'John Doe', 25.00, '2024-01-15');

--- Seat Reserved Records ---
INSERT INTO Seat_Reserved (reservationId, bookingId, row, number) 
VALUES ('SR12345678901231', 'BK1234567890123', 'A', 1);
INSERT INTO Seat_Reserved (reservationId, bookingId, row, number) 
VALUES ('SR12345678901232', 'BK1234567890123', 'A', 2);
```

## 🏗️ Architecture

### Application Flow

```
User Interaction
    ↓
Event Handlers (main.js)
    ↓
UI Updates (ui.js, modal.js)
    ↓
State Management (state.js)
    ↓
Business Logic (booking.js, utils.js)
    ↓
SQL Generation (booking.js)
    ↓
Console Output
```

### Module Dependencies

```
main.js
├── state.js (initializeState, allMoviesData)
├── ui.js (renderMovies)
├── modal.js (openModal, closeModal)
├── booking.js (updateModalUI, confirmBooking)
└── theme.js (initializeTheme, setupThemeToggle)

modal.js
├── state.js (allMoviesData, BOOKED_SEATS_SIM)
├── config.js (SEAT_ROWS, SEATS_PER_ROW)
└── utils.js (findShowtimeById, showMessageBox)

booking.js
├── modal.js (getSelectedShowtime, getSelectedSeats)
├── state.js (BOOKED_SEATS_SIM, allMoviesData)
├── utils.js (showMessageBox)
├── modal.js (closeModal)
└── ui.js (renderMovies)

ui.js
├── state.js (allMoviesData)
└── utils.js (getAvailableSeats, formatDuration)
```

## 📚 Module Documentation

### JavaScript Modules

#### **main.js** - Application Entry Point
- **Purpose**: Initializes the application and sets up event listeners
- **Key Functions**:
  - `window.onload`: Main initialization function
  - Sets up theme toggle
  - Initializes application state
  - Renders initial movie list
  - Attaches event listeners for booking modal
- **Global Exports**: `openModal`, `closeModal` (for inline handlers)

#### **config.js** - Configuration Constants
- **Purpose**: Defines system-wide configuration values
- **Exports**:
  - `SEAT_ROWS`: Number of rows in the seat grid (default: 10)
  - `SEATS_PER_ROW`: Number of seats per row (default: 10)
- **Customization**: Modify these values to change theater layout

#### **data.js** - Mock Data
- **Purpose**: Contains sample movie and showtime data
- **Data Structure**:
  ```javascript
  {
    title: string,
    duration: number (minutes),
    rating: string,
    showtimes: [
      {
        id: string,
        ticketPrice: number,
        capacity: number,
        theaterName: string
      }
    ]
  }
  ```
- **Customization**: Add/modify movies and showtimes here

#### **state.js** - Global State Management
- **Purpose**: Manages application-wide state
- **State Variables**:
  - `allMoviesData`: Array of all movies
  - `BOOKED_SEATS_SIM`: Set of booked seat keys (format: "showtimeId-seatLabel")
- **Functions**:
  - `initializeState()`: Loads mock data into state

#### **utils.js** - Utility Functions
- **Purpose**: Helper functions used throughout the application
- **Functions**:
  - `showMessageBox(message, type)`: Displays toast notifications
  - `findShowtimeById(showtimeId)`: Finds showtime by ID
  - `getAvailableSeats(showtimeId)`: Calculates available seats
  - `formatDuration(minutes)`: Formats duration (e.g., "2h 15m")

#### **ui.js** - UI Rendering
- **Purpose**: Handles rendering of UI components
- **Functions**:
  - `renderMovies(movies)`: Renders movie cards in the list
  - Creates dynamic HTML for each movie/showtime combination
  - Updates available seat counts
  - Handles disabled states for sold-out showtimes

#### **modal.js** - Modal and Seat Grid Management
- **Purpose**: Manages booking modal and seat selection
- **Key Functions**:
  - `openModal(showtimeId)`: Opens booking modal for a showtime
  - `closeModal()`: Closes modal and resets state
  - `getSelectedShowtime()`: Returns currently selected showtime
  - `getSelectedSeats()`: Returns Set of selected seat keys
  - `renderSeatGrid(showtimeId, capacity)`: Renders interactive seat grid
  - `toggleSeatSelection(seatButton, seatKey)`: Handles seat selection
- **Local State**:
  - `selectedShowtime`: Currently selected showtime object
  - `selectedSeats`: Set of selected seat keys

#### **booking.js** - Booking Logic
- **Purpose**: Handles booking confirmation and SQL generation
- **Functions**:
  - `updateModalUI()`: Updates modal UI based on selections
    - Calculates total price
    - Enables/disables confirm button
    - Validates seat selection matches ticket count
  - `confirmBooking()`: Processes booking confirmation
    - Validates input
    - Generates booking ID
    - Creates booking record
    - Creates seat reservation records
    - Generates SQL INSERT statements
    - Updates booked seats in state
    - Shows success message
    - Refreshes movie list

#### **theme.js** - Theme Management
- **Purpose**: Handles light/dark theme switching
- **Functions**:
  - `initializeTheme()`: Loads saved theme preference
  - `applyTheme(theme)`: Applies theme to document
  - `toggleTheme()`: Switches between light and dark
  - `setupThemeToggle()`: Sets up theme toggle button
  - `updateThemeToggleIcons(theme)`: Updates button icons
- **Storage**: Uses localStorage to persist theme preference

### HTML Structure

#### **index.html**
- **Main Container**: Movie list grid
- **Booking Modal**: Hidden modal for seat selection and booking
- **Message Box**: Toast notification container
- **Theme Toggle**: Fixed position button
- **External Resources**:
  - Tailwind CSS (CDN)
  - Inter font (Google Fonts)
  - Custom CSS file

### CSS Features

#### **styles.css**
- **Custom Animations**:
  - `fadeIn`: Fade-in effect
  - `slideUp`: Slide-up animation for modal
  - `slideInRight`: Slide-in for notifications
  - `pulse`: Pulsing animation
- **Custom Components**:
  - Movie card hover effects
  - Seat button interactions
  - Custom scrollbar styling
  - Rating badges
  - Price displays
  - Theater badges
- **Theme Support**: Dark mode styles for all components
- **Responsive Design**: Mobile-friendly breakpoints

## 🗄️ Database Schema

The application generates SQL statements for two tables:

### Booking Table

```sql
CREATE TABLE Booking (
    bookingId VARCHAR(50) PRIMARY KEY,
    showtimeId VARCHAR(50) NOT NULL,
    customerName VARCHAR(100) NOT NULL,
    totalAmount DECIMAL(10, 2) NOT NULL,
    bookingDate DATE NOT NULL
);
```

**Field Descriptions**:
- `bookingId`: Unique identifier (format: `BK{timestamp}{random}`)
- `showtimeId`: Reference to the showtime (e.g., "st1", "st2")
- `customerName`: Customer's name
- `totalAmount`: Total booking amount (ticket price × number of tickets)
- `bookingDate`: Date of booking (format: YYYY-MM-DD)

### Seat_Reserved Table

```sql
CREATE TABLE Seat_Reserved (
    reservationId VARCHAR(50) PRIMARY KEY,
    bookingId VARCHAR(50) NOT NULL,
    row VARCHAR(10) NOT NULL,
    number INT NOT NULL,
    FOREIGN KEY (bookingId) REFERENCES Booking(bookingId)
);
```

**Field Descriptions**:
- `reservationId`: Unique identifier (format: `SR{timestamp}{counter}`)
- `bookingId`: Foreign key to Booking table
- `row`: Seat row letter (e.g., "A", "B", "C")
- `number`: Seat number within the row (1-based)

### Example SQL Output

```sql
-- Booking Record
INSERT INTO Booking (bookingId, showtimeId, customerName, totalAmount, bookingDate) 
VALUES ('BK1705324800000123', 'st1', 'John Doe', 25.00, '2024-01-15');

-- Seat Reservations
INSERT INTO Seat_Reserved (reservationId, bookingId, row, number) 
VALUES ('SR17053248000001231', 'BK1705324800000123', 'A', 1);

INSERT INTO Seat_Reserved (reservationId, bookingId, row, number) 
VALUES ('SR17053248000001232', 'BK1705324800000123', 'A', 2);
```

## ⚙️ Configuration

### Seating Layout

Edit `js/config.js` to customize the theater layout:

```javascript
export const SEAT_ROWS = 10;        // Number of rows
export const SEATS_PER_ROW = 10;    // Seats per row
```

**Note**: Total capacity is `SEAT_ROWS × SEATS_PER_ROW = 100 seats` (default)

### Movie Data

Edit `js/data.js` to add/modify movies and showtimes:

```javascript
export const MOCK_MOVIES_DATA = [
    {
        title: "Movie Title",
        duration: 120,  // minutes
        rating: "PG-13",
        showtimes: [
            {
                id: "st1",           // Unique showtime ID
                ticketPrice: 12.50,   // Price per ticket
                capacity: 100,        // Theater capacity
                theaterName: "Theater A"
            }
        ]
    }
];
```

### Theme Default

The default theme is `light`. To change the default, modify `js/theme.js`:

```javascript
const savedTheme = localStorage.getItem('theme') || 'dark'; // Change 'light' to 'dark'
```

### Maximum Tickets

The maximum number of tickets per booking is set in `index.html`:

```html
<input type="number" id="numberOfTickets" min="1" max="10" value="1">
```

Change the `max` attribute to adjust the limit.

## 🛠️ Technologies Used

### Core Technologies

- **HTML5**: Semantic markup and structure
- **CSS3**: Custom styling, animations, and responsive design
- **JavaScript (ES6+)**: Modern JavaScript with modules, classes, and arrow functions

### External Libraries & Resources

- **Tailwind CSS** (CDN): Utility-first CSS framework
  - Version: Latest from CDN
  - Features: Dark mode support, responsive utilities, gradient utilities
- **Inter Font** (Google Fonts): Modern, readable typography
  - Weights: 300, 400, 500, 600, 700

### Browser APIs Used

- **localStorage**: Theme preference persistence
- **Console API**: SQL statement logging
- **DOM API**: Dynamic content manipulation
- **ES6 Modules**: Modular code organization

## 🌐 Browser Compatibility

### Supported Browsers

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Opera (latest)

### Requirements

- ES6 module support
- localStorage support
- CSS Grid support
- CSS Custom Properties (for theming)

### Known Limitations

- Internet Explorer: Not supported (no ES6 module support)
- Older browsers: May not support all CSS features

## 💻 Development

### Code Style

- **Indentation**: 4 spaces
- **Naming**: camelCase for variables/functions, PascalCase for classes
- **Comments**: JSDoc-style comments for functions
- **Modules**: ES6 import/export syntax

### Adding New Features

1. **Add a new movie**:
   - Edit `js/data.js`
   - Add movie object to `MOCK_MOVIES_DATA` array

2. **Modify seat layout**:
   - Edit `js/config.js`
   - Update `SEAT_ROWS` and/or `SEATS_PER_ROW`

3. **Add new utility function**:
   - Add to `js/utils.js`
   - Export the function
   - Import where needed

4. **Customize styling**:
   - Edit `css/styles.css`
   - Add Tailwind classes in HTML
   - Use CSS custom properties for theming

### Debugging

- **Console Logging**: SQL statements are logged to console
- **Browser DevTools**: Use for debugging JavaScript
- **Network Tab**: Check for CDN resource loading
- **Application Tab**: Inspect localStorage for theme preference

## 🔧 Troubleshooting

### Common Issues

#### 1. **Modal doesn't open**
- **Cause**: JavaScript error or missing event handler
- **Solution**: Check browser console for errors, ensure `main.js` is loaded

#### 2. **Seats not updating after booking**
- **Cause**: State not refreshing
- **Solution**: Check that `renderMovies()` is called after booking

#### 3. **Theme not persisting**
- **Cause**: localStorage disabled or cleared
- **Solution**: Enable localStorage in browser settings

#### 4. **SQL statements not appearing**
- **Cause**: Console not open or filtered
- **Solution**: Open browser console (F12) and check Console tab

#### 5. **Seats appear booked when they shouldn't**
- **Cause**: `BOOKED_SEATS_SIM` Set persists in memory
- **Solution**: Refresh the page to reset (bookings are session-only)

#### 6. **Styles not loading**
- **Cause**: CDN connection issue or Tailwind not loading
- **Solution**: Check internet connection, verify CDN links in HTML

#### 7. **Seat grid not displaying**
- **Cause**: Capacity exceeds grid size or JavaScript error
- **Solution**: Check `capacity` values in data.js, ensure they don't exceed `SEAT_ROWS × SEATS_PER_ROW`

### Performance Tips

- **Large seat grids**: Consider pagination or virtualization for very large theaters
- **Many movies**: Implement lazy loading for movie cards
- **Animations**: Reduce animation duration if performance is an issue

## 🚀 Future Enhancements

### Planned Features

- [ ] **Backend Integration**: Connect to real database
- [ ] **User Authentication**: Login/registration system
- [ ] **Payment Processing**: Integration with payment gateways
- [ ] **Email Confirmations**: Send booking confirmations via email
- [ ] **Booking History**: View past bookings
- [ ] **Seat Recommendations**: Suggest best available seats
- [ ] **Multiple Theaters**: Support for multiple theater locations
- [ ] **Movie Search**: Search and filter movies
- [ ] **Reviews & Ratings**: User reviews and ratings
- [ ] **Admin Panel**: Manage movies, showtimes, and bookings

### Potential Improvements

- [ ] **PWA Support**: Make it a Progressive Web App
- [ ] **Offline Mode**: Service worker for offline functionality
- [ ] **Accessibility**: Enhanced ARIA labels and keyboard navigation
- [ ] **Internationalization**: Multi-language support
- [ ] **Print Tickets**: Generate printable ticket PDFs
- [ ] **QR Codes**: Generate QR codes for tickets
- [ ] **Real-time Sync**: WebSocket for real-time seat updates
- [ ] **Analytics**: Track booking patterns and popular movies

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**: Follow the code style and add comments
4. **Test thoroughly**: Test in multiple browsers
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**: Describe your changes clearly

### Contribution Guidelines

- Follow existing code style
- Add comments for complex logic
- Test in multiple browsers
- Update README if adding features
- Keep commits focused and descriptive

### Reporting Issues

If you find a bug or have a suggestion:

1. Check existing issues first
2. Create a new issue with:
   - Clear description
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser and OS information

## 📄 License

This project is open source and available for educational purposes. Feel free to use, modify, and distribute as needed.

---

## 📝 Notes

### Important Reminders

- **This is a simulation**: The application does not connect to a real database
- **Session-only storage**: Bookings are stored in memory and lost on page refresh
- **SQL statements**: Generated SQL is for demonstration and should be validated before use in production
- **No data persistence**: All data resets when the page is refreshed
- **Mock data**: Movie data is hardcoded in `data.js`

### Educational Purpose

This project is designed to demonstrate:
- Database management concepts
- SQL statement generation
- Front-end state management
- Modern web development practices
- UI/UX design principles

### Production Considerations

Before using in production:
- Implement proper backend API
- Add input validation and sanitization
- Implement proper authentication
- Add error handling and logging
- Set up database with proper constraints
- Add payment processing
- Implement security measures (CSRF, XSS protection)
- Add rate limiting
- Set up monitoring and analytics

---

**Built with ❤️ for learning and demonstration purposes**
