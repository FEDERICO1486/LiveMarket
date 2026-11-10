import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, updateProfile } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';
import { firebaseConfig, firebaseReady } from './firebase-config.js?v=20261110b';

if (!firebaseReady) console.warn('Inserisci la vera apiKey Firebase in firebase-config.js');
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const watchUser = (callback, onError) => onAuthStateChanged(auth, callback, onError);
export const logout = () => signOut(auth);
export const loginEmail = (email, password) => signInWithEmailAndPassword(auth, email, password);
export async function registerEmail(name, email, password) {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  if (name.trim()) await updateProfile(result.user, { displayName: name.trim() });
  return result;
}
export const resetPassword = email => sendPasswordResetEmail(auth, email);
export const loginGoogle = () => signInWithPopup(auth, new GoogleAuthProvider());
export function friendlyError(error) {
  const messages = {
    'auth/network-request-failed':'Impossibile raggiungere Firebase. Controlla la connessione.',
    'auth/invalid-api-key':'Chiave Firebase non valida: controlla apiKey in firebase-config.js.',
    'auth/api-key-not-valid.-please-pass-a-valid-api-key.':'Chiave Firebase non valida: controlla apiKey in firebase-config.js.',
    'auth/operation-not-allowed':'Metodo di accesso disattivato: abilitalo in Firebase Authentication.',
    'auth/unauthorized-domain':'Dominio non autorizzato: aggiungi federico1486.github.io in Firebase Authentication.',
    'auth/popup-blocked':'Il browser ha bloccato la finestra Google. Consenti i popup.',
    'auth/popup-closed-by-user':'Accesso Google annullato.',
    'auth/account-exists-with-different-credential':'Questa email e gia associata a un altro metodo di accesso.',
    'auth/email-already-in-use':'Questa email e gia registrata.',
    'auth/invalid-email':'Indirizzo email non valido.',
    'auth/weak-password':'Password troppo debole: usa almeno 6 caratteri.',
    'auth/invalid-credential':'Email o password non corretti.',
    'auth/too-many-requests':'Troppi tentativi. Riprova piu tardi.',
    'permission-denied':'Operazione negata dalle regole Firestore.',
    'unavailable':'Servizio temporaneamente non disponibile. Riprova.'
  };
  return messages[error?.code] || `Errore: ${error?.code || error?.message || 'sconosciuto'}`;
}
