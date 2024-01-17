// firebase.js
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider } from 'firebase/auth';
import { getAuth, signInWithPopup, GithubAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';
import Cookies from 'js-cookie';

const firebaseConfig = {
  apiKey: "AIzaSyBbhDnd8jkC8ia7A3fPDRJaaqqS_u0Bfmc",
  authDomain: "whatsapp2-50445.firebaseapp.com",
  projectId: "whatsapp2-50445",
  storageBucket: "whatsapp2-50445.appspot.com",
  messagingSenderId: "911516024524",
  appId: "1:911516024524:web:c8503167b7dc64e4d08c69"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const githubProvider = new GithubAuthProvider();
const googleProvider = new GoogleAuthProvider();

const signInWithGitHub = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    const user = result.user;

    // Guarda las credenciales en las cookies
    Cookies.set('user', JSON.stringify(user));

    console.log('Usuario autenticado con GitHub:', user);
    return user;
  } catch (error) {
    console.error('Error al iniciar sesión con GitHub:', error.message);
    throw error;
  }
};
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Guarda las credenciales en las cookies
    Cookies.set('user', JSON.stringify(user));

    console.log('Usuario autenticado con Google:', user);
    return user;
  } catch (error) {
    console.error('Error al iniciar sesión con Google:', error.message);
    throw error;
  }
};
const signOutGitHub = async () => {
  try {
    // Elimina las cookies al cerrar sesión
    Cookies.remove('user');
    await signOut(auth);
    console.log('Usuario cerró sesión');
  } catch (error) {
    console.error('Error al cerrar sesión:', error.message);
    throw error;
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('Usuario autenticado:', user);
  } else {
    console.log('Usuario no autenticado');
  }
});

export { auth, githubProvider, googleProvider, onAuthStateChanged, signInWithGitHub, signInWithGoogle, signOutGitHub };
