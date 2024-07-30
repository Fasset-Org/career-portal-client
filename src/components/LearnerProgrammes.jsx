import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Checkbox,
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
import { useQuery } from "@tanstack/react-query";
import ApiQueries from "../apiQuries";
import { Formik } from "formik";
import * as Yup from "yup";

const LearnerProgrammes = () => {
  // const [selectedInterest, setSelectedInterest] = React.useState();
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const theme = useTheme();

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

  if (isLoading) {
    return <LinearProgress />;
  }

  console.log(data);

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
                <Typography component={Stack} direction="row" spacing={2}>
                  <Typography fontWeight="bolder">Duration:</Typography>
                  <Typography>{programme.duration}</Typography>
                </Typography>
              </Stack>
            </AccordionDetails>
          </Accordion>
        );
      })}

      <Formik
        initialValues={{
          userId: userData?.id || "",
          programmeId: ""
        }}
        validationSchema={Yup.object().shape({
          programmeId: Yup.string().required(
            "Please select atleast one interest"
          )
        })}
        onSubmit={(values) => {}}
        enableReinitialize
      >
        {() => {
          return (
            <FormControl sx={{ m: 1 }} fullWidth>
              <InputLabel id="demo-multiple-checkbox-label">
                Select your interest(s)
              </InputLabel>
              <Autocomplete
                multiple
                options={data?.programmes}
                onChange={(e, value) => {
                  // setSelectedInterest(value);
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
          );
        }}
      </Formik>
    </Stack>
  );
};

export default LearnerProgrammes;
