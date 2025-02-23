// src/useBookingSystem.ts
import { useState, useEffect } from 'react';

// Define the shape of a booking or waiting list entry
type BookingEntry = { id: number; timestamp: number };

// Define the overall state structure
interface BookingState {
  nextId: number;
  availableSlots: number;
  bookings: BookingEntry[];
  waitingList: BookingEntry[];
}

const LOCAL_STORAGE_KEY = 'bookingSystem';

export const useBookingSystem = () => {
  // Initialize state from localStorage or defaults
  const [state, setState] = useState<BookingState>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
    const totalSlots = parseInt(process.env.REACT_APP_TOTAL_SLOTS || '10');
    return {
      nextId: 0,
      availableSlots: totalSlots,
      bookings: [],
      waitingList: [],
    };
  });

  // Persist state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Book a slot if available
  const book = () => {
    if (state.availableSlots > 0) {
      const newBooking = { id: state.nextId, timestamp: Date.now() };
      setState(prev => ({
        ...prev,
        nextId: prev.nextId + 1,
        availableSlots: prev.availableSlots - 1,
        bookings: [...prev.bookings, newBooking],
      }));
    }
  };

  // Join the waiting list
  const joinWaitingList = () => {
    const newEntry = { id: state.nextId, timestamp: Date.now() };
    setState(prev => ({
      ...prev,
      nextId: prev.nextId + 1,
      waitingList: [...prev.waitingList, newEntry],
    }));
  };

  // Cancel a booking and handle waiting list
  const cancelBooking = (id: number) => {
    setState(prev => {
      const bookingIndex = prev.bookings.findIndex(b => b.id === id);
      if (bookingIndex === -1) return prev; // Booking not found
      const newBookings = prev.bookings.filter(b => b.id !== id);
      let newAvailableSlots = prev.availableSlots + 1;
      let newWaitingList = prev.waitingList;

      // If waiting list exists, move the first entry to bookings
      if (prev.waitingList.length > 0) {
        const [firstWaiting, ...restWaiting] = prev.waitingList;
        newBookings.push(firstWaiting);
        newAvailableSlots -= 1;
        newWaitingList = restWaiting;
      }

      return {
        ...prev,
        availableSlots: newAvailableSlots,
        bookings: newBookings,
        waitingList: newWaitingList,
      };
    });
  };

  // Reset the system to initial state
  const reset = () => {
    const totalSlots = parseInt(process.env.REACT_APP_TOTAL_SLOTS || '10');
    setState({
      nextId: 0,
      availableSlots: totalSlots,
      bookings: [],
      waitingList: [],
    });
  };

  // Expose state and functions
  return {
    availableSlots: state.availableSlots,
    bookings: state.bookings,
    waitingList: state.waitingList,
    book,
    joinWaitingList,
    cancelBooking,
    reset,
  };
};