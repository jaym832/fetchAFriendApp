import React, { useEffect, useState } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  TextField,
  Checkbox,
  ListItemText,
  Chip,
  Button,
} from "@mui/material";
import { baseUrl } from "../config";
import styled from "styled-components";
import axios from "axios";

const StyledFormControl = styled(FormControl)`
  width: 100% !important;
`;

const Filter = ({ setFilters, handleFilter }) => {
  const [allBreeds, setAllBreeds] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [zipcodes, setZipcodes] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/dogs/breeds`, { withCredentials: true })
      .then((res) => setAllBreeds(res?.data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [id]: value,
    }));
  };
  const handleSelectChange = (event) => {
    const {
      target: { value },
    } = event;
    let filteredBreeds = typeof value === "string" ? value.split(",") : value;
    setFilters((prevFilters) => ({ ...prevFilters, breeds: filteredBreeds }));
    setBreeds(filteredBreeds);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      event.preventDefault();

      if (!zipcodes.includes(inputValue.trim())) {
        setZipcodes([...zipcodes, inputValue.trim()]);
        setFilters((prevFilters) => ({
          ...prevFilters,
          zipCodes: [...zipcodes, inputValue.trim()],
        }));

        setInputValue(""); // Clear the input field
      }
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    let filterZipcodes = zipcodes.filter((zipcode) => zipcode !== tagToDelete);
    setZipcodes(filterZipcodes);
    setFilters((prevFilters) => ({
      ...prevFilters,
      zipCodes: filterZipcodes,
    }));
  };

  return (
    <Box>
      <StyledFormControl>
        <InputLabel>Breeds</InputLabel>

        <Select
          label="Breeds"
          onChange={handleSelectChange}
          id="breeds"
          multiple
          renderValue={(selected) => selected.join(", ")}
          value={breeds}
        >
          {allBreeds.map((breed) => {
            return (
              <MenuItem key={breed} value={breed}>
                <Checkbox checked={breeds.includes(breed)} />
                <ListItemText primary={breed} />
              </MenuItem>
            );
          })}
        </Select>
        <TextField
          id="ageMin"
          label="Min Age"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          id="ageMax"
          label="Max Age"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          id="zipCodes"
          label="Zipcode"
          variant="outlined"
          onChange={(e) => setInputValue(e.target.value)} // Update state on input
          onKeyDown={handleKeyDown}
          value={inputValue}
        />
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {zipcodes.map((zipcode, index) => {
            return (
              <Chip
                label={zipcode}
                key={index}
                onDelete={() => handleDeleteTag(zipcode)}
              />
            );
          })}
        </Box>
        <Button onClick={handleFilter}>Filter</Button>
      </StyledFormControl>
    </Box>
  );
};
export default Filter;
