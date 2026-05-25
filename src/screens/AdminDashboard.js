import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/screens/AdminDashboard.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [orders, setOrders] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [reports, setReports] = useState([]);
  const [activeSection, setActiveSection] = useState("users");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, vendorsRes, ordersRes, feedbackRes, reportsRes] =
          await Promise.all([
            api.get("/api/admin/users"),
            api.get("/api/admin/vendors"),
            api.get("/api/orders"),
            api.get("/api/admin/feedback"),
            api.get("/api/admin/reports"),
          ]);

        setUsers(usersRes.data);
        setVendors(vendorsRes.data);
        setOrders(ordersRes.data);
        setFeedback(feedbackRes.data);
        setReports(reportsRes.data);
      } catch (error) {
        console.error("Error fetching data", error);
        toast.error("Error fetching data");
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (type, id) => {
    try {
      if (type === "user") {
        await api.delete(`/api/admin/user/${id}`);
        setUsers(users.filter((user) => user._id !== id));
        toast.success("User deleted successfully");
      } else if (type === "vendor") {
        await api.delete(`/api/admin/vendor/${id}`);
        setVendors(vendors.filter((vendor) => vendor._id !== id));
        toast.success("Vendor deleted successfully");
      } else if (type === "order") {
        await api.delete(`/api/admin/order/${id}`);
        setOrders(orders.filter((order) => order._id !== id));
        toast.success("Order deleted successfully");
      } else if (type === "feedback") {
        await api.delete(`/api/admin/feedback/${id}`);
        setFeedback(feedback.filter((fb) => fb._id !== id));
        toast.success("Feedback deleted successfully");
      } else if (type === "report") {
        await api.delete(`/api/admin/report/${id}`);
        setReports(reports.filter((report) => report._id !== id));
        toast.success("Report deleted successfully");
      }
    } catch (error) {
      console.error(`Error deleting ${type}`, error);
      toast.error(`Error deleting ${type}`);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="container-custom">
        <h2>Admin Dashboard</h2>
        <div className="admin-links">
          <button onClick={() => setActiveSection("users")}>Users</button>
          <button onClick={() => setActiveSection("vendors")}>Vendors</button>
          <button onClick={() => setActiveSection("orders")}>Orders</button>
          <button onClick={() => setActiveSection("feedback")}>Feedback</button>
          <button onClick={() => setActiveSection("reports")}>Reports</button>
        </div>
        <div className="admin-section">
          {activeSection === "users" && (
            <>
              <h3>Users</h3>
              <ul>
                {users.length === 0 ? (
                  <p>No users available</p>
                ) : (
                  users.map((user) => (
                    <li key={user._id}>
                      {user.fullName} ({user.email})
                      <button onClick={() => handleDelete("user", user._id)}>
                        Delete
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </>
          )}
          {activeSection === "vendors" && (
            <>
              <h3>Vendors</h3>
              <ul>
                {vendors.length === 0 ? (
                  <p>No vendors available</p>
                ) : (
                  vendors.map((vendor) => (
                    <li key={vendor._id}>
                      {vendor.fullName} ({vendor.email})
                      <button
                        onClick={() => handleDelete("vendor", vendor._id)}
                      >
                        Delete
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </>
          )}
          {activeSection === "orders" && (
            <>
              <h3>Orders</h3>
              <ul>
                {orders.length === 0 ? (
                  <p>No orders available</p>
                ) : (
                  orders.map((order) => (
                    <li key={order._id}>
                      {order.issueMessage} - {order.status}
                      <button onClick={() => handleDelete("order", order._id)}>
                        Delete
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </>
          )}
          {activeSection === "feedback" && (
            <>
              <h3>Feedback</h3>
              <ul>
                {feedback.length === 0 ? (
                  <p>No feedback available</p>
                ) : (
                  feedback.map((fb) => (
                    <li key={fb._id}>
                      {fb.issue} - {fb.solution}
                      <button onClick={() => handleDelete("feedback", fb._id)}>
                        Delete
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </>
          )}
          {activeSection === "reports" && (
            <>
              <h3>Reports</h3>
              <ul>
                {reports.length === 0 ? (
                  <p>No reports available</p>
                ) : (
                  reports.map((report) => (
                    <li key={report._id}>
                      {report.issue} - {report.solution}
                      <button
                        onClick={() => handleDelete("report", report._id)}
                      >
                        Delete
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
