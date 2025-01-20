import React from "react";
import DogCard from "./DogCard";
import { Box } from "@mui/material";
import { Favorite } from "@mui/icons-material";
const DogCardContainer = ({ dogs, filters, addFavoriteDogs, favoriteDogs }) => {
  const isFavorite = (dog) =>
    favoriteDogs.some((favorite) => favorite.id === dog.id);
  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(200px, 100%), 1fr))",
        gap: 8,
      }}
    >
      {dogs.map((dog) => {
        return (
          <DogCard
            key={dog.id}
            dog={dog}
            addFavoriteDogs={addFavoriteDogs}
            isFavorite={isFavorite}
          />
        );
      })}
    </Box>
  );
};

export default DogCardContainer;
