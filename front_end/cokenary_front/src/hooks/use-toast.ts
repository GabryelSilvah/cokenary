
import { useState, useEffect } from "react";

// Define toast types
export type ToastProps = {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
};

export type ToastActionElement = React.ReactElement<{
  onAction: () => void;
}>;

// Create a global singleton instance for toast management
type ToastContextType = {
  toasts: ToastProps[];
  toast: (props: Omit<ToastProps, "id">) => string;
  dismissToast: (id: string) => void;
  updateToast: (id: string, props: Partial<ToastProps>) => void;
};

let toasts: ToastProps[] = [];
let listeners: Function[] = [];

// Function to notify all listeners of changes
const notifyListeners = () => {
  listeners.forEach(listener => listener([...toasts]));
};

// Global toast functions
export const toast = (props: Omit<ToastProps, "id">): string => {
  const id = Math.random().toString(36).substring(2, 9);
  toasts = [...toasts, { id, ...props }];
  notifyListeners();
  
  // Auto-dismiss after 5 seconds
  setTimeout(() => {
    dismissToast(id);
  }, 5000);
  
  return id;
};

export const dismissToast = (id: string): void => {
  toasts = toasts.filter(t => t.id !== id);
  notifyListeners();
};

export const updateToast = (id: string, props: Partial<ToastProps>): void => {
  toasts = toasts.map(t => (t.id === id ? { ...t, ...props } : t));
  notifyListeners();
};

// React hook for components to use toasts
export const useToast = (): ToastContextType => {
  const [localToasts, setLocalToasts] = useState<ToastProps[]>(toasts);

  useEffect(() => {
    // Register as a listener
    const listener = (updatedToasts: ToastProps[]) => {
      setLocalToasts(updatedToasts);
    };
    
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }, []);

  return {
    toasts: localToasts,
    toast,
    dismissToast,
    updateToast,
  };
};
