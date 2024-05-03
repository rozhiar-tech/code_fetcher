import React, { useState } from "react";
import { styled } from "@mui/system";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router

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
  const [serialNumber, setSerialNumber] = useState("");
  const navigate = useNavigate(); // Get the navigate function from React Router

  const handleSearch = () => {
    // Redirect to the Result page with the serial number as a query parameter
    navigate(`/result?serialNumber=${serialNumber}`);
  };

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
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <Button variant="contained" color="primary" onClick={handleSearch}>
              Search
            </Button>
          </InputContainer>
        </CardContent>
      </StyledCard>
    </RootContainer>
  );
}
