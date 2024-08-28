import {
  Alert,
  Button,
  CircularProgress,
  Grid,
  InputLabel,
  Stack,
  Typography
} from "@mui/material";
import React from "react";
import blueLogo from "../../images/blueLogo-transparentBg.png";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import TextFieldWrapper from "../../components/form-components/TextFieldWrapper";
import { useMutation } from "@tanstack/react-query";
import ApiQueries from "../../apiQuries";

const ForgotPassword = ({ currentTheme }) => {

  const { data, mutate, error, isSuccess, isError, isLoading } = useMutation({
    mutationFn: (formData) => {
      return ApiQueries.sendResetPasswordEmail(formData);
    },
    onSuccess: (data) => {

    }
  });

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      mt={8.5}
      minHeight="90vh"
      // border={1}
    >
      <Stack
        width={{ md: "50%", xs: "100%" }}
        // spacing={2}
        alignItems="center"
        // minHeight="86vh"
        justifyContent="center"
        paddingX={{ md: 5, xs: 4 }}
        py={{ md: 10, xs: 2 }}
        border={{ md: 1 }}
        borderColor={{ md: "lightgray" }}
        // component={{ md: Paper, Stack}}
        sx={{ backgroundColor: "#FFFFFF" }}
      >
        {isError && (
          <Alert severity="error" color="error" sx={{ width: "100%" }}>
            {error?.response?.data?.message}
          </Alert>
        )}
        {isSuccess && (
          <Alert severity="success" color="success" sx={{ width: "100%" }}>
            {data.message}
          </Alert>
        )}

        <Stack height={150} alignItems="center" padding={2}>
          <img src={blueLogo} alt="" height={150} width={150} />
        </Stack>

        <Typography fontSize={20} fontWeight="bolder">
          Forgot Password
        </Typography>
        <Typography fontWeight="bolder" sx={{ color: "primary.main" }}>
          Enter your email to reset your password
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Formik
              initialValues={{
                email: ""
                // password: ""
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .required("Email required")
                  .email("Please prodive a valid email format")
                // password: Yup.string().required("Password required")
                // .min(8, "At least 8 characters required for password")
              })}
              onSubmit={(values) => {
                mutate(values);
              }}
            >
              {({ errors }) => {
                console.log(errors);
                return (
                  <Form>
                    /{" "}
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={12}>
                        <InputLabel>Email</InputLabel>
                        <TextFieldWrapper
                          name="email"
                          label="Email"
                          type="email"
                          sx={{ mt: 2 }}
                          fullWidth
                        />
                      </Grid>

                      <Grid item xs={12} md={12}>
                        <Button
                          variant="contained"
                          fullWidth
                          type="submit"
                          // onClick={(e) => navigate("/fms/dashboard")}
                        >
                          {isLoading ? (
                            <CircularProgress color="secondary" />
                          ) : (
                            "Send Reset Email"
                          )}
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                );
              }}
            </Formik>
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
};

export default ForgotPassword;
