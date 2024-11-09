import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from "./pages/ForgotPassword"
import Home from "./pages/Home";
import UserLayout from "./UserLayout";
// import AdminLogin from './pages/Admin/Login';
import AdminLayout from "./AdminLayout";
// import MyComponent from "./components/MyComponent";


const App = () => {
  return (
    <Routes>
      {/* Login */}
      <Route path="/login" element={<Login user="user" />} />
      <Route path="/theatre/login" element={<Login user="theatre" />} />
      <Route path="/admin/login" element={<Login user="admin" />} />

      {/* Signup */}
      <Route path="/signup" element={<Signup user="user" />} />
      <Route path="/theatre/signup" element={<Signup user="theatre" />} />

      {/* <Route path="/admin/login" element={<AdminLogin />} /> */}
      <Route path="/forgot-password" element={<ForgotPassword user="user" />} />
      <Route path="/" element={<UserLayout />}>
        {/* <Route path="/" element={<MyComponent />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Home />} />
        <Route path="/theatres" element={<Home />} />
        <Route path="/about-us" element={<Home />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        {/* <Route path="/" element={} /> */}
      </Route>

    </Routes>
  )
}

export default App