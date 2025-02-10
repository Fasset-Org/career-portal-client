import * as React from "react";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import SchoolIcon from "@mui/icons-material/School";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SubjectIcon from "@mui/icons-material/Subject";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { Paper, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import BasicEducation from "./BasicEducation";
import TertiaryEducation from "./TertiaryEducation";
import ProfessionalsSkills from "./ProfessionalsSkills";
import CertificateAndTraining from "./CertificateAndTraining";
import Attachments from "./Attachments";
import LearnerProgrammes from "./LearnerProgrammes";
import { useQuery } from "@tanstack/react-query";
import ApiQueries from "../apiQuries";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Stack
          component={Paper}
          height={"70.2vh"}
          sx={{ borderRadius: 0, ovoverflowY: "auto" }}
        >
          <Typography>{children}</Typography>
        </Stack>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

export default function AboutUserInfo() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { data } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => {
      return ApiQueries.userInfo();
    }

    // staleTime: 1000 * 60 * 60 * 24
  });

  // console.log(data);

  return (
    <Stack spacing={2} width="100%">
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        aria-label="scrollable auto tabs example"
        sx={{
          [`& .${tabsClasses.scrollButtons}`]: {
            "&.Mui-disabled": { opacity: 0.3 }
          },
          bgcolor: "background.paper",
          // border: 1,
          // borderColor: "secondary.main"
          borderRadius: 0
        }}
        TabIndicatorProps={{
          sx: {
            display: "none"
          }
        }}
        component={Paper}
        TabScrollButtonProps={{
          sx: {
            color: "primary.main",
            fontSize: 20,
            fontWeight: "bolder"
          }
        }}
      >
        <Tab
          label="Basic Education"
          icon={<AutoStoriesIcon />}
          iconPosition="start"
          sx={{
            fontWeight: "bolder",
            fontSize: 14,
            textTransform: "capitalize",
            "&::after": {
              content: `"*"`,
              color: "red"
            }
          }}
          {...a11yProps(0)}
        />
        <Tab
          label="Tertiary Education"
          icon={<SchoolIcon />}
          iconPosition="start"
          sx={{
            fontWeight: "bolder",
            fontSize: 14,
            textTransform: "capitalize"
          }}
          {...a11yProps(1)}
        />
        <Tab
          label="Professionals Skiils"
          icon={<SettingsSuggestIcon />}
          iconPosition="start"
          sx={{
            fontWeight: "bolder",
            fontSize: 14,
            textTransform: "capitalize"
          }}
          {...a11yProps(2)}
        />
        <Tab
          label="Certification"
          icon={<CardMembershipIcon />}
          iconPosition="start"
          sx={{
            fontWeight: "bolder",
            fontSize: 14,
            textTransform: "capitalize"
          }}
          {...a11yProps(3)}
        />
        <Tab
          label="Documents"
          icon={<AttachFileIcon />}
          iconPosition="start"
          sx={{
            fontWeight: "bolder",
            fontSize: 14,
            textTransform: "capitalize",
            "&::after": {
              content: `"*"`,
              color: "red"
            }
          }}
          {...a11yProps(4)}
        />
        <Tab
          label="Learner Programmes"
          icon={<SubjectIcon />}
          iconPosition="start"
          sx={{
            fontWeight: "bolder",
            fontSize: 14,
            textTransform: "capitalize",
            "&::after": {
              content: `"*"`,
              color: "red"
            }
          }}
          {...a11yProps(5)}
        />
      </Tabs>

      <TabPanel value={value} index={0}>
        <BasicEducation />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TertiaryEducation />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ProfessionalsSkills />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <CertificateAndTraining />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Attachments />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <LearnerProgrammes />
      </TabPanel>
    </Stack>
  );
}
