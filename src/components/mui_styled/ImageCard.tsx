import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import classes from "./ImageCard.module.css";
import { Collapse } from "@mui/material";

interface ImageCardProps {
  places: any;
  isChecked: boolean;
}

export default function ImageCard({ places, isChecked }: ImageCardProps) {
  return (
    <Collapse
      in={isChecked}
      {...(isChecked ? { timeout: 1000 } : {})}
    >
      <Card className={classes.root}>
        {/* sx={{ maxWidth: 345 }} */}
        <CardMedia
          component="img"
          className={classes.media}
          // height="140"
          image={places.imageUrl}
          alt="green iguana"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className={classes.title}
          >
            {places.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className={classes.description}
          >
            {places.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Collapse>
  );
}
