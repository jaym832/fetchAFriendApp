import React from "react";
import DogCard from "./DogCard";
import { Box } from "@mui/material";
const DogCardContainer = ({ dogs, filters }) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(200px, 100%), 1fr))",
        gap: 2,
      }}
    >
      {dogs.map((dog) => {
        return <DogCard key={dog.id} dog={dog} />;
      })}
    </Box>
  );
};

export default DogCardContainer;
