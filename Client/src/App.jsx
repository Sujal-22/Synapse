import {BrowserRouter,Routes,Route,Navigate,Outlet,} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/useAuth";
import { ROUTES } from "./utils/constants";
import Header from "./components/layout/Header";

import Dashboard from "./pages/student/Dashboard";
import Explore from "./pages/student/Explore";
import HackathonDetail from "./pages/student/HackathonDetail";
import Teams from "./pages/student/Teams";
import Notifications from "./pages/student/Notification";
import Profile from "./pages/student/Profile";
import Submission from "./pages/student/Submission";
import PostHackathon from "./pages/student/PostHackathon";
import Mentors from "./pages/student/Mentors";

import OrgDashboard from "./pages/organiser/OrgDashboard";
import CreateHackathon from "./pages/organiser/CreateHackathon";
import ManageHackathon from "./pages/organiser/ManageHackathon";
import Judging from "./pages/organiser/Judging";
import Analytics from "./pages/organiser/Analytics";

import Home from "./pages/public/Home";
import HostHackathon from "./pages/public/HostHackathon";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyEmail from "./pages/auth/VerifyEmail";


function PublicRoute() {
  const { user } = useAuth();


  return user ? <Navigate to={ROUTES.DASHBOARD} replace /> : <Outlet />;
}

function PrivateRoute({ allowedRoles } = {}) {
  const { user, profile, } = useAuth();

  if (!user) {
    return (
      <Navigate
        to={ROUTES.LOGIN}
        replace
        state={{ redirectTo: window.location.pathname }}
      />
    );
  }

  if (allowedRoles && profile && !allowedRoles.includes(profile.role)) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <Outlet />;
}

function WebLayout() {
  return (
    <>
      <Header />
      <div className="h-16" />
      <Outlet />
    </>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public landing page */}
      <Route path={ROUTES.HOME} element={<Home />} />
      
      {/* Public explore pages */}
      <Route element={<WebLayout />}>
        <Route path={ROUTES.EXPLORE} element={<Explore />} />
        <Route path={ROUTES.HACKATHON_DETAIL} element={<HackathonDetail />} />
        <Route path={ROUTES.HOST_HACKATHON} element={<HostHackathon />} />
      </Route>
      
      {/* Auth pages */}
      <Route element={<PublicRoute />}>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={ROUTES.VERIFY_EMAIL} element={<VerifyEmail />} />
      </Route>
      
      {/* Protected student pages */}
      <Route element={<PrivateRoute />}>
        <Route element={<WebLayout />}>
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTES.TEAMS} element={<Teams />} />
          <Route path={ROUTES.NOTIFICATIONS} element={<Notifications />} />
          <Route path={ROUTES.PROFILE} element={<Profile />} />
          <Route path={ROUTES.MENTORS} element={<Mentors />} />
          <Route path={ROUTES.SUBMISSION} element={<Submission />} />
          <Route path={ROUTES.POST_HACKATHON} element={<PostHackathon />} />
        </Route>
      </Route>
      
      {/* Protected organiser pages */}
      <Route element={<PrivateRoute allowedRoles={["organiser"]} />}>
        <Route element={<WebLayout />}>
          <Route path={ROUTES.ORG_DASHBOARD} element={<OrgDashboard />} />
          <Route path={ROUTES.ORG_CREATE} element={<CreateHackathon />} />
          <Route path={ROUTES.ORG_MANAGE} element={<ManageHackathon />} />
          <Route path={ROUTES.ORG_JUDGING} element={<Judging />} />
          <Route path={ROUTES.ORG_ANALYTICS} element={<Analytics />} />
        </Route>
      </Route>
      
      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
