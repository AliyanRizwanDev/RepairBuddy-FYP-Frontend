import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/screens/Vendor.css";

export default function Vendors() {
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const [currentVendor, setCurrentVendor] = useState(null);
  const [timeInHours, setTimeInHours] = useState("");
  const [issueMessage, setIssueMessage] = useState("");
  const [address, setAddress] = useState("");
  const [vendors, setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [filter, setFilter] = useState("");
  const storeData = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/vendor");
        setVendors(response.data);
        setFilteredVendors(response.data);
      } catch (error) {
        console.error("Error fetching vendors", error);
        toast.error("Error fetching vendors");
      }
    };

    fetchVendors();
  }, []);

  useEffect(() => {
    setFilteredVendors(
      vendors.filter((vendor) =>
        vendor.fullName.toLowerCase().includes(filter.toLowerCase()) ||
        vendor.skills.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter, vendors]);

  const handleVisitPriceChange = (id, price) => {
    setVendors(
      vendors.map((vendor) =>
        vendor._id === id ? { ...vendor, visitPrice: price } : vendor
      )
    );
  };

  const handleTimeInHoursChange = (hours) => {
    setTimeInHours(hours);
  };

  const handleIssueMessageChange = (message) => {
    setIssueMessage(message);
  };

  const handleAddressChange = (address) => {
    setAddress(address);
  };

  const handleOpen = (vendor) => {
    setCurrentVendor(vendor);
    setTimeInHours("");
    setIssueMessage("");
    setAddress("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    try {
      await axios.post("http://localhost:5000/api/orders", {
        userId: storeData._id,
        vendorId: currentVendor._id,
        issueMessage,
        visitPrice: currentVendor.visitPrice,
        timeInHours,
        userAddress: address,
      });
      setOpen(false);
      toast.success("Order created successfully");
    } catch (error) {
      console.error("Error creating order", error);
      toast.error("Error creating order");
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="vendor-page">
      <ToastContainer />
      <div className="chatbot-sec1">
        <div className="chatbot-sec1-title">
          <h5>Vendor List</h5>
        </div>
        <div className="sidebar-links">
          <Link to="/chatbot" className="link" style={{ padding: "10px" }}>
            <i className="fa-solid fa-people-group my-2"></i> Chatbot
          </Link>
          <Link to="/feedback" className="link" style={{ padding: "10px" }}>
            <i className="fa-regular fa-message my-2"></i> Feedback
          </Link>
          <Link to="/report" className="link" style={{ padding: "10px" }}>
            <i className="fa-solid fa-bug my-2"></i> Report
          </Link>
          <Link to="/user-orders" className="link" style={{ padding: "10px" }}>
            <i className="fa-solid fa-triangle-exclamation my-2"></i> My Order
          </Link>
          <Link to="/settings" className="link" style={{ padding: "10px" }}>
            <i className="fa-solid fa-gear my-2"></i> Settings
          </Link>
        </div>
      </div>
      <div className="chatbot-sec3">
        <TextField
          className="filter-input"
          fullWidth
          margin="normal"
          label="Filter by name or skills"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          InputProps={{
            style: { color: "white" },
          }}
          InputLabelProps={{
            style: { color: "white" },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
          }}
        />
        <div className="allvendor">
          {filteredVendors.map((item) => (
            <div className="availableVendor" key={item._id}>
              <div
                className="vendorItem"
                onClick={() =>
                  setVendors(vendors.map((vendor) =>
                    vendor._id === item._id
                      ? { ...vendor, focus: !vendor.focus }
                      : vendor
                  ))
                }
              >
                <div className="vendorsummary">
                  <div>
                    <h4>{item.fullName}</h4>
                    <p>Skills: {item.skills}</p>
                  </div>
                  <div>
                    <h4>⭐ {item.averageRating===0?5:item.averageRating}</h4>
                    <h4>🕒 {item.onTimePercentage}%</h4>
                  </div>
                </div>
              </div>
              {item.focus && (
                <div className="vendordropDown">
                  <h6 className="my-2">Type: {item.type}</h6>
                  <h6 className="my-2">Address: {item.address}</h6>
                  <h6 className="my-2">CNIC: {item.cnic}</h6>
                  <h6 className="my-2">Whatsapp: {item.whatsappNumber}</h6>
                  <h6 className="my-2">Skills: {item.skills}</h6>
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Visit Price"
                    value={item.visitPrice}
                    onChange={(e) =>
                      handleVisitPriceChange(item._id, e.target.value)
                    }
                    InputProps={{
                      style: { color: "white" },
                    }}
                    InputLabelProps={{
                      style: { color: "white" },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "white",
                        },
                        "&:hover fieldset": {
                          borderColor: "white",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "white",
                        },
                      },
                    }}
                  />
                  <button
                    className="selectButton"
                    onClick={() => handleOpen(item)}
                  >
                    Select
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Vendor: {currentVendor?.fullName}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Type: {currentVendor?.type}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Skills: {currentVendor?.skills}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Address: {currentVendor?.address}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            CNIC: {currentVendor?.cnic}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Whatsapp: {currentVendor?.whatsappNumber}
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Address"
            value={address}
            onChange={(e) => handleAddressChange(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Time To Complete Task (Hours)"
            value={timeInHours}
            onChange={(e) => handleTimeInHoursChange(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Issue Message"
            value={issueMessage}
            onChange={(e) => handleIssueMessageChange(e.target.value)}
          />
          <Button onClick={handleConfirm} variant="contained" color="primary">
            Confirm
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
