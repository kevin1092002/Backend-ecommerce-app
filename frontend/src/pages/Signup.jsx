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
} from "@mui/material/"; // Importing necessary components and libraries
import LockPersonIcon from "@mui/icons-material/LockPerson";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup"; // Import Yup for form validation

const Signup = () => {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [errorMsg,setError]=useState("");

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
    initialValues: {
      username: "",
      password: "",
      repassword: "",
      email: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
      repassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
      email: Yup.string().required("Required").email("Invalid email address"),
    }),
    onSubmit: async (values) => {
      const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      };
      const response = await fetch(`http://localhost:8080/api/user/signUp`, option);
      if (!response.ok) {
        const error = await response.json();
        console.error("Error sign up:", error);
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
            {errorMsg?errorMsg: (`${message} sign up`)}
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
              Exploring the Digital World
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              {/* Username field */}
              <TextField
                sx={{
                  width: "90%",
                }}
                variant="standard"
                id="username"
                name="username"
                label="Username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
              {/* Password field */}
              <TextField
                sx={{
                  width: "90%",
                  marginTop: 1,
                }}
                variant="standard"
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              {/* Re-enter password field */}
              <TextField
                sx={{
                  width: "90%",
                  marginTop: 1,
                }}
                variant="standard"
                id="repassword"
                name="repassword"
                label="Retype Password"
                type="password"
                value={formik.values.repassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.repassword && Boolean(formik.errors.repassword)
                }
                helperText={
                  formik.touched.repassword && formik.errors.repassword
                }
              />
              <TextField
                sx={{
                  width: "90%",
                  marginTop: 1,
                }}
                variant="standard"
                id="email"
                name="email"
                label="Email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
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
                Let's explore
              </Button>
            </form>

            {/* Submit button */}

            <p>
              Already an user?
              {/* Login link */}
              <Link
                underline="hover"
                onClick={() => {
                  handleDirect("/signin");
                }}
                sx={{
                  padding: 1,
                }}
              >
                LogIn
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

export default Signup;
