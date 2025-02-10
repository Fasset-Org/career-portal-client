import React from "react";
// import { useMsal } from "@azure/msal-react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  LinearProgress,
  Typography
} from "@mui/material";

import Tooltip from "@mui/material/Tooltip";
import { DeleteForever } from "@mui/icons-material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiQueries from "../../apiQuries";
import AlertPopup from "../AlertPopup";

/**
 * Renders a sign-out button
 */
export const DeleteAttachmentModal = ({ id }) => {
  const [open, setOpen] = React.useState(false);

  const queryClient = useQueryClient();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { mutate, isError, error, isLoading, isSuccess, data } = useMutation({
    mutationFn: async (id) => {
      return ApiQueries.deleteCertification(id);
    },
    onSuccess: (data) => {
      setTimeout(() => {
        queryClient.invalidateQueries("userInfo");
        setOpen(false);
      }, 2000);
    },
    onError: (err) => {
      console.log(err);
    }
  });

  return (
    <div>
      <Tooltip title="Delete">
        <IconButton
          // color="error"
          aria-label="logout"
          onClick={handleClickOpen}
          sx={{
            backgroundColor: "error.main",
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "error.light",
              color: "#FFFFFF",
              fontWeight: "bolder"
            }
          }}
        >
          <DeleteForever />
        </IconButton>
      </Tooltip>
      {isSuccess && <AlertPopup open={true} message={data.message} />}
      {isError && (
        <AlertPopup
          severity="error"
          open={true}
          message={error.response.data.message || "Server Error"}
        />
      )}
      <Dialog
        sx={{ border: "3px solid #F44336 " }}
        open={open}
        maxWidth="sm"
        fullWidth
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete</DialogTitle>
        <DialogContent>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "fontWeightBold",
              color: "text.primary"
            }}
          >
            Are you sure you want to delete permanantly?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            {" "}
            Cancel
          </Button>
          <Button
            color="error"
            variant="outlined"
            autoFocus
            onClick={() => mutate(id)}
          >
            {isLoading ? <LinearProgress color="secondary" /> : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
