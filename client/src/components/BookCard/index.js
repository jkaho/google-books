import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { CardActionArea, CardActions, CardContent, CardMedia, Typography, Button } from "@material-ui/core";
import API from "../../utils/API";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 350,
    width: "70%",
    margin: "20px auto"
  },
  header: {
    height: 50
  },
  image: {
    width: 100
  }
}));

export default function BookCard(props) {
  const classes = useStyles();

  const handleSaveButtonClick = () => {
    const book = {
      id: props.id,
      title: props.title,
      authors: props.authors,
      description: props.description,
      link: props.link,
      image: props.img
    };

    API.saveBook(book)
      .then(res => console.log(`'${props.title}' has been saved!`))
      .catch(err => console.log(err));
  };

  const handleRemoveButtonClick = () => {
    const id = props.id;

    API.removeBook(id)
      // .then(res => console.log(`'${props.title}' has been removed from your saved books.`))
      .then(res => console.log(res))
      .then(() => window.location.reload())
      // .then(() => loadSavedBooks())
      .catch(err => console.log(err))
  };

  return (
    <Card
      variant="outlined"
      width="500px"
      className={classes.root}
    >
      <CardActionArea>
        <CardContent>
          <Typography variant="h5">
            {props.title}
          </Typography>
          <Typography variant="subtitle1">
            By&nbsp;
            {props.authors ? props.authors.map(author => (
              author 
              )) : "Anonymous"
            }
          </Typography>
          <Typography variant="body1">
            {props.description}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          alt={props.imgAlt}
          image={props.img}
          className={classes.image}
        />
      </CardActionArea>
      <CardActions>
        {window.location.href === "http://localhost:3000/" ?
          <div>
            <Button variant="contained"><a href={props.link} target="_blank" rel="noreferrer noopener">View</a></Button>
            <Button variant="contained" onClick={handleSaveButtonClick}>Save</Button>
          </div>
          : <div><Button variant="contained" onClick={handleRemoveButtonClick}>Remove</Button></div>
        }

      </CardActions>
    </Card>
  )
}