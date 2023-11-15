import { initializeApp, getApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfiguration = {
	apiKey: import.meta.env.VITE_APP_FIREBASE_APIKEY,
	authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
	measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID,
}

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfiguration)
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app)

export {
	app,
	auth,
	firestore,
	storage
}