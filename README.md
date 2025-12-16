# 💬 Chat App

A modern real-time chat application built using **Next.js**, **shadcn/ui**, and **Firebase**.  
This project focuses on clean UI, real-time messaging, and scalable frontend architecture.

---

## 🚀 Tech Stack

- Next.js (App Router)
- Firebase
  - Authentication
  - Cloud Firestore (Realtime)
- shadcn/ui
- Tailwind CSS
- TypeScript

---

## ✨ Features

- Firebase Authentication (Email / Google)
- Real-time messaging with Firestore listeners
- One-to-one and group chats
- Responsive UI
- Clean and accessible components using shadcn/ui
- Optimized with Next.js App Router

---

## 📁 Project Structure

/
─ app/ # Next.js App Router pages
─ components/ # Reusable UI components
─ lib/
 ├─ firebase.ts # Firebase configuration
 └─ utils.ts
─ hooks/ # Custom React hooks

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

yaml
Copy code

---

## 🔥 Firebase Setup

1. Create a Firebase project
2. Enable **Authentication**
   - Email/Password
   - Google (optional)
3. Create a **Cloud Firestore** database
4. Update Firestore security rules as needed

Example rules:
rules_version = '2';
service cloud.firestore {
match /databases/{database}/documents {
match /{document=**} {
allow read, write: if request.auth != null;
}
}
}

---

## 👨‍💻 Author

**Avi Patel**  
Frontend Engineer  
LinkedIn: https://linkedin.com/in/aviip

---

## 📄 License

This project is licensed under the MIT License.