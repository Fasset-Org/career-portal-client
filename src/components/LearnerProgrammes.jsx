import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Checkbox,
  FormControl,
  InputLabel,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { useTheme } from "@mui/material/styles";

const LearnerProgrammes = () => {
  // const [selectedInterest, setSelectedInterest] = React.useState();
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const theme = useTheme();

  const themeMode = theme.palette.mode;

  // console.log(themeMode);

  // const handleChange = (event) => {
  //   const {
  //     target: { value }
  //   } = event;
  //   setSelectedInterest(
  //     // On autofill we get a stringified value.
  //     typeof value === "string" ? value.split(",") : value
  //   );
  // };

  const leanerInterventions = [
    {
      label: "Learnership Unemployed",
      value: "Learnership Unemployed",
      programmeName: "Learnership Unemployed",
      programeDesc:
        "This is a structured learning programme which includes theoretical and practical workplace experiential learning over a period of at least 12 months and which leads to an occupationally related qualification registered on the NQF. Learners are allocated a monthly stipend for the duration of the programme.",
      programmeDuration: "12 Months"
    },
    {
      label:
        "Internship: HET Full Qualification (unemployed entering workplace)",
      value:
        "Internship: HET Full Qualification (unemployed entering workplace)",
      programmeName:
        "Internship: HET Full Qualification (unemployed entering workplace)",
      programeDesc:
        "This is a 12 month workplace experience programme designed for candidates who have already completed an NQF Level 5 and higher qualification that is relevant for employment in the services sector, but have not yet gathered the necessary practical experience to enable them to obtain employment.",
      programmeDuration: "12 Months"
    },
    {
      label: "Internship: FET Part Qualification (N6)",
      value: "Internship: FET Part Qualification (N6)",
      programmeName: "Internship: FET Part Qualification (N6)",
      programeDesc:
        "This is an 18 months’ workplace experience programme designed for candidates who have already completed an N6 qualification relevant for employment in the services sector, but have not yet gathered the necessary practical experience to enable them to obtain a National Diploma.",
      programmeDuration: "18 Months"
    },
    {
      label: "Internship: FET Full Qualification (NCV)",
      value: "Internship: FET Full Qualification (NCV)",
      programmeName: "Internship: FET Full Qualification (NCV)",
      programeDesc:
        "This is a 12 months’ workplace experience programme designed for candidates who have already completed an NQF level 1, 2, 3 or 4 national vocational qualification that is relevant for employment in the services sector, but have not yet gathered the necessary practical experience to enable them to obtain employment.",
      programmeDuration: "12 Months"
    },
    {
      label: "Internship: Work Integrated Learning (HET Part of Qualification)",
      value: "Internship: Work Integrated Learning (HET Part of Qualification)",
      programmeName:
        "Internship: Work Integrated Learning (HET Part of Qualification)",
      programeDesc:
        "This is a 12 months’ workplace experience programme designed for candidates who have already completed an NQF Level 5 and higher part-qualification relevant for employment in the services sector, but have not yet gathered the necessary practical experience to enable them to obtain the full qualification.",
      programmeDuration: "18 Months"
    },
    {
      label: "Bursary Employed: HET",
      value: "Bursary Employed: HET",
      programmeName: "Bursary Employed: HET",
      programeDesc:
        "This is a grant awarded to employed learners enrolled for part qualifications or full qualifications registered on the NQF.",
      programmeDuration: "12 Months"
    },
    {
      label: "Learnership Employed",
      value: "Learnership Employed",
      programmeName: "Learnership Employed",
      programeDesc:
        "This is a structured Learnership which includes theoretical & practical workplace experiential learning over a period of at least 12 months and leads to an occupationally related qualification registered on the NQF and up to NQF Level 5. Learners in this form of learnership programme already earn salaries and are therefore not entitled to a stipend.",
      programmeDuration: "12 Months"
    },
    {
      label: "Adult Education and Training",
      value: "Adult Education and Training",
      programmeName: "Adult Education and Training",
      programeDesc:
        "Principles and processes through which the prior knowledge and skills acquired by a person are identified, mediated and assessed for purposes admission to a formal course of study, recognition and certification.",
      programmeDuration: "12 Months"
    },
    {
      label: "Employed Skills Programme",
      value: "Employed Skills Programme",
      programmeName: "Employed Skills Programme",
      programeDesc:
        "This learning intervention has been designed to be an occupationally based, short term learning programme. When successfully completed by the learner, it constitutes credits towards a qualification registered on the NQF. The Skills Programme comprises of a cluster of unit standards derived from the same qualification.",
      programmeDuration: "12 Months"
    },
    {
      label: "Skills Programme Unemployed",
      value: "Skills Programme Unemployed",
      programmeName: "Skills Programme Unemployed",
      programeDesc:
        "This learning intervention has been designed to be an occupationally based, short term learning programme. When successfully completed by the learner, it constitutes credits towards a qualification registered on the NQF. The Skills Programme comprises of a cluster of unit standards derived from the same qualification.",
      programmeDuration: "12 Months"
    },
    {
      label: "Candidacy",
      value: "Candidacy",
      programmeName: "Candidacy",
      programeDesc:
        "This is a structured learning programme which includes theoretical and practical workplace experiential learning over a period of at least 12 months and which leads to an occupationally related qualification registered on the NQF. Learners are allocated a monthly stipend for the duration of the programme. This will lead to the entry to write the relevant professional body exam.",
      programmeDuration: "12 Months"
    }
  ];
  return (
    <Stack minHeight={100} padding={2} spacing={2}>
      <Typography sx={{ fontSize: 20, fontWeight: "bolder" }}>
        Learner Interventions
      </Typography>

      {leanerInterventions.map((programme, i) => {
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
              {programme.programmeName}
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                <Typography>{programme.programeDesc}</Typography>
                <Typography component={Stack} direction="row" spacing={2}>
                  <Typography fontWeight="bolder">Duration:</Typography>
                  <Typography>{programme.programmeDuration}</Typography>
                </Typography>
              </Stack>
            </AccordionDetails>
          </Accordion>
        );
      })}

      <FormControl sx={{ m: 1 }} fullWidth>
        <InputLabel id="demo-multiple-checkbox-label">
          Select your interest(s)
        </InputLabel>
        <Autocomplete
          multiple
          options={leanerInterventions}
          onChange={(e, value) => {
            // setSelectedInterest(value);
          }}
          disableCloseOnSelect
          getOptionLabel={(option) => option.label}
          renderOption={(props, option, { selected }) => {
            return (
              <li {...props} key={option.value}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.label}
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
      {/* <FormGroup>
        <FormControlLabel
          control={<Checkbox />}
          label={
            <Typography fontWeight="bolder">Learnership Unemployed</Typography>
          }
        />
        <Typography>
          This is a structured learning programme which includes theoretical and
          practical workplace experiential learning over a period of at least 12
          months and which leads to an occupationally related qualification
          registered on the NQF. Learners are allocated a monthly stipend for
          the duration of the programme.
        </Typography>
        <Typography component={Stack} direction="row">
          <Typography fontWeight="bolder">Duration:</Typography>
          <Typography>12 Months</Typography>
        </Typography>

        <Divider />
        <FormControlLabel
          control={<Checkbox />}
          label={
            <Typography fontWeight="bolder">
              Internship: HET Full Qualification (unemployed entering workplace)
            </Typography>
          }
        />
        <Typography>
          This is a 12 month workplace experience programme designed for
          candidates who have already completed an NQF Level 5 and higher
          qualification that is relevant for employment in the services sector,
          but have not yet gathered the necessary practical experience to enable
          them to obtain employment.
        </Typography>
        <Typography component={Stack} direction="row">
          <Typography fontWeight="bolder">Duration:</Typography>
          <Typography>12 Months</Typography>
        </Typography>

        <Divider />
        <FormControlLabel
          control={<Checkbox />}
          label={
            <Typography fontWeight="bolder">
              Internship: FET Part Qualification (N6)
            </Typography>
          }
        />
        <Typography>
          This is an 18 months’ workplace experience programme designed for
          candidates who have already completed an N6 qualification relevant for
          employment in the services sector, but have not yet gathered the
          necessary practical experience to enable them to obtain a National
          Diploma.
        </Typography>
        <Typography component={Stack} direction="row">
          <Typography fontWeight="bolder">Duration:</Typography>
          <Typography>18 Months</Typography>
        </Typography>

        <Divider />
        <FormControlLabel
          control={<Checkbox />}
          label={
            <Typography fontWeight="bolder">
              Internship: FET Full Qualification (NCV)
            </Typography>
          }
        />
        <Typography>
          This is a 12 months’ workplace experience programme designed for
          candidates who have already completed an NQF level 1, 2, 3 or 4
          national vocational qualification that is relevant for employment in
          the services sector, but have not yet gathered the necessary practical
          experience to enable them to obtain employment.
        </Typography>
        <Typography component={Stack} direction="row">
          <Typography fontWeight="bolder">Duration:</Typography>
          <Typography>12 Months</Typography>
        </Typography>

        <Divider />
        <FormControlLabel
          control={<Checkbox />}
          label={
            <Typography fontWeight="bolder">
              Internship: Work Integrated Learning (HET Part of Qualification)
            </Typography>
          }
        />
        <Typography>
          This is a 12 months’ workplace experience programme designed for
          candidates who have already completed an NQF Level 5 and higher
          part-qualification relevant for employment in the services sector, but
          have not yet gathered the necessary practical experience to enable
          them to obtain the full qualification.
        </Typography>
        <Typography component={Stack} direction="row">
          <Typography fontWeight="bolder">Duration:</Typography>
          <Typography>18 Months</Typography>
        </Typography>

        <Divider />
        <FormControlLabel
          control={<Checkbox />}
          label={
            <Typography fontWeight="bolder">Bursary Employed: HET</Typography>
          }
        />
        <Typography>
          This is a grant awarded to employed learners enrolled for part
          qualifications or full qualifications registered on the NQF.
        </Typography>
        <Typography component={Stack} direction="row">
          <Typography fontWeight="bolder">Duration:</Typography>
          <Typography>12 Months</Typography>
        </Typography>

        <Divider />
        <FormControlLabel
          control={<Checkbox />}
          label={
            <Typography fontWeight="bolder">Learnership Employed</Typography>
          }
        />
        <Typography>
          This is a structured Learnership which includes theoretical &
          practical workplace experiential learning over a period of at least 12
          months and leads to an occupationally related qualification registered
          on the NQF and up to NQF Level 5. Learners in this form of learnership
          programme already earn salaries and are therefore not entitled to a
          stipend.
        </Typography>
        <Typography component={Stack} direction="row">
          <Typography fontWeight="bolder">Duration:</Typography>
          <Typography>12 Months</Typography>
        </Typography>

        <Divider />
        <FormControlLabel
          control={<Checkbox />}
          label={
            <Typography fontWeight="bolder">
              Adult Education and Training
            </Typography>
          }
        />
        <Typography>
          Maximum of 12 months (Employed/Unemployed). Formal learning and
          training undertaken by adults for the improvement of their knowledge
          and skills for personal development, further learning and/or
          employment. This learning must result in a General Education and
          Training Certificate.
        </Typography>
        <Typography component={Stack} direction="row">
          <Typography fontWeight="bolder">Duration:</Typography>
          <Typography>12 Months</Typography>
        </Typography>

        <Divider />
        <FormControlLabel
          control={<Checkbox />}
          label={
            <Typography fontWeight="bolder">
              Recognition of Prior Learning
            </Typography>
          }
        />
        <Typography>
          Principles and processes through which the prior knowledge and skills
          acquired by a person are identified, mediated and assessed for
          purposes admission to a formal course of study, recognition and
          certification.
        </Typography>
        <Typography component={Stack} direction="row">
          <Typography fontWeight="bolder">Duration:</Typography>
          <Typography>12 Months</Typography>
        </Typography>

        <Divider />
        <FormControlLabel
          control={<Checkbox />}
          label={
            <Typography fontWeight="bolder">
              Employed Skills Programme
            </Typography>
          }
        />
        <Typography>
          This learning intervention has been designed to be an occupationally
          based, short term learning programme. When successfully completed by
          the learner, it constitutes credits towards a qualification registered
          on the NQF. The Skills Programme comprises of a cluster of unit
          standards derived from the same qualification.
        </Typography>
        <Typography component={Stack} direction="row">
          <Typography fontWeight="bolder">Duration:</Typography>
          <Typography>12 Months</Typography>
        </Typography>

        <Divider />
        <FormControlLabel
          control={<Checkbox />}
          label={
            <Typography fontWeight="bolder">
              Skills Programme Unemployed
            </Typography>
          }
        />
        <Typography>
          This learning intervention has been designed to be an occupationally
          based, short term learning programme. When successfully completed by
          the learner, it constitutes credits towards a qualification registered
          on the NQF. The Skills Programme comprises of a cluster of unit
          standards derived from the same qualification.
        </Typography>
        <Typography component={Stack} direction="row">
          <Typography fontWeight="bolder">Duration:</Typography>
          <Typography>12 Months</Typography>
        </Typography>

        <Divider />
        <FormControlLabel
          control={<Checkbox />}
          label={<Typography fontWeight="bolder">Candidacy</Typography>}
        />
        <Typography>
          This is a structured learning programme which includes theoretical and
          practical workplace experiential learning over a period of at least 12
          months and which leads to an occupationally related qualification
          registered on the NQF. Learners are allocated a monthly stipend for
          the duration of the programme. This will lead to the entry to write
          the relevant professional body exam.
        </Typography>
        <Typography component={Stack} direction="row">
          <Typography fontWeight="bolder">Duration:</Typography>
          <Typography>12 Months</Typography>
        </Typography>
      </FormGroup> */}
    </Stack>
  );
};

export default LearnerProgrammes;
