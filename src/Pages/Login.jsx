import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import styled from "styled-components";

const LoginWrapper = styled.div`
  position: fixed; /* Fixed position to keep the modal on screen even if scrolled */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ButtonWrapper = styled.div`
  margin: auto;
`;
const StyledTextField = styled(TextField)`
  padding: 10px !important;
`;

const StyledCard = styled(Card)``;

const Login = ({ handleLogin }) => {
  const [textState, setTextState] = useState("Standard");
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
