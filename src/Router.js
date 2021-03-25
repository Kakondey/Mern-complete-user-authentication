import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Register from "./components/auth/Register";
import Home from "./Home";
import axios from "axios";
import Login from "./components/auth/Login";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import LogoutBtn from "./components/auth/LogoutBtn";
import Customers from "./components/customer/Customers";

axios.defaults.withCredentials = true;
const Router_ = () => {
  const { loggedIn } = useContext(AuthContext);
  return (
    <div>
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {!loggedIn && (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
            {loggedIn && (
              <>
                <li>
                  <Link to="/customer">Customer</Link>
                </li>
                <li>
                  <LogoutBtn />
                </li>
              </>
            )}
          </ul>
        </nav>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          {!loggedIn && (
            <>
              <Route path="/register" exact>
                <Register />
              </Route>
              <Route path="/login" exact>
                <Login />
              </Route>
            </>
          )}
          {loggedIn && (
            <Route path="/customer" exact>
              <Customers />
            </Route>
          )}
        </Switch>
      </Router>
    </div>
  );
};

export default Router_;
