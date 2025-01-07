import { signOut } from "firebase/auth";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { AuthProvider, useAuth } from "./context/AuthContect";
import { auth } from "./firebase";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const AuthenticatedContent = () => {
  const { user } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Failed to sign out", error);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Welcome, {user?.firstName}!</h1>
      <Button onClick={handleSignOut}>Sign Out</Button>
    </div>
  );
};

const AuthForms = () => {
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <Box component="div" style={{ textAlign: "center" }}>
      {showSignIn ? (
        <>
          <SignIn />
          <p className="text-center">
            {`Don't have an account?`}{" "}
            <Button
              onClick={() => setShowSignIn(false)}
              className="text-blue-500 hover:underline"
            >
              Sign Up
            </Button>
          </p>
        </>
      ) : (
        <>
          <SignUp />
          <p className="text-center">
            Already have an account?{" "}
            <Button
              onClick={() => setShowSignIn(true)}
              className="text-blue-500 hover:underline"
            >
              Sign In
            </Button>
          </p>
        </>
      )}
    </Box>
  );
};

function App() {
  const { user } = useAuth();

  return (
    <main className="container">
      <AuthProvider>
        {user ? <AuthenticatedContent /> : <AuthForms />}
      </AuthProvider>
    </main>
  );
}

export default App;
