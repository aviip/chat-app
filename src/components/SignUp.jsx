import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSignUp = async (event, email, password) => {
    event.preventDefault();
    try {
      setLoading(true);
      setError("");
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`,
      });

      console.log("User signed up:", userCredential.user);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        justifyContent: "center",
        alignItems: "center",
      }}
      onSubmit={(event) => handleSignUp(event, email, password)}
    >
      <h2>Sign Up</h2>

      <TextField
        id="first-name"
        label="First Name"
        variant="outlined"
        required
        size="small"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <TextField
        id="last-name"
        label="Last Name"
        variant="outlined"
        required
        size="small"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      <TextField
        id="email-id"
        label="Email"
        variant="outlined"
        required
        type="email"
        size="small"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        id="signup-password"
        label="Password"
        variant="outlined"
        type="password"
        required
        size="small"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button variant="contained" size="small" type="submit" disabled={loading}>
        {loading ? "Signing Up..." : "Sign Up"}
      </Button>

      {error && <p>{error}</p>}
    </Box>
  );
};

export default SignUp;
