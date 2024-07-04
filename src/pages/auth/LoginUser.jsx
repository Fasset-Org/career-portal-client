import {
  Alert,
  Button,
  Grid,
  InputLabel,
  LinearProgress,
  Link,
  Stack,
  Typography
} from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import TextFieldWrapper from "../../components/form-components/TextFieldWrapper";
import { Navigate, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import ApiQueries from "../../apiQuries";
import bgImg from "../../images/Untitled-2.bcecf2a1201a8f598c47.png";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoginIcon from "@mui/icons-material/Login";

const LoginUser = () => {
  const navigate = useNavigate();

  const { mutate, error, isSuccess, isLoading, data } = useMutation({
    mutationFn: (formData) => {
      const data = ApiQueries.loginUser(formData);

      return data;
    },

    onSuccess: (data) => {
      localStorage.setItem("token", data.user.token);

      window.location.href = `${process.env.REACT_APP_PUBLIC_URL}/dashboard`;
      // window.location.reload();
    },
    onError: (err) => {
      console.log(err);
    },
    retry: 2
  });

  const { data: info } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => {
      return ApiQueries.userInfo();
    }
  });

  if (info) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Stack>
      <Stack
        sx={{
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "200px -100px",
          minHeight: "87vh",
          maxHeight: "110vh",
          width: "100%",
          backgroundColor: "#FFFFFF"
        }}
        // spacing={2}
        padding={1}
        paddingX={10}
        // paddingY={10}
      >
        <Stack
          width="50%"
          spacing={2}
          alignItems="center"
          minHeight="86vh"
          justifyContent="center"
        >
          {error?.response?.status === 404 && (
            <Alert severity="error" color="error" sx={{ width: "100%" }}>
              {error?.response?.data?.message}
            </Alert>
          )}
          {isSuccess && (
            <Alert severity="success" color="success" sx={{ width: "100%" }}>
              {data.message}
            </Alert>
          )}

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
                  password: Yup.string()
                    .required("Password required")
                    // .min(8, "At least 8 characters required for password")
                })}
                onSubmit={(values) => {
                  mutate(values);
                }}
              >
                {() => {
                  return (
                    <Form>
                      {isLoading && <LinearProgress />}

                      <Stack alignItems="center">
                        <Typography
                          fontWeight="bolder"
                          fontSize={30}
                          letterSpacing={5}
                          // fontFamily="Roboto, Reenie Beanie"
                        >
                          Login
                        </Typography>
                      </Stack>

                      <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                          <InputLabel>Email</InputLabel>
                          <TextFieldWrapper
                            name="email"
                            label="Email"
                            sx={{ mt: 2 }}
                          />
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <InputLabel>Password</InputLabel>
                            <Link
                              sx={{ textDecoration: "none", cursor: "pointer" }}
                            >
                              Forgot Password
                            </Link>
                          </Stack>
                          <TextFieldWrapper
                            type="password"
                            name="password"
                            label="Password"
                            sx={{ mt: 2 }}
                          />
                        </Grid>

                        <Grid item xs={12} md={12}>
                          <Button
                            variant="contained"
                            color="primary"
                            endIcon={<LoginIcon />}
                            sx={{ fontWeight: "bolder", width: "100%" }}
                            type="submit"
                          >
                            Login
                          </Button>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Button
                            variant="outlined"
                            // color="warning"
                            endIcon={<AppRegistrationIcon />}
                            sx={{ fontWeight: "bolder", width: "100%" }}
                            onClick={() => navigate("/register")}
                          >
                            Register
                          </Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Button
                            variant="outlined"
                            color="secondary"
                            endIcon={<AppRegistrationIcon />}
                            sx={{ fontWeight: "bolder", width: "100%" }}
                          >
                            Download Career Guide
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
        {/* <Stack
      width="100%"
      paddingY={4}
      // height={{ xs: "80vh" }}
      justifyContent="center"
    >
      {isSuccess && <AlertPopup open={true} message={data.message} />}

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
              password: Yup.string()
                .required("Password required")
                .min(8, "At least 8 characters required for password")
            })}
            onSubmit={(values) => {
              mutate(values);
            }}
          >
            {() => {
              return (
                <Form>
                  <Card sx={{ width: { md: "40%", xs: "100%" }, m: "auto", }}>
                    <Stack
                      // border={1}
                      height={130}
                      alignItems="center"
                      justifyContent="center"
                      sx={{ backgroundColor: "primary.main" }}
                      spacing={2}
                    >
                      <img src={logo} alt="" width={100} height={100} />
                    </Stack>

                    {isLoading && <LinearProgress />}

                    <Typography
                      component={Stack}
                      alignItems="center"
                      justifyContent="center"
                      fontWeight="bolder"
                      fontSize={20}
                      spacing={2}
                      sx={{ mt: 2 }}
                      textTransform="uppercase"
                    >
                      Login
                    </Typography>

                    {error?.response?.status === 404 && (
                      <Alert severity="error" color="error" sx={{ m: 2 }}>
                        {error?.response?.data?.message}
                      </Alert>
                    )}

                    <Grid container spacing={2} p={2}>
                      <Grid item xs={12} md={12}>
                        <InputLabel>Email</InputLabel>
                        <TextFieldWrapper
                          name="email"
                          label="Email"
                          sx={{ mt: 2 }}
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <InputLabel>Password</InputLabel>
                          <Link sx={{ textDecoration: "none" }}>
                            Forgot Password
                          </Link>
                        </Stack>
                        <TextFieldWrapper
                          type="password"
                          name="password"
                          label="Password"
                          sx={{ mt: 2 }}
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <Button type="submit" variant="contained" fullWidth>
                          Login
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <Typography>
                          Don't Have An Account?
                          <Link
                            sx={{ textDecoration: "none" }}
                            onClick={() => navigate("/register")}
                          >
                            Register
                          </Link>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Card>
                </Form>
              );
            }}
          </Formik>
        </Grid>
      </Grid>
    </Stack> */}
      </Stack>
    </Stack>
  );
};

export default LoginUser;
