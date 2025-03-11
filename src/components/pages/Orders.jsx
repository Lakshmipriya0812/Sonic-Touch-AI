// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { cancelOrder } from "../../api/orderApi";

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchOrders = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         console.warn("No auth token found, redirecting to login...");
//         navigate("/login");
//         return;
//       }

//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_API_URL}/api/orders`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setOrders(response.data.orders);
//       } catch (error) {
//         console.error("Error fetching orders:", error);

//         if (error.response?.status === 401) {
//           console.warn("Session expired, logging out...");
//           localStorage.removeItem("token");
//           localStorage.removeItem("user");
//           navigate("/login");
//         } else {
//           setError("Failed to fetch orders. Please try again later.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [navigate]);

//   // handle Cancel Order
//   const handleCancelOrder = async (orderId) => {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     if (!window.confirm("Are you sure you want to cancel this order?")) return;

//     try {
//       await cancelOrder(orderId, token);
//       alert("Order canceled successfully!");
//       setOrders(orders.filter((order) => order._id !== orderId));
//     } catch (error) {
//       alert("Failed to cancel order. Try again later.");
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
//       <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">
//         📜 My Orders
//       </h2>
//       {loading ? (
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
//           <p className="text-gray-600 mt-2">Fetching your orders...</p>
//         </div>
//       ) : error ? (
//         <p className="text-center text-red-500">{error}</p>
//       ) : orders.length === 0 ? (
//         <p className="text-center text-gray-600">No orders placed yet.</p>
//       ) : (
//         orders.map((order, index) => (
//           <div key={index} className="border p-4 rounded-md mb-4 shadow-sm">
//             <h3 className="text-lg font-semibold">Order ID: {order._id}</h3>
//             <p className="text-gray-600">
//               Status:{" "}
//               <span
//                 className={`font-semibold ${
//                   order.status === "Delivered"
//                     ? "text-green-600"
//                     : "text-orange-600"
//                 }`}
//               >
//                 {order.status}
//               </span>
//             </p>
//             <p className="text-gray-600">
//               Total Price:{" "}
//               <span className="text-green-600">
//                 ${order.totalPrice.toFixed(2)}
//               </span>
//             </p>

//             <h4 className="font-semibold mt-2">🛍️ Items:</h4>
//             <ul className="list-disc pl-6">
//               {order.items?.length > 0 ? (
//                 order.items.map((item, i) => (
//                   <li key={i}>
//                     {item.name} (x{item.quantity}) - ${item.price.toFixed(2)}
//                   </li>
//                 ))
//               ) : (
//                 <p className="text-gray-500">No items found.</p>
//               )}
//             </ul>

//             {/* buttom */}
//             <div className="mt-4 flex space-x-4">
//               {/* cancel order */}
//               {order.status === "Pending" && (
//                 <button
//                   className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
//                   onClick={() => handleCancelOrder(order._id)}
//                 >
//                   ❌ Cancel Order
//                 </button>
//               )}

//               {/* order details */}
//               <button
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
//                 onClick={() =>
//                   navigate(`/order/${order._id}`, {
//                     state: { orderDetails: order },
//                   })
//                 }
//               >
//                 🔍 View Details
//               </button>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default Orders;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { cancelOrder } from "../../api/orderApi";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No auth token found, redirecting to login...");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/orders`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOrders(response.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);

        if (error.response?.status === 401) {
          console.warn("Session expired, logging out...");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        } else {
          setError("Failed to fetch orders. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  // Open Modal for order cancellation
  const openCancelModal = (orderId) => {
    setSelectedOrderId(orderId);
    setIsModalOpen(true);
  };

  // Close Modal
  const closeCancelModal = () => {
    setIsModalOpen(false);
    setSelectedOrderId(null);
  };

  // Handle Order Cancellation
  const handleCancelOrder = async () => {
    if (!selectedOrderId) return;
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await cancelOrder(selectedOrderId, token);
      setOrders(orders.filter((order) => order._id !== selectedOrderId));
      closeCancelModal();
    } catch (error) {
      alert("Failed to cancel order. Try again later.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">
        📜 My Orders
      </h2>
      {loading ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
          <p className="text-gray-600 mt-2">Fetching your orders...</p>
        </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders placed yet.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="border p-4 rounded-md mb-4 shadow-sm">
            <h3 className="text-lg font-semibold">Order ID: {order._id}</h3>
            <p className="text-gray-600">
              Status:{" "}
              <span
                className={`font-semibold ${
                  order.status === "Delivered"
                    ? "text-green-600"
                    : "text-orange-600"
                }`}
              >
                {order.status}
              </span>
            </p>
            <p className="text-gray-600">
              Total Price:{" "}
              <span className="text-green-600">
                ${order.totalPrice.toFixed(2)}
              </span>
            </p>

            <h4 className="font-semibold mt-2">🛍️ Items:</h4>
            <ul className="list-disc pl-6">
              {order.items?.length > 0 ? (
                order.items.map((item, i) => (
                  <li key={i}>
                    {item.name} (x{item.quantity}) - ${item.price.toFixed(2)}
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No items found.</p>
              )}
            </ul>

            {/* Buttons */}
            <div className="mt-4 flex space-x-4">
              {/* Cancel Order Button */}
              {order.status === "Pending" && (
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                  onClick={() => openCancelModal(order._id)}
                >
                  ❌ Cancel Order
                </button>
              )}

              {/* View Order Details Button */}
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                onClick={() =>
                  navigate(`/order/${order._id}`, {
                    state: { orderDetails: order },
                  })
                }
              >
                🔍 View Details
              </button>
            </div>
          </div>
        ))
      )}

      {/* Cancel Order Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Confirm Cancellation
            </h2>
            <p className="text-center">
              Are you sure you want to cancel this order?
            </p>
            <div className="flex justify-center space-x-4 mt-6">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                onClick={closeCancelModal}
              >
                No
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
                onClick={handleCancelOrder}
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
