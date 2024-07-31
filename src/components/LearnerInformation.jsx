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
import { Alert, Paper, Stack, Typography, useMediaQuery } from "@mui/material";
import PropTypes from "prop-types";
import BasicEducation from "./BasicEducation";
import TertiaryEducation from "./TertiaryEducation";
import ProfessionalsSkills from "./ProfessionalsSkills";
import CertificateAndTraining from "./CertificateAndTraining";
import Attachments from "./Attachments";
import LearnerProgrammes from "./LearnerProgrammes";
import { useQuery } from "@tanstack/react-query";
import ApiQueries from "../apiQuries";
import { useTheme } from "@mui/material/styles";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
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
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

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

  console.log(data);

  return (
    <Stack spacing={2} width="100%" mt={!data?.profileProgress ? -1.5 : 6}>
      {isDesktop && data?.profileProgress < 100 && (
        <Alert color="error" severity="error">
          Please completed required profile information to be considered for any
          interest(s)
        </Alert>
      )}
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
          bgcolor: "background.paper"
          // border: 1,
          // borderColor: "secondary.main"
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
