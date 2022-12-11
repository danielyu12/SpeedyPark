import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCuAGmQyCtbRq0tEvzbUmgrkj5wxUwCCBc',
  authDomain: 'speedyparksavedlocations.firebaseapp.com',
  databaseURL: 'https://speedyparksavedlocations-default-rtdb.firebaseio.com',
  projectId: 'speedyparksavedlocations',
  storageBucket: 'speedyparksavedlocations.appspot.com',
  messagingSenderId: '562512142835',
  appId: '1:562512142835:web:e28cbca90ade44d9327286',
  measurementId: 'G-WZWKVW9Z41',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const savedLocationsCollection = collection(db, 'savedLocations');
