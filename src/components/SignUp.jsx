import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User signed up:", userCredential.user);
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  const handleSignIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User signed in:", userCredential.user);
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };

  return (
    <Box
      component="div"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Sign Up</h1>

      <TextField
        id="email-id"
        label="Email"
        variant="outlined"
        required
        size="small"
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        id="password"
        label="Password"
        variant="outlined"
        type="password"
        required
        size="small"
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        variant="contained"
        size="small"
        type="submit"
        onClick={() => handleSignUp(email, password)}
      >
        Submit
      </Button>
    </Box>
  );
};

export default SignUp;
