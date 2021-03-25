import "./App.css";
import axios from "axios";
import Router from "./Router";
import { AuthContextProvider } from "./context/AuthContext";

axios.defaults.withCredentials = true;
function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </div>
  );
}

export default App;
