import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// Attach token from localStorage if present
api.interceptors.request.use((config) => {
  try {
    const user =
      JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(localStorage.getItem("vendor")) ||
      JSON.parse(localStorage.getItem("admin"));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
  } catch (e) {
    // ignore
  }
  // debug: show outgoing request (helps trace signin issues)
  try {
    // eslint-disable-next-line no-console
    console.debug(
      "[api] Request:",
      config.method?.toUpperCase(),
      config.url,
      config.data ? JSON.parse(JSON.stringify(config.data)) : undefined,
    );
  } catch (e) {}
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    try {
      // eslint-disable-next-line no-console
      console.debug(
        "[api] Response error:",
        error?.response?.status,
        error?.config?.url,
        error?.response?.data,
      );
    } catch (e) {}
    if (error.response && error.response.status === 401) {
      try {
        localStorage.removeItem("user");
        localStorage.removeItem("vendor");
        localStorage.removeItem("admin");
        window.location.href = "/sign-in";
      } catch (e) {}
    }

    // If there is no response at all (network error / backend down), provide demo fallback for common GET endpoints
    if (!error.response && error.config && error.config.method === "get") {
      const url = error.config.url || "";
      return import("../demo/demoData.json")
        .then((demo) => {
          // simple routing for demo data
          if (url.includes("/api/vendor")) {
            return { data: demo.vendors };
          }
          if (url.includes("/api/chats") || url.includes("/api/chat")) {
            return { data: demo.chats };
          }
          if (
            url.includes("/api/categories") ||
            url.includes("/api/category")
          ) {
            return { data: demo.categories };
          }
          if (url.includes("/api/orders")) {
            // synthesize simple orders from demo vendors
            const orders = demo.vendors.map((v, i) => ({
              _id: `demo-order-${i}`,
              vendor: v._id || `v${i + 1}`,
              issueMessage: "Demo issue",
              visitPrice: v.visitPrice || 0,
              timeInHours: 1,
              userAddress: v.address || "Demo address",
              status: "Pending",
            }));
            return { data: orders };
          }
          // default fallback - return empty array
          return { data: [] };
        })
        .catch(() => Promise.reject(error));
    }

    return Promise.reject(error);
  },
);

export default api;
