// src/useBookingSystem.test.ts
import { renderHook, act } from '@testing-library/react-hooks';
import { useBookingSystem } from './useBookingSystem';
import { createRoot } from 'react-dom/client';

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

describe('useBookingSystem', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // Create a wrapper to use createRoot for React 18 compatibility
  const wrapper: React.FC<React.PropsWithChildren<{}>> = ({ children }: React.PropsWithChildren<{}>) => {
    return <>{children}</>;
  };

  it('should initialize with default slots', () => {
    const { result } = renderHook(() => useBookingSystem(), { wrapper });
    expect(result.current.availableSlots).toBe(10);
  });

  it('should book a slot', () => {
    const { result } = renderHook(() => useBookingSystem(), { wrapper });
    act(() => {
      result.current.book();
    });
    expect(result.current.availableSlots).toBe(9);
    expect(result.current.bookings.length).toBe(1);
  });

  it('should join waiting list when no slots', () => {
    const { result } = renderHook(() => useBookingSystem(), { wrapper });
    act(() => {
      for (let i = 0; i < 10; i++) result.current.book();
      result.current.joinWaitingList();
    });
    expect(result.current.waitingList.length).toBe(1);
  });

  it('should cancel a booking and move waiting list', () => {
    const { result } = renderHook(() => useBookingSystem(), { wrapper });
    act(() => {
      result.current.book(); // Booking 0
      result.current.joinWaitingList(); // Waiting 1
      result.current.cancelBooking(0);
    });
    expect(result.current.availableSlots).toBe(9);
    expect(result.current.bookings.length).toBe(1); // Waiting 1 moved to bookings
    expect(result.current.waitingList.length).toBe(0);
  });
});