import { initializeApp, cert } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import { serviceAccountKey } from '../../serviceAccountKey';
// import { getStorage as firebaseStorage } from 'firebase/storage';

initializeApp({
    credential: cert(serviceAccountKey),
    storageBucket: 'api-generator-archieve.appspot.com',
});

// const app = initializeApp(firebaseConfig, 'archieve');

export const bucket = getStorage().bucket();
