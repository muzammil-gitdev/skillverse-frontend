import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:1001",
  withCredentials: true, // important for session / passport
});

// ===== SIGNUP STEP 1 =====
export const signupStep1 = async (data) => {
  console.log(data);
  const res = await API.post("/signup/step1", data);
  return res.data;
};

// ===== SIGNUP COMPLETE =====
export const signupComplete = async (data) => {
  const res = await API.post("/signup/complete", data);
  return res.data;
};

// for profile detiails /profile on frontned used
const url = "http://localhost:1001/user";
export const getUserById = async (id) => {
  try {
    const res = await axios.get(`${url}/profile/${id}`);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
//used on edit page
export const updateUser = async (id, data) => {
  try {
    const res = await axios.put(`${url}/user/update/${id}`, data);
    return res.data;
  } catch (err) {
    console.log(err.message);
  }
};

//for creating new gig
export const createGig = async (data) => {
  try {
    const res = await axios.post(`http://localhost:1001/gig/create`, data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

//provide all gigs of user
export const getGigsByUser = async (userId) => {
  try {
    const res = await axios.get(`http://localhost:1001/gig/user/${userId}`);
    return res.data.gigs;
  } catch (err) {
    console.log(err);
  }
};
// used in create gig page just upload gigpic and return cloudinary link
export const uploadGigPic = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await axios.post(
    "http://localhost:1001/gig/upload-image",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data; // should return { url: "cloudinary_link" }
};
export const getGigById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:1001/gig/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};
