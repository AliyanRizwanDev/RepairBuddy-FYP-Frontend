import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button, TextField, Container, Box, Typography, Grid, CircularProgress } from '@mui/material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/screens/Report.css";

export default function Report() {
  const [reportText, setReportText] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [globalError, setGlobalError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleReportSubmit = async () => {
    setIsLoading(true);
    setGlobalError("");
    try {
      const response = await axios.post("http://localhost:5000/api/user/report", {
        fullName,
        email,
        issue: reportText,
      });

      if (response.status === 201) {
        toast.success("Report submitted successfully");
        setFullName("");
        setEmail("");
        setReportText("");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const { error: errorMsg } = error.response.data;
        setGlobalError(errorMsg);
        toast.error(errorMsg);
      } else {
        setGlobalError("An unexpected error occurred. Please try again.");
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="reportpage">
      <ToastContainer />
      <Box className="bg-grade">
        <Container maxWidth="sm">
          <Box className="form">
            <Typography variant="h4" align="center" gutterBottom>
              REPORT
            </Typography>
            {globalError && (
              <Typography color="error" align="center" gutterBottom>
                {globalError}
              </Typography>
            )}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="fullName"
                  label="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="reportText"
                  label="Describe Issue"
                  multiline
                  rows={5}
                  value={reportText}
                  onChange={(e) => setReportText(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  className="SubmitButton"
                  fullWidth
                  onClick={handleReportSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? <CircularProgress size={24} /> : 'SUBMIT REPORT'}
                </Button>
              </Grid>
            </Grid>
            <Typography className="quote" variant="body2" align="center" gutterBottom>
              "We will get back to you via email, discuss the issue, and provide a solution."
            </Typography>
          </Box>
        </Container>
      </Box>
    </div>
  );
}
