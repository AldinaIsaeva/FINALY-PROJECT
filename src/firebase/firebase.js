import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCrLRNZ4UmWwL46yxZIltqV39WYm3jpdBw",
  authDomain: "register-a6.firebaseapp.com",
  projectId: "register-a6",
  storageBucket: "register-a6.firebasestorage.app",
  messagingSenderId: "210091763267",
  appId: "1:210091763267:web:ec1eaef1c27136a3f056f6",
  measurementId: "G-Y687EH5MP0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

