import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FC, useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { useDispatch, useSelector } from 'react-redux';
import { login } from '../feature/authThunk';
import { AppDispatch, RootState } from '../store';
import { motion } from 'framer-motion';
// import { UserRole } from '../constants';

interface LoginFormValues {
    email: string;
    password: string;
}

const Login: FC = () => {
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { isAuthenticated, role } = useSelector((state: RootState) => state.authReducer);

    useEffect(() => {
        if (isAuthenticated) {
            if (role === "regularUser") {
                navigate('/');
            } else if (role === "admin") {
                navigate('/admin');
            } else if (role === "theatreOwner") {
                navigate('/theatreOwner');
            } else {
                navigate('/login'); // Redirect to login if the role is undefined or empty
            }
        }
    }, [isAuthenticated, navigate, role]);

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    });

    const initialValues: LoginFormValues = {
        email: '',
        password: '',
    };

    const onSubmit = async (values: LoginFormValues) => {
        console.log('Form data:', values);
        try {
            await dispatch(login(values));
            // switch (user) {
            //     case 'user':
            //         break;
            //     case 'admin':
            //         await dispatch(loginAdmin(values));
            //         break;
            //     case 'theatreOwner':
            //         await dispatch(loginTheatre(values));
            //         break;
            //     default:
            //         await dispatch(login(values));
            // }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error?.response?.data?.message);
            } else {
                toast.error('Something went wrong. Please try again.');
            }
            console.log(error);
        }
    };

    return isAuthenticated ? null : (
        <div className="flex items-center justify-center min-h-screen bg-grey-10 px-4">
            <div className="w-full max-w-md p-6 rounded-lg shadow-lg border border-grey-15">
                <h1 className="text-3xl font-semibold text-center text-green-60 mb-4">Welcome back!</h1>
                <p className="text-center text-grey-75 mb-6">We are happy to see you again. Please log in to continue.</p>

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    <Form>
                        {/* Email Field */}
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-grey-75 text-sm mb-2">Email</label>
                            <Field
                                placeholder="Enter your email address"
                                type="email"
                                id="email"
                                name="email"
                                className="w-full px-4 py-2 bg-grey-10 text-absolute-white rounded-md focus:outline-none border border-grey-15 placeholder:text-grey-35 focus:ring-1 focus:ring-green-80"
                            />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                        </div>

                        {/* Password Field */}
                        <div className="mb-6 relative">
                            <label htmlFor="password" className="block text-grey-75 text-sm mb-2">Password</label>
                            <Field
                                placeholder="Enter your password"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                className="w-full px-4 py-2 bg-grey-10 text-absolute-white rounded-md focus:outline-none border border-grey-15 placeholder:text-grey-35 focus:ring-1 focus:ring-green-80"
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-10 cursor-pointer text-grey-35 hover:text-grey-75"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                            <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                        </div>

                        <div className="mb-6 text-right">
                            <Link to="/forgot-password" className="text-absolute-white hover:underline">Forgot Password?</Link>
                        </div>

                        {/* Submit Button */}
                        {/* <button
                            type="submit"
                            className="w-full bg-green-60 text-grey-15 py-2 rounded-md hover:bg-green-80 transition duration-300"
                        >
                            Login
                        </button> */}
                        <motion.button
                            type="submit"
                            className="w-full bg-green-60 text-grey-15 py-2 rounded-md hover:bg-green-80 transition duration-300"
                            whileTap={{ scale: 0.9 }}
                        >
                            Log In
                        </motion.button>
                    </Form>
                </Formik>

                {/* Additional Links */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-grey-70">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-absolute-white hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>


            </div>
        </div>
    );
};

export default Login;
