import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  Button,
  Link,
  Typography,
  Input,
  InputAdornment,
  InputLabel,
  FormControl,
  ImageList,
  ImageListItem,
  FormHelperText,
} from "@mui/material/";
import { useFormik } from "formik";
import * as Yup from "yup";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [error,setError]=useState("");
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async(values) => {
      const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      };
      const result=await fetch(`http://localhost:8080/api/user/login`, option)
      const res= await result.json();
      if(!result.ok){
        setError(res.err)
      }else{
        localStorage.setItem("username",res.username)
        localStorage.setItem("account",res.account)
        handleDirect("/home")
      }
    },
  });
  const handleDirect = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Grid container>
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
            Welcome Back
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            {/* Username Input */}
            <FormControl
              sx={{ width: "90%" }}
              variant="standard"
              error={formik.touched.username && Boolean(formik.errors.username)}
            >
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                id="username"
                type={"username"}
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                endAdornment={<InputAdornment position="end"></InputAdornment>}
              />
              <FormHelperText>
                {formik.touched.username && formik.errors.username}
              </FormHelperText>
            </FormControl>
            {/* Password Input */}
            <FormControl
              sx={{ width: "90%" }}
              variant="standard"
              error={formik.touched.password && Boolean(formik.errors.password)}
            >
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    {/* Password Visibility Toggle */}
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText>
                {formik.touched.password && formik.errors.password}
              </FormHelperText>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              sx={{
                marginTop: "20px",
                display: { xs: "block" },
                width: "90%",
              }}
            >
              Log In
            </Button>
            {error?<Typography sx={{color:"red"}}>{error}</Typography>:<></>}
          </form>
          {/* Login Button */}

          <p>
            Don't have an account?
            {/* Signup Link */}
            <Link
              underline="hover"
              onClick={() => {
                handleDirect("/signup");
              }}
              sx={{
                padding: 1,
              }}
            >
              SignUp
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
            {/* Background Image */}
            <img
              src={
                "https://univerlist.com/media/images/blog/lgit_Luxembourg_04.jpg"
              }
              alt={"london"}
              style={{ height: "102vh" }}
            />
          </ImageListItem>
        </ImageList>
      </Grid>
    </Grid>
  );
};

export default Signin;
