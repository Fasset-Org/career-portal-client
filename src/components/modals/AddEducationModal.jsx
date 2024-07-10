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
  LinearProgress,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery
} from "@mui/material";
import AlertPopup from "../AlertPopup";
import React from "react";
import { useTheme } from "@mui/material/styles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiQueries from "../../apiQuries";
import CloseIcon from "@mui/icons-material/Close";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import SelectFieldWrapper from "../form-components/SelectFieldWrapper";
import TextFieldWrapper from "../form-components/TextFieldWrapper";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

const AddEducationModal = ({ basicEducation, userId }) => {
  const [open, setOpen] = React.useState(false);
  const [openBackDrop, setOpenBackDrop] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const queryClient = useQueryClient();

  const { mutate, isSuccess, isError, data, error, isLoading } = useMutation({
    mutationFn: (formData) => {
      if (basicEducation) {
        return ApiQueries.editBasicEducation(formData);
      } else {
        return ApiQueries.addBasicEducation(formData);
      }
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const grades = [
    {
      value: "Grade 9",
      label: "Grade 9"
    },
    {
      value: "Grade 10",
      label: "Grade 10"
    },
    {
      value: "Grade 11",
      label: "Grade 11"
    },
    {
      value: "Grade 12",
      label: "Grade 12(Matric)"
    }
  ];

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
      {basicEducation ? (
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
      {error && isError && (
        <AlertPopup open={true} message="Server Error" severity="error" />
      )}
      {isSuccess && data && <AlertPopup open={true} message={data.message} />}
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
          <Typography>Add Basic Education</Typography>
          {isLoading && <LinearProgress />}
          <IconButton onClick={handleClose}>
            <CloseIcon sx={{ color: "#FFFFFF" }} />
          </IconButton>
        </Stack>
        <DialogContent>
          <Formik
            initialValues={{
              userId: userId,
              educationId: basicEducation?.id || "",
              grade: basicEducation?.grade || "",
              school: basicEducation?.school || "",
              city: basicEducation?.city || "",
              province: basicEducation?.province || ""
            }}
            validationSchema={Yup.object().shape({
              grade: Yup.string().required("Grade required"),
              school: Yup.string().required("School name required"),
              city: Yup.string().required("City required"),
              province: Yup.string().required("Province number required")
            })}
            onSubmit={(values) => {
              mutate(values);
            }}
          >
            {(formik) => {
              return (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <InputLabel sx={{ mb: 1 }}>
                        Highest Grade Passed
                      </InputLabel>
                      <SelectFieldWrapper
                        name="grade"
                        label="Grade"
                        options={grades}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <InputLabel>High School Name</InputLabel>
                      <TextFieldWrapper
                        name="school"
                        label="School Name"
                        sx={{ mt: 1 }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <InputLabel>City</InputLabel>
                      <TextFieldWrapper
                        name="city"
                        label="City"
                        sx={{ mt: 1 }}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <InputLabel>Province</InputLabel>
                      <TextFieldWrapper
                        name="province"
                        label="Province"
                        sx={{ mt: 1 }}
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
                        <Button
                          variant="contained"
                          type="submit"
                          autoFocus
                          sx={{ ml: 2, px: 3 }}
                        >
                          Save
                        </Button>
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

export default AddEducationModal;
