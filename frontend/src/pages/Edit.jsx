import React from "react";
import {
  Grid,
  Paper,
  Avatar,
  Button,
  Link,
  Typography,
  TextField,
  ImageList,
  ImageListItem,
  Snackbar,
  Alert,
  MenuItem,
  colors,
} from "@mui/material/"; // Importing necessary components and libraries
import LockPersonIcon from "@mui/icons-material/LockPerson";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik,Field } from "formik";
import { useState,useEffect } from "react";
import * as Yup from "yup"; // Import Yup for form validation


const Edit = () => {
  const {id} =useParams()
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [errorMsg,setError]=useState("");
  const [itemArray, setItemArray] = useState({});
  const [loading, setLoading] = useState(false);

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

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setMessage("");
    setError("");
  };
  const handleDirect = useNavigate(); // Initializing the useNavigate hook for routing
  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      name: itemArray.name,
      des: itemArray.des,
      pic_uri: itemArray.pic_uri,
      price: itemArray.price,
      color: itemArray.color,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      des: Yup.string().required("Required"),
      pic_uri: Yup.string().required("Required"),
      price: Yup.number().required("Required"),
      color: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      const option = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      };
      const response = await fetch(`http://localhost:8080/api/product/edit/${id}`, option);
      if (!response.ok) {
        const error = await response.json();
        console.error("Error editing:", error);
        setOpen(true);
        setMessage("error");
        setError(error.message)
      } else {
        setOpen(true);
        setMessage("success");
        formik.resetForm()
      }
    },
  });
 

  return (
    <div>
      <Grid container>
        <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleClose}
            severity={message}
            sx={{ width: "100%" }}
          >
            {errorMsg?errorMsg: (`${message} edit the ${itemArray.name} painting`)}
          </Alert>
        </Snackbar>
        {/* Left Grid */}
        <Grid item xs={12} sm={3} lg={2}>
          <Paper
            elevation={16}
            align="start"
            sx={{ padding: "15px", height: "100vh" }}
          >
            <Avatar sx={{ backgroundColor: "#1976d2" }}>
              <LockPersonIcon />
            </Avatar>
            <Typography variant="h5" sx={{}}>
              Edit Form
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              {/* Username field */}
              <TextField
                sx={{
                  width: "90%",
                }}
                variant="standard"
                id="name"
                name="name"
                label="name"
                defaultValue="Default Value"
                value={formik.values.name ||itemArray.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.name && Boolean(formik.errors.name)
                }
                helperText={formik.touched.name && formik.errors.name}
              />
              {/* Password field */}
              <TextField
                sx={{
                  width: "90%",
                  marginTop: 1,
                }}
                variant="standard"
                id="des"
                name="des"
                label="des"   
                defaultValue="Default Value" 
                value={formik.values.des ||itemArray.des }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.des && Boolean(formik.errors.des)
                }
                helperText={formik.touched.des && formik.errors.des}
              />
              {/* Re-enter password field */}
              <TextField
                sx={{
                  width: "90%",
                  marginTop: 1,
                }}
                variant="standard"
                id="pic_uri"
                name="pic_uri"
                label="pic_uri"
                defaultValue="Default Value"
                value={formik.values.pic_uri || itemArray.pic_uri }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.pic_uri && Boolean(formik.errors.pic_uri)
                }
                helperText={
                  formik.touched.pic_uri && formik.errors.pic_uri
                }
              />
              <TextField
                sx={{
                  width: "90%",
                  marginTop: 1,
                }}
                variant="standard"
                id="price"
                name="price"
                label="price"
                type="price"
                defaultValue="Default Value"
                value={formik.values.price || itemArray.price }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
              />
            <TextField
                sx={{
                  width: "90%",
                  marginTop: 1,
                }}
                variant="standard"
                id="color"
                name="color"
                label="color"
                defaultValue="Default Value"
                value={formik.values.color || itemArray.color}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.color && Boolean(formik.errors.color)}
                helperText={formik.touched.color && formik.errors.color}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  marginTop: "20px",
                  display: { xs: "block" },
                  width: "90%",
                }}
              >
                Edit Painting
              </Button>
            </form>

            <p>
              Change your mind?
             
              <Link
                underline="hover"
                onClick={() => {
                  handleDirect(window.history.back());
                }}
                sx={{
                  padding: 1,
                }}
              >
                Go Back
              </Link>
            </p>
          </Paper>
        </Grid>

        {/* Right Grid */}
        <Grid
          item
          sm={9}
          lg={10}
          sx={{
            display: { xs: "none", sm: "block", md: "block", lg: "block" },
          }}
        >
          <ImageList cols={1} rowHeight={"100vh"}>
            <ImageListItem>
              {/* Background image */}
              <img
                src={
                  "https://images.unsplash.com/photo-1604497853190-dc84f9a3f0bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG9uZG9uJTIwc3RyZWV0fGVufDB8fDB8fHww&w=1000&q=80"
                }
                alt={"london"}
                style={{ height: "102vh" }}
              />
            </ImageListItem>
          </ImageList>
        </Grid>
      </Grid>
    </div>
  );
};

export default Edit;
