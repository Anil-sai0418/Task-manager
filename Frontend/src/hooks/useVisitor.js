import { useEffect, useState } from 'react';
import API_BASE_URL from '../config/api';

/**
 * useVisitor Hook
 * 
 * Handles visitor tracking with the following features:
 * - Generates a unique session ID per browser/device
 * - Stores session ID in sessionStorage (browser-specific, cleared on tab close)
 * - Registers visitor once per session with backend
 * - Fetches and caches total visitor count
 * - Prevents duplicate registrations
 * - Handles errors gracefully
 * 
 * Usage:
 * const { visitorCount, loading, error } = useVisitor();
 * 
 * Architecture:
 * 1. On component mount, check if sessionId exists in sessionStorage
 * 2. If not, generate a new unique sessionId using timestamp + random string
 * 3. Call /register-visitor endpoint to record the visit (only once per session)
 * 4. Call /visitor-count endpoint to get total unique visitors
 * 5. Cache results to avoid excessive API calls
 * 
 * Why sessionStorage?
 * - Cleared when tab/browser closes = new session = new visit counted
 * - Won't persist across browser restart = more accurate visitor count
 * - Prevents counting same user multiple times on page refresh
 * - Better than localStorage which would persist indefinitely
 */

const STORAGE_KEY = 'tm_session_id'; // TaskManager session ID
const VISITOR_COUNT_CACHE_KEY = 'tm_visitor_count_cache';
const CACHE_DURATION = 5 * 60 * 1000; // Cache for 5 minutes

export function useVisitor() {
  const [visitorCount, setVisitorCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Generate unique session ID
   * Format: timestamp-randomString
   * Example: 1704528000000-7k9mX2pQ
   */
  const generateSessionId = () => {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 10);
    return `${timestamp}-${randomString}`;
  };

  /**
   * Get or create session ID
   * Stored in sessionStorage so it persists only for current browser tab
   */
  const getSessionId = () => {
    try {
      // Check if sessionId already exists
      const existingSessionId = sessionStorage.getItem(STORAGE_KEY);
      
      if (existingSessionId) {
        return existingSessionId;
      }

      // Generate new session ID
      const newSessionId = generateSessionId();
      sessionStorage.setItem(STORAGE_KEY, newSessionId);
      return newSessionId;
    } catch (err) {
      console.error('[Visitor] Error managing session ID:', err);
      return generateSessionId(); // Fallback
    }
  };

  /**
   * Register visitor with backend
   * Only called once per session
   */
  const registerVisitor = async (sessionId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/register-visitor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.error('[Visitor] Error registering visitor:', err);
      throw err;
    }
  };

  /**
   * Fetch total visitor count from backend
   * Cached for 5 minutes to avoid excessive API calls
   */
  const fetchVisitorCount = async () => {
    try {
      // Check cache first
      const cached = localStorage.getItem(VISITOR_COUNT_CACHE_KEY);
      if (cached) {
        const { count, timestamp } = JSON.parse(cached);
        const cacheAge = Date.now() - timestamp;
        
        if (cacheAge < CACHE_DURATION) {
          setVisitorCount(count);
          setLoading(false);
          return count;
        }
      }

      // Fetch from API
      const response = await fetch(`${API_BASE_URL}/visitor-count`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      const count = data.totalVisitors;

      // Cache the result
      try {
        localStorage.setItem(VISITOR_COUNT_CACHE_KEY, JSON.stringify({
          count,
          timestamp: Date.now(),
        }));
      } catch (err) {
        console.warn('[Visitor] Could not cache visitor count:', err);
      }

      setVisitorCount(count);
      return count;
    } catch (err) {
      console.error('[Visitor] Error fetching visitor count:', err);
      setError(err.message);
      setVisitorCount(null);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Main effect: Run on component mount
   * 1. Get or create session ID
   * 2. Register visitor (if not already done)
   * 3. Fetch total visitor count
   */
  useEffect(() => {
    const initializeVisitorTracking = async () => {
      try {
        setLoading(true);
        setError(null);

        // Step 1: Get or create session ID
        const sessionId = getSessionId();

        // Step 2: Register this visitor session
        await registerVisitor(sessionId);

        // Step 3: Fetch and display total visitor count
        await fetchVisitorCount();
      } catch (err) {
        console.error('[Visitor] Error initializing visitor tracking:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    initializeVisitorTracking();

    // Cleanup: No need to unregister on unmount
    // The visitor session is already recorded
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    visitorCount,
    loading,
    error,
    // Expose function to manually refresh count if needed
    refreshCount: () => fetchVisitorCount(),
  };
}
