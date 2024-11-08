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
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

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
                toast.error('Something went wrong. Please try again.');
            }
            console.log(error);
        }
    };

    return isAuthenticated ? null : (
        <div className="flex items-center justify-center min-h-screen bg-bg-dark px-4">
            <div className="w-full max-w-md p-6 rounded-lg shadow-lg border border-gray-metallic bg-bg-dark-secondary">
                <h1 className="text-3xl font-semibold text-center text-highlight-text mb-4">Welcome back!</h1>
                <p className="text-center text-text-muted mb-6">We are happy to see you again. Please log in to continue.</p>

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    <Form>
                        {/* Email Field */}
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-text-primary text-sm mb-2">Email</label>
                            <Field
                                type="email"
                                id="email"
                                name="email"
                                className="w-full px-4 py-2 bg-bg-dark text-text-primary rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary border border-gray-metallic"
                            />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                        </div>

                        {/* Password Field */}
                        <div className="mb-6 relative">
                            <label htmlFor="password" className="block text-text-primary text-sm mb-2">Password</label>
                            <Field
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                className="w-full px-4 py-2 bg-bg-dark text-text-primary rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary border border-gray-metallic"
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-10 cursor-pointer text-text-muted"
                            >
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </span>
                            <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                        </div>

                        <div className="mb-6 text-right">
                            <Link to="/forgot-password" className="text-highlight-text hover:underline">Forgot Password?</Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-brand-primary text-text-primary py-2 rounded-md hover:bg-brand-secondary transition duration-300"
                        >
                            Login
                        </button>
                    </Form>
                </Formik>

                {/* Additional Links */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-text-muted">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-brand-primary hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
