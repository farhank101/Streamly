/**
 * Platform-specific storage service selector
 * Automatically chooses between SQLite (native) and localStorage (web) implementations
 */

import { Platform } from 'react-native';

// Use dynamic imports to avoid loading SQLite on web
let storageService: any;

if (Platform.OS === 'web') {
  // Use web implementation
  storageService = require('./storage.web').default;
} else {
  // Use native SQLite implementation
  storageService = require('./storage').default;
}

export default storageService;