import {
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  useTheme
} from "@mui/material";
import React from "react";
import blueLogo from "../images/blueLogo-transparentBg.png";
import whiteLogo from "../images/whiteLogo-bgwhite.png";

const AccountDeleteGuide = () => {
  const theme = useTheme();
  return (
    <Stack spacing={2} mt={8.5} py={4} alignItems="center">
      <Stack
        width={{ xs: "100%", md: "50%" }}
        border={1}
        borderColor="lightgray"
        padding={2}
        justifyContent="center"
        spacing={2}
        // alignItems="center"
      >
        <Stack alignItems="center">
          <img
            src={theme.palette.mode === "dark" ? whiteLogo : blueLogo}
            alt=""
            height={150}
            width={150}
          />
        </Stack>
        <Typography
          fontWeight="bolder"
          fontSize={30}
          textAlign="center"
          textTransform="uppercase"
        >
          Account Deletion Guide
        </Typography>
        <Typography
          fontWeight="bolder"
          fontSize={20}
          textAlign="start"
          textTransform="uppercase"
          sx={{ color: "primary.main" }}
        >
          Introduction
        </Typography>
        <Typography>
          Welcome to FASSET Atang Legacy App, operated by the Finance and
          Accounting Services Sector Education and Training Authority ("we,"
          "our," or "us"). We are committed to protecting your privacy and
          providing transparency on how your data is handled. This page outlines
          the steps users must take to request account deletion, the types of
          data that will be deleted, and any retention policies we follow.
        </Typography>
        <Typography
          fontWeight="bolder"
          fontSize={20}
          textAlign="start"
          textTransform="uppercase"
          sx={{ color: "primary.main" }}
        >
          How to Request Account Deletion
        </Typography>
        <Stack>
          {[
            "Open the App: Log in to the FASSET Atang Legacy app using your user name and password.",
            "The “Profile” page loads next; click the red “Delete Account” button at the bottom of the page.",
            "A popup appears requesting you to confirm deletion of your profile. Enter your password in the provided field. Then click “Delete” link.",
            "You are re-directed to the login page again. Your profile has been deleted."
          ].map((p, i) => {
            return (
              <List>
                <ListItem>
                  <Typography fontWeight="bolder">
                    {i + 1 + "."}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </Typography>
                  <ListItemText primary={p} />
                </ListItem>
              </List>
            );
          })}
        </Stack>
        <Typography
          fontWeight="bolder"
          fontSize={20}
          textAlign="start"
          textTransform="uppercase"
          sx={{ color: "primary.main" }}
        >
          Data Deletion and Retention Policy
        </Typography>
        <Stack>
          {[
            "Legal Compliance: We may retain certain data to comply with applicable laws and regulations.",
            "Security & Fraud Prevention: Account-related data may be kept to detect and prevent fraud or abuse."
          ].map((p, i) => {
            return (
              <List>
                <ListItem>
                  <Typography fontWeight="bolder">
                    {i + 1 + "."}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </Typography>
                  <ListItemText primary={p} />
                </ListItem>
              </List>
            );
          })}
        </Stack>
        <Typography
          fontWeight="bolder"
          fontSize={20}
          textAlign="start"
          textTransform="uppercase"
          sx={{ color: "primary.main" }}
        >
          Contact Information
        </Typography>
        <Typography>
          For any questions regarding account deletion, please contact our
          support team:
        </Typography>
        <Stack>
          {[
            "Email: fassetcallcentre@fasset.org.za",
            "Phone: 087 821 2680 (South African dialing code)",
            "Address: FASSET, 1st Floor, 296 Kent Avenue, Ferndale, Randburg, South Africa, 2194"
          ].map((p, i) => {
            return (
              <List>
                <ListItem>
                  <Typography fontWeight="bolder">
                    {i + 1 + "."}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </Typography>
                  <ListItemText primary={p} />
                </ListItem>
              </List>
            );
          })}
        </Stack>
        <Typography>
          We are dedicated to ensuring a seamless and transparent account
          deletion process for our users. Thank you for using the FASSET Atang
          Legacy app.
        </Typography>
      </Stack>
    </Stack>
  );
};

export default AccountDeleteGuide;
