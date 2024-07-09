import {
  Alert,
  Button,
  Grid,
  LinearProgress,
  Stack,
  Typography
} from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import TextFieldWrapper from "../../components/form-components/TextFieldWrapper";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import ApiQueries from "../../apiQuries";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoginIcon from "@mui/icons-material/Login";
import bgImg from "../../images/Untitled-2.bcecf2a1201a8f598c47.png";
import blueLogo from "../../images/blueLogo-transparentBg.png";

const RegisterUser = () => {
  const navigate = useNavigate();

  const { mutate, isLoading, error, isSuccess, data } = useMutation({
    mutationFn: (formData) => {
      const data = ApiQueries.registerUser(formData);
      return data;
    },
    onSuccess: (data) => {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    },
    onError: (error) => {
      console.log(error);
    }
  });

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ backgroundColor: "#FFFFFF" }}
    >
      <Stack
        width={{ md: "50%", xs: "100%" }}
        sx={{ minHeight: "86vh" }}
        alignItems="center"
        justifyContent="center"
        padding={2}
      >
        {error?.response?.status === 409 && (
          <Alert severity="error" color="error" sx={{ m: 2, width: "100%" }}>
            {error?.response?.data?.message}
          </Alert>
        )}
        {isSuccess && (
          <Alert sx={{ m: 2, width: "100%" }}>
            {data.message}{" "}
          </Alert>
        )}

        <Stack height={150} alignItems="center" padding={2}>
          <img src={blueLogo} alt="" height={150} width={150} />
        </Stack>

        <Typography fontSize={20} fontWeight="bolder">
          Welcome
        </Typography>
        <Typography fontWeight="bolder" sx={{ color: "primary.main" }}>
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
                userType: "student"
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
                identificationNumber: Yup.string()
                  .required("ID Number is a required field")
                  .test(
                    "id_number",
                    "Please provide valid Identification Number",
                    function (num) {
                      let idNumber = num?.toString();
                      var correct = true;
                      if (idNumber?.length !== 13 || !!isNaN(parseFloat(num))) {
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
                        tempTotal = parseInt(idNumber?.charAt(i)) * multiplier;
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
              })}
              onSubmit={(values) => {
                mutate(values);
              }}
            >
              {() => {
                return (
                  <Form>
                    {isLoading && <LinearProgress />}

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
                        {/* <InputLabel>Identification Number</InputLabel> */}
                        <TextFieldWrapper
                          name="identificationNumber"
                          label="Identification Number"
                          // sx={{ mt: 1 }}
                        />
                      </Grid>

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

                      <Grid item xs={12} md={6}>
                        {/* <InputLabel>Confirm Password</InputLabel> */}

                        <TextFieldWrapper
                          type="password"
                          name="confirmPassword"
                          label="Confirm Password"
                          // sx={{ mt: 1 }}
                        />
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

                      <Grid item xs={12} md={6}>
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

      <Stack
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
      ></Stack>
    </Stack>
  );
};

export default RegisterUser;
