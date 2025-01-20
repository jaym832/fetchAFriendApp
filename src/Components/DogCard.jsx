import React from "react";
import { Typography, CardContent, CardMedia, Card } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styled from "styled-components";

const StyledCard = styled(Card)`
  position: relative;
  margin: 20px;
`;
const StyledCardContent = styled(CardContent)`
  position: absolute;
  bottom: 0;
  left: 0;
`;
const StyledIcon = styled(FavoriteIcon)`
  color: ${(props) => (props.isFavorite ? "red" : "black")};
`;
const DogCard = ({ dog, isFavorite, addFavoriteDogs }) => {
  const { name, age, breed, img, zip_code } = dog;
  return (
    <StyledCard sx={{ width: "271px" }}>
      <CardContent>
        <Typography>{name}</Typography>
        <CardMedia component={"img"} image={img} />
        <CardContent
          sx={{
            textAlign: "left",
            width: "100px",
            marginBottom: "40px",
            margin: "auto",
          }}
        >
          <Typography>Age:{age}</Typography>
          <Typography>Breed:{breed}</Typography>
          <Typography>Zipcode:{zip_code}</Typography>
        </CardContent>
      </CardContent>
      <StyledCardContent>
        <StyledIcon
          isFavorite={isFavorite(dog)}
          onClick={() => addFavoriteDogs(dog)}
        />
      </StyledCardContent>
    </StyledCard>
  );
};

export default DogCard;
