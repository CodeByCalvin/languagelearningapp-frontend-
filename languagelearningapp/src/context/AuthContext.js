import React, { createContext, useEffect, useState } from "react";
import ApiServerClient from "../ApiServerClient";

export const userContext = createContext({});

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await ApiServerClient.authGet("user");
      setUser(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <userContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </userContext.Provider>
  );
}
