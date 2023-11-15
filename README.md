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
