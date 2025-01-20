import React, { useState } from "react";
import styled from "styled-components";
import { CardContent, CardActions, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";

import backgroundImage from "../assets/dogs.jpg";

const LoginWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const StyledCard = styled(Card)`
  padding: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
`;

const StyledTextField = styled(TextField)`
  margin: 10px 0 !important;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Login = ({ handleLogin }) => {
  const [user, setUser] = useState({ name: "", email: "" });

  return (
    <LoginWrapper>
      <StyledCard sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Login
          </Typography>
          <StyledTextField
            id="outlined-basic"
            label="Name"
            defaultValue=""
            onChange={(event) => setUser({ ...user, name: event.target.value })}
          />
          <StyledTextField
            id="outlined-basic"
            label="Email"
            defaultValue=""
            onChange={(event) =>
              setUser({ ...user, email: event.target.value })
            }
          />
        </CardContent>
        <CardActions>
          <ButtonWrapper>
            <Button
              variant="contained"
              size="small"
              onClick={() => handleLogin(user)}
            >
              Sign In
            </Button>
          </ButtonWrapper>
        </CardActions>
      </StyledCard>
    </LoginWrapper>
  );
};

export default Login;
