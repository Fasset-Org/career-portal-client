import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {
  Alert,
  Box,
  Grid,
  IconButton,
  LinearProgress,
  Stack,
  Typography
} from "@mui/material";
import { Form, Formik } from "formik";
import TextFieldWrapper from "../form-components/TextFieldWrapper";
import CloseIcon from "@mui/icons-material/Close";
import LocationAutoComplete from "../LocationAutoComplete";
import ApiQueries from "../../apiQuries";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AlertPopup from "../AlertPopup";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

export default function EditAddressInforModal({ studentAddress }) {
  const [addressInfor, setAddressInfor] = React.useState(null);

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const queryClient = useQueryClient();

  const { mutate, isLoading, error, data, isSuccess } = useMutation({
    mutationFn: (formData) => {
      if (studentAddress) {
        return ApiQueries.editAddress(formData);
      } else {
        return ApiQueries.addAddress(formData);
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["userInfo"]);
      handleClose();
    }
  });

  return (
    <div>
      {!studentAddress ? (
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
          <AddIcon />
        </IconButton>
      ) : (
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
      )}

      {isSuccess && <AlertPopup open={true} message={data.message} />}
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
            {studentAddress
              ? "Edit Address Information"
              : "Add Address Information"}
          </Typography>
          {isLoading && <LinearProgress />}
          {error && (
            <Alert severity="error" color="error">
              {error.response.data.message}
            </Alert>
          )}
          <IconButton onClick={handleClose}>
            <CloseIcon sx={{ color: "#FFFFFF" }} />
          </IconButton>
        </Stack>
        <DialogContent>
          <Formik
            initialValues={{
              id: studentAddress?.id,
              streetNumber:
                addressInfor?.streetNumber ||
                studentAddress?.streetNumber ||
                "",
              streetName:
                addressInfor?.streetName || studentAddress?.streetName || "",
              suburb: addressInfor?.suburb || studentAddress?.suburb || "",
              manicipality:
                addressInfor?.manicipality ||
                studentAddress?.manicipality ||
                "",
              city: addressInfor?.city || studentAddress?.city || "",
              province:
                addressInfor?.province || studentAddress?.province || "",
              country: addressInfor?.country || studentAddress?.country || "",
              postalCode:
                addressInfor?.postalCode || studentAddress?.postalCode || ""
            }}
            validationSchema={Yup.object().shape({
              manicipality: Yup.string().required("Manicipality is required"),
              city: Yup.string().required("City is required"),
              province: Yup.string().required("Province is required"),
              country: Yup.string().required("Country is required"),
              postalCode: Yup.string().required("Postal Code is required")
            })}
            enableReinitialize={true}
            onSubmit={(values) => {
              mutate(values);
            }}
          >
            {(formik) => {
              return (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                      <LocationAutoComplete setAddressInfor={setAddressInfor} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      {/* <InputLabel>Street Number</InputLabel> */}
                      <TextFieldWrapper
                        name="streetNumber"
                        label="Street Number"
                        sx={{ mt: 1 }}
                        // disabled
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      {/* <InputLabel>Street Name</InputLabel> */}
                      <TextFieldWrapper
                        name="streetName"
                        label="Street Name"
                        sx={{ mt: 1 }}
                        // disabled
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      {/* <InputLabel>Suburb</InputLabel> */}
                      <TextFieldWrapper
                        name="suburb"
                        label="Suburb"
                        sx={{ mt: 1 }}
                        // disabled
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      {/* <InputLabel>Manicipality</InputLabel> */}
                      <TextFieldWrapper
                        name="manicipality"
                        label="Manicipality"
                        sx={{ mt: 1 }}
                        // disabled
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      {/* <InputLabel>City</InputLabel> */}
                      <TextFieldWrapper
                        name="city"
                        label="City"
                        sx={{ mt: 1 }}
                        // disabled
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      {/* <InputLabel>Province</InputLabel> */}
                      <TextFieldWrapper
                        name="province"
                        label="Province"
                        sx={{ mt: 1 }}
                        // disabled
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      {/* <InputLabel>Country</InputLabel> */}
                      <TextFieldWrapper
                        name="country"
                        label="Country"
                        sx={{ mt: 1 }}
                        // disabled
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      {/* <InputLabel>Postal Code</InputLabel> */}
                      <TextFieldWrapper
                        name="postalCode"
                        label="Postal Code"
                        sx={{ mt: 1 }}
                        // disabled
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
                          sx={{ ml: 2 }}
                        >
                          {studentAddress ? "Edit" : "Save"}
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
}
