import React from 'react'
import {ImageList,ImageListItem } from '@mui/material'

const HomeImage = (item) => {

  
  return (
    <ImageList 
    cols={1}
    rowHeight={700}
    >
      <ImageListItem>
          <img src={item.item.image} alt={item.item.value} style={{ height: 700 }}/>
      </ImageListItem>
    </ImageList>
  )
}

export default HomeImage
