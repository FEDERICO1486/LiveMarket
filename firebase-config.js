// Incolla qui la configurazione WEB del tuo progetto Firebase.
// Questi valori identificano il progetto; NON inserire chiavi private o service account.
export const firebaseConfig = {
  apiKey: "INSERISCI_API_KEY_WEB",
  authDomain: "INSERISCI_PROJECT_ID.firebaseapp.com",
  projectId: "INSERISCI_PROJECT_ID",
  appId: "INSERISCI_APP_ID"
};
export const firebaseReady = !Object.values(firebaseConfig).some(v => v.includes('INSERISCI_'));
