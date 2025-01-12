import { Navigate, Route, Routes } from "react-router-dom";

// Layouts
import UserLayout from "./layout/UserLayout";
import AdminLayout from "./layout/AdminLayout";
import TheatreOwnerLayout from "./layout/TheatreOwnerLayout";
import TicketDetails from "./components/User/TicketDetails";
import UserProfile from "./components/User/UserProfile";

// Pages
import LoginPageUser from "./pages/User/LoginPageUser";
import ForgotPasswordPageUser from "./pages/User/ForgotPasswordPageUser";
import ResetPasswordPageUser from "./pages/User/ResetPasswordPageUser";
import VerifyOtpPageUser from "./pages/User/VerifyOtpPageUser";
import SignupPageUser from "./pages/User/SignupPageUser";
import HomePage from "./pages/User/HomePage";
import MovieDetails from "./pages/User/MovieDetails";
import MovieTheatresList from "./pages/User/MovieTheatresList";
import SeatSelectionPage from "./pages/User/SeatSelectionPage";
import BookingHistoryPage from "./pages/User/BookingHistoryPage";

import LoginPageAdmin from "./pages/Admin/LoginPageAdmin";
import AdminDashboardPage from "./pages/Admin/AdminDashboardPage";
import UserManagementPageAdmin from "./pages/Admin/UserManagementPageAdmin";
import TheatreOwnerManagementPageAdmin from "./pages/Admin/TheatreOwnerManagementPageAdmin";
import MovieManagementPage from "./pages/Admin/MovieManagementPage";
import AddMoviePageAdmin from "./pages/Admin/AddMoviePageAdmin";
import TheatreManagementPageAdmin from "./pages/Admin/TheatreManagementPageAdmin";

import SignupPageTheatreOwner from "./pages/TheatreOwner/SignupPageTheatreOwner";
import VerifyOtpPageTheatreOwner from "./pages/TheatreOwner/VerifyOtpPageTheatreOwner";
import LoginPageTheatreOwner from "./pages/TheatreOwner/LoginPageTheatreOwner";
import ForgotPasswordPageTheatreOwner from "./pages/TheatreOwner/ForgotPasswordPageTheatreOwner";
import ResetPasswordPageTheatreOwner from "./pages/TheatreOwner/ResetPasswordPageTheatreOwner";
import DashboardTheatreOwner from "./pages/TheatreOwner/DashBoardTheatreOwner";
import TheatresPageTheatreOwner from "./pages/TheatreOwner/TheatresPageTheatreOwner";
import AddTheatre from "./pages/TheatreOwner/AddTheatre";
import ScreensPageTheatreOwner from "./pages/TheatreOwner/ScreenManagementPageTheatreOwner";
import EditTheatre from "./pages/TheatreOwner/EditTheatreDetails";
import MoviesTheatreOwnerPage from "./pages/TheatreOwner/MoviesTheatreOwnerPage";
import ShowManagementPage from "./pages/TheatreOwner/ShowManagementPage";
import ScreenConfig from "./pages/TheatreOwner/TheaterSeatArrangementTool";

import NotFoundPage from "./pages/NotFoundPage";
import WalletPage from "./pages/User/WalletPage";
import Notifications from "./components/User/Notifications";

const App = () => {
  return (
    <Routes>
      {/* User Routes */}
      <Route path="/signup" element={<SignupPageUser />} />
      <Route path="/verify-otp" element={<VerifyOtpPageUser />} />
      <Route path="/login" element={<LoginPageUser />} />
      <Route path="/forgot-password" element={<ForgotPasswordPageUser />} />
      <Route path="/reset-password" element={<ResetPasswordPageUser />} />
      <Route path="/" element={<UserLayout />}>
        <Route index element={<HomePage />} />
        <Route path="wallet" element={<WalletPage />} />

        <Route path="movie/:movieId/details" element={<MovieDetails />} />
        <Route path="movie/:movieId/theatres" element={<MovieTheatresList />} />
        <Route path="seat-selection/:showId" element={<SeatSelectionPage />} />
        <Route path="bookings" element={<BookingHistoryPage />} />
        <Route path="ticket-details" element={<TicketDetails />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>

      {/* Theatre Owner Routes */}
      <Route path="/theatreOwner/signup" element={<SignupPageTheatreOwner />} />
      <Route path="/theatreOwner/verify-otp" element={<VerifyOtpPageTheatreOwner />} />
      <Route path="/theatreOwner/login" element={<LoginPageTheatreOwner />} />
      <Route path="/theatreOwner/forgot-password" element={<ForgotPasswordPageTheatreOwner />} />
      <Route path="/theatreOwner/reset-password" element={<ResetPasswordPageTheatreOwner />} />
      <Route element={<TheatreOwnerLayout />} >
        <Route path="/theatreOwner">
          <Route index element={<Navigate to="/theatreOwner/dashboard" />} />
          <Route path="dashboard" element={<DashboardTheatreOwner />} />
          <Route path="theatres" element={<TheatresPageTheatreOwner />} />
          <Route path="theatres/add-theatre" element={<AddTheatre />} />
          <Route path="theatres/:theatreId/screens" element={<ScreensPageTheatreOwner />} />
          <Route path="theatres/:theatreId/edit" element={<EditTheatre />} />
          <Route path="theatres/:theatreId/add-screen" element={<ScreenConfig />} />
          <Route path="movies" element={<MoviesTheatreOwnerPage />} />
          <Route path="theatres/:theatreId/screens/:screenId/show-management" element={<ShowManagementPage />} />
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route path="/admin/login" element={<LoginPageAdmin />} />
      <Route element={<AdminLayout />}>
        <Route path="/admin">
          <Route index element={<AdminDashboardPage />} />
          <Route path="users" element={<UserManagementPageAdmin />} />
          <Route path="theatreOwners" element={<TheatreOwnerManagementPageAdmin />} />
          <Route path="movies" element={<MovieManagementPage />} />
          <Route path="movies/add-movie" element={<AddMoviePageAdmin />} />
          <Route path="theatres" element={<TheatreManagementPageAdmin />} />
        </Route>
      </Route>

      {/* Not Found Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes >

  );
};

export default App;
