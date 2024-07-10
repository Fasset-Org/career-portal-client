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
  TextField,
  Tooltip,
  Typography,
  useMediaQuery
} from "@mui/material";
import TextFieldWrapper from "../form-components/TextFieldWrapper";
import { Field, Form, Formik } from "formik";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import YearDatePicker from "../form-components/YearDatePicker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiQueries from "../../apiQuries";
import * as Yup from "yup";
import AlertPopup from "../AlertPopup";

const CertificateAndTrainingModal = ({ userId, certificate }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [openBackDrop, setOpenBackDrop] = useState(false);

  const queryClient = useQueryClient();

  const { mutate, error, isError, isSuccess, data, isLoading } = useMutation({
    mutationFn: async (formData) => {
      return certificate
        ? await ApiQueries.editCertification(formData)
        : await ApiQueries.addCertification(formData);
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

  const handleBackDropClose = () => {
    setOpenBackDrop(false);
  };

  useEffect(() => {
    if (isLoading) {
      setOpenBackDrop(true);
    } else {
      setOpenBackDrop(false);
    }
  }, [isLoading]);

  return (
    <div>
      {certificate ? (
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
        <AlertPopup
          open={true}
          message={error?.response?.data?.message || "Internal server error"}
          severity="error"
        />
      )}
      {isSuccess && data && <AlertPopup open={true} message={data.message} />}

      {error && isError && (
        <AlertPopup
          open={true}
          message={error?.response?.data?.message || "Internal server error"}
          severity="error"
        />
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
          <Typography>
            {certificate ? "Edit Certification" : "Add Certification"}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon sx={{ color: "#FFFFFF" }} />
          </IconButton>
        </Stack>
        <DialogContent>
          <Formik
            initialValues={{
              userId: certificate?.userId || userId || "",
              certificateId: certificate?.id || "",
              course: certificate?.course || "",
              year: certificate?.year || "",
              certificateFile: certificate?.certificateFileName || ""
            }}
            onSubmit={(values) => {
              const formData = new FormData();
              for (const [key, value] of Object.entries(values)) {
                formData.append(key, value);
              }

              mutate(formData);
            }}
            validationSchema={Yup.object().shape({
              course: Yup.string().required("Course required"),
              year: Yup.string().required("Year completed required")
            })}
            enableReinitialize
          >
            {({ errors }) => {
              // console.log(errors)
              return (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <InputLabel sx={{ mb: 1 }}>Course</InputLabel>
                      <TextFieldWrapper name="course" label="Course" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <InputLabel sx={{ mb: 1 }}>Year</InputLabel>
                      <YearDatePicker name="year" label="Year" />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Field name="certificateFile">
                        {({ field, form, meta }) => (
                          <TextField
                            type="file"
                            label="Upload Certificate"
                            InputLabelProps={{
                              shrink: true
                            }}
                            // inputProps={{
                            //   accept:
                            //     ".doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            // }}
                            error={meta.touched && meta.error}
                            helperText={
                              meta.touched && meta.error && meta.error
                            }
                            fullWidth
                            onChange={(event) => {
                              form.setFieldValue(
                                field.name,
                                event.currentTarget.files[0]
                              );
                            }}
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Box textAlign="end">
                        <Button variant="outlined" onClick={handleClose}>
                          Close
                        </Button>
                        {certificate ? (
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

export default CertificateAndTrainingModal;
