import {
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  Divider,
  Grid,
  InputLabel,
  // LinearProgress,
  Link,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import TextFieldWrapper from "../../components/form-components/TextFieldWrapper";
import { Navigate, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import ApiQueries from "../../apiQuries";
// import bgImg from "../../images/Untitled-2.bcecf2a1201a8f598c47.png";
// import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoginIcon from "@mui/icons-material/Login";
import blueLogo from "../../images/blueLogo-transparentBg.png";
import FASSET_POLICY from "../../images/FASSET POPIA POLICY.pdf";

const LoginUser = () => {
  const navigate = useNavigate();
  const [openBackDrop, setOpenBackDrop] = useState(false);
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const { mutate, error, isSuccess, isLoading, data } = useMutation({
    mutationFn: (formData) => {
      const data = ApiQueries.loginUser(formData);

      return data;
    },

    onSuccess: (data) => {
      setOpenBackDrop(false);
      localStorage.setItem("token", data.user.token);

      window.location.href = `${process.env.REACT_APP_PUBLIC_URL}/dashboard`;
      // window.location.reload();
    },
    onError: (err) => {
      setOpenBackDrop(false);
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

  const handleClose = () => {
    setOpenBackDrop(false);
  };

  useEffect(() => {
    if (isLoading) {
      setOpenBackDrop(true);
    } else {
      setOpenBackDrop(false);
    }
  }, [isLoading]);

  if (info) {
    return <Navigate to="/dashboard" />;
  }

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
        width={{ md: "30%", xs: "100%" }}
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

        <Stack height={150} alignItems="center" padding={2}>
          <img src={blueLogo} alt="" height={150} width={150} />
        </Stack>

        <Typography
          fontSize={20}
          fontWeight="bolder"
          sx={{ color: "primary.main" }}
        >
          Hi, Welcome back
        </Typography>
        <Typography
          sx={{ color: "#85929e", letterSpacing: 0.5, fontWeight: "bolder" }}
        >
          Login in to continue to Learner Portal
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
              onSubmit={(values) => {
                mutate(values);
              }}
            >
              {() => {
                return (
                  <Form>
                    {/* {isLoading && <LinearProgress />} */}

                    {/* <Stack alignItems="center">
                      <Typography
                        fontWeight="bolder"
                        fontSize={30}
                        letterSpacing={5}
                        // fontFamily="Roboto, Reenie Beanie"
                      >
                        Login
                      </Typography>
                    </Stack> */}

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
                            onClick={() => navigate("/forgotPassword")}
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
                        <Typography>
                          By loging in and completing your profile, you agree
                          that you have read,understood and accepted that you
                          will be bounded by the terms of use of the{" "}
                          <a
                            href={FASSET_POLICY}
                            style={{
                              color: "#163683",
                              cursor: "pointer",
                              fontWeight: 600
                            }}
                            target="_blank"
                            rel="noreferrer"
                          >
                            POPI Act No.4 2013.
                          </a>{" "}
                          FASSET endeavours to take all reasonable precautions
                          to ensure that any information provided, is only used
                          for the purposes it has been provided.
                        </Typography>
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
                      <Grid item xs={12} md={12}>
                        <Divider />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <Typography
                          sx={{
                            textAlign: "center",
                            fontSize: 15,
                            fontWeight: "bold",
                            cursor: "pointer",
                            color: "primary.main"
                          }}
                          onClick={() => {
                            navigate("/register");
                          }}
                        >
                          Don't have an account?
                        </Typography>
                      </Grid>
                      {/* 
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
                          onClick={() => {
                            window.open(
                              "https://mogulcollective.com/next-big-thing-language/",
                              "_blank"
                            );
                          }}
                        >
                          View Career Guide
                        </Button>
                      </Grid> */}
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
                        onClick={handleClose}
                      >
                        <CircularProgress color="primary" />
                      </Backdrop>
                    </Grid>
                  </Form>
                );
              }}
            </Formik>
          </Grid>
        </Grid>
      </Stack>
      {/* <Stack
        sx={{
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPositionX: "right",
          backgroundPositionY: "center",
          minHeight: "87vh",
          maxHeight: "110vh",
          width: "50%",
          backgroundColor: "#FFFFFF"
        }}
        display={{ md: "block", xs: "none" }}
      ></Stack> */}
    </Stack>
  );
};

export default LoginUser;
