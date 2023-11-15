# Chatmingle

## Firebase configuration
1. Authentication
2. Firestore Database
### Firestore collections
This app cannot provide a sign-up page. You can add the user in the manual, and after the user is added, create the `users` collection in the firestore.
#### users - field
```
email: example@gmail.com
username: example
quickPlay: ""
uid: "6rPmsY7VNFOvvS9FhXs9umWxMHv1",
```
Create the user in the authentication section, and after the user is added, you will receive the uid.
- You can sign out and redirect to another website immediately using this icon `🚀`. And the redirection URL will take a quickAction field 

### Firestore Rules
```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read: if request.auth != null && resource.data.uid == request.auth.uid;
      allow write, delete, update : if false;
    }
    
    match /messages/{uid} {
    	allow read: if request.auth != null;
      allow update: if request.auth != null && resource.data.uid == request.auth.uid;
      allow write : if request.auth != null;
    	allow delete: if false;
    }
  }
}
```
### .env
```
VITE_APP_FIREBASE_APIKEY="AIzaSyAksaBPlcMDz5bKkcNe7rKEWSOujXJXwjsM"
VITE_APP_FIREBASE_AUTH_DOMAIN="chatmingle.firebaseapp.com"
VITE_APP_FIREBASE_PROJECT_ID="chatmingle"
VITE_APP_FIREBASE_STORAGE_BUCKET="chatmingle.appspotgit.com"
VITE_APP_FIREBASE_MESSAGING_SENDER_ID="296771847854"
VITE_APP_FIREBASE_APP_ID="1:287661947954:web:78cebde1626c2ca84e902b"
VITE_APP_FIREBASE_MEASUREMENT_ID="G-OPMZ6LYLHP"
```
