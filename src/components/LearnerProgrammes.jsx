import {
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Paper,
  Stack,
  Typography
} from "@mui/material";
import React from "react";

const LearnerProgrammes = () => {
  return (
    <Stack minHeight={100} padding={2} component={Paper}>
      <Typography textAlign="center">Learner Interventions</Typography>
      <FormGroup>
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
      </FormGroup>
    </Stack>
  );
};

export default LearnerProgrammes;
