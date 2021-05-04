import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function PopupMessage(props) {
  const classes = useStyles();

  return (
  <Snackbar open={props.open} onClose={props.handleClose} autoHideDuration={4000} >
    <Alert onClose={props.handleClose} severity={props.severity}>
      {props.message}
    </Alert>
  </Snackbar>
  // Severities: success, error, warning, info
  );
}
