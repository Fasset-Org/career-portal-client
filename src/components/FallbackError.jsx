import { Button, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const FallbackError = () => {
  return (
    <Stack height="100vh">
      <Stack
        width={{ md: "60%", xs: "90%" }}
        m="auto"
        component={Paper}
        justifyContent="center"
        alignItems="center"
        padding={2}
        sx={{ backgroundColor: "background.paper" }}
      >
        <Typography sx={{ fontWeight: "bolder", fontSize: 20 }}>
          The resource you are looking for has been removed, had its name
          changed, or it is temporarily unavailable.
          <Button variant="outlined" sx={{ ml: 2 }}>
            <Link to="/home">Go Home</Link>
          </Button>
        </Typography>
      </Stack>
    </Stack>
  );
};

export default FallbackError;
