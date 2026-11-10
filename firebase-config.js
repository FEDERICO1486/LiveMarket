
export const firebaseConfig = {
  apiKey: "INSERISCI_LA_TUA_API_KEY",
  authDomain: "livemarket-8f866.firebaseapp.com",
  projectId: "livemarket-8f866",
  storageBucket: "livemarket-8f866.firebasestorage.app",
  messagingSenderId: "988167271488",
  appId: "1:988167271488:web:d46eeee975aef8d3abdba5"
};

export const firebaseReady =
  !firebaseConfig.apiKey.startsWith("INSERISCI_");
