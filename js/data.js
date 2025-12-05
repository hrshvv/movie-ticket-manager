/**
 * Mock Data
 * Contains sample movie and showtime data for the application
 */

export const MOCK_MOVIES_DATA = [
    {
        title: "The Matrix",
        duration: 136,
        rating: "R",
        showtimes: [
            {
                id: "st1",
                ticketPrice: 12.50,
                capacity: 100,
                theaterName: "Theater A"
            },
            {
                id: "st2",
                ticketPrice: 12.50,
                capacity: 150,
                theaterName: "Theater B"
            },
            {
                id: "st3",
                ticketPrice: 15.00,
                capacity: 80,
                theaterName: "Theater C"
            }
        ]
    },
    {
        title: "Inception",
        duration: 148,
        rating: "PG-13",
        showtimes: [
            {
                id: "st4",
                ticketPrice: 13.75,
                capacity: 120,
                theaterName: "Theater A"
            },
            {
                id: "st5",
                ticketPrice: 13.75,
                capacity: 100,
                theaterName: "Theater B"
            },
            {
                id: "st6",
                ticketPrice: 14.50,
                capacity: 90,
                theaterName: "Theater D"
            }
        ]
    },
    {
        title: "Interstellar",
        duration: 169,
        rating: "PG-13",
        showtimes: [
            {
                id: "st7",
                ticketPrice: 14.00,
                capacity: 110,
                theaterName: "Theater C"
            },
            {
                id: "st8",
                ticketPrice: 14.00,
                capacity: 130,
                theaterName: "Theater D"
            },
            {
                id: "st9",
                ticketPrice: 16.25,
                capacity: 75,
                theaterName: "Theater A"
            }
        ]
    }
];

