import axios from "axios";

const BASE_URL = "http://localhost:1001";
const orderUrl = `${BASE_URL}/orders`;

/**
 * 1. CREATE A NEW STRIPE SESSION
 * This sends order details to the backend and receives the Stripe Checkout URL.
 */
export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${orderUrl}/`, orderData);
    return response.data; // This will contain { success: true, url: "stripe_url_here" }
  } catch (error) {
    console.error(
      "Error initiating order/checkout:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

/**
 * 2. CONFIRM AND SAVE ORDER
 * This is called by your success page after the user returns from Stripe.
 * It sends the session_id to the backend to finally save the order in MongoDB.
 */
export const confirmOrder = async (sessionId) => {
  try {
    const response = await axios.post(`${orderUrl}/confirm`, {
      session_id: sessionId,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error confirming order:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

/**
 * 3. GET BUYER ORDERS
 * Fetches all gigs purchased by a specific user.
 */
export const getBuyerOrders = async (buyerId) => {
  try {
    const response = await axios.get(`${orderUrl}/buyer`, {
      params: { buyerId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching buyer orders:", error.message);
    throw error;
  }
};

/**
 * 4. GET SELLER ORDERS (Sales)
 * Fetches all gigs sold by a specific user.
 */
export const getSellerOrders = async (sellerId) => {
  try {
    const response = await axios.get(`${orderUrl}/seller`, {
      params: { sellerId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching seller orders:", error.message);
    throw error;
  }
};

/**
 * 5. UPDATE ORDER STATUS
 * Used by sellers to mark orders as 'delivered' or 'completed'.
 */
export const updateOrderStatus = async (orderId, statusObj) => {
  try {
    const response = await axios.patch(
      `${orderUrl}/${orderId}/status`,
      statusObj,
    );
    return response.data;
  } catch (error) {
    console.error("Error updating order status:", error.message);
    throw error;
  }
};
