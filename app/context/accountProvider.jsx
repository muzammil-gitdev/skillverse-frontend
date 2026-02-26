"use client";
import { createContext, useState, useEffect } from "react";

export const AccountContext = createContext(null);

const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [user_id, setUserId] = useState(null); // ✅ Add this
  const [user_pic, setUserPic] = useState(null);
  useEffect(() => {
    const storedId = localStorage.getItem("user_id");
    if (storedId) {
      setUserId(storedId);
    }
  }, []);

  return (
    <AccountContext.Provider
      value={{
        account,
        setAccount,
        user_id, // ✅ provide
        setUserId, // ✅ provide
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
