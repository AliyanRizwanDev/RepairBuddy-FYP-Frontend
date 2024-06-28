// VendorSignup Component
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Container,
  Box,
  Typography,
  Grid,
  CircularProgress
} from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/screens/VendorSignup.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userActions } from "../store"; // Path to your store file

export default function VendorSignup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [type, setType] = useState("company");
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [skills, setSkills] = useState("");
  const [whatsappNumber, setWhatsappnumber] = useState("");
  const [cnic, setCnic] = useState("");

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmpassword: "",
    address: "",
    city: "",
    skills: "",
    whatsappNumber: "",
    cnic: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");

  const validateInput = (name, value) => {
    let error = "";
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^.{8,}$/; // At least 8 characters
    const whatsappRegex = /^\+?[\d\s\-()]{7,15}$/;
    const cnicRegex = /^.{8,}$/;

    switch (name) {
      case "fullName":
        if (!nameRegex.test(value)) error = "Invalid full name";
        break;
      case "email":
        if (!emailRegex.test(value)) error = "Invalid email";
        break;
      case "password":
        if (!passwordRegex.test(value)) error = "Password must be at least 8 characters long";
        break;
      case "confirmpassword":
        if (value !== password) error = "Passwords do not match";
        break;
      case "address":
        if (value.length < 5) error = "Address is too short";
        break;
      case "city":
        if (value.length < 2) error = "City is too short";
        break;
      case "skills":
        if (value.length < 3) error = "Skills are too short";
        break;
      case "whatsappNumber":
        if (!whatsappRegex.test(value)) error = "Invalid WhatsApp number";
        break;
      case "cnic":
        if (!cnicRegex.test(value)) error = "Invalid CNIC";
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setGlobalError("");

    if (
      !errors.fullName &&
      !errors.email &&
      !errors.password &&
      !errors.confirmpassword &&
      !errors.address &&
      !errors.city &&
      !errors.skills &&
      !errors.whatsappNumber &&
      !errors.cnic
    ) {
      try {
        const response = await axios.post("http://localhost:5000/api/vendor/signup", {
          fullName,
          email,
          password,
          whatsappNumber,
          address,
          city,
          skills,
          cnic,
          type,
        });

        if (response.status === 201) {
          const vendorData = { ...response.data.vendor, role: "vendor" };
          localStorage.setItem("vendor", JSON.stringify(vendorData));
          dispatch(userActions.LoggedIn(vendorData));
          navigate("/vendor-side");
        }
      } catch (error) {
        console.error("There was an error creating the vendor account!", error);
        if (error.response && error.response.data) {
          const { error: errorMsg } = error.response.data;
          setGlobalError(errorMsg);
        } else {
          setGlobalError("An unexpected error occurred. Please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      setGlobalError("Please fix the errors in the form.");
    }
  };

  return (
    <div className="VendorDetailspage">
      
      <Box className="bg-grade">
        <Container maxWidth="sm">
          <Box className="form">
            <Typography variant="h4" align="center" gutterBottom>
              Vendor Details
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
                      id="full-name"
                      label="Full Name"
                      className="textField"
                      fullWidth
                      onChange={(event) => setfullName(event.target.value)}
                      onBlur={(event) => validateInput("fullName", event.target.value)}
                      value={fullName}
                      error={!!errors.fullName}
                      helperText={errors.fullName}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      id="email"
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
                      id="password"
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
                      id="confirm-password"
                      label="Confirm Password"
                      type="password"
                      autoComplete="current-password"
                      className="textField"
                      fullWidth
                      required
                      onChange={(event) => setConfirmpassword(event.target.value)}
                      onBlur={(event) => validateInput("confirmpassword", event.target.value)}
                      value={confirmpassword}
                      error={!!errors.confirmpassword}
                      helperText={errors.confirmpassword}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl component="fieldset" style={{ marginBottom: "20px" }}>
                      <FormLabel component="legend">Type:</FormLabel>
                      <RadioGroup
                        aria-label="type"
                        name="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        style={{ display: "flex", flexDirection: "row", margin: "20px" }}
                      >
                        <FormControlLabel value="company" control={<Radio />} label="Company" style={{ marginRight: "20px" }} />
                        <FormControlLabel value="private" control={<Radio />} label="Private" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      id="address"
                      label="Address"
                      className="textField"
                      fullWidth
                      required
                      onChange={(event) => setAddress(event.target.value)}
                      onBlur={(event) => validateInput("address", event.target.value)}
                      value={address}
                      error={!!errors.address}
                      helperText={errors.address}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      id="city"
                      label="City"
                      className="textField"
                      fullWidth
                      required
                      onChange={(event) => setCity(event.target.value)}
                      onBlur={(event) => validateInput("city", event.target.value)}
                      value={city}
                      error={!!errors.city}
                      helperText={errors.city}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      id="skills"
                      label="Skills"
                      className="textField"
                      fullWidth
                      required
                      onChange={(event) => setSkills(event.target.value)}
                      onBlur={(event) => validateInput("skills", event.target.value)}
                      value={skills}
                      error={!!errors.skills}
                      helperText={errors.skills}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      id="whatsapp"
                      label="WhatsApp Number"
                      type="tel"
                      className="textField"
                      fullWidth
                      required
                      onChange={(event) => setWhatsappnumber(event.target.value)}
                      onBlur={(event) => validateInput("whatsappNumber", event.target.value)}
                      value={whatsappNumber}
                      error={!!errors.whatsappNumber}
                      helperText={errors.whatsappNumber}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      id="cnic"
                      label="CNIC"
                      type="text"
                      className="textField"
                      fullWidth
                      required
                      onChange={(event) => setCnic(event.target.value)}
                      onBlur={(event) => validateInput("cnic", event.target.value)}
                      value={cnic}
                      error={!!errors.cnic}
                      helperText={errors.cnic}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button variant="contained" className="SubmitButton" onClick={handleSubmit} fullWidth>
                      SIGN UP
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
