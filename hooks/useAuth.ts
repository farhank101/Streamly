/**
 * Auth Hook
 * Custom hook for accessing authentication functionality
 */

import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

// Re-export the hook from the context for easier imports
export const useAuth = () => useContext(AuthContext);

export default useAuth;