import {
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  useTheme
} from "@mui/material";
import blueLogo from "../images/blueLogo-transparentBg.png";
import whiteLogo from "../images/whiteLogo-bgwhite.png";
import React from "react";

const Policy = () => {
  const theme = useTheme();
  const popi = [
    "I hereby give my consent to FASSET to collect, process and distribute my personal information where FASSET is legally required to do so.",
    "I understand my right to privacy and the right to have my personal information processed in accordance with the conditions for the lawful processing of personal information.",
    "I acknowledge that I understand the purposes for which my personal information is required and for which it will be used.",
    "I hereby consent that I understand that third parties will have access to my personal information, and I hereby consent to FASSET sharing my personal information strictly for reporting to the relevant Executive Authority.",
    "I understand that, should I refuse to provide FASSET with the required consent and/ or information, the FASSET will be unable to assist me with recruitment requirements for the learnership.",
    "I understand further that all my personal information which I provide to FASSET will be held and/ or stored securely for the purpose for which it was collected.",
    "I declare that all my personal information supplied to the Services for the purposes of recruitment for the learnership and related legal and operational reasons is accurate, up to date, is not misleading and that it is complete in all respects.",
    "I undertake to immediately advise FASSET of any changes to my Personal Information should any of these details change."
  ];

  return (
    <Stack
      spacing={2}
      mt={8.5}
      paddingX={{ xs: 2, md: 20 }}
      paddingY={4}
      alignItems="center"
    >
      <img
        src={theme.palette.mode === "dark" ? whiteLogo : blueLogo}
        alt=""
        height={150}
        width={150}
      />
      <Typography
        fontWeight="bolder"
        fontSize={{ xs: 15, md: 30 }}
        textAlign="center"
      >
        CONSENT TO PROCESS PERSONAL INFORMATION IN TERMS OF THE PROTECTION OF
        INFORMATION ACT, 4 OF 2013 (POPI){" "}
      </Typography>

      <Stack>
        {popi.map((p, i) => {
          return (
            <List
              sx={{
                width: { xs: "100%", md: "80%" },
                margin: "auto",
                border: 1
              }}
            >
              <ListItem>
                <Typography fontWeight="bolder">
                  {i + 1 + "."}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Typography>
                <ListItemText primary={p} />
              </ListItem>
            </List>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default Policy;
