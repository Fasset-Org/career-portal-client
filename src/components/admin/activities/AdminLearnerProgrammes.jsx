import { Button, Stack } from "@mui/material";
import React from "react";

const AdminLearnerProgrammes = () => {
  return (
    <Stack padding={2} mt={8.5} minHeight='89vh'>
      <Stack alignItems='center' justifyContent='center'>
        <Button variant="contained">
          Add Learner Programme
        </Button>
      </Stack>
    </Stack>
  );
};

export default AdminLearnerProgrammes;
