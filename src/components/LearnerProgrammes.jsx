import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  InputLabel,
  LinearProgress,
  Paper,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { useTheme } from "@mui/material/styles";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ApiQueries from "../apiQuries";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import AlertPopup from "./AlertPopup";

const LearnerProgrammes = () => {
  // const [selectedInterest, setSelectedInterest] = React.useState();
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const theme = useTheme();
  const queryClient = useQueryClient();

  const themeMode = theme.palette.mode;

  const { data, isLoading } = useQuery({
    queryKey: ["programmes"],
    queryFn: () => {
      return ApiQueries.getAllProgrammes();
    }
  });

  const { data: userData } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => {
      return ApiQueries.userInfo();
    }

    // staleTime: 1000 * 60 * 60 * 24
  });

  const {
    mutate,
    isLoading: loading,
    isSuccess,
    error,
    data: saveData
  } = useMutation({
    mutationFn: (formData) => {
      return ApiQueries.saveLearnerProgrammes(formData);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries("userInfo");
    }
  });

  if (isLoading) {
    return <LinearProgress />;
  }

  let studentProgrammes = [];

  if (userData?.studentProgrammes?.length > 0) {
    studentProgrammes = userData?.studentProgrammes?.map((programme) => {
      return programme.programmes;
    });
  }

  console.log(data, userData?.studentProgrammes);

  return (
    <Stack
      height={605}
      padding={2}
      spacing={2}
      component={Paper}
      sx={{ overflowY: "auto" }}
    >
      <Typography sx={{ fontSize: 20, fontWeight: "bolder" }}>
        Learner Interventions
      </Typography>

      {data?.programmes?.map((programme, i) => {
        return (
          <Accordion key={i}>
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon
                  sx={{ color: themeMode === "light" ? "#FFFFFF" : "#000000" }}
                />
              }
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{
                backgroundColor: "primary.main",
                color: themeMode === "light" ? "#FFFFFF" : "#000000"
              }}
            >
              {programme.title}
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                <Typography>{programme.description}</Typography>
                {/* <Typography component={Stack} direction="row" spacing={2}>
                  <Typography fontWeight="bolder">Duration:</Typography>
                  <Typography>{programme.duration}</Typography>
                </Typography> */}
              </Stack>
            </AccordionDetails>
          </Accordion>
        );
      })}

      {error && (
        <AlertPopup
          open={true}
          message={error?.response?.data?.message || "Internal server error"}
          severity="error"
        />
      )}
      {isSuccess && data && (
        <AlertPopup open={true} message={saveData.message} />
      )}

      <Formik
        initialValues={{
          userId: userData?.id || "",
          programmes: studentProgrammes || "",
          completed: userData?.studentProgrammes?.length > 0 ? true : false
        }}
        validationSchema={Yup.object().shape({
          programmes: Yup.array().required("Please select atleast one interest")
        })}
        onSubmit={(values) => {
          console.log(values);
          mutate(values);
        }}
        enableReinitialize
      >
        {({ setFieldValue, values, errors }) => {
          // console.log(errors)
          return (
            <Form>
              <Stack spacing={2} alignItems="end">
                <FormControl fullWidth>
                  <InputLabel id="demo-multiple-checkbox-label">
                    Select your interest(s)
                  </InputLabel>
                  <Autocomplete
                    multiple
                    options={data?.programmes}
                    defaultValue={
                      values?.programmes ? values?.programmes : null
                    }
                    isOptionEqualToValue={(option, value) => {
                      return JSON.stringify(option) === JSON.stringify(value);
                    }}
                    onChange={(e, value) => {
                      setFieldValue("programmes", value);
                    }}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.title}
                    renderOption={(props, option, { selected }) => {
                      return (
                        <li {...props} key={option.id}>
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option.title}
                        </li>
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        {...params}
                        // label="Select Interest(s)"
                        // placeholder="Select Interest(s)"
                      />
                    )}
                  />
                </FormControl>

                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  fullWidth={{ md: false, xs: true }}
                >
                  {loading ? <CircularProgress /> : "Save"}
                </Button>
              </Stack>
            </Form>
          );
        }}
      </Formik>
    </Stack>
  );
};

export default LearnerProgrammes;
