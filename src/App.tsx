import { Route, Routes } from "react-router-dom";
import LoginPageUser from "./pages/User/LoginPageUser";
import ForgotPasswordPageUser from "./pages/User/ForgotPasswordPageUser";
import ResetPasswordPageUser from "./pages/User/ResetPasswordPageUser";
import VerifyOtpPageUser from "./pages/User/VerifyOtpPageUser";
import HomePageUser from "./pages/User/HomePageUser";
import UserLayout from "./layout/NewUserLayout";
import SignupPageTheatreOwner from "./pages/TheatreOwner/SignupPageTheatreOwner";
import SignupPageUser from "./pages/User/SignupPageUser";
import VerifyOtpPageTheatreOwner from "./pages/TheatreOwner/VerifyOtpPageTheatreOwner";
import LoginPageTheatreOwner from "./pages/TheatreOwner/LoginPageTheatreOwner";
import ForgotPasswordPageTheatreOwner from "./pages/TheatreOwner/ForgotPasswordPageTheatreOwner";
import ResetPasswordPageTheatreOwner from "./pages/TheatreOwner/ResetPasswordPageTheatreOwner";
import LoginPageAdmin from "./pages/Admin/LoginPageAdmin";
import AdminDashboardPage from "./pages/Admin/AdminDashboardPage";
import AdminLayout from "./layout/AdminLayout";


const App = () => {
  return (

    <Routes>
      {/* Theatre Owner Routes */}
      <Route path="/admin" element={<AdminLayout />} >
        <Route path="/admin" element={<AdminDashboardPage />} />
      </Route>
      <Route path="/theatreOwner/signup" element={<SignupPageTheatreOwner />} />
      <Route path="/theatreOwner/verify-otp" element={<VerifyOtpPageTheatreOwner />} />
      <Route path="/theatreOwner/login" element={<LoginPageTheatreOwner />} />
      <Route path="/theatreOwner/forgot-password" element={<ForgotPasswordPageTheatreOwner />} />
      <Route path="/theatreOwner/reset-password" element={<ResetPasswordPageTheatreOwner />} />
      {/* UserRoutes */}
      <Route path="/signup" element={<SignupPageUser />} />
      <Route path="/verify-otp" element={<VerifyOtpPageUser />} />
      <Route path="/login" element={<LoginPageUser />} />
      <Route path="/forgot-password" element={<ForgotPasswordPageUser />} />
      <Route path="/reset-password" element={<ResetPasswordPageUser />} />
      {/* User */}
      <Route path="/admin/login" element={<LoginPageAdmin />} />

      <Route path="/" element={<UserLayout />}>
        <Route index element={<HomePageUser />} />
        <Route path="/home" element={<HomePageUser />} />
        <Route path="*" element={<div>Not found</div>} />
      </Route>
      {/* <Route path="/" element={<UserLayout />}> */}
      {/* </Route> */}
    </Routes>
  );
};

export default App;