import React from "react";
import { styled } from "@mui/system";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const RootContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#153448", // Dark background color
});

const StyledCard = styled(Card)({
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)", // Shadow
  backgroundColor: "#333", // Card background color
  padding: "32px",
});

const ButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  marginTop: "16px",
});

const StyledButton = styled(Button)({
  margin: "0 8px",
  backgroundColor: "#948979", // Button background color
});

export default function Home() {
  return (
    <RootContainer>
      <StyledCard>
        <CardContent>
          <h1 style={{ color: "white", fontSize: "16px" }}>
            The Gateway to Success
          </h1>
          <ButtonContainer>
            <Link to="/check-serial">
              <StyledButton variant="contained" color="primary">
                Check Serial
              </StyledButton>
            </Link>
            <Link to="/add-products">
              <StyledButton variant="contained" color="secondary">
                Add Products
              </StyledButton>
            </Link>
          </ButtonContainer>
        </CardContent>
      </StyledCard>
    </RootContainer>
  );
}
