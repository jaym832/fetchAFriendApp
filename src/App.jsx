import { useState, useEffect } from "react";
import Login from "./Pages/Login";
import Search from "./Pages/Search";
import Favorites from "./Pages/Favorites";
import Match from "./Pages/Match";
import { Routes, Route, useNavigate, NavLink } from "react-router-dom";
import { baseUrl } from "./config";
import {
  AppBar,
  Container,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import "./App.css";

function App() {
  const [loginSuccessful, setLoginSuccessful] = useState(false);
  const [favoriteDogs, setFavoriteDogs] = useState([]);
  const navigate = useNavigate();

  const addFavoriteDogs = (dog) => {
    setFavoriteDogs((prevFavorites) => {
      // If the dog is in the array, remove it
      if (prevFavorites.some((favorite) => favorite.id === dog.id)) {
        return prevFavorites.filter((favorite) => favorite.id !== dog.id);
      }
      return [...prevFavorites, dog];
    });
  };

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
    <>
      {loginSuccessful && (
        <AppBar color="primary" sx={{ marginBottom: "60px" }}>
          <Container>
            <Toolbar>
              <NavLink style={{ textDecoration: "none" }} to="/search">
                <MenuItem>
                  <Typography sx={{ color: "white" }} variant="h5">
                    Search
                  </Typography>
                </MenuItem>
              </NavLink>
              <NavLink style={{ textDecoration: "none" }} to="/favorites">
                <MenuItem>
                  <Typography sx={{ color: "white" }} variant="h5">
                    Favorites
                  </Typography>
                </MenuItem>
              </NavLink>
              <NavLink style={{ textDecoration: "none" }} to="/match">
                <MenuItem>
                  <Typography sx={{ color: "white" }} variant="h5">
                    Match
                  </Typography>
                </MenuItem>
              </NavLink>
            </Toolbar>
          </Container>
        </AppBar>
      )}
      <Routes>
        <Route path="/" element={<Login handleLogin={handleLogin} />} />
        <Route
          path="/search"
          element={
            <Search
              loginSuccessful={loginSuccessful}
              addFavoriteDogs={addFavoriteDogs}
              favoriteDogs={favoriteDogs}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <Favorites
              loginSuccessful={loginSuccessful}
              addFavoriteDogs={addFavoriteDogs}
              favoriteDogs={favoriteDogs}
            />
          }
        />
        <Route path="/match" element={<Match favoriteDogs={favoriteDogs} />} />
        {/* <Route path="/shelters" element={<Shelters />} /> */}
      </Routes>
    </>
  );
}

export default App;
