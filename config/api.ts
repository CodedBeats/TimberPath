import { Platform } from 'react-native';

export const BASE_URL =
  Platform.OS === 'web'
    ? 'http://localhost:3000'
    : 'http://192.168.4.37:3000'; // Luca, replace this with your computer's local IP address
    // stable version
