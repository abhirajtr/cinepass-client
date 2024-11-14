import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from "./pages/ForgotPassword"
import Home from "./pages/Home";
import UserLayout from "./layout/UserLayout";
// import AdminLogin from './pages/Admin/Login';
import AdminLayout from "./layout/AdminLayout";
import Users from "./pages/Admin/Users";
import Movies from "./pages/Admin/Movies";
import TheatreOwnerLayout from "./layout/TheatreOwnerLayout";
import Theatres from "./pages/TheatreOwner/Theatres";
// import Dashboard from "./pages/TheatreOwner/Dashboard";
import AddTheatre from "./pages/TheatreOwner/AddTheatre";
// import MyComponent from "./components/MyComponent";


const App = () => {
  return (
    <Routes>
      {/* Login */}
      <Route path="/login" element={<Login />} />
      {/* <Route path="/theatreOwner/login" element={<Login user="theatreOwner" />} />
      <Route path="/admin/login" element={<Login user="admin" />} /> */}

      {/* Signup */}
      <Route path="/signup" element={<Signup user="user" />} />
      <Route path="/theatreOwner/signup" element={<Signup user="theatreOwner" />} />

      {/* Forgot Password */}
      <Route path="/forgot-password" element={<ForgotPassword />} />
      {/* <Route path="/theatreOwnner/forgot-password" element={<ForgotPassword  />} /> */}

      {/* <Route path="/admin/login" element={<AdminLogin />} /> */}
      <Route path="/" element={<UserLayout />}>
        {/* <Route path="/" element={<MyComponent />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Home />} />
        <Route path="/theatres" element={<Home />} />
        <Route path="/about-us" element={<Home />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="users" element={<Users />} />
        <Route path="movies" element={<Movies />} />
      </Route>
      <Route path="/theatreOwner" element={<TheatreOwnerLayout />}>
        <Route path="" element={<Theatres />} />
        <Route path="theatres" element={<Theatres />} />
        {/* <Route path="" element={<Dashboard />} /> */}
        <Route path="theatres/add-theatre" element={<AddTheatre />} />
      </Route>

    </Routes>
  )
}

export default App