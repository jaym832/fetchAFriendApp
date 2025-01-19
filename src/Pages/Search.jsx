import React, { useEffect, useState } from "react";
import { baseUrl } from "../config";
import Filter from "../Components/Filter";
import DogCardContainer from "../Components/DogCardContainer";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import axios from "axios";
import {
  Button,
  Pagination,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  NativeSelect,
} from "@mui/material";

const Search = ({ loginSuccessful }) => {
  const [dogs, setDogs] = useState([]);
  const [totalDogs, setTotalDogs] = useState(0);
  const [page, setPage] = useState(0);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    breeds: [],
    minAge: "",
    maxAge: "",
    zipCodes: [],
    size: 30,
    sort: "breed:asc",
  });

  const getDogs = (appendFrom, page) => {
    const params = new URLSearchParams();

    // Add filters to query parameters dynamically
    if (filters.breeds.length)
      filters.breeds.forEach((breed) => params.append("breeds", breed));
    if (filters.zipCodes.length)
      filters.zipCodes.forEach((zip) => params.append("zipCodes", zip));
    if (filters.ageMin) params.append("ageMin", filters.ageMin);
    if (filters.ageMax) params.append("ageMax", filters.ageMax);
    if (filters.size) params.append("size", filters.size);
    if (filters.sort) params.append("sort", filters.sort);
    if (appendFrom) params.append("from", appendFrom);

    axios
      .get(`${baseUrl}/dogs/search`, {
        params,
        withCredentials: true,
      })
      .then((res) => {
        const data = res.data;
        console.log(res.data);
        setError("");
        setTotalDogs(res.data.total);
        if (res.data.total > 0) {
          setPage(page ? page : 1);
        }
        return axios.post(`${baseUrl}/dogs`, data.resultIds, {
          withCredentials: true,
        });
      })
      .then((postRes) => {
        setDogs(postRes.data);
      })
      .catch((err) => {
        console.log(err);
        setError("failed to fetch dogs:", err);
      });
  };

  useEffect(() => {
    if (loginSuccessful) {
      getDogs();
    }
  }, [loginSuccessful]);

  const handleFilter = () => {
    // console.log("payload", filters);
    setPage(1);
    getDogs();
  };

  const handlePagination = (page) => {
    let from = filters.size * (page - 1);
    getDogs(from, page);
    setPage(page);
  };

  const handleSort = (event) => {
    setFilters((prev) => ({ ...prev, sort: `breed:${event.target.value}` }));
  };

  useEffect(() => {
    getDogs();
  }, [filters.sort]);

  //map dogs
  return loginSuccessful ? (
    <Box>
      <Grid container spacing={2}>
        <Grid size={4}>
          <Filter setFilters={setFilters} handleFilter={handleFilter} />
        </Grid>
        <Grid size={8}>
          <FormControl size="medium" sx={{ width: "25%" }}>
            <NativeSelect onChange={handleSort}>
              <option value="asc">Asc</option>
              <option value="desc">Desc</option>
            </NativeSelect>
          </FormControl>
          <DogCardContainer dogs={dogs} filters={filters} />
          {totalDogs > filters.size && (
            <Pagination
              count={Math.ceil(totalDogs / filters.size)}
              showFirstButton
              showLastButton
              onChange={(event, page) => handlePagination(page)}
              page={page}
            />
          )}
        </Grid>
        {/* <Button onClick={sendPayload}>Filter</Button> */}
      </Grid>
    </Box>
  ) : (
    <>please login</>
  );
};

export default Search;
