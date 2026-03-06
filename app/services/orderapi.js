import axios from "axios";

const BASE_URL = "http://localhost:1001";
const orderUrl = `${BASE_URL}/orders`;

// creating A NEW ORDER
export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${orderUrl}/`, orderData);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating order:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

// 2. GET BUYER ORDERS
// Usage: getBuyerOrders("user_id_here")
export const getBuyerOrders = async (buyerId) => {
  try {
    const response = await axios.get(`${orderUrl}/buyer`, {
      params: { buyerId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching buyer orders:", error.message);
  }
};

// 3. GET SELLER ORDERS (Sales)
// Usage: getSellerOrders("user_id_here")
export const getSellerOrders = async (sellerId) => {
  try {
    const response = await axios.get(`${orderUrl}/seller`, {
      params: { sellerId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching seller orders:", error.message);
  }
};

// 4. UPDATE ORDER STATUS (e.g., Deliver or Complete)
// Usage: updateOrderStatus("order_id", { status: "delivered" })
export const updateOrderStatus = async (orderId, statusObj) => {
  try {
    const response = await axios.patch(
      `${orderUrl}/${orderId}/status`,
      statusObj,
    );
    return response.data;
  } catch (error) {
    console.error("Error updating order status:", error.message);
  }
};
