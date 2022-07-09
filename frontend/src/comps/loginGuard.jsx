import { useContext, useEffect } from "react";
import { userContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const loginGuard = (Component) => {
  const Guarded = (props) => {
    const nagivate = useNavigate();
    const { user } = useContext(userContext);

    useEffect(() => {
      if (!user) {
        nagivate("/");
      }
    }, [nagivate, user]);

    if (user) {
      return <Component {...props} user={user} />;
    }
    return null;
  };
  return Guarded;
};

export default loginGuard;
