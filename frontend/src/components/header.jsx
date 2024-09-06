import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  MenuItem,
  Menu,
  CssBaseline,
  useScrollTrigger,
  Slide,
} from "@mui/material/";

import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { useState } from "react";
import { useNavigate} from "react-router-dom";

function HideOnScroll(props) {
  const { children } = props;
  return (
    <Slide appear={false} direction="down" in={!useScrollTrigger()}>
      {children}
    </Slide>
  );
}
 const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));

// Component for search bar
  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));



  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));

const AppHeader = (props) => {
  const [searchValue, setSearchValue] = useState('');
  const users=localStorage.getItem('username')
  const handleLogout=()=>{
    localStorage.clear()
    handleDirect("/")
  }
 



  const [anchorEl, setAnchorEl] = useState(null);
 

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

 
  const handleDirect = useNavigate();

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
    {users?
    <>
      <MenuItem
      onClick={() => {
        handleLogout()
      }}
    >
      Logout
    </MenuItem>
    <MenuItem
      onClick={() => {
        handleDirect('/create')
      }}
    >
      Create New Product
    </MenuItem>
    </>
    :
      <MenuItem
        onClick={() => {
          handleDirect("/signin")
        }}
      >
        Login
      </MenuItem>
    }  
    </Menu>
  );
  const account=localStorage.getItem("account")

  //component for menu elements 
  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed" color="primary">
            <Toolbar>
              <IconButton
                onClick={() => {
                  handleDirect("/home");
                }}
              >
                <Diversity2Icon sx={{ display: { md: "flex" }, mr: 1 }} />
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "#ffebee",
                    textDecoration: "none",
                  }}
                >
                  Evil
                </Typography>
              </IconButton>
              {/* this box is for spacing the search bar to the desired position */}
              <Box sx={{ flexGrow: 1 }} />
              <Search 
                onKeyDown={(e)=>{
                  if(e.key==="Enter"){
                    handleDirect(`/product/${searchValue}`)
                  }
                }}
              >  
                <SearchIconWrapper>  
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  value={searchValue}
                  onChange={(e)=>setSearchValue(e.target.value)}
                />
              </Search>
              <Box sx={{ display: { md: "flex" } }}>
                <IconButton
                  size="large"
                  edge="end"
                  color="inherit"
                  onClick={()=>{!account?
                    handleDirect("/signin"):
                    handleDirect("/cart");
                  }}
                >
                  <ShoppingCartIcon />
                </IconButton>
              </Box>
              <Box sx={{ display: { md: "flex" } }}>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
          {renderMenu}
        </Box>
      </HideOnScroll>
    </React.Fragment>
  );
};
export default AppHeader;
