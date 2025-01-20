import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import axios from "axios";
import { baseUrl } from "../config";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const Match = ({ favoriteDogs }) => {
  const [matchDog, setMatchDog] = useState({});
  useEffect(() => {
    if (favoriteDogs.length > 0) {
      const favroitesPayload = favoriteDogs.map((dog) => dog.id);
      axios
        .post(`${baseUrl}/dogs/match`, favroitesPayload, {
          withCredentials: true,
        })
        .then((res) => {
          return axios.post(`${baseUrl}/dogs`, [res.data.match], {
            withCredentials: true,
          });
        })
        .then((postRes) => setMatchDog(postRes.data[0]))
        .catch((err) => console.log(err));
    }
  }, []);
  return (
    <div style={{ width: "100vw" }}>
      {matchDog?.id && (
        <Box
          sx={{
            marginTop: "90px",
            display: "inline-block",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h3">
            Congratulations your match dog is....
          </Typography>
          <Card
            sx={{
              width: "400px",
              height: "auto",
              margin: "auto",
              textAlign: "left",
            }}
          >
            <CardContent>
              <Typography sx={{ textAlign: "center" }} variant="h5">
                {matchDog.name}
              </Typography>
            </CardContent>
            <CardContent>
              <CardMedia
                component="img"
                image={matchDog.img}
                alt={matchDog.name}
              />
            </CardContent>
            <CardContent
              sx={{
                width: "200px",
                marginBottom: "30px",
                margin: "auto",
              }}
            >
              <Typography>Age: {matchDog.age}</Typography>
              <Typography>Breed: {matchDog.breed}</Typography>
              <Typography>Zip Code: {matchDog.zip_code}</Typography>
            </CardContent>
          </Card>
        </Box>
      )}
    </div>
  );
};

export default Match;
