import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Modal, Box, Typography, Button } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/screens/VendorSide.css";

export default function VendorSide() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [open, setOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/orders");
        setOrders(response.data.filter(order => order.status !== 'Pending' && order.status !== 'Completed'));
        setRequests(response.data.filter(order => order.status === 'Pending'));
      } catch (error) {
        console.error("Error fetching orders", error);
        toast.error("Error fetching orders");
      }
    };
    fetchOrders();
  }, []);

  const handleAcceptRequest = async (orderId) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/orders/${orderId}`, { status: "Accepted" });
      const updatedRequest = response.data;
      setRequests(requests.filter(order => order._id !== orderId));
      setOrders([...orders, updatedRequest]);
      setOpen(false);
      toast.success("Order accepted successfully");
    } catch (error) {
      console.error("Error accepting order", error);
      toast.error("Error accepting order");
    }
  };

  const handleUpdateStatus = async (orderId, status) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/orders/${orderId}`, { status });
      const updatedOrder = response.data;
      setOrders(orders.map(order => order._id === orderId ? updatedOrder : order));
      setOpen(false);
      toast.success(`Order status updated to ${status}`);
    } catch (error) {
      console.error("Error updating order status", error);
      toast.error("Error updating order status");
    }
  };

  const handleOpen = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          <h5>Orders and Requests</h5>
        </div>
        <div className="sidebar-links">
          <Link to="/report" className="link" style={{ padding: "10px" }}>
            <i className="fa-solid fa-bug my-2"></i> Report
          </Link>
          <Link to="/vendor-orders" className="link" style={{ padding: "10px" }}>
            <i className="fa-solid fa-triangle-exclamation my-2"></i> My Order
          </Link>
          <Link to="/settings" className="link" style={{ padding: "10px" }}>
            <i className="fa-solid fa-gear my-2"></i> Settings
          </Link>
        </div>
      </div>
      <div className="chatbot-sec2">
        <h6 className="chatbot-sec2-heading">REQUESTS</h6>
        <div className="all-jobs-section">
          {requests.length === 0 ? (
            <p>No requests available</p>
          ) : (
            requests.map((request) => (
              <div
                className="listofjobs"
                onClick={() => handleOpen(request)}
                key={request._id}
              >
                <h6>{request.issueMessage}</h6>
                <p style={{ color: "yellow" }}>{request.visitPrice} RS</p>
                <p style={{ color: "white" }}>{request.timeInHours}h</p>
              </div>
            ))
          )}
        </div>
        <h6 className="chatbot-sec2-heading">CURRENT ORDERS</h6>
        <div className="all-jobs-section">
          {orders.length === 0 ? (
            <p>No orders available</p>
          ) : (
            orders.map((order) => (
              <div
                className="listofjobs"
                onClick={() => handleOpen(order)}
                key={order._id}
              >
                <h6>{order.issueMessage}</h6>
                <p style={{ color: "yellow" }}>{order.status}</p>
              </div>
            ))
          )}
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {selectedOrder && (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Order Details
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <strong>Issue:</strong> {selectedOrder.issueMessage}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <strong>Visit Price:</strong> {selectedOrder.visitPrice} RS
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <strong>Time to Complete:</strong> {selectedOrder.timeInHours} hours
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <strong>Address:</strong> {selectedOrder.userAddress}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <strong>Status:</strong> {selectedOrder.status}
              </Typography>
              {selectedOrder.status === "Pending" && (
                <Button onClick={() => handleAcceptRequest(selectedOrder._id)} variant="contained" color="primary" sx={{ mt: 2 }}>
                  Accept Order
                </Button>
              )}
              {selectedOrder.status === "Accepted" && (
                <Button onClick={() => handleUpdateStatus(selectedOrder._id, "Visited")} variant="contained" color="primary" sx={{ mt: 2 }}>
                  Mark as Visited
                </Button>
              )}
              {selectedOrder.status === "Visited" && (
                <Button onClick={() => handleUpdateStatus(selectedOrder._id, "Completed")} variant="contained" color="primary" sx={{ mt: 2 }}>
                  Mark as Completed
                </Button>
              )}
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
