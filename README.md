# Chat Application

## Overview

This project is a real-time chat application built with React and Firebase. The application allows users to sign in, view a list of other users, select a user to chat with, and exchange messages in real time.

## Features

- User authentication with Firebase Authentication.
- Real-time database updates using Firestore.
- A user-friendly interface with Material-UI components.
- Responsive design for desktop and mobile devices.
- Secure user interactions.

## Prerequisites

1. A Firebase project set up with:
   - Authentication enabled.
   - Firestore database configured.
   - Required collections: `users` and `messages`.
2. Node.js and npm installed.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/chat-app.git
   cd chat-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `firebase.js` file in the `src` directory and configure Firebase:

   ```javascript
   import { initializeApp } from "firebase/app";
   import { getAuth } from "firebase/auth";
   import { getFirestore } from "firebase/firestore";

   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID",
   };

   const app = initializeApp(firebaseConfig);
   export const auth = getAuth(app);
   export const db = getFirestore(app);
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Application Structure

```
src/
├── components/
│   ├── AuthenticatedContent.jsx
│   ├── DisplayChat.jsx
│   ├── UserList.jsx
├── context/
│   └── AuthContext.jsx
├── firebase.js
├── App.jsx
├── index.js
```

### Key Components

1. **AuthenticatedContent**

   - Displays the main chat interface with a list of users and the chat window.

2. **DisplayChat**

   - Handles the real-time messaging interface.

3. **UserList**

   - Displays a list of other users available for chatting.

4. **AuthContext**
   - Manages user authentication state across the application.

## Firebase Collections

### Users Collection

Each document represents a user:

```json
{
  "uid": "user1Id",
  "displayName": "John Doe",
  "email": "john@example.com"
}
```

### Messages Collection

Each document represents a message:

```json
{
  "chatRoomId": "user1Id_user2Id",
  "text": "Hello!",
  "createdAt": "2025-01-08T14:13:43.378Z",
  "uid": "user1Id",
  "displayName": "John Doe"
}
```

## Future Enhancements

- Add group chat functionality.
- Implement message notifications.
- Enhance security with additional authentication options (e.g., OAuth providers).
