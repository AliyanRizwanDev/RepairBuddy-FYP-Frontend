import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button, TextField, Container, Box, Typography, Grid } from '@mui/material';
import axios from 'axios';
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/screens/Feedback.css";

export default function Feedback() {
  const [issue, setIssue] = useState("");
  const [solution, setSolution] = useState("");
  const [globalError, setGlobalError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    setGlobalError("");
    try {
      const response = await axios.post("http://localhost:5000/api/user/feedback", {
        issue,
        solution,
      });

      if (response.status === 201) {
        toast.success("Feedback submitted successfully");
        setIssue("");
        setSolution("");
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
    <div className="feedbackpage">
      <ToastContainer />
      <Box className="bg-grade">
        <Container maxWidth="sm">
          <Box className="form">
            <Typography variant="h4" align="center" gutterBottom>
              FEEDBACK
            </Typography>

            {globalError && (
              <Typography variant="body1" color="error" align="center" gutterBottom>
                {globalError}
              </Typography>
            )}

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="outlined-textarea"
                  label="Your Issue"
                  multiline
                  className="textField"
                  rows={3}
                  fullWidth
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="outlined-textarea"
                  label="Your Solution"
                  multiline
                  className="textField"
                  rows={3}
                  fullWidth
                  value={solution}
                  onChange={(e) => setSolution(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <Button variant="contained" className="SubmitButton" fullWidth onClick={handleSubmit} disabled={isLoading}>
                  SUBMIT FEEDBACK
                </Button>
              </Grid>
            </Grid>

            <Typography className="quote" variant="body2" align="center" gutterBottom>
              "We will try to use your feedback and make things better."
            </Typography>
          </Box>
        </Container>
      </Box>
    </div>
  );
}
