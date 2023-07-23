import React, { createContext, useEffect, useState } from "react";
import ApiServerClient from "../ApiServerClient";

export const userContext = createContext({});

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await ApiServerClient.authGet("user");
        setUser(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  return <userContext.Provider value={{ user, setUser }}>{children}</userContext.Provider>;
}
