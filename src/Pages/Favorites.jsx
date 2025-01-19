import React from "react";
import DogCardContainer from "../Components/DogCardContainer";

const Favorites = ({ favoriteDogs, addFavoriteDogs, loginSuccessful }) => {
  return loginSuccessful ? (
    <DogCardContainer
      dogs={favoriteDogs}
      addFavoriteDogs={addFavoriteDogs}
      favoriteDogs={favoriteDogs}
    />
  ) : (
    <>Please Login</>
  );
};

export default Favorites;
