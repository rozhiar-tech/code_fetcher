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
import {
  collection,
  addDoc,
  storage,
  ref,
  serverTimestamp,
  uploadBytes,
  firestore,
  getDownloadURL,
} from "../../firebase/firebaseinit";

const RootContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#153448", // Dark background color
});

const StyledCard = styled(Card)({
  backgroundColor: "#3C5B6F", // Card background color
  paddingLeft: "40px",
  paddingRight: "40px",
});

const FormContainer = styled("form")({
  display: "flex",
  flexDirection: "column",
});

const InputField = styled(TextField)({
  marginBottom: "16px",
});

const FileInput = styled("input")({
  marginBottom: "16px",
  display: "none",
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
  const [notes, setNotes] = useState("");
  const [images, setImages] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);

  const handleImageChange = (event) => {
    const files = event.target.files;
    if (files.length + images.length <= 3) {
      setImages([...images, ...files]);
    } else {
      alert("You can only add up to 3 images.");
    }
  };

  const handlePdfChange = (event) => {
    const file = event.target.files[0];
    setPdfFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Upload images to Firebase Storage
      const imageUrls = await Promise.all(
        images.map(async (image) => {
          const storageRef = ref(storage, `images/${image.name}`);
          await uploadBytes(storageRef, image);
          return getDownloadURL(storageRef);
        })
      );

      // Upload PDF file to Firebase Storage
      let pdfUrl = null;
      if (pdfFile) {
        const pdfRef = ref(storage, `pdf/${pdfFile.name}`);
        await uploadBytes(pdfRef, pdfFile);
        pdfUrl = await getDownloadURL(pdfRef);
      }

      // Save form data and file URLs to Firestore
      const docRef = await addDoc(collection(firestore, "products"), {
        serialNumber,
        discount,
        active,
        warranty,
        notes,
        images: imageUrls,
        pdfUrl,
        createdAt: serverTimestamp(),
      });

      console.log("Document written with ID: ", docRef.id);
      // Reset form fields
      setSerialNumber("");
      setDiscount("");
      setActive(false);
      setWarranty("");
      setNotes("");
      setImages([]);
      setPdfFile(null);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
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
            <InputField
              label="Notes"
              variant="outlined"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              multiline
              rows={4}
              InputProps={{ style: { color: "white" } }}
            />
            <StyledButton
              variant="contained"
              component="label"
              style={{ marginBottom: "16px" }}
            >
              Add Images
              <FileInput
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                multiple
              />
            </StyledButton>
            <StyledButton
              variant="contained"
              component="label"
              style={{ marginBottom: "16px" }}
            >
              Add PDF
              <FileInput type="file" accept=".pdf" onChange={handlePdfChange} />
            </StyledButton>
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
