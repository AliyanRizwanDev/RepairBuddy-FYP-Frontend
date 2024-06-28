import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/screens/VendorOrders.css";

export default function VendorOrders() {
  const [orders, setOrders] = useState([]);
  const storeData = JSON.parse(localStorage.getItem("vendor"));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/orders?vendor=${storeData._id}`);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders", error);
        toast.error("Error fetching orders");
      }
    };
    fetchOrders();
  }, [storeData._id]);

  return (
    <div className="vendor-page">
      <ToastContainer />
      <div className="chatbot-sec1">
        <div className="chatbot-sec1-title">
          <h5>Vendor Dashboard</h5>
        </div>
        <div className="sidebar-links">
          <Link to="/" className="link" style={{ padding: "10px" }}>
            <i className="fa-solid fa-home my-2"></i> Home
          </Link>
          <Link to="/feedback" className="link" style={{ padding: "10px" }}>
            <i className="fa-regular fa-message my-2"></i> Feedback
          </Link>
          <Link to="/report" className="link" style={{ padding: "10px" }}>
            <i className="fa-solid fa-bug my-2"></i> Report
          </Link>

          <Link to="/settings" className="link" style={{ padding: "10px" }}>
            <i className="fa-solid fa-gear my-2"></i> Settings
          </Link>
        </div>
      </div>
      <div className="orders-sec">
        <h5>My Orders</h5>
        {orders.length === 0 ? (
          <p>No orders available</p>
        ) : (
          orders.map(order => (
            <div className="order-item" key={order._id}>
              <h6>{order.issueMessage}</h6>
              <p>Status: {order.status}</p>
              <p>Customer: {order.user.fullName}</p>
              <p>Address: {order.userAddress}</p>
              {order.status === "Completed" && order.rating && (
                <p>Rating: {order.rating}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
