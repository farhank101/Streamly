/**
 * Player Hook
 * Custom hook for accessing player functionality
 */

import { usePlayer as usePlayerContext } from "../context/PlayerContext";

// Re-export the hook from the context for easier imports
export const usePlayer = usePlayerContext;

export default usePlayer;
