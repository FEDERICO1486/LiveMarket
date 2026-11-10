import {initializeApp} from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js';
import {getAuth,GoogleAuthProvider,signInWithPopup,signInWithRedirect,getRedirectResult,createUserWithEmailAndPassword,signInWithEmailAndPassword,sendPasswordResetEmail,signOut,onAuthStateChanged,updateProfile} from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js';
import {firebaseConfig,firebaseReady} from './firebase-config.js';
export const auth = firebaseReady ? getAuth(initializeApp(firebaseConfig)) : null;
export const configured = firebaseReady;
export function watchUser(fn){ if(!auth){fn(null);return()=>{}} return onAuthStateChanged(auth,fn); }
export async function googleLogin(){ if(!auth)throw Error('Configura prima Firebase.');const provider=new GoogleAuthProvider();try{return await signInWithPopup(auth,provider)}catch(e){if(e.code==='auth/popup-blocked')return signInWithRedirect(auth,provider);throw e} }
export async function redirectResult(){if(auth)return getRedirectResult(auth)}
export async function emailLogin(email,password){if(!auth)throw Error('Configura prima Firebase.');return signInWithEmailAndPassword(auth,email,password)}
export async function register(email,password,name){if(!auth)throw Error('Configura prima Firebase.');const result=await createUserWithEmailAndPassword(auth,email,password);if(name.trim())await updateProfile(result.user,{displayName:name.trim()});return result}
export async function resetPassword(email){if(!auth)throw Error('Configura prima Firebase.');return sendPasswordResetEmail(auth,email)}
export async function logout(){if(auth)await signOut(auth)}
export function friendlyError(e){const codes={'auth/email-already-in-use':'Email già registrata.','auth/invalid-email':'Indirizzo email non valido.','auth/weak-password':'Password troppo debole (minimo 6 caratteri).','auth/invalid-credential':'Email o password non corretti.','auth/popup-closed-by-user':'Accesso Google annullato.','auth/unauthorized-domain':'Aggiungi federico1486.github.io ai domini autorizzati di Firebase.','auth/operation-not-allowed':'Attiva il metodo di accesso nella console Firebase.','auth/network-request-failed':'Connessione non disponibile.'};return codes[e?.code]||e?.message||'Si è verificato un errore.'}
