import React, { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
const Login = () => {
  const [user, setuser] = useState({
    email: "",
    password: "",
  });
  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const LoginData = {
        email: user.email,
        password: user.password,
      };

      await axios.post("http://localhost:5000/auth/login", LoginData);
      getLoggedIn();
      history.push("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <h1>Login to your account</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="user email"
          value={user.email}
          onChange={(event) => setuser({ ...user, email: event.target.value })}
        />
        <input
          type="password"
          placeholder="password"
          value={user.password}
          onChange={(event) =>
            setuser({ ...user, password: event.target.value })
          }
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
