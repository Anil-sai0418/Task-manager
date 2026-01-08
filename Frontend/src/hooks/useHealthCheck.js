import { useEffect } from 'react';
import API_BASE_URL from '../config/api';

export function useHealthCheck() {
  useEffect(() => {
    // Silent health check to warm up backend
    const warmUpBackend = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/health`, {
          method: 'GET',
          timeout: 5000
        });
        if (response.ok) {
          // Backend is ready, silently continue
        }
      } catch {
        // Silently fail, don't affect UI
        // Backend might be starting up
      }
    };

    // Call after small delay to not interfere with initial render
    const timer = setTimeout(warmUpBackend, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return null;
}
