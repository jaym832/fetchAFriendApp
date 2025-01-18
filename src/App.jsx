import { useState, useEffect } from "react";
import Login from "./Pages/login";
import Search from "./Pages/Search";
import { Routes, Route, useNavigate } from "react-router-dom";
import { baseUrl } from "./config";
import axios from "axios";
import "./App.css";

function App() {
  const [loginSuccessful, setLoginSuccessful] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (loginSuccessful) {
  //     navigate("/search");
  //   }
  // }, [loginSuccessful]);

  const handleLogin = (user) => {
    axios
      .post(`${baseUrl}/auth/login`, user, { withCredentials: true })
      .then((res) => {
        console.log(res.status);
        if (res.status == 200) {
          setLoginSuccessful(true);
          navigate("/search");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Routes>
      <Route path="/" element={<Login handleLogin={handleLogin} />} />
      <Route
        path="/search"
        element={<Search loginSuccessful={loginSuccessful} />}
      />
      {/* <Route path="/favorites" element={<Favorites />} />
        <Route path="/shelters" element={<Shelters />} /> */}
    </Routes>
  );
}

export default App;
