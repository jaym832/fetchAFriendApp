import React from "react";
import { Typography, CardContent, CardMedia, Card } from "@mui/material";
const DogCard = ({ dog }) => {
  const { name, age, breed, id, img, zip_code } = dog;
  return (
    <Card>
      <CardContent>
        <Typography>{name}</Typography>
        <CardMedia component={"img"} image={img} />
        <CardContent>
          <Typography>Age:{age}</Typography>
          <Typography>Breed:{breed}</Typography>
          <Typography>Zipcode:{zip_code}</Typography>
        </CardContent>
      </CardContent>
    </Card>
  );
};

export default DogCard;
