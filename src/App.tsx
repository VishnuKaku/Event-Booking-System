// src/App.tsx
import React, { useState } from 'react';
import { useBookingSystem } from './useBookingSystem';

const EventBooking: React.FC = () => {
  const {
    availableSlots,
    bookings,
    waitingList,
    book,
    joinWaitingList,
    cancelBooking,
    reset,
  } = useBookingSystem();

  const [showJoinWaitingList, setShowJoinWaitingList] = useState(false);

  const handleBook = () => {
    if (availableSlots > 0) {
      book();
      setShowJoinWaitingList(false);
    } else {
      setShowJoinWaitingList(true);
    }
  };

  const handleJoinWaitingList = () => {
    joinWaitingList();
    setShowJoinWaitingList(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Event Header */}
      <h1 className="event-header">
        React Workshop - {availableSlots} spots left
      </h1>

      {/* Book Now Button */}
      <button
        onClick={handleBook}
        className="btn btn-primary"
      >
        Book Now
      </button>

      {/* Waiting List Option */}
      {showJoinWaitingList && (
        <div className="error-message">
          <p>No slots available.</p>
          <button
            onClick={handleJoinWaitingList}
            className="btn btn-warning mt-2"
          >
            Join Waiting List
          </button>
        </div>
      )}

      {/* Confirmed Bookings */}
      <h2 className="text-xl font-semibold mb-2">Confirmed Bookings</h2>
      <ul className="booking-list">
        {bookings.map(booking => (
          <li
            key={booking.id}
            className="booking-item"
          >
            <span>
              {booking.id} - {new Date(booking.timestamp).toLocaleString()}
            </span>
            <button
              onClick={() => cancelBooking(booking.id)}
              className="btn btn-danger cancel-btn"
            >
              Cancel
            </button>
          </li>
        ))}
      </ul>

      {/* Waiting List */}
      <h2 className="text-xl font-semibold mb-2">Waiting List</h2>
      <ul className="booking-list">
        {waitingList.map(entry => (
          <li key={entry.id} className="booking-item">
            {entry.id} - {new Date(entry.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>

      {/* Reset Button */}
      <button
        onClick={reset}
        className="btn btn-neutral"
      >
        Reset
      </button>
    </div>
  );
};

export default EventBooking;