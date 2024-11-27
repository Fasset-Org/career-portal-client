import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
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
import {
  Avatar,
  Button,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  styled,
  useMediaQuery
} from "@mui/material";
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
import logo from "../../images/horizontail-white-logo.jpg";
import { useNavigate } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import Close from "@mui/icons-material/Close";
// import { DeleteAccountModal } from "../DeleteAccountModal";
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
  // marginTop: 8,
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
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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

  console.log(data);

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
          borderRadius: 0, //currentTheme ? 5 : 0,
          width: "100%",
          backgroundColor: currentTheme && "#FFFFFF",
          borderColor: currentTheme && "lightgray",
          boxShadow: 0
        }}
      >
        <Toolbar>
          {data && data.userType === "admin" && (
            <>
              {open ? (
                <IconButton
                  aria-label="open drawer"
                  onClick={handleDrawerClose}
                  edge="start"
                  size="medium"
                >
                  <Close fontSize="medium" />
                </IconButton>
              ) : (
                <IconButton
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  size="medium"
                >
                  <MenuIcon fontSize="medium" />
                </IconButton>
              )}
            </>
          )}

          <img src={logo} width={160} height={65} alt="" />
          <Box sx={{ mx: "auto" }}></Box>
          <Stack direction="row" spacing={2}>
            <Stack
              direction="row"
              spacing={1}
              justifyContent="center"
              alignItems="center"
            >
              {data ? (
                <>
                  <Tooltip title="Set Theme">
                    {isDesktop ? (
                      <>
                        {currentTheme ? (
                          <IconButton
                            onClick={() => setThemeMode(!currentTheme)}
                            size="medium"
                          >
                            <DarkModeIcon fontSize="medium" />
                          </IconButton>
                        ) : (
                          <IconButton
                            onClick={() => setThemeMode(!currentTheme)}
                            size="medium"
                          >
                            <LightModeIcon fontSize="medium" />
                          </IconButton>
                        )}
                      </>
                    ) : (
                      <>
                        {currentTheme ? (
                          <IconButton
                            onClick={() => setThemeMode(!currentTheme)}
                            size="large"
                          >
                            <DarkModeIcon fontSize="large" />
                          </IconButton>
                        ) : (
                          <IconButton
                            onClick={() => setThemeMode(!currentTheme)}
                            size="large"
                          >
                            <LightModeIcon fontSize="large" />
                          </IconButton>
                        )}
                      </>
                    )}
                  </Tooltip>

                  {/* <SignOutButton /> */}

                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open">
                      <IconButton
                        onClick={handleOpenUserMenu}
                        sx={{ p: 0, bgcolor: "primary.main" }}
                      >
                        <Avatar>
                          {data?.firstName.charAt(0).toUpperCase()}
                        </Avatar>
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right"
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right"
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      <MenuItem onClick={handleCloseUserMenu}>
                        <SignOutButton />
                      </MenuItem>

                      {/* <MenuItem>
                        <DeleteAccountModal id={data.id} />
                      </MenuItem> */}
                    </Menu>
                  </Box>
                </>
              ) : isDesktop ? (
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
              ) : (
                <>
                  <IconButton onClick={handleClick} size="large">
                    <MoreVertIcon fontSize="large" />
                  </IconButton>

                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={openMenu}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1
                        },
                        "&::before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0
                        }
                      }
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem onClick={handleClose}>
                      <Button
                        endIcon={<LoginIcon />}
                        sx={{ fontWeight: "bolder" }}
                        onClick={() => navigate("/login")}
                      >
                        Login
                      </Button>
                    </MenuItem>

                    <MenuItem onClick={handleClose}>
                      <Button
                        endIcon={<AppRegistrationIcon />}
                        sx={{ fontWeight: "bolder" }}
                        onClick={() => navigate("/register")}
                      >
                        Register
                      </Button>
                    </MenuItem>
                  </Menu>
                </>
              )}
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>

      {data && data.userType === "admin" && (
        <Drawer variant="permanent" open={open}>
          <DrawerHeader sx={{ backgroundColor: "primary.dark" }}></DrawerHeader>
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
              {
                title: "All Learners",
                icon: PeopleOutlineIcon,
                url: "/learners"
              },
              {
                title: "Enrolled Learners",
                icon: AssignmentIndIcon,
                url: "enrolledLearners"
              },
              {
                title: "Previous Learners",
                icon: PersonAddDisabledIcon,
                url: "previousLearners"
              },
              {
                title: "Learner Programmes",
                icon: CastForEducationIcon,
                url: "adminLearnersProgrammes"
              }
            ].map((listItem, index) => (
              <ListItem
                key={listItem.title}
                disablePadding
                sx={{ display: "block" }}
                onClick={() => navigate(`${listItem.url}`)}
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
              { title: "Users", icon: GroupAddIcon, url: "/users" },
              { title: "Modules", icon: SettingsSuggestIcon, url: "/modules" }
            ].map((listItem, index) => (
              <ListItem
                key={listItem.title}
                disablePadding
                sx={{ display: "block" }}
                onClick={() => navigate(`${listItem.url}`)}
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
        {/* {data?.userType === "admin" && <DrawerHeader />} */}
        {children}
      </Main>
    </Box>
  );
}
