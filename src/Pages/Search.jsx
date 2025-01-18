import React, { useEffect } from "react";
import { baseUrl } from "../config";
import axios from "axios";

const Search = ({ loginSuccessful }) => {
  useEffect(() => {
    if (loginSuccessful) {
      //call the pet API
      axios
        .get(`${baseUrl}/dogs/breeds`, { withCredentials: true })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loginSuccessful]);

  return loginSuccessful ? (
    <div>Here is a place holder for search page</div>
  ) : (
    <>please login</>
  );
};

export default Search;
