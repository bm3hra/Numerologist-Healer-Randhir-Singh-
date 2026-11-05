// Firebase App Configuration with environment variable support and safe defaults
export interface FirebaseConfig {
  projectId: string;
  appId: string;
  apiKey: string;
  authDomain: string;
  firestoreDatabaseId?: string;
  storageBucket: string;
  messagingSenderId: string;
  measurementId?: string;
  oAuthClientId?: string;
  recaptchaSiteKey?: string;
}

export const fallbackFirebaseConfig: FirebaseConfig = {
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'nimble-legacy-xk8sk',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:564200343562:web:cd6882dab36930d8ecb7f3',
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyBUqYr75LnB2LnZI_RTGs_x6i70YrDYhr0',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'nimble-legacy-xk8sk.firebaseapp.com',
  firestoreDatabaseId: import.meta.env.VITE_FIREBASE_DATABASE_ID || 'ai-studio-decodeyourdestin-18d6cd2d-541d-42cb-89d2-6888643ceabd',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'nimble-legacy-xk8sk.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '564200343562',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || '',
  oAuthClientId: '564200343562-327jg977aefv3sc30p47ckehvf0j55s7.apps.googleusercontent.com',
  recaptchaSiteKey: ''
};

export default fallbackFirebaseConfig;
