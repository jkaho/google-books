import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PopupMessage from "../PopupMessage";
// import Card from "@material-ui/core/Card";
// import { CardActionArea, CardActions, CardContent, CardMedia, Typography, Button, Grid } from "@material-ui/core";
import API from "../../utils/API";
import "./style.css";

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
  const [disabledButton, setDisabledButton] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

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
      .then(() => setPopupOpen(true))
      .catch(err => console.log(err));
    
    setDisabledButton(true);
  };

  // Format author array 
  const renderAuthors = (authors) => {
    if (authors.length < 1) {
      return "Unknown author(s)";
    } else if (authors.length === 1) {
      return `By ${authors[0]}`;
    } else if (authors.length === 2) {
      return `By ${authors[0]} & ${authors[1]}`;
    } else {
      let authorStr = "By ";
      for (let i = 0; i < authors.length; i++) {
        if (i < authors.length - 2) {
          authorStr += `${authors[i]}, `;
        } else if (i === authors.length - 2) {
          authorStr += `${authors[i]} `;
        } else {
          authorStr += `& ${authors[i]}`;
        }
      }
      return authorStr;
    }
  };

  // Handle close for popup message
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setPopupOpen(false);
  };


  return (
    <div className="book-card">
      <div className="book-thumbnail">
        <div className="book-shadow">
          <img src={props.img} alt={props.imgAlt}></img>
        </div>
        <button className="view-book-btn"><a href={props.link} target="_blank" rel="noreferrer noopener">View on Google</a></button>
      </div>
      <div className="book-content">
        <div className="book-content-heading">
          <div className="heading-col1">
            <h4>{props.title}</h4>
          </div>
          <div className="heading-col2">
            <div className="book-actions">
              {window.location.href === "http://localhost:3000/saved" ?
                <div><button className="remove-book-btn" onClick={() => props.onClick(props.id)}>Remove</button></div>
                : 
                <div>
                  <button className="save-book-btn"
                    onClick={handleSaveButtonClick}
                    disabled={props.saved ? true
                      : disabledButton ? true 
                      : false
                    }
                  >
                    {props.saved ? "Saved"
                    : disabledButton ? "Saved"
                    : "Save"}
                  </button>
                </div>
              }
            </div>
          </div>
        </div>
        <div className="book-content-authors">
          {renderAuthors(props.authors)}
        </div>
        <div className="book-content-description">
          {props.description}
        </div>
      </div>
      <PopupMessage
        severity="success"
        message={`"${props.title}" successfully saved!`}
        open={popupOpen}
        handleClose={handleClose}
      />
    </div>
    // <Card
    //   variant="outlined"
    //   width="500px"
    //   className={classes.root}
    // >
    //     <CardContent>
    //       <Typography variant="h5">
    //         {props.title}
    //       </Typography>
    //       <Typography variant="subtitle1">
    //         By&nbsp;
    //         {props.authors ? props.authors.map(author => (
    //           author 
    //           )) : "Anonymous"
    //         }
    //       </Typography>
    //       <Typography variant="body1">
    //         {props.description}
    //       </Typography>
    //     </CardContent>
    //     <CardMedia
    //       component="img"
    //       alt={props.imgAlt}
    //       image={props.img}
    //       className={classes.image}
    //     />
    //   <CardActions>
        // {window.location.href === "http://localhost:3000/" ?
        //   <div>
        //     <Button variant="contained"><a href={props.link} target="_blank" rel="noreferrer noopener">View</a></Button>
        //     <Button
        //       variant="contained"
        //       onClick={handleSaveButtonClick}
        //       disabled={props.saved ? true : false}
        //     >
        //       Save
        //     </Button>
        //   </div>
        //   : <div><Button variant="contained" onClick={() => props.onClick(props.id)}>Remove</Button></div>
        // }

    //   </CardActions>
    // </Card>
  )
}