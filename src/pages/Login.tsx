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

interface LoginFormValues {
    email: string;
    password: string;
}

const Login: FC = () => {
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const isAuthenticated = useSelector((state: RootState) => state.authReducer.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate])

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
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error?.response?.data?.message);
            } else {
                toast.error("Something went wrong. Please try again.");
            }
            console.log(error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="w-full max-w-md p-6 bg-black border border-gray-700 rounded-md shadow-lg">
                <h1 className="text-3xl font-bold text-center text-white mb-4">Welcome back!</h1>
                <p className="text-center text-gray-400 mb-6">We're glad to see you again. Please log in to continue.</p>

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    <Form>
                        {/* Email Field */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-400 mb-2">Email</label>
                            <Field
                                type="email"
                                id="email"
                                name="email"
                                className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                            />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        {/* Password Field */}
                        <div className="mb-4 relative">
                            <label htmlFor="password" className="block text-gray-400 mb-2">Password</label>
                            <Field
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-11 cursor-pointer text-gray-400"
                            >
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </span>
                            <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="mb-4 text-right">
                            <Link to="/forgot-password" className="text-pink-400 hover:underline">Forgot Password?</Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700 transition duration-300"
                        >
                            Login
                        </button>
                    </Form>
                </Formik>

                {/* Additional Links */}
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-400">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-pink-400 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
