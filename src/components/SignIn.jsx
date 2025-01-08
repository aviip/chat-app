import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const data = await signInWithEmailAndPassword(auth, email, password);
      if (data.user) {
        navigate("/chat");
      }
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
      onSubmit={handleSignIn}
      sx={{ mt: 1 }}
    >
      <Typography component="h1" variant="h5">
        Sign In
      </Typography>
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

      {error && (
        <Typography color="error" align="center">
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default SignIn;
