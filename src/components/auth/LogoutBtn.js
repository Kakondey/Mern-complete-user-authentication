import axios from "axios";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const LogoutBtn = () => {
  const { getLoggedIn } = useContext(AuthContext);

  const history = useHistory();

  const handleLogout = async () => {
    await axios.get("http://localhost:5000/auth/logout");
    getLoggedIn();
    history.push("/");
  };
  return <button onClick={handleLogout}>LOG OUT</button>;
};

export default LogoutBtn;
