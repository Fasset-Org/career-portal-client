import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import logo from "../../images/white_logo_only.png";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MuiDrawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Button, Stack, Tooltip, styled } from "@mui/material";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoginIcon from "@mui/icons-material/Login";
import { SignOutButton } from "../SignOutButton";
import { useQuery } from "@tanstack/react-query";
import ApiQueries from "../../apiQuries";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import PersonAddDisabledIcon from "@mui/icons-material/PersonAddDisabled";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import logo2 from "../../images/blue_bg_only_logo.png";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: "hidden"
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
});

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    // marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    })
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "center",
  borderRadius: 0
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme)
  })
}));

export default function Navigation({ children, setThemeMode, currentTheme }) {
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => {
      return ApiQueries.userInfo();
    }

    // staleTime: 1000 * 60 * 60 * 24
  });

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: { md: "flex", xs: "block", sm: "block" },
        backgroundColor: currentTheme && "#FFFFFF"
      }}
      width="100%"
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        color="default"
        sx={{
          border: currentTheme && 1,
          borderRadius: currentTheme ? 5 : 0,
          width: "100%",
          backgroundColor: currentTheme && "#FFFFFF",
          borderColor: currentTheme && "lightgray",
          boxShadow: 0
        }}
      >
        <Toolbar>
          {data && data.userType !== "student" && (
            <>
              {open ? (
                <IconButton
                  aria-label="open drawer"
                  onClick={handleDrawerClose}
                  edge="start"
                >
                  <MenuIcon />
                </IconButton>
              ) : (
                <IconButton
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                >
                  <MenuIcon />
                </IconButton>
              )}
            </>
          )}

          <Stack direction="row" alignItems="center" width="100%">
            <IconButton>
              <Avatar src={logo2} />
            </IconButton>
            <Stack width="100%">
              <Typography
                variant="h6"
                noWrap
                component="div"
                // textTransform="uppercase"
                fontSize={14}
                // onClick={() => navigate("/home")}
                textTransform="uppercase"
                fontWeight="bolder"
                // letterSpacing={6}
              >
                LEARNER PORTAL
              </Typography>
              <Typography
                fontSize={9}
                // border={1}
                sx={{ position: "relative", bottom: 5, height: 10 }}
                letterSpacing={2}
              >
                <i>Make the future count</i>
              </Typography>
            </Stack>
          </Stack>

          <Box sx={{ mx: "auto" }}></Box>
          <Stack direction="row" spacing={2}>
            {/* <Tooltip title="Set Theme">
              {currentTheme ? (
                <IconButton onClick={() => setThemeMode(!currentTheme)}>
                  <DarkModeIcon />
                </IconButton>
              ) : (
                <IconButton onClick={() => setThemeMode(!currentTheme)}>
                  <WbSunnyTwoToneIcon />
                </IconButton>
              )}
            </Tooltip> */}
            <Stack direction="row" spacing={2}>
              {/* <Tooltip title="Set Theme">
              {currentTheme ? (
                <IconButton onClick={() => setThemeMode(!currentTheme)}>
                  <DarkModeIcon />
                </IconButton>
              ) : (
                <IconButton onClick={() => setThemeMode(!currentTheme)}>
                  <WbSunnyTwoToneIcon />
                </IconButton>
              )}
            </Tooltip> */}

              {data ? (
                <>
                  <Tooltip title="Set Theme">
                    {currentTheme ? (
                      <IconButton onClick={() => setThemeMode(!currentTheme)}>
                        <DarkModeIcon />
                      </IconButton>
                    ) : (
                      <IconButton onClick={() => setThemeMode(!currentTheme)}>
                        <LightModeIcon />
                      </IconButton>
                    )}
                  </Tooltip>
                  <Avatar
                    variant="circular"
                    sx={{
                      bgcolor: "#FFFFFF",
                      color: "primary.main",
                      fontWeight: "bolder",
                      border: 1,
                      borderColor: "lightgray"
                    }}
                  >
                    {data?.firstName?.charAt(0)}
                  </Avatar>
                  <SignOutButton />
                </>
              ) : (
                <>
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
                </>
              )}
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>

      {data && data.userType !== "student" && (
        <Drawer variant="permanent" open={open}>
          <DrawerHeader sx={{ backgroundColor: "primary.dark" }}>
            {/* <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton> */}
            <img src={logo} alt="" width={40} height={40} />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                ml: 2,
                width: { xs: "100%", md: "fit-content" },
                textAlign: "center",
                color: "#FFFFFF"
              }}
            >
              Learner Portal
            </Typography>
          </DrawerHeader>
          <Divider />
          {open && (
            <Stack paddingX={2} pt={2} alignItems="center">
              <Typography fontWeight="bolder" textTransform="uppercase">
                Activities
              </Typography>
            </Stack>
          )}
          <List>
            {[
              { title: "All Learners", icon: PeopleOutlineIcon },
              { title: "Active Learners", icon: AssignmentIndIcon },
              { title: "Past Learners", icon: PersonAddDisabledIcon }
            ].map((listItem, index) => (
              <ListItem
                key={listItem.title}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center"
                    }}
                  >
                    <listItem.icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={listItem.title}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          {open && (
            <Stack paddingX={2} pt={2} alignItems="center">
              <Typography fontWeight="bolder" textTransform="uppercase">
                User Management
              </Typography>
            </Stack>
          )}
          <List>
            {[
              { title: "Users", icon: GroupAddIcon },
              { title: "Modules", icon: SettingsSuggestIcon }
            ].map((listItem, index) => (
              <ListItem
                key={listItem.title}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center"
                    }}
                  >
                    <listItem.icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={listItem.title}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}

      <Main open={open} sx={{ p: 0 }}>
        {data?.userType !== "student" && <DrawerHeader />}
        {children}
      </Main>
    </Box>
  );
}
