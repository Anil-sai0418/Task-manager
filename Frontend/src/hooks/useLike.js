import { useState, useEffect } from 'react';
import API_BASE_URL from '../config/api';

export function useLike() {
  const [totalLikes, setTotalLikes] = useState(0);
  const [userLiked, setUserLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get or create session ID (same as visitor tracking)
  const getSessionId = () => {
    let sessionId = sessionStorage.getItem('tm_session_id');
    if (!sessionId) {
      sessionId = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
      sessionStorage.setItem('tm_session_id', sessionId);
    }
    return sessionId;
  };

  // Fetch total likes count
  const fetchTotalLikes = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/total-likes`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      setTotalLikes(data.totalLikes || 0);
    } catch (err) {
      console.error('[Like] Error fetching total likes:', err);
      setError(err);
    }
  };

  // Check if current user already liked
  const checkUserLike = async (sessionId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/check-user-like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      setUserLiked(data.liked);
    } catch (err) {
      console.error('[Like] Error checking user like:', err);
      setError(err);
    }
  };

  // Toggle like (called when user clicks heart)
  const toggleLike = async () => {
    try {
      const sessionId = getSessionId();
      const response = await fetch(`${API_BASE_URL}/toggle-like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      });
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const data = await response.json();
      
      // Update local state
      setUserLiked(data.liked);
      
      // Refresh total likes count
      await fetchTotalLikes();
      
      return data;
    } catch (err) {
      console.error('[Like] Error toggling like:', err);
      setError(err);
      throw err;
    }
  };

  // Initialize on component mount
  useEffect(() => {
    const initialize = async () => {
      try {
        setLoading(true);
        const sessionId = getSessionId();
        
        // Check if user already liked
        await checkUserLike(sessionId);
        
        // Fetch total likes count
        await fetchTotalLikes();
      } catch (err) {
        console.error('[Like] Error during initialization:', err);
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, []);

  return {
    totalLikes,
    userLiked,
    toggleLike,
    loading,
    error,
    refreshLikes: fetchTotalLikes
  };
}
