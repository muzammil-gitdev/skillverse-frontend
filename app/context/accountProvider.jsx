"use client";
import { createContext, useState, useEffect } from "react";
import { socket } from "../services/socket"; // Ensure this path is correct

export const AccountContext = createContext(null);

const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [user_id, setUserId] = useState(null);
  const [user_pic, setUserPic] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  // 1. Load user_id from localStorage on mount
  useEffect(() => {
    const storedId = localStorage.getItem("user_id");
    if (storedId) {
      setUserId(storedId);
    }
  }, []);

  // 2. Global Socket Logic: Connect and stay online across all pages
  useEffect(() => {
    if (!user_id) return;

    // Connect the socket
    socket.connect();

    // Tell the server we are online
    socket.emit("addUsers", { id: user_id });

    // Listen for the global list of online users
    socket.on("getUsers", (users) => {
      setOnlineUsers(users);
    });

    // Cleanup: disconnect when user logs out or app closes
    return () => {
      socket.off("getUsers");
      socket.disconnect();
    };
  }, [user_id]);

  return (
    <AccountContext.Provider
      value={{
        account,
        setAccount,
        user_id,
        setUserId,
        onlineUsers,
        setOnlineUsers,
        socket, // Export the socket so other components can use it
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
