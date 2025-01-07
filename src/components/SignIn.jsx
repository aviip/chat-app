import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Box, Button, TextField } from "@mui/material";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const data = await signInWithEmailAndPassword(auth, email, password);
      console.log("data:", data);
    } catch (error) {
      setError("Failed to sign in");
      console.error(error);
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
      onSubmit={handleSignIn}
    >
      <h2 className="text-2xl font-bold">Sign In</h2>
      <TextField
        id="email"
        label="Email"
        variant="outlined"
        type="email"
        value={email}
        size="small"
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <TextField
        id="signin-password"
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        size="small"
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <Button variant="contained" size="small" type="submit" disabled={loading}>
        {loading ? "Signing In..." : "Sign In"}
      </Button>

      {error && <p>{error}</p>}
    </Box>
  );
};

export default SignIn;
