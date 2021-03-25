import React, { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
const Register = () => {
  const [user, setuser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const registerData = {
        name: user.name,
        email: user.email,
        phone: user.phoneNumber,
        password: user.password,
        confirmPassword: user.confirmPassword,
      };

      await axios.post("http://localhost:5000/auth", registerData);
      getLoggedIn();
      history.push("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <h1>Register a new account</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="user name"
          value={user.name}
          onChange={(event) => setuser({ ...user, name: event.target.value })}
        />
        <input
          type="email"
          placeholder="user email"
          value={user.email}
          onChange={(event) => setuser({ ...user, email: event.target.value })}
        />
        <input
          type="number"
          placeholder="user phonenumber"
          value={user.phoneNumber}
          onChange={(event) =>
            setuser({ ...user, phoneNumber: event.target.value })
          }
        />
        <input
          type="password"
          placeholder="password"
          value={user.password}
          onChange={(event) =>
            setuser({ ...user, password: event.target.value })
          }
        />
        <input
          type="password"
          placeholder="confirm password"
          value={user.confirmPassword}
          onChange={(event) =>
            setuser({ ...user, confirmPassword: event.target.value })
          }
        />
        <input type="submit" value="REGISTER" />
      </form>
    </div>
  );
};

export default Register;
