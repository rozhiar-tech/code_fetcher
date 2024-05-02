import React, { useState } from "react";
import { styled } from "@mui/system";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel"; // Import FormControlLabel

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

const FormContainer = styled("form")({
  display: "flex",
  flexDirection: "column",
});

const InputField = styled(TextField)({
  marginBottom: "16px",
});

const ButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
});
const StyledButton = styled(Button)({
  margin: "0 8px",
  backgroundColor: "#948979", // Button background color
});

export default function Add() {
  const [serialNumber, setSerialNumber] = useState("");
  const [discount, setDiscount] = useState("");
  const [active, setActive] = useState(false);
  const [warranty, setWarranty] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
    console.log("Form submitted");
  };

  return (
    <RootContainer>
      <StyledCard>
        <CardContent>
          <h1 style={{ color: "white", fontSize: "16px", textAlign: "center" }}>
            Add Product
          </h1>
          <FormContainer onSubmit={handleSubmit}>
            <InputField
              label="Serial Number"
              variant="outlined"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              InputProps={{ style: { color: "white" } }}
            />
            <InputField
              label="Discount"
              variant="outlined"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              InputProps={{ style: { color: "white" } }}
            />
            <FormControl variant="outlined">
              <InputLabel style={{ color: "white" }}>Warranty</InputLabel>
              <Select
                value={warranty}
                onChange={(e) => setWarranty(e.target.value)}
                label="Warranty"
                style={{ color: "white" }}
              >
                <MenuItem value={1}>1 month</MenuItem>
                <MenuItem value={2}>2 months</MenuItem>
                <MenuItem value={3}>3 months</MenuItem>
                <MenuItem value={4}>4 months</MenuItem>
                <MenuItem value={5}>5 months</MenuItem>
                <MenuItem value={6}>6 months</MenuItem>
                <MenuItem value={7}>7 months</MenuItem>
                <MenuItem value={8}>8 months</MenuItem>
                <MenuItem value={9}>9 months</MenuItem>
                <MenuItem value={10}>10 months</MenuItem>
                <MenuItem value={11}>11 months</MenuItem>
                <MenuItem value={12}>1 year</MenuItem>
                <MenuItem value={24}>2 year</MenuItem>
                <MenuItem value={32}>3 year</MenuItem>
                <MenuItem value={44}>4 year</MenuItem>
                <MenuItem value={56}>5 year</MenuItem>
                <MenuItem value={68}>6 year</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Switch checked={active} onChange={() => setActive(!active)} />
              }
              label={active ? "Active" : "Not Active"}
              style={{ color: "white" }}
            />
            <ButtonContainer>
              <StyledButton
                style={{ marginTop: "15px" }}
                variant="contained"
                color="primary"
                type="submit"
              >
                Submit
              </StyledButton>
            </ButtonContainer>
          </FormContainer>
        </CardContent>
      </StyledCard>
    </RootContainer>
  );
}
