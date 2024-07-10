import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  InputLabel,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Form, Formik } from "formik";
import TextFieldWrapper from "../form-components/TextFieldWrapper";
import SelectFieldWrapper from "../form-components/SelectFieldWrapper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiQueries from "../../apiQuries";
import * as Yup from "yup";
import AlertPopup from "../AlertPopup";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

const ProfessionalsSkillsModal = ({ skill, userId }) => {
  const [open, setOpen] = useState(false);
  const [openBackDrop, setOpenBackDrop] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const queryClient = useQueryClient();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { mutate, error, isError, isSuccess, data, isLoading } = useMutation({
    mutationFn: (formData) => {
      return ApiQueries.addProfessionalSkill(formData);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["userInfo"]);
      setOpenBackDrop(false);
      handleClose();
    },
    onError: (err) => {
      setOpenBackDrop(false);
    }
  });

  const handleBackDropClose = () => {
    setOpenBackDrop(false);
  };

  React.useEffect(() => {
    if (isLoading) {
      setOpenBackDrop(true);
    } else {
      setOpenBackDrop(false);
    }
  }, [isLoading]);

  return (
    <div>
      {error && isError && (
        <AlertPopup
          open={true}
          message={error?.response?.data?.message || "Internal server error"}
          severity="error"
        />
      )}
      {isSuccess && data && <AlertPopup open={true} message={data.message} />}

      {skill ? (
        <Tooltip title="Edit">
          <IconButton
            onClick={handleClickOpen}
            sx={{
              backgroundColor: "primary.main",
              color: "#FFFFFF",
              "&:hover": {
                backgroundColor: "primary.light",
                color: "#FFFFFF",
                fontWeight: "bolder"
              }
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Add">
          <IconButton
            onClick={handleClickOpen}
            color="inherit"
            sx={{
              backgroundColor: "primary.main",
              color: "#FFFFFF",
              "&:hover": {
                backgroundColor: "primary.light",
                color: "#FFFFFF",
                fontWeight: "bolder"
              }
            }}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      )}

      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          padding={2}
          sx={{
            backgroundColor: "primary.main",
            height: 40,
            color: "#FFFFFF",
            fontWeight: "bolder"
          }}
        >
          <Typography>
            {skill ? "Edit Professional Skill" : "Add Professional Skills"}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon sx={{ color: "#FFFFFF" }} />
          </IconButton>
        </Stack>
        <DialogContent>
          <Formik
            initialValues={{
              userId: userId || "",
              skill: "",
              skillLevel: ""
            }}
            validationSchema={Yup.object().shape({
              skill: Yup.string().required("Please enter skill"),
              skillLevel: Yup.string().required("Please select skill level")
            })}
            onSubmit={(values, formik) => {
              mutate(values);
            }}
          >
            {(formik) => {
              return (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <InputLabel sx={{ mb: 1 }}>Skill</InputLabel>
                      <TextFieldWrapper name="skill" label="Skill" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <InputLabel sx={{ mb: 1 }}>Skill Level</InputLabel>
                      <SelectFieldWrapper
                        name="skillLevel"
                        label="Skill Level"
                        options={[
                          {
                            value: "Beginner",
                            label: "Beginner"
                          },
                          {
                            value: "Intermediate",
                            label: "Intermediate"
                          },
                          {
                            value: "Expert",
                            label: "Expert"
                          }
                        ]}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Box textAlign="end">
                        <Button
                          variant="outlined"
                          autoFocus
                          onClick={handleClose}
                        >
                          Close
                        </Button>
                        {skill ? (
                          <Button
                            variant="contained"
                            type="submit"
                            sx={{ ml: 2, px: 3 }}
                          >
                            Update
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            type="submit"
                            sx={{ ml: 2, px: 3 }}
                          >
                            Add
                          </Button>
                        )}
                      </Box>
                    </Grid>
                    <Backdrop
                      sx={{
                        color: "#fff",
                        pointerEvents: "none",
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                        borderWidth: 4,
                        borderColor: "primary.main",
                        borderStyle: "solid"
                      }}
                      open={openBackDrop}
                      onClick={handleBackDropClose}
                    >
                      <CircularProgress color="primary" />
                    </Backdrop>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfessionalsSkillsModal;
