import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

// Layouts
import UserLayout from "./layout/UserLayout";
import AdminLayout from "./layout/AdminLayout";
import TheatreOwnerLayout from "./layout/TheatreOwnerLayout";
import TicketDetails from "./components/User/TicketDetails";
import UserProfile from "./components/User/UserProfile";

// Pages (Lazy Loaded)
const LoginPageUser = lazy(() => import("./pages/User/LoginPageUser"));
const ForgotPasswordPageUser = lazy(() => import("./pages/User/ForgotPasswordPageUser"));
const ResetPasswordPageUser = lazy(() => import("./pages/User/ResetPasswordPageUser"));
const VerifyOtpPageUser = lazy(() => import("./pages/User/VerifyOtpPageUser"));
const SignupPageUser = lazy(() => import("./pages/User/SignupPageUser"));
const HomePage = lazy(() => import("./pages/User/HomePage"));
const MovieDetails = lazy(() => import("./pages/User/MovieDetails"));
const MovieTheatresList = lazy(() => import("./pages/User/MovieTheatresList"));
const SeatSelectionPage = lazy(() => import("./pages/User/SeatSelectionPage"));
const BookingHistoryPage = lazy(() => import("./pages/User/BookingHistoryPage"));

const LoginPageAdmin = lazy(() => import("./pages/Admin/LoginPageAdmin"));
const AdminDashboardPage = lazy(() => import("./pages/Admin/AdminDashboardPage"));
const UserManagementPageAdmin = lazy(() => import("./pages/Admin/UserManagementPageAdmin"));
const TheatreOwnerManagementPageAdmin = lazy(() => import("./pages/Admin/TheatreOwnerManagementPageAdmin"));
const MovieManagementPage = lazy(() => import("./pages/Admin/MovieManagementPage"));
const AddMoviePageAdmin = lazy(() => import("./pages/Admin/AddMoviePageAdmin"));
const TheatreManagementPageAdmin = lazy(() => import("./pages/Admin/TheatreManagementPageAdmin"));

const SignupPageTheatreOwner = lazy(() => import("./pages/TheatreOwner/SignupPageTheatreOwner"));
const VerifyOtpPageTheatreOwner = lazy(() => import("./pages/TheatreOwner/VerifyOtpPageTheatreOwner"));
const LoginPageTheatreOwner = lazy(() => import("./pages/TheatreOwner/LoginPageTheatreOwner"));
const ForgotPasswordPageTheatreOwner = lazy(() => import("./pages/TheatreOwner/ForgotPasswordPageTheatreOwner"));
const ResetPasswordPageTheatreOwner = lazy(() => import("./pages/TheatreOwner/ResetPasswordPageTheatreOwner"));
const DashboardTheatreOwner = lazy(() => import("./pages/TheatreOwner/DashBoardTheatreOwner"));
const TheatresPageTheatreOwner = lazy(() => import("./pages/TheatreOwner/TheatresPageTheatreOwner"));
const AddTheatre = lazy(() => import("./pages/TheatreOwner/AddTheatre"));
const ScreensPageTheatreOwner = lazy(() => import("./pages/TheatreOwner/ScreenManagementPageTheatreOwner"));
const EditTheatre = lazy(() => import("./pages/TheatreOwner/EditTheatreDetails"));
const MoviesTheatreOwnerPage = lazy(() => import("./pages/TheatreOwner/MoviesTheatreOwnerPage"));
const ShowManagementPage = lazy(() => import("./pages/TheatreOwner/ShowManagementPage"));
const ScreenConfig = lazy(() => import("./pages/TheatreOwner/TheaterSeatArrangementTool"));

const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* User Routes */}
        <Route path="/signup" element={<SignupPageUser />} />
        <Route path="/verify-otp" element={<VerifyOtpPageUser />} />
        <Route path="/login" element={<LoginPageUser />} />
        <Route path="/forgot-password" element={<ForgotPasswordPageUser />} />
        <Route path="/reset-password" element={<ResetPasswordPageUser />} />
        <Route path="/" element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path="movie/:movieId/details" element={<MovieDetails />} />
          <Route path="movie/:movieId/theatres" element={<MovieTheatresList />} />
          <Route path="seat-selection/:showId" element={<SeatSelectionPage />} />
          <Route path="bookings" element={<BookingHistoryPage />} />
          <Route path="ticket-details" element={<TicketDetails />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>

        {/* Theatre Owner Routes */}
        <Route path="/theatreOwner/signup" element={<SignupPageTheatreOwner />} />
        <Route path="/theatreOwner/verify-otp" element={<VerifyOtpPageTheatreOwner />} />
        <Route path="/theatreOwner/login" element={<LoginPageTheatreOwner />} />
        <Route path="/theatreOwner/forgot-password" element={<ForgotPasswordPageTheatreOwner />} />
        <Route path="/theatreOwner/reset-password" element={<ResetPasswordPageTheatreOwner />} />
        <Route path="/theatreOwner" element={<TheatreOwnerLayout />}>
          <Route path="dashboard" element={<DashboardTheatreOwner />} />
          <Route path="theatres" element={<TheatresPageTheatreOwner />} />
          <Route path="theatres/add-theatre" element={<AddTheatre />} />
          <Route path="theatres/:theatreId/screens" element={<ScreensPageTheatreOwner />} />
          <Route path="theatres/:theatreId/edit" element={<EditTheatre />} />
          <Route path="theatres/:theatreId/add-screen" element={<ScreenConfig />} />
          <Route path="movies" element={<MoviesTheatreOwnerPage />} />
          <Route path="theatres/:theatreId/screens/:screenId/show-management" element={<ShowManagementPage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<LoginPageAdmin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="users" element={<UserManagementPageAdmin />} />
          <Route path="theatreOwners" element={<TheatreOwnerManagementPageAdmin />} />
          <Route path="movies" element={<MovieManagementPage />} />
          <Route path="movies/add-movie" element={<AddMoviePageAdmin />} />
          <Route path="theatres" element={<TheatreManagementPageAdmin />} />
        </Route>

        {/* Not Found Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default App;
