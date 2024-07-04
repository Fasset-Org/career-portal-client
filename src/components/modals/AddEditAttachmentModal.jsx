import {
  Box,
  Button,
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
import { useState } from "react";
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

  const addDocumentMutation = useMutation({
    mutationFn: async (formData) => {
      return await ApiQueries.addDocument(formData);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries("userInfo");
      setTimeout(() => {
        handleClose();
      }, 2000);
    },
    onError: (err) => {
      console.log(err);
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

      {addDocumentMutation.error && addDocumentMutation.isError && (
        <AlertPopup
          open={true}
          message={
            addDocumentMutation.error?.response?.data?.message ||
            "Internal server error"
          }
          severity="error"
        />
      )}
      {addDocumentMutation.isSuccess && addDocumentMutation.data && (
        <AlertPopup open={true} message={addDocumentMutation.data.message} />
      )}

      {/* {editCertificationMutation.error && editCertificationMutation.isError && (
        <AlertPopup
          open={true}
          message={
            editCertificationMutation.error?.response?.data?.message ||
            "Internal server error"
          }
          severity="error"
        />
      )}
      {editCertificationMutation.isSuccess &&
        editCertificationMutation.data && (
          <AlertPopup
            open={true}
            message={editCertificationMutation.data.message}
          />
        )} */}

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

              addDocumentMutation.mutate(formData);
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
