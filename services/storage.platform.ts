/**
 * Platform-specific storage service selector
 * Automatically chooses between SQLite (native) and localStorage (web) implementations
 */

import { Platform } from 'react-native';

// Import both storage services
import nativeStorage from './storage';
import webStorage from './storage.web';

// Export the appropriate storage service based on platform
const storageService = Platform.OS === 'web' ? webStorage : nativeStorage;

export default storageService;