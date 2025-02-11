import {
  Avatar,
  Box,
  Card,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography
} from "@mui/material";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import ApiQueries from "../apiQuries";
import EditLearnerBasicInformation from "./modals/EditLearnerBasicInformation";
import EditAddressInforModal from "./modals/AddressInforModal";
import LearnerInformation from "./LearnerInformation";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import PlaceIcon from "@mui/icons-material/Place";
import PublicIcon from "@mui/icons-material/Public";

const StudentsHome = () => {
  // const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const { data } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => {
      return ApiQueries.userInfo();
    }

    // staleTime: 1000 * 60 * 60 * 24
  });

  return (
    <Stack
      direction={{ md: "row", xs: "column", sm: "column" }}
      mt={10}
      spacing={2}
      padding={2}
    >
      <Stack width={{ md: "25%", xs: "100%", sm: "100%" }} alignItems="center">
        <Card
          sx={{
            width: "100%",
            // p: 2,
            borderRadius: 0,
            minHeight: "80vh"
          }}
          elevation={2}
        >
          <Stack>
            <Grid container height={100} width="100%">
              <Grid item container xs={10} md={10}>
                <Grid item xs={3} md={3}>
                  <Stack
                    height="100%"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Avatar
                      sx={{
                        backgroundColor: "transparent",
                        color: "primary.main",
                        fontWeight: "bolder",
                        fontSize: 30,
                        width: 60,
                        height: 60,
                        border: "1px solid lightgray",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      {data?.firstName?.charAt(0)}
                      {data?.lastName?.charAt(0)}
                    </Avatar>
                  </Stack>
                </Grid>
                <Grid item md={9} xs={9}>
                  <Stack
                    justifyContent="center"
                    height="100%"
                    padding={{ xs: 1, md: 0 }}
                  >
                    <Typography
                      fontWeight="bolder"
                      sx={{ color: "primary.main", fontSize: 15 }}
                    >
                      {data?.firstName &&
                        `${data?.firstName} ${data?.middleName || ""} ${
                          data?.lastName
                        }`}
                    </Typography>
                    {data?.studentInformation?.careerStatus ? (
                      <Typography sx={{ fontSize: 10 }}>
                        {data?.studentInformation?.careerStatus}
                      </Typography>
                    ) : (
                      <Typography color="red" fontSize={10} width="90">
                        Occupation*
                      </Typography>
                    )}
                  </Stack>
                </Grid>
              </Grid>
              <Grid item xs={2} md={2}>
                <Stack
                  width="100%"
                  height="100%"
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <EditLearnerBasicInformation userInfo={data} />
                </Stack>
              </Grid>
            </Grid>
            <Divider />
          </Stack>

          <Stack spacing={2} padding={2}>
            <Stack direction="row" alignItems="center">
              <IconButton size="large">
                <EmailIcon fontSize="large" sx={{ color: "primary.main" }} />
              </IconButton>

              <Typography fontSize={14}>{data?.email}</Typography>
            </Stack>
            {/* <Divider sx={{ borderWidth: 0.1 }} /> */}
            <Stack direction="row" alignItems="center">
              <IconButton size="large">
                <PhoneIcon fontSize="large" sx={{ color: "primary.main" }} />
              </IconButton>

              <Typography fontSize={14}>
                {"+27 "} {data?.studentInformation?.mobileNumber}
              </Typography>
            </Stack>

            {/* <Divider sx={{ borderWidth: 0.1 }} /> */}
            <Stack direction="row" alignItems="center">
              <IconButton size="large">
                <FingerprintIcon
                  fontSize="large"
                  sx={{ color: "primary.main" }}
                />
              </IconButton>

              {data?.studentInformation?.identificationNumber ? (
                <>
                  <Typography fontSize={14}>
                    {data?.studentInformation?.identificationNumber || "None"}
                  </Typography>
                </>
              ) : (
                <>
                  <Typography fontWeight="bolder" fontSize={14}>
                    Passport Number :
                  </Typography>{" "}
                  <Typography fontSize={14}>
                    {data?.studentInformation?.passportNumber || "None"}
                  </Typography>
                </>
              )}
            </Stack>

            <Stack direction="row" alignItems="center">
              <IconButton size="large">
                <PublicIcon fontSize="large" sx={{ color: "primary.main" }} />
              </IconButton>

              <Typography fontSize={14}>
                {data?.studentInformation?.race}
              </Typography>
            </Stack>

            {/* <Divider sx={{ borderWidth: 0.1 }} /> */}
            <Stack direction="row" alignItems="center">
              <IconButton size="large">
                <AssuredWorkloadIcon
                  fontSize="large"
                  sx={{ color: "primary.main" }}
                />
              </IconButton>

              <Typography fontSize={14}>
                {data?.studentInformation?.careerStatus}
              </Typography>
            </Stack>

            <Divider sx={{ borderWidth: 0.1 }} />
            <Typography color="red" fontSize={10} textAlign="center" width="90">
              Please note that your address will determine where you will be
              placed.
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack direction="row" alignItems="center">
                <IconButton size="large">
                  <PlaceIcon fontSize="large" sx={{ color: "primary.main" }} />
                </IconButton>

                {data?.studentAddress ? (
                  <Typography>
                    {`${data?.studentAddress?.streetNumber}, ${data?.studentAddress?.streetName}, ${data?.studentAddress?.suburb},
${data?.studentAddress?.city}, ${data?.studentAddress?.province}, ${data?.studentAddress?.postalCode} ${data?.studentAddress?.manicipality}`}
                  </Typography>
                ) : (
                  <Typography color="red" fontSize={10} textAlign="center">
                    Location required
                  </Typography>
                )}
              </Stack>
              <EditAddressInforModal studentAddress={data?.studentAddress} />
            </Stack>
          </Stack>

          {/* <Stack spacing={0.5} alignItems="center" justifyContent="center">
            <Stack width="100%" direction="row" justifyContent="end">
              <EditLearnerBasicInformation userInfo={data} />
            </Stack>

            <Box
              height={100}
              width={100}
              borderRadius="50%"
              border={1}
              borderColor="lightgray"
              component={Stack}
              justifyContent="center"
              alignItems="center"
            >
              <Typography
                fontWeight="bolder"
                sx={{ color: "primary.main", fontSize: 30 }}
              >
                {data?.firstName?.charAt(0)}
                {data?.lastName?.charAt(0)}
              </Typography>
            </Box>
            <Typography fontSize={18} fontWeight="bolder" textAlign="center">
              {data?.firstName &&
                `${data?.firstName} ${data?.middleName || ""} ${
                  data?.lastName
                }`}
            </Typography>
            <Typography component={Stack} direction="row">
              <Typography fontWeight="bolder" fontSize={14}>
                Email :
              </Typography>
              &nbsp;&nbsp;
              <Typography fontSize={14}>{data?.email}</Typography>
            </Typography>
            <Typography component={Stack} direction="row">
              <Typography fontWeight="bolder" fontSize={14}>
                Contact :
              </Typography>{" "}
              &nbsp;&nbsp;
              <Typography fontSize={14}>
                {"+27 "} {data?.studentInformation?.mobileNumber || "None"}
              </Typography>
            </Typography>
            <Typography textAlign="center" component={Stack} direction="row">
              <Typography fontSize={14} fontWeight="bolder">
                Occupation :
              </Typography>{" "}
              &nbsp;&nbsp;
              <Typography fontSize={14}>
                {data?.studentInformation?.careerStatus || "None"}
              </Typography>
            </Typography>
            <Typography component={Stack} direction="row">
              {data?.studentInformation?.identificationNumber ? (
                <>
                  <Typography fontWeight="bolder" fontSize={14}>
                    ID Number :
                  </Typography>{" "}
                  <Typography fontSize={14}>
                    {data?.studentInformation?.identificationNumber || "None"}
                  </Typography>
                </>
              ) : (
                <>
                  <Typography fontWeight="bolder" fontSize={14}>
                    Passport Number :
                  </Typography>{" "}
                  <Typography fontSize={14}>
                    {data?.studentInformation?.passportNumber || "None"}
                  </Typography>
                </>
              )}
            </Typography>

            <Divider sx={{ width: "100%" }} />

            <Stack
              spacing={2}
              paddingTop={2}
              direction="row"
              justifyContent="space-between"
            >
       
              <Typography
                color="red"
                fontSize={10}
                textAlign="center"
                width="90"
              >
                Please note that your address will determine where you will be
                placed.
              </Typography>
              <EditAddressInforModal studentAddress={data?.studentAddress} />
            </Stack>
            <Typography fontSize={18} fontWeight="bolder">
              {data.studentAddress && "Address Information"}
            </Typography>
            <Typography fontSize={14}>
              {data?.studentAddress?.streetNumber
                ? `${data?.studentAddress.streetNumber}, ${data?.studentAddress.streetName}`
                : ""}
            </Typography>
            <Typography fontSize={14}>
              {(data?.studentAddress && data?.studentAddress.suburb) || ""}
            </Typography>
            <Typography fontSize={14}>
              {(data?.studentAddress && data?.studentAddress.city) || ""}
            </Typography>
            <Typography fontSize={14}>
              {(data?.studentAddress && data?.studentAddress.province) || ""}
            </Typography>
            <Typography fontSize={14}>
              {(data?.studentAddress && data?.studentAddress.postalCode) || ""}
            </Typography>
            <Typography fontSize={14} textAlign="center">
              {(data?.studentAddress && data?.studentAddress.manicipality) ||
                ""}
            </Typography>
          </Stack> */}
        </Card>
      </Stack>
      <Stack
        width={{ md: "75%", xs: "100%" }}
        // pl={!useMediaQuery(theme.breakpoints.down("md")) && 2}
        // mt={2}
        // alignItems="end"
        // minHeight={700}
      >
        <LearnerInformation />
      </Stack>
    </Stack>
  );
};

export default StudentsHome;
