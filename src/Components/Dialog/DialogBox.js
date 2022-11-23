import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import BasicDateTimePicker from "../../Components/Datepicker";

const DialogBox = (props) => {
  const { isDialogClose, isDialogOpen, handleClose, handleConfirmation } = props;

  return (
    <>
      <Dialog open={isDialogOpen} onClose={isDialogClose} maxWidth="lg">
        <DialogTitle>Schedule Job Start or Stop</DialogTitle>
        <DialogContent>
            <BasicDateTimePicker />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirmation}>Schedule Job</Button>
        </DialogActions>
      </Dialog>
      </>
  );
};

export default DialogBox;
