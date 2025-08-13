/**
 * Player Hook
 * Custom hook for accessing player functionality
 */

import { useContext } from 'react';
import PlayerContext from '../context/PlayerContext';

// Re-export the hook from the context for easier imports
export const usePlayer = () => useContext(PlayerContext);

export default usePlayer;