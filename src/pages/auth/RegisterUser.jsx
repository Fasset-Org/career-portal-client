import {
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  // LinearProgress,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import TextFieldWrapper from "../../components/form-components/TextFieldWrapper";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import ApiQueries from "../../apiQuries";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import blueLogo from "../../images/blueLogo-transparentBg.png";
import whiteLogo from "../../images/whiteLogo-bgwhite.png";
import SelectFieldWrapper from "../../components/form-components/SelectFieldWrapper";
import FASSET_POLICY from "../../images/FASSET POPIA POLICY.pdf";

const RegisterUser = () => {
  const navigate = useNavigate();
  const [openBackDrop, setOpenBackDrop] = useState(false);

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const { mutate, isLoading, error, isSuccess, data } = useMutation({
    mutationFn: (formData) => {
      const data = ApiQueries.registerUser(formData);
      return data;
    },
    onSuccess: (data) => {
      setOpenBackDrop(false);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    },
    onError: (error) => {
      setOpenBackDrop(false);
      console.log(error);
    }
  });

  const yesNoOptions = [
    {
      value: "Yes",
      label: "Yes"
    },
    {
      value: "No",
      label: "No"
    }
  ];

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

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      mt={10}
      minHeight="90vh"
    >
      <Stack
        width={{ md: "30%", xs: "100%" }}
        alignItems="center"
        justifyContent="center"
        padding={2}
        // border={{ md: 1 }}
        // borderColor={{ md: "lightgray" }}
        py={{ md: 4, xs: 2 }}
        component={isMdUp ? Paper : "div"}
      >
        {error?.response?.status === 409 && (
          <Alert severity="error" color="error" sx={{ m: 2, width: "100%" }}>
            {error?.response?.data?.message}
          </Alert>
        )}
        {isSuccess && (
          <Alert sx={{ m: 2, width: "100%" }}>{data.message} </Alert>
        )}

        <Stack height={150} alignItems="center" padding={2}>
          <img
            src={theme.palette.mode === "dark" ? whiteLogo : blueLogo}
            alt=""
            height={150}
            width={150}
          />
        </Stack>

        <Typography
          fontSize={20}
          fontWeight="bolder"
          sx={{ color: "primary.main" }}
        >
          Hi, Welcome
        </Typography>
        <Typography
          sx={{ color: "#85929e", letterSpacing: 0.5, fontWeight: "bolder" }}
        >
          Register in to continue to Learner Portal
        </Typography>

        <Grid container>
          <Grid item xs={12} md={12}>
            <Formik
              initialValues={{
                email: "",
                password: "",
                identificationNumber: "",
                firstName: "",
                lastName: "",
                mobileNumber: "",
                confirmPassword: "",
                userType: "student",
                rsaId: "",
                passportNumber: ""
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
                  .oneOf([Yup.ref("password"), null], "Passwords must match"),
                firstName: Yup.string().required("FirstName required"),
                lastName: Yup.string().required("LastName required"),
                rsaId: Yup.string().required("Please select"),
                identificationNumber: Yup.string().when("rsaId", {
                  is: "Yes",
                  then: () =>
                    Yup.string()
                      .required("ID number required")
                      .test(
                        "rsaId",
                        "Please provide valid Identification Number",
                        function (num) {
                          let idNumber = num?.toString();
                          var correct = true;
                          if (
                            idNumber?.length !== 13 ||
                            !!isNaN(parseFloat(num))
                          ) {
                            correct = false;
                          }
                          var tempDate = new Date(
                            idNumber?.substring(0, 2),
                            idNumber?.substring(2, 4) - 1,
                            idNumber?.substring(4, 6)
                          );
                          if (tempDate instanceof Date) {
                            correct = true;
                          } else {
                            correct = false;
                          }
                          var tempTotal = 0;
                          var checkSum = 0;
                          var multiplier = 1;

                          for (var i = 0; i < 13; ++i) {
                            tempTotal =
                              parseInt(idNumber?.charAt(i)) * multiplier;
                            if (tempTotal > 9) {
                              tempTotal =
                                parseInt(tempTotal.toString().charAt(0)) +
                                parseInt(tempTotal.toString().charAt(1));
                            }
                            checkSum = checkSum + tempTotal;
                            multiplier = multiplier % 2 === 0 ? 1 : 2;
                          }
                          if (checkSum % 10 !== 0) {
                            correct = false;
                          }
                          if (correct) {
                            return true;
                          } else {
                            return false;
                          }
                        }
                      )
                }),
                passportNumber: Yup.string().when("rsaId", {
                  is: "No",
                  then: () => Yup.string().required("Passport number required")
                })
              })}
              onSubmit={(values) => {
                mutate(values);
              }}
            >
              {({ values }) => {
                return (
                  <Form>
                    {/* {isLoading && <LinearProgress />} */}

                    {/* <Stack alignItems="center">
                      <Typography
                        fontWeight="bolder"
                        fontSize={30}
                        letterSpacing={5}
                        fontFamily="Roboto, Reenie Beanie"
                      >
                        Register
                      </Typography>
                    </Stack> */}

                    <Grid container padding={2} spacing={2}>
                      <Grid item xs={12} md={6}>
                        {/* <InputLabel>FirstName</InputLabel> */}

                        <TextFieldWrapper
                          name="firstName"
                          label="FirstName"
                          // sx={{ mt: 1 }}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        {/* <InputLabel>LastName</InputLabel> */}
                        <TextFieldWrapper
                          name="lastName"
                          label="LastName"
                          // sx={{ mt: 1 }}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <SelectFieldWrapper
                          name="rsaId"
                          label="Do you have RSA ID number?"
                          options={yesNoOptions}
                        />
                      </Grid>

                      {values.rsaId === "Yes" ? (
                        <Grid item xs={12} md={6}>
                          <TextFieldWrapper
                            name="identificationNumber"
                            label="Identification Number"
                          />
                        </Grid>
                      ) : values.rsaId === "No" ? (
                        <Grid item xs={12} md={6}>
                          <TextFieldWrapper
                            name="passportNumber"
                            label="Passport Number"
                          />
                        </Grid>
                      ) : (
                        ""
                      )}

                      <Grid item xs={12} md={6}>
                        {/* <InputLabel>Email</InputLabel> */}
                        <TextFieldWrapper
                          name="email"
                          label="Email"
                          // sx={{ mt: 1 }}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        {/* <InputLabel>Password</InputLabel> */}

                        <TextFieldWrapper
                          type="password"
                          name="password"
                          label="Password"
                          // sx={{ mt: 1 }}
                        />
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        md={
                          values.rsaId === "Yes" || values.rsaId === "No"
                            ? 12
                            : 6
                        }
                      >
                        {/* <InputLabel>Confirm Password</InputLabel> */}

                        <TextFieldWrapper
                          type="password"
                          name="confirmPassword"
                          label="Confirm Password"
                          // sx={{ mt: 1 }}
                        />
                      </Grid>

                      <Grid item xs={12} md={12}>
                        <Typography>
                          By registering in and completing your profile, you
                          agree that you have read,understood and accepted that
                          you will be bounded by the terms of use of the{" "}
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
                          endIcon={<AppRegistrationIcon />}
                          sx={{ fontWeight: "bolder", width: "100%" }}
                          type="submit"
                        >
                          Register
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
                            navigate("/login");
                          }}
                        >
                          Already have an account?
                        </Typography>
                      </Grid>

                      {/* <Grid item xs={12} md={6}>
                        <Button
                          variant="outlined"
                          // color="warning"
                          endIcon={<LoginIcon />}
                          sx={{ fontWeight: "bolder", width: "100%" }}
                          onClick={() => navigate("/login")}
                        >
                          Login
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
        border={3}
      ></Stack> */}
    </Stack>
  );
};

export default RegisterUser;
