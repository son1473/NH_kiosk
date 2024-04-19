import { Box, styled } from "@mui/material";
import React from "react";
import useWindowPosition from "./hooks/useWindowPosition";
import ImageCard from "./ImageCard";
import classes from "./PlaceToVisit.module.css";
import places from "./static/places";

const Root = styled("div")(({ theme }) => ({
  minHeight: "100vh",
}));

const PlaceToVisit = () => {
  const isChecked = useWindowPosition("header");

  // return (
  //   <Root>
  //     <ImageCard />
  //   </Root>
  // );
  return (
    <Box className={classes.root} id="place-to-visit" sx={{
      flexDirection: {
      xs: 'column',
      // sm: 'column',
      // md: 'column',
      lg: 'row'
    }}}>
      <ImageCard places={places[1]} isChecked={isChecked} />
      <ImageCard places={places[0]} isChecked={isChecked} />
    </Box>
  );
};
export default PlaceToVisit;
