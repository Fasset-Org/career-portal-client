// import { useQuery } from "@tanstack/react-query";
// import ApiQueries from "../apiQuries";
// import StudentsHome from "../components/StudentsHome";
import { Button, Stack, Typography } from "@mui/material";
import bgImg from "../images/Untitled-2.bcecf2a1201a8f598c47.png";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  // const { data } = useQuery({
  //   queryKey: ["userInfo"],
  //   queryFn: () => {
  //     return ApiQueries.userInfo();
  //   }

  //   // staleTime: 1000 * 60 * 60 * 24
  // });

  // if(data?.userType === 'student'){
  //   return <StudentsHome />
  // }

  return (
    <Stack>
      <Stack
        sx={{
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "200px -100px",
          minHeight: "90vh",
          maxHeight: "110vh",
          width: "100%",
          backgroundColor: "#FFFFFF"
        }}
        spacing={2}
        padding={2}
        paddingX={10}
      >
        <Stack spacing={2} width="50%">
          <Typography
            fontSize={30}
            fontWeight="bolder"
            // fontFamily="Roboto, Reenie Beanie"
          >
            Introduction
          </Typography>
          <Typography textAlign="justify">
            Welcome to the FASSET learner portal. The purpose of this portal is
            to assist young people with information of career paths that are
            available in the financial sector. This portal also serves as a
            platform for learners to join a database and for training providers
            and employers to access information on potential learners seeking to
            join education and training in the financial sector and / or seek
            placement.
          </Typography>

          <Typography>
            The finance and accounting services sector is particularly important
            because it is the largest employer of people with financial
            management, accounting, and auditing skills. This sector includes:
          </Typography>

          <ol>
            <li>
              <Typography>
                Investment entities and trusts and company secretary services
              </Typography>
            </li>
            <li>
              <Typography>Stockbroking and financial markets.</Typography>
            </li>
            <li>
              <Typography>Financial development organisations.</Typography>
            </li>
            <li>
              <Typography>
                Accounting, bookkeeping, auditing and tax services.
              </Typography>
            </li>
            <li>
              <Typography>
                Business and management consulting services.
              </Typography>
            </li>
            <li>
              <Typography>
                The South African Revenue Service; the national and provincial
                treasuries
              </Typography>
            </li>
            <li>
              <Typography>
                And other activities auxiliary to financial intermediation, such
                as debt collection.
              </Typography>
            </li>
          </ol>
          <Typography>
            If you are interested in learning more about how FASSET can help you
            achieve more in your career, please register and complete your
            profile.
          </Typography>
          <Stack spacing={2} direction="row">
            <Button
              variant="contained"
              color="primary"
              endIcon={<LoginIcon />}
              sx={{ fontWeight: "bolder" }}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>

            <Button
              variant="outlined"
              // color="warning"
              endIcon={<AppRegistrationIcon />}
              sx={{ fontWeight: "bolder" }}
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<AppRegistrationIcon />}
              sx={{ fontWeight: "bolder" }}
            >
              Download Career Guide
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Home;
