import axios from "axios";

export const getReviews = async (gigId) => {
  const res = await axios.get(`http://localhost:1001/reviews/${gigId}`);
  return res.data;
};

export const createReview = async (data) => {
  const res = await axios.post("http://localhost:1001/reviews", data);

  return res.data;
};
