import { createTheme } from "@mui/material";

export const themeDark = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          border: "1px solid #202020ff",
          borderRadius: 0
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid #202020ff",
          borderRadius: "5px"
        }
      }
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          color: "#FFFFFF"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          height: 50,
          borderRadius: 0,
          fontWeight: "bolder"
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#1ccaff"
        }
      }
    }
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#1ccaff"
    },
    secondary: {
      main: "#0FFFB3"
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#333"
    },
    background: {
      // paper: "#444444da",
      paper: "#202020ff",
      default: "#191919ff"
    }
  },
  typography: {
    fontSize: 12,
    fontFamily: "Roboto, Reenie Beanie"
  }
});

export const themeLight = createTheme({
  components: {
    MuiDivider: {
      styleOverrides: {
        root: {
          borderWidth: 1,
          opacity: 0.8
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 0
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "10px"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          height: 50,
          borderRadius: 0,
          fontWeight: "bolder"
        }
      }
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          color: "#FFFFFF"
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#163683"
        }
      }
    }
  },
  palette: {
    mode: "light",
    primary: {
      light: "#1f2f79",
      main: "#163683",
      info: "#333",
      contrastText: "#ffffff"
    },
    secondary: {
      main: "#14a37f",
      contrastText: "#ffffff"
    },
    background: {
      paper: "#fbfbfbff"
      // default: "#f3f3f3ff"
    }
  },
  typography: {
    fontSize: 11,
    fontFamily: "Arial"
  }
});
