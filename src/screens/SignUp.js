// SignUp Component
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/screens/SignUp.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Grid, Box, Typography, CircularProgress } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useDispatch } from "react-redux";
import { userActions } from "../store"; // Path to your store file

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [whatsappNumber, setWhatsappnumber] = useState("");

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmpassword: "",
    whatsappNumber: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");

  const validateInput = (name, value) => {
    let error = "";
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^.{8,}$/;
    const whatsappRegex = /^\+?[\d\s\-()]{7,15}$/;

    switch (name) {
      case "fullName":
        if (!nameRegex.test(value)) error = "Invalid full name";
        break;
      case "email":
        if (!emailRegex.test(value)) error = "Invalid email";
        break;
      case "password":
        if (!passwordRegex.test(value)) error = "Invalid password";
        break;
      case "confirmpassword":
        if (value !== password) error = "Passwords do not match";
        break;
      case "whatsappNumber":
        if (!whatsappRegex.test(value)) error = "Invalid WhatsApp number";
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleSignUp = async () => {
    setIsLoading(true);
    setGlobalError("");
    try {
      const response = await axios.post("http://localhost:5000/api/user/signup", {
        fullName,
        email,
        password,
        whatsappNumber,
      });

      if (response.status === 201) {
        const userData = { ...response.data.user, role: "user" };
        localStorage.setItem("user", JSON.stringify(userData));
        dispatch(userActions.LoggedIn(userData));
        navigate("/");
      }
    } catch (error) {
      console.error("There was an error creating the account!", error);
      if (error.response && error.response.data) {
        const { error: errorMsg } = error.response.data;
        setGlobalError(errorMsg);
      } else {
        setGlobalError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <div className="signUppage">
      
      <Box className="bg-grade">
        <Container maxWidth="sm">
          <Box className="form">
            <Typography variant="h4" align="center" gutterBottom>
              Create Account
            </Typography>

            {globalError && (
              <Typography variant="body1" color="error" align="center" gutterBottom>
                {globalError}
              </Typography>
            )}

            {isLoading ? (
              <Box display="flex" justifyContent="center" my={2}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      label="Full Name"
                      className="textField"
                      fullWidth
                      onChange={(event) => setFullname(event.target.value)}
                      onBlur={(event) => validateInput("fullName", event.target.value)}
                      value={fullName}
                      error={!!errors.fullName}
                      helperText={errors.fullName}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      label="E-mail"
                      className="textField"
                      fullWidth
                      onChange={(event) => setEmail(event.target.value)}
                      onBlur={(event) => validateInput("email", event.target.value)}
                      value={email}
                      error={!!errors.email}
                      helperText={errors.email}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Password"
                      type="password"
                      autoComplete="current-password"
                      className="textField"
                      fullWidth
                      required
                      onChange={(event) => setPassword(event.target.value)}
                      onBlur={(event) => validateInput("password", event.target.value)}
                      value={password}
                      error={!!errors.password}
                      helperText={errors.password}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Confirm Password"
                      type="password"
                      autoComplete="current-password"
                      className="textField"
                      fullWidth
                      required
                      value={confirmpassword}
                      onChange={(event) => setConfirmpassword(event.target.value)}
                      onBlur={(event) => validateInput("confirmpassword", event.target.value)}
                      error={!!errors.confirmpassword}
                      helperText={errors.confirmpassword}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="WhatsApp Number"
                      type="tel"
                      className="textField"
                      fullWidth
                      required
                      value={whatsappNumber}
                      onChange={(event) => setWhatsappnumber(event.target.value)}
                      onBlur={(event) => validateInput("whatsappNumber", event.target.value)}
                      error={!!errors.whatsappNumber}
                      helperText={errors.whatsappNumber}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button variant="contained" className="SubmitButton" onClick={handleSignUp} fullWidth>
                      Sign Up
                    </Button>
                  </Grid>
                </Grid>
              </>
            )}
          </Box>
        </Container>
      </Box>
      
    </div>
  );
}
