import React from "react";
import DogCardContainer from "../Components/DogCardContainer";
import { Typography } from "@mui/material";

const Favorites = ({ favoriteDogs, addFavoriteDogs, loginSuccessful }) => {
  return loginSuccessful ? (
    <div style={{ paddingTop: "90px" }}>
      {favoriteDogs.length > 0 ? (
        <DogCardContainer
          dogs={favoriteDogs}
          addFavoriteDogs={addFavoriteDogs}
          favoriteDogs={favoriteDogs}
        />
      ) : (
        <Typography variant="h5">You Dont Have Any Favorites</Typography>
      )}
    </div>
  ) : (
    <>Please Login</>
  );
};

export default Favorites;
