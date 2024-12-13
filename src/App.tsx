import { Route, Routes } from "react-router-dom";
import LoginPageUser from "./pages/User/LoginPageUser";
import ForgotPasswordPageUser from "./pages/User/ForgotPasswordPageUser";
import ResetPasswordPageUser from "./pages/User/ResetPasswordPageUser";
import VerifyOtpPageUser from "./pages/User/VerifyOtpPageUser";
// import HomePageUser from "./pages/User/HomePageUser";
import UserLayout from "./layout/UserLayout";
import SignupPageTheatreOwner from "./pages/TheatreOwner/SignupPageTheatreOwner";
import SignupPageUser from "./pages/User/SignupPageUser";
import VerifyOtpPageTheatreOwner from "./pages/TheatreOwner/VerifyOtpPageTheatreOwner";
import LoginPageTheatreOwner from "./pages/TheatreOwner/LoginPageTheatreOwner";
import ForgotPasswordPageTheatreOwner from "./pages/TheatreOwner/ForgotPasswordPageTheatreOwner";
import ResetPasswordPageTheatreOwner from "./pages/TheatreOwner/ResetPasswordPageTheatreOwner";
import LoginPageAdmin from "./pages/Admin/LoginPageAdmin";
import AdminDashboardPage from "./pages/Admin/AdminDashboardPage";
import AdminLayout from "./layout/AdminLayout";
import NotFoundPage from "./pages/NotFoundPage";
import UserManagementPageAdmin from "./pages/Admin/UserManagementPageAdmin";
import TheatreOwnerLayout from "./layout/TheatreOwnerLayout";
import TheatreOwnerManagementPageAdmin from "./pages/Admin/TheatreOwnerManagementPageAdmin";
import TheatresPageTheatreOwner from "./pages/TheatreOwner/TheatresPageTheatreOwner";
import DashboardTheatreOwner from "./pages/TheatreOwner/DashBoardTheatreOwner";
import TheatreManagementPageAdmin from "./pages/Admin/TheatreManagementPageAdmin";
import AddTheatre from "./pages/TheatreOwner/AddTheatre";
import MovieManagementPage from "./pages/Admin/MovieManagementPage";
import AddMoviePageAdmin from "./pages/Admin/AddMoviePageAdmin";
import ScreensPageTheatreOwner from "./pages/TheatreOwner/ScreenManagementPageTheatreOwner";
import EditTheatre from "./pages/TheatreOwner/EditTheatreDetails";
import MoviesTheatreOwnerPage from "./pages/TheatreOwner/MoviesTheatreOwnerPage";
import ScreenConfig from "./pages/TheatreOwner/TheaterSeatArrangementTool";
// import ManageShowsPage from "./pages/TheatreOwner/ManageShowsPage";
import HomePage from "./pages/User/HomePage";
import MovieDetails from "./pages/User/MovieDetails";
import CinemaList from "./pages/User/CinemaList";
import ShowManagementPage from "./pages/TheatreOwner/ShowManagementPage";
// import ShowListPage from "./components/TheatreOwner/ShowListPage";
// import HomePage from "./pages/User/HomePage";


const App = () => {
  return (

    <Routes>
      {/* Theatre Owner Routes */}
      <Route path="/theatreOwner/signup" element={<SignupPageTheatreOwner />} />
      <Route path="/theatreOwner/verify-otp" element={<VerifyOtpPageTheatreOwner />} />
      <Route path="/theatreOwner/login" element={<LoginPageTheatreOwner />} />
      <Route path="/theatreOwner/forgot-password" element={<ForgotPasswordPageTheatreOwner />} />
      <Route path="/theatreOwner/reset-password" element={<ResetPasswordPageTheatreOwner />} />
      <Route path="/theatreOwner" element={<TheatreOwnerLayout />} >
        <Route path="/theatreOwner" element={<DashboardTheatreOwner />} />
        <Route path="theatres" element={<TheatresPageTheatreOwner />} />
        <Route path="theatres/add-theatre" element={<AddTheatre />} />
        <Route path="theatres/:theatreId/screens" element={<ScreensPageTheatreOwner />} />
        <Route path="theatres/:theatreId/edit" element={<EditTheatre />} />
        <Route path="theatres/:theatreId/add-screen" element={<ScreenConfig />} />
        {/* <Route path="theatres/:theatreId/screens/:screenId/manage-shows" element={<ShowListPage />} /> */}
        <Route path="movies" element={<MoviesTheatreOwnerPage />} />
        <Route path="theatres/:theatreId/screens/:screenId/show-management" element={<ShowManagementPage />} />
        
      </Route>

      {/* Admin Routes */}
      <Route path="/admin/login" element={<LoginPageAdmin />} />
      <Route path="/admin" element={<AdminLayout />} >
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="users" element={<UserManagementPageAdmin />} />
        <Route path="theatreOwners" element={<TheatreOwnerManagementPageAdmin />} />
        <Route path="movies" element={<MovieManagementPage />} />
        <Route path="theatres" element={<TheatreManagementPageAdmin />} />
        <Route path="movies/add-movie" element={<AddMoviePageAdmin />} />
      </Route>


      {/* UserRoutes */}
      <Route path="/signup" element={<SignupPageUser />} />
      <Route path="/verify-otp" element={<VerifyOtpPageUser />} />
      <Route path="/login" element={<LoginPageUser />} />
      <Route path="/forgot-password" element={<ForgotPasswordPageUser />} />
      <Route path="/reset-password" element={<ResetPasswordPageUser />} />
      <Route path="/" element={<UserLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/movie/:movieId/details" element={<MovieDetails />} />
        <Route path="/movie/:movieId/book" element={<CinemaList />} />
      </Route>

      {/* Not Found Page */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;