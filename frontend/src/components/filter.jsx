import * as React from "react";
import { useState } from "react";

import {
  TextField,
  Box,
  Drawer,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterListIcon from "@mui/icons-material/FilterList";

// Filter component for applying filters to product listings
const Filter = ({ onFilterChange }) => {
  const[min,setMin]=useState(0);
  const[max,setMax]=useState(10000);
  const[category,setCategory]=useState()

  const [state, setState] = useState({
    left: false,
  });

  // Function to toggle the filter drawer open or closed
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handlePriceFilter=(min,max,e)=>{
    setMin(min)
    setMax(max)
    const filter = {
      min: min,
      max: max,
    };

    // Pass the filter to the parent component
    onFilterChange(filter);
    toggleDrawer("left", false)(e);
  }

  const handleCategoryFilter=(category,e)=>{
    setCategory(category)
    const filter = {
      category:category
    };
    onFilterChange(filter)
    toggleDrawer("left", false)(e);
  }


  // Content of the filter drawer
  const list = (anchor) => (
    <Box
      sx={{
        width: "280px",
      }}
      role="presentation"
    >
      {/* Categories Filter */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Categories</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {["Art", "Photography", "Anime"].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton   onClick={(e)=>handleCategoryFilter(text,e)}>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
      
      {/* Price Filter */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Price</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            id="min"
            label="Min"
            variant="outlined"
            sx={{ maxWidth: "100px" }}
            onChange={(e)=>setMin(e.target.value)}
          />
          <Typography variant="h6" sx={{display:"inline-block", paddingTop:"10px", fontWeight:"bold"}}>to</Typography>
          <TextField
            id="max"
            label="Max"
            variant="outlined"
            sx={{ maxWidth: "100px" }}
            onChange={(e)=>setMax(e.target.value)}
          />
          <Button variant="contained" sx={{marginTop:1,width:"90%"}} onClick={(e)=>handlePriceFilter(min,max,e)}>Apply</Button>
        </AccordionDetails>
      </Accordion>
    </Box>
  );

  return (
    <React.Fragment key={"filter"}>
      {/* Filter button to open the filter drawer */}
      <Button onClick={toggleDrawer("left", true)}>
        <FilterListIcon />
      </Button>
      
      {/* Filter drawer */}
      <Drawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
    </React.Fragment>
  );
};

export default Filter;
