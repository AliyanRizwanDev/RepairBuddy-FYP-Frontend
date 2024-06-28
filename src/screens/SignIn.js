import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/screens/SignIn.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { FormControl, FormControlLabel, FormLabel, RadioGroup, Radio } from "@mui/material";
import axios from "axios";
import { Container, Box, Typography, Grid, CircularProgress } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useDispatch } from "react-redux";
import { userActions } from "../store"; // Path to your store file
import { toast } from "react-toastify";

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [type, setType] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");

  const handleSignIn = async () => {
    setIsLoading(true);
    setGlobalError("");

    const endpointMap = {
      user: "user",
      vendor: "vendor",
      admin: "admin",
    };

    const endpoint = endpointMap[type];

    try {
      const response = await axios.post(`http://localhost:5000/api/${endpoint}/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        let addlocal = response.data.user;

        addlocal = {...addlocal, role:endpoint}
        localStorage.setItem(endpoint, JSON.stringify(addlocal));
        dispatch(userActions.LoggedIn(response.data.user));
        toast.success("Logged In");
        navigate("/");
      }
    } catch (error) {
      console.error("There was an error logging in!", error);
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
    <div className="signInPage">
      
      <Box className="bg-grade">
        <Container maxWidth="sm">
          <Box className="form">
            <Typography variant="h4" align="center" gutterBottom>
              LOG IN
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
                      label="E-mail"
                      className="textField"
                      fullWidth
                      onChange={(event) => setEmail(event.target.value)}
                      value={email}
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
                      value={password}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl component="fieldset" style={{ marginBottom: "20px" }}>
                      <FormLabel component="legend">Type (required) :</FormLabel>
                      <RadioGroup
                        aria-label="type"
                        name="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        style={{ display: "flex", flexDirection: "row" }}
                      >
                        <FormControlLabel value="user" control={<Radio />} label="User" />
                        <FormControlLabel value="vendor" control={<Radio />} label="Vendor" />
                        <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} className="createandforget">
                    <Link to="/sign-up">
                      <Typography variant="body2">Create an account</Typography>
                    </Link>
                    <Link to="/forgot">
                      <Typography variant="body2">Forgot Password</Typography>
                    </Link>
                  </Grid>

                  <Grid item xs={12}>
                    <Button variant="contained" className="SubmitButton" onClick={handleSignIn} fullWidth>
                      Sign In
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
