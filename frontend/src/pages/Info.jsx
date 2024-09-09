import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  Grid,
  Typography,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import NotFoundPage from "../components/not_found";
import AppBar from "../components/header";
import Countdown from "../components/countdown";
import LandingBar from "../components/footer";
import axios from "axios";

const Info = () => {
  const { id } = useParams(); // Get parameter from route
  const [showAlert, setShowAlert] = useState(false);
  const [respsoneName, setItemName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [itemArray, setItemArray] = useState({});
  const [loading, setLoading] = useState(false);
  const handleDirect = useNavigate();
  const account = localStorage.getItem("account");
  
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowAlert(false);
    setMessage("");
    setError("");
  }

  const handleEdit = (itemId) => {
    if (!account) {
      handleDirect("/signin");
    } else {
      const itemURL = "/edit/" +id
      handleDirect(itemURL)
    }
  };

  const handleDelete = async () => {
    // if (!account) {
    //   handleDirect("/signin");
    // } else {
      try {
        // Make an HTTP POST request to your server
       
      
        const response = await axios.delete(
          `http://localhost:8080/api/product/delete/${id}` 
        );
        console.log("Response from the server:", response.data);
        if (response.data) {
          setItemName(itemArray.name);
          setMessage("success")
          setShowAlert(true) 
          handleDirect("/home")
        }
        // Add the item to the cart in local storage
      } catch (error) {
        console.error("Error triggering the deleter action:", error) 
        setMessage("error")
        setError(error.message)
        setShowAlert(true)
        setLoading(false)
      }
    
  };
  useEffect(() => {
    setLoading(true)
    // Fetch data from the API endpoint when the component mounts

    fetch(`http://localhost:8080/api/product/item/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false)
        setItemArray(data[0]);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    itemArray?
    (<Grid container spacing={2} style={{ marginTop: "5%" }}>
      <AppBar />
      <Grid container>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Snackbar
              open={showAlert}
              autoHideDuration={4000}
              onClose={handleClose}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert
                onClose={handleClose}
                severity={message}
                sx={{ width: "100%" }}
              >
                {error ? error : `Successfully delete ${respsoneName}`} 
                {/* Set the backend error if there existed or alert Successfully bought Item_name */}
              </Alert>
            </Snackbar>
            <Grid item xs={12} md={6} lg={8}>
              <div>
                <img
                  src={itemArray.pic_uri}
                  alt={itemArray.name}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "2%",
                  }}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6} lg={4} sx={{ paddingLeft: "5px" }}>
              <Typography
                variant="h3"
                style={{ marginTop: "10%", fontWeight: "bold" }}
              >
                {itemArray.name}
                <Typography variant="h6">
                  {itemArray.des}
                </Typography>
              </Typography>

              <Box
                style={{
                  width: "100%",
                  border: "2px solid lightgrey",
                  borderRadius: "5px",
                  padding: "10px",
                  marginTop: "5%",
                }}
              >
                <Countdown saleEnd="2024-10-25T12:00:00Z" />
              </Box>

              <Box
                style={{
                  width: "100%",
                  border: "2px solid lightgrey",
                  borderRadius: "5px",
                  padding: "10px",
                  marginTop: "5%",
                }}
              >
                <div style={{ fontSize: "1.5em" }}>
                  {/* Display item price */}
                </div>
                <p style={{ fontSize: "1.2em" }}>Current Price:</p>
                <Typography variant="h3">{itemArray.price}</Typography>
                <Button
                  variant="contained"
                  onClick={handleDelete}
                  sx={{
                    backgroundColor: "red",
                    color: "white",
                    fontSize: "1.2em",
                    border: "none",
                    borderRadius: "10px",
                    marginTop: "1em",
                  }}
                >
                  Delete this item
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    handleEdit(itemArray.id);
                  }}
                  sx={{
                    backgroundColor: "grey",
                    color: "white",
                    fontSize: "1.2em",
                    border: "none",
                    borderRadius: "10px",
                    marginTop: "1em",
                  }}
                >
                  Edit item
                </Button>
              </Box>
            </Grid>
          </>
        )}
      </Grid>
      <Grid item xs={12}>
        <LandingBar />
      </Grid>
    </Grid>)
    :
    (<><NotFoundPage/></>)
  );
};

export default Info;
