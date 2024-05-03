import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase/firebaseinit";
import { styled } from "@mui/system";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";

const RootContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  backgroundColor: "#153448", // Dark background color
});

const StyledCard = styled(Card)({
  width: "80%",
  height: "100%",
  marginTop: "20px",
});

const ImageContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "20px",
});

const StyledImage = styled("img")({
  maxWidth: "100%",
  maxHeight: "100px",
  cursor: "pointer",
  marginRight: "10px",
});
const StyledTimeline = styled(Timeline)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "10px",
});

const StyledTimelineItem = styled(TimelineItem)(({ theme }) => ({
  width: "50px", // Adjust the width of TimelineItem
  [theme.breakpoints.down("sm")]: {
    width: "30px", // Adjust width for smaller screens
  },
}));

export default function Result() {
  const [searchResult, setSearchResult] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const serialNumber = queryParams.get("serialNumber");

  useEffect(() => {
    const fetchData = async () => {
      const q = query(
        collection(firestore, "products"),
        where("serialNumber", "==", serialNumber)
      );
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setSearchResult(data);
    };

    if (serialNumber) {
      fetchData();
    }
  }, [serialNumber]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <RootContainer>
      {searchResult.map((result, index) => (
        <StyledCard key={index}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Serial Number : {result.serialNumber}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Item Images
            </Typography>
            <ImageContainer>
              {result.images &&
                result.images.map((image, idx) => (
                  <StyledImage
                    key={idx}
                    src={image}
                    alt={`Image ${idx}`}
                    onClick={() => handleImageClick(image)}
                  />
                ))}
            </ImageContainer>
            <Typography
              marginTop={6}
              marginBottom={6}
              variant="body1"
              gutterBottom
            >
              Notes: {result.notes}
            </Typography>
            {result.pdfUrl && (
              <Button
                variant="contained"
                color="primary"
                href={result.pdfUrl}
                target="_blank"
                download
              >
                Download PDF
              </Button>
            )}

            {/* Milestones */}
            <Typography variant="h6" gutterBottom style={{ marginTop: "10px" }}>
              Warranty Milestones:
            </Typography>
            <StyledTimeline position="alternate">
              {result.activeDate &&
                result.warranty &&
                Array.from(Array(result.warranty).keys()).map((month) => {
                  const milestoneDate = new Date(result.activeDate.toDate());
                  milestoneDate.setMonth(milestoneDate.getMonth() + month);

                  return (
                    <StyledTimelineItem key={month}>
                      <TimelineOppositeContent color="text.secondary">
                        Month {month + 1}
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineDot
                          sx={{
                            width: "10px", // Adjust the size of TimelineDot
                            height: "10px", // Adjust the size of TimelineDot
                            backgroundColor:
                              new Date() >= milestoneDate ? "blue" : "grey", // Compare with current date
                          }}
                        />
                        {month !== result.warranty - 1 && <TimelineConnector />}
                      </TimelineSeparator>
                    </StyledTimelineItem>
                  );
                })}
            </StyledTimeline>
          </CardContent>
        </StyledCard>
      ))}
      <Dialog open={Boolean(selectedImage)} onClose={handleCloseModal}>
        <DialogTitle>Image</DialogTitle>
        <DialogContent>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Full size"
              style={{ maxWidth: "100%" }}
            />
          )}
        </DialogContent>
      </Dialog>
    </RootContainer>
  );
}
