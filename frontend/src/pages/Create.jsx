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


const Create = () => {
  const {id} =useParams()
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [errorMsg,setError]=useState("");
  const [loading, setLoading] = useState(false);



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
      name: "",
      des: "",
      pic_uri: "",
      price:"",
      color: "",
      category:""
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      des: Yup.string().required("Required"),
      pic_uri: Yup.string().required("Required"),
      price: Yup.number().required("Required"),
      color: Yup.string().required("Required"),
      category: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      };
      const response = await fetch(`http://localhost:8080/api/product/create_products`, option);
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
            {errorMsg?errorMsg: (`${message} create the new painting product`)}
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
                placeholder="Painting name"
                value={formik.values.name }
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
                placeholder="Painting description" 
                value={formik.values.des}
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
                placeholder="Painting image"
                value={formik.values.pic_uri}
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
                placeholder="Painting price"
                value={formik.values.price }
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
                placeholder="Painting color"
                value={formik.values.color }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.color && Boolean(formik.errors.color)}
                helperText={formik.touched.color && formik.errors.color}
              />
            <TextField
                sx={{
                  width: "90%",
                  marginTop: 1,
                }}
                variant="standard"
                id="category"
                name="category"
                label="category"
                placeholder="Painting category"
                value={formik.values.category }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.category && Boolean(formik.errors.category)}
                helperText={formik.touched.category && formik.errors.category}
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
                Create  Painting
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

export default Create;
