import React from "react";
// import { useMsal } from "@azure/msal-react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import Tooltip from "@mui/material/Tooltip";
import { Delete } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import ApiQueries from "../apiQuries";
import AlertPopup from "./AlertPopup";

/**
 * Renders a sign-out button
 */
export const DeleteAccountModal = ({ id }) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const mutation = useMutation({
    mutationFn: (id) => ApiQueries.deleteUser(id),
    onSuccess: (data) => {
      localStorage.removeItem("token");
      sessionStorage.clear();

      setTimeout(() => {
        navigate("/home");
        window.location.reload();
      }, 2000);
    },
    onError: (err) => {
      console.log(err);
    }
  });

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   sessionStorage.clear();

  //   navigate("/home");
  //   window.location.reload();
  // };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="Delete Account">
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="center"
          onClick={handleClickOpen}
        >
          {mutation.isSuccess && (
            <AlertPopup open={true} message={mutation.data.message} />
          )}

          {mutation.error && mutation.isError && (
            <AlertPopup
              open={true}
              message={
                mutation.error?.response?.data?.message ||
                "Internal server error"
              }
              severity="error"
            />
          )}

          <Typography fontSize={15} fontWeight="bolder">
            Delete Account
          </Typography>

          <IconButton color="error" size="medium" aria-label="logout">
            <Delete fontSize="medium" />
          </IconButton>
        </Stack>
      </Tooltip>
      <Dialog
        sx={{ border: "3px solid #F44336 " }}
        open={open}
        maxWidth="sm"
        fullWidth
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Logout</DialogTitle>
        <DialogContent>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "fontWeightBold",
              color: "text.primary"
            }}
          >
            Are you sure you want to delete your account?
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
            onClick={() => {
              mutation.mutate(id);
            }}
            autoFocus
          >
            {mutation.isLoading ? <CircularProgress /> : "Delete Account"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
