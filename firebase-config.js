import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
import { firebaseConfig } from './firebase-object';

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const savedLocationsCollection = collection(db, 'savedLocations');
