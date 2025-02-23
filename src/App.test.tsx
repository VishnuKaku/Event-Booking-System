// src/App.test.tsx
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import EventBooking from './App';

// Mock localStorage for testing
const localStorageMock = (function () {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('EventBooking Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders correctly', () => {
    render(<EventBooking />);
    expect(screen.getByText(/React Workshop - 10 spots left/i)).toBeInTheDocument();
    expect(screen.getByText('Book Now')).toBeInTheDocument();
  });

  it('books a slot on button click', () => {
    render(<EventBooking />);
    const bookButton = screen.getByText('Book Now');
    fireEvent.click(bookButton);
    expect(screen.getByText(/React Workshop - 9 spots left/i)).toBeInTheDocument();
    expect(screen.queryByText('No slots available.')).not.toBeInTheDocument();
  });

  it('shows waiting list option when no slots', () => {
    render(<EventBooking />);
    const bookButton = screen.getByText('Book Now');
    for (let i = 0; i < 10; i++) {
      fireEvent.click(bookButton);
    }
    fireEvent.click(bookButton);
    expect(screen.getByText('No slots available.')).toBeInTheDocument();
    expect(screen.getByText('Join Waiting List')).toBeInTheDocument();
  });

  it('resets the system', () => {
    render(<EventBooking />);
    const resetButton = screen.getByText('Reset');
    fireEvent.click(resetButton);
    expect(screen.getByText(/React Workshop - 10 spots left/i)).toBeInTheDocument();
  });
});