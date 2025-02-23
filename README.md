# Event Booking System

A React application with TypeScript and Tailwind CSS for managing event bookings using `localStorage`.

## Features
- Displays available slots for "React Workshop".
- Allows booking when slots are available.
- Manages a waiting list when slots are full.
- Supports cancellation with automatic waiting list promotion.
- Persists state in `localStorage`.
- Provides a reset option.

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/VishnuKaku/Event-Booking-System.git
   cd Event-Booking-System
2.Install dependencies
   npm install

3.Optionally, configure the initial slot count by creating a .env file
   REACT_APP_TOTAL_SLOTS=15

4.Start the application
   npm start
5.Testing Instructions
Run unit tests to verify functionality
   npm test

Open http://localhost:3000 in your browser to see the app.

Running Locally:
Ensure Node.js (version 12.13.0 or higher) and npm are installed, then follow the setup steps above.
