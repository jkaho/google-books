import React from "react";
import makeStyles from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Typography, Button } from "@material-ui/core";

// const useStyles = makeStyles((theme) => {

// });

export default function BookCard(props) {
  // const classes = useStyles();

  return (
    <Card variant="outlined">
      <CardActionArea>
        <CardHeader>
          <Typography variant="h1">
            {props.title}
          </Typography><br/>
          <Typography variant="subtitle1">
            {props.author}
          </Typography>
        </CardHeader>
        <CardContent>
          <Typography variant="body1">
            {props.description}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          alt={props.imgAlt}
          height="140"
          image={props.img}
        />
      </CardActionArea>
      <CardActions>
        <Button variant="contained">View</Button>
        <Button variant="contained">Save</Button>
      </CardActions>
    </Card>
  )
}