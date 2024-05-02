import React from "react";
import { styled } from "@mui/system";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";

const RootContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#153448", // Dark background color
});

const StyledCard = styled(Card)({
  backgroundColor: "#3C5B6F", // Card background color
  padding: "32px",
});

const InputContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  marginTop: "16px",
});

export default function Search() {
  return (
    <RootContainer>
      <StyledCard>
        <CardContent>
          <h1 style={{ color: "white", fontSize: "16px", textAlign: "center" }}>
            Enter Serial Number
          </h1>
          <InputContainer>
            <TextField
              label="Serial Number"
              variant="outlined"
              InputProps={{
                style: { color: "white" }, // Set text color to white
              }}
            />
          </InputContainer>
        </CardContent>
      </StyledCard>
    </RootContainer>
  );
}
