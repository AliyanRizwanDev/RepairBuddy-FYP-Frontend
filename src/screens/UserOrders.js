import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/screens/UserOrders.css";

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const storeData = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/orders?user=${storeData._id}`);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders", error);
        toast.error("Error fetching orders");
      }
    };
    fetchOrders();
  }, [storeData._id]);

  const handleRateOrder = async (orderId, rating) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${orderId}`, { rating });
      setOrders(orders.map(order => order._id === orderId ? { ...order, rating } : order));
      toast.success("Order rated successfully");
    } catch (error) {
      console.error("Error rating order", error);
      toast.error("Error rating order");
    }
  };

  return (
    <div className="vendor-page">
      <ToastContainer />
      <div className="chatbot-sec1">
        <div className="chatbot-sec1-title">
          <h5>User Dashboard</h5>
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
          <Link style={{padding:"10px"}} to="/vendors" className="link"><i className="fa-solid fa-people-group"></i> Vendor List</Link>

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
              <p>Vendor: {order.vendor.fullName}</p>
              <p>Address: {order.userAddress}</p>
              {order.status === "Completed" && !order.rating && (
                <div>
                  <label>Rate the Service: </label>
                  <input type="number" max="5" min="1" onChange={(e) => handleRateOrder(order._id, e.target.value)} />
                </div>
              )}
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
