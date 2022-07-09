import { createContext, useCallback, useEffect, useState } from "react";

export const userContext = createContext({});

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [actualImage, setActualImage] = useState(null);
  const [fav, setFav] = useState(false);
  return (
    <userContext.Provider
      value={{ user, setUser, actualImage, setActualImage, fav, setFav }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserContext;
