import { Platform } from 'react-native';

export const BASE_URL =
  Platform.OS === 'web'
    ? 'http://localhost:3000'
    : process.env.EXPO_PUBLIC_LOCAL_IPV4;
