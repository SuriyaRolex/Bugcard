import React from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { closeDialog } from "./redux/slices/dialog";

const useStyles = makeStyles((theme) => ({
  dialog: {
    '& .MuiDialogActions-root': {
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        '& .MuiButtonBase-root': {
          width: '80%',
          '&:not(:first-child)': {
            marginTop: '10px'
          }
        },
      },
    }
  },
  title: {
    textAlign: 'center'
  },
  dialogActions: {
    padding: '0px 24px 16px 24px'
  }
}));

export const AppDialog = (props) => {

  const classes = useStyles();
  const dispatch = useDispatch();

  const { open, title, body, hideNegativeBtn, hidePositiveBtn,
    negativeBtn, positiveBtn, onOk } = useSelector((state) => state.dialog);

  const cancelDialog = () => { dispatch(closeDialog()) }

  return <>
    {props.children}
    <Dialog open={open} onClose={cancelDialog} classes={{ paper: classes.dialog }}>
      {/* Dialog Title */}
      <DialogTitle className={classes.title}>{title}</DialogTitle>

      {/* Dialog Content */}
      {body && <DialogContent><DialogContentText>{body}</DialogContentText></DialogContent>}

      {/* Ḍialog Action Button */}
      <DialogActions className={classes.dialogActions}>
        {!Boolean(hideNegativeBtn) && <Button onClick={cancelDialog} color="primary" variant="outlined">
          {negativeBtn}
        </Button>}
        {!Boolean(hidePositiveBtn) && <Button onClick={onOk} color="primary" variant="contained">
          {positiveBtn}
        </Button>}
      </DialogActions>
    </Dialog>
  </>
}

