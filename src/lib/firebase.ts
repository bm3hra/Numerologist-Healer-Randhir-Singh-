import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDocFromServer,
  collection,
  query,
  where,
  getDocs,
  setDoc,
  deleteDoc,
  updateDoc,
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import configJson from '../../firebase-applet-config.json';

// Initialize Firebase App singleton
export const firebaseApp = getApps().length === 0 ? initializeApp(configJson) : getApp();

// Target provisioned firestore database
export const db = configJson.firestoreDatabaseId
  ? getFirestore(firebaseApp, configJson.firestoreDatabaseId)
  : getFirestore(firebaseApp);

export const auth = getAuth(firebaseApp);

// Standard Google Auth Provider
export const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.setCustomParameters({ prompt: 'select_account' });

// OperationType enum conforming to skill
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Connection check on boot
export async function testConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firestore client appears offline. Please check connection and configuration.');
    }
    // Expected on initial boot if 'test/connection' doc is not written yet
    return true;
  }
}

// Runtime Admin Verification
export const PRIMARY_ADMIN_EMAIL = 'bm3hra@gmail.com';

export function isUserAdmin(user: User | null): boolean {
  if (!user) return false;
  if (user.email && user.email.toLowerCase() === PRIMARY_ADMIN_EMAIL.toLowerCase()) {
    return true;
  }
  return false;
}
