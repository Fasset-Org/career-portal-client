import React from "react";
// import { useMsal } from "@azure/msal-react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
  useMediaQuery
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import LogoutIcon from "@mui/icons-material/Logout";
import Tooltip from "@mui/material/Tooltip";
import { useTheme } from "@mui/material/styles";

/**
 * Renders a sign-out button
 */
export const SignOutButton = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.clear();

    navigate("/home");
    window.location.reload();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="Logout">
        {isDesktop ? (
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            onClick={handleClickOpen}
          >
            <Typography fontSize={15} fontWeight="bolder">
              Signout
            </Typography>
            <IconButton color="error" size="medium" aria-label="logout">
              <LogoutIcon fontSize="medium" />
            </IconButton>
          </Stack>
        ) : (
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="center"
            onClick={handleClickOpen}
          >
            <Typography fontSize={15} fontWeight="bolder">
              Signout
            </Typography>
            <IconButton color="error" size="large" aria-label="logout">
              <LogoutIcon fontSize="large" />
            </IconButton>
          </Stack>
        )}
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
            Are you sure you want to logout?
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
              handleLogout("redirect");
            }}
            autoFocus
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
