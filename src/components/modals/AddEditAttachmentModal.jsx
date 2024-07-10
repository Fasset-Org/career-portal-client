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
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Field, Form, Formik } from "formik";
import SelectFieldWrapper from "../form-components/SelectFieldWrapper";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import TextFieldWrapper from "../form-components/TextFieldWrapper";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiQueries from "../../apiQuries";
import AlertPopup from "../AlertPopup";

const AddEditAttachmentModal = ({ attachment, userId }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const queryClient = useQueryClient();
  const [openBackDrop, setOpenBackDrop] = useState(false);

  const { mutate, error, isError, isSuccess, data, isLoading } = useMutation({
    mutationFn: async (formData) => {
      return await ApiQueries.addDocument(formData);
    },
    onSuccess: (data) => {
      setOpenBackDrop(false);
      queryClient.invalidateQueries("userInfo");
      setTimeout(() => {
        handleClose();
      }, 2000);
    },
    onError: (err) => {
      setOpenBackDrop(false);
    }
  });

  const documentOptionsTemplate = [
    {
      value: "Matric Certificate",
      label: "Matric Certificate"
    },
    {
      value: "Qualification",
      label: "Qualification"
    },
    {
      value: "Id Document",
      label: "Id Document"
    },
    {
      value: "Other",
      label: "Other"
    }
  ];

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
      {attachment ? (
        <Tooltip title="Edit">
          <Button onClick={handleClickOpen} color="secondary">
            Upload
          </Button>
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
            {attachment ? "Edit Document" : "Add Documents"}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon sx={{ color: "#FFFFFF" }} />
          </IconButton>
        </Stack>
        <DialogContent>
          <Formik
            initialValues={{
              userId: userId || "",
              documentName: (attachment && attachment.value) || "",
              file: ""
            }}
            validationSchema={Yup.object().shape({
              documentName: Yup.string().required("Document name required"),
              otherName: Yup.string().when("documentName", {
                is: "Other",
                then: () => Yup.string().required("Document name required")
              }),
              file: Yup.string().required("File required")
            })}
            onSubmit={(values) => {
              const formData = new FormData();
              for (const [key, value] of Object.entries(values)) {
                if (key === "documentName" && value === "Other") {
                  formData.append(key, values.otherName);
                } else {
                  formData.append(key, value);
                }
              }

              mutate(formData);
            }}
            enableReinitialize={true}
          >
            {({ values }) => {
              return (
                <Form>
                  <Grid container spacing={2}>
                    {values.documentName === "Other" ? (
                      <Grid item xs={12} md={6}>
                        <InputLabel sx={{ mb: 1 }}>Document Name</InputLabel>
                        <TextFieldWrapper
                          name="otherName"
                          label="Document Name"
                        />
                      </Grid>
                    ) : (
                      <Grid item xs={12} md={6}>
                        <InputLabel sx={{ mb: 1 }}>Document Name</InputLabel>
                        <SelectFieldWrapper
                          name="documentName"
                          label="Document Name"
                          options={documentOptionsTemplate}
                          disabled={attachment && true}
                        />
                      </Grid>
                    )}
                    <Grid item xs={12} md={6}>
                      <InputLabel sx={{ mb: 1 }}>File</InputLabel>
                      <Field name="file">
                        {({ field, form, meta }) => (
                          <TextField
                            type="file"
                            label="File"
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
                        <Button
                          variant="contained"
                          type="submit"
                          sx={{ ml: 2, px: 3 }}
                        >
                          Upload
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

export default AddEditAttachmentModal;
