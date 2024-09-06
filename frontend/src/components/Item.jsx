import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, Grid, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";

// Component for rendering individual item cards
const ItemCard = (item) => {
  const handleDirect = useNavigate();
  console.log(item)
  const itemURL = "/info/" + item.item.id;

  return (
    <Card sx={{ maxWidth: 600, marginLeft: 1 }}>
      <CardActionArea
        onClick={() => {
          handleDirect(itemURL);
        }}
      >
        <CardMedia
          component="img"
          height="250"
          image={item.item.pic_uri}
          alt={item.item.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {item.item.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ItemCard;
