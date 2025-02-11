import {
  Alert,
  // Alert,
  Button,
  CircularProgress,
  // Card,
  // CircularProgress,
  Grid,
  InputLabel,
  LinearProgress,
  Paper,
  // LinearProgress,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
// import { useMutation } from "@tanstack/react-query";
// import { useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import AlertPopup from "../../components/AlertPopup";
import blueLogo from "../../images/blueLogo-transparentBg.png";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import TextFieldWrapper from "../../components/form-components/TextFieldWrapper";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import ApiQueries from "../../apiQuries";

const ResetPassword = ({ currentTheme }) => {
  let { resetToken } = useParams();
  const navigate = useNavigate();

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["verify"],
    queryFn: async () => {
      return await ApiQueries.verifyResetToken(resetToken);
    },
    enabled: !!resetToken
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async (formData) => {
      return await ApiQueries.resetPasswordUser(formData);
    },
    onSuccess: (data) => {
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  });

  if (isLoading) {
    return <LinearProgress />;
  }

  if (isError) {
    return (
      <Stack
        height="100vh"
        width="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Alert severity="error" sx={{ width: "80%" }}>
          {error?.response?.data?.message}
        </Alert>
      </Stack>
    );
  } else {
    return (
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        mt={10}
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
          py={{ md: 4, xs: 2 }}
          // border={{ md: 1 }}
          // borderColor={{ md: "lightgray" }}
          // component={{ md: Paper, Stack}}
          sx={{ backgroundColor: "#FFFFFF" }}
          component={isMdUp ? Paper : "div"}
        >
          {resetPasswordMutation?.error?.response?.status === 404 && (
            <Alert severity="error" color="error" sx={{ width: "100%" }}>
              {resetPasswordMutation?.error?.response?.data?.message}
            </Alert>
          )}
          {resetPasswordMutation?.isSuccess && (
            <Alert severity="success" color="success" sx={{ width: "100%" }}>
              {resetPasswordMutation?.data.message}
            </Alert>
          )}

          <Stack height={150} alignItems="center" padding={2}>
            <img src={blueLogo} alt="" height={150} width={150} />
          </Stack>

          <Typography
            fontSize={20}
            fontWeight="bolder"
            sx={{ color: "primary.main" }}
          >
            Hi, Reset Password
          </Typography>
          <Typography
            sx={{ color: "#85929e", letterSpacing: 0.5, fontWeight: "bolder" }}
          >
            Change your password
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Formik
                initialValues={{
                  email: data?.user?.email || "",
                  password: "",
                  confirmPassword: ""
                }}
                validationSchema={Yup.object().shape({
                  email: Yup.string()
                    .required("Email required")
                    .email("Please prodive a valid email format"),
                  password: Yup.string()
                    .required("Password required")
                    .min(8, "At least 8 characters required for password"),
                  confirmPassword: Yup.string()
                    .required("Confirm password required")
                    .oneOf([Yup.ref("password"), null], "Passwords must match")
                })}
                enableReinitialize
                onSubmit={(values) => {
                  resetPasswordMutation.mutate(values);
                }}
              >
                {() => {
                  return (
                    <Form>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                          <InputLabel>Password</InputLabel>
                          <TextFieldWrapper
                            name="email"
                            label="Email"
                            type="email"
                            sx={{ mt: 2 }}
                            fullWidth
                            disabled={true}
                          />
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <InputLabel>Password</InputLabel>
                          <TextFieldWrapper
                            name="password"
                            label="Password"
                            type="password"
                            sx={{ mt: 2 }}
                            fullWidth
                          />
                        </Grid>

                        <Grid item xs={12} md={12}>
                          <InputLabel>Confirm Password</InputLabel>
                          <TextFieldWrapper
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            sx={{ mt: 2 }}
                            fullWidth
                          />
                        </Grid>

                        <Grid item xs={12} md={12}>
                          <Button variant="contained" fullWidth type="submit">
                            {resetPasswordMutation.isLoading ? (
                              <CircularProgress color="secondary" />
                            ) : (
                              "Reset Password"
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
  }
};

export default ResetPassword;
