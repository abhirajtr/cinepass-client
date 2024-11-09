import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from "./pages/ForgotPassword"
import Home from "./pages/Home";
import UserLayout from "./UserLayout";
import AdminLogin from './pages/Admin/Login';
import AdminLayout from "./AdminLayout";
// import MyComponent from "./components/MyComponent";


const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/admin/login" element={<AdminLogin />} />
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