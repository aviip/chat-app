import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { useAuth } from "./context/AuthContext";
import {
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AuthenticatedContent from "./components/AuthenticatedContent";

const theme = createTheme();

const AuthForms = () => {
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <Box component="div" style={{ textAlign: "center" }}>
      {showSignIn ? (
        <>
          <SignIn />
          <p className="text-center">
            {`Don't have an account?`}{" "}
            <Button onClick={() => setShowSignIn(false)}>Sign Up</Button>
          </p>
        </>
      ) : (
        <>
          <SignUp />
          <p className="text-center">
            Already have an account?{" "}
            <Button onClick={() => setShowSignIn(true)}>Sign In</Button>
          </p>
        </>
      )}
    </Box>
  );
};

function App() {
  const { user } = useAuth();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="md">
        <Routes>
          {user && <Route path="/chat" element={<AuthenticatedContent />} />}
          <Route path="/" element={<AuthForms />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
