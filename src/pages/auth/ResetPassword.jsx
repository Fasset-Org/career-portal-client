import {
  // Alert,
  Button,
  // Card,
  // CircularProgress,
  Grid,
  InputLabel,
  // LinearProgress,
  Stack,
  Typography
} from "@mui/material";
// import { useMutation } from "@tanstack/react-query";
// import { useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import AlertPopup from "../../components/AlertPopup";
import blueLogo from "../../images/blueLogo-transparentBg.png";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import TextFieldWrapper from "../../components/form-components/TextFieldWrapper";

const ResetPassword = ({ currentTheme }) => {
  // let { resetToken } = useParams();
  // const navigate = useNavigate();

  // const { mutate, isLoading, isError } = useMutation({
  //   mutationFn: async (formData) => {},
  //   onSuccess: (data) => {
  //     console.log(data);
  //     resetToken = null;
  //   },
  //   onError: (err) => {
  //     console.log(err);
  //     resetToken = null;
  //   }
  // });

  // const resetPasswordMutation = useMutation({
  //   mutationFn: async (formData) => {},
  //   onSuccess: (data) => {
  //     setTimeout(() => {
  //       navigate("/login");
  //     }, 1000);
  //   }
  // });

  // useEffect(() => {
  //   mutate({ resetToken: resetToken });
  // }, [mutate, resetToken]);

  // if (isLoading) {
  //   return <LinearProgress />;
  // }

  // if (isError) {
  //   return (
  //     <Stack
  //       height="100vh"
  //       width="100%"
  //       justifyContent="center"
  //       alignItems="center"
  //     >
  //       <Alert severity="error" sx={{ width: "80%" }}>
  //         Link expired
  //       </Alert>
  //     </Stack>
  //   );
  // } else {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      mt={8.5}
      height="90vh"
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
        {/* {error?.response?.status === 404 && (
            <Alert severity="error" color="error" sx={{ width: "100%" }}>
              {error?.response?.data?.message}
            </Alert>
          )}
          {isSuccess && (
            <Alert severity="success" color="success" sx={{ width: "100%" }}>
              {data.message}
            </Alert>
          )} */}

        <Stack height={150} alignItems="center" padding={2}>
          <img src={blueLogo} alt="" height={150} width={150} />
        </Stack>

        <Typography fontSize={20} fontWeight="bolder">
          Reset Password
        </Typography>
        <Typography fontWeight="bolder" sx={{ color: "primary.main" }}>
          Change your password
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Formik
              initialValues={{
                email: "",
                password: ""
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .required("Email required")
                  .email("Please prodive a valid email format"),
                password: Yup.string().required("Password required")
                // .min(8, "At least 8 characters required for password")
              })}
              onSubmit={(values) => {}}
            >
              {() => {
                return (
                  <Form>
                    /{" "}
                    <Grid container spacing={2}>
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
                          name="password"
                          label="Confirm Password"
                          type="password"
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
                          Reset Password
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
  // }
};

export default ResetPassword;
