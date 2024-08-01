// import "./App.css";
import Navigation from "./components/navigation/Navigation";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { ThemeProvider } from "@emotion/react";
import { themeDark, themeLight } from "./theme";
import { CssBaseline } from "@mui/material";
import { useState } from "react";
import LoginUser from "./pages/auth/LoginUser";
import "./App.css";
import RegisterUser from "./pages/auth/RegisterUser";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import StudentsHome from "./components/StudentsHome";
import Learners from "./components/admin/activities/Learners";
import EnrolledLearners from "./components/admin/activities/EnrolledLearners";
import PreviousLearners from "./components/admin/activities/PreviousLearners";
// import LearnerProgrammes from "./components/LearnerProgrammes";
import Users from "./components/admin/user-management/Users";
import Modules from "./components/admin/user-management/Modules";
import AdminLearnerProgrammes from "./components/admin/activities/AdminLearnerProgrammes";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

function App() {
  const [themeMode, setThemeMode] = useState(true);
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        retry: 0
      },
      queries: {
        retry: 0
      }
    }
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={themeMode ? themeLight : themeDark}>
        <CssBaseline />
        <Router>
          <Navigation setThemeMode={setThemeMode} currentTheme={themeMode}>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<LoginUser />} />
              <Route path="/register" element={<RegisterUser />} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />
              <Route
                path="/resetPassword/:resetToken"
                element={<ResetPassword />}
              />

              <Route path="/" element={<PrivateRoute />}>
                {/* Learner Routes */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<StudentsHome />} />
                {/* Admin Routes */}
                <Route path="/learners" element={<Learners />} />
                <Route
                  path="/enrolledLearners"
                  element={<EnrolledLearners />}
                />
                <Route
                  path="/previousLearners"
                  element={<PreviousLearners />}
                />
                <Route
                  path="/adminLearnersProgrammes"
                  element={<AdminLearnerProgrammes />}
                />
                <Route path="/users" element={<Users />} />
                <Route path="/modules" element={<Modules />} />
              </Route>
            </Routes>
          </Navigation>
        </Router>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
