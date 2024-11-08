import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FC, useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import OtpInput from '../components/OtpInput';
import { toast } from 'sonner';
import { backendUrl } from '../constants';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface SignupFormValues {
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
}

const Signup: FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSignupSuccessful, setIsSignupSuccessful] = useState(false);
    const [otpSentEmail, setOtpSentEmail] = useState('');
    const [otpVerified, setOtpVerified] = useState(false);

    const isAuthenticated = useSelector((state: RootState) => state.authReducer.isAuthenticated);

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Confirm Password is required'),
        phone: Yup.string()
            .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
            .required('Phone number is required'),
    });

    useEffect(() => {
        if (otpVerified) {
            navigate("/login");
        }
    }, [otpVerified, navigate]);

    const initialValues: SignupFormValues = {
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    };

    const onSubmit = async (values: SignupFormValues) => {
        console.log('Form data:', values);
        try {
            const response = await axios.post(`${backendUrl}/user/signup`, values);
            console.log(response);
            setOtpSentEmail(values.email);
            toast.info(response.data?.message);
            setIsSignupSuccessful(true);
        } catch (error) {
            const errorMessage = error instanceof AxiosError
                ? error?.response?.data?.message
                : "Something went wrong. Please try again.";
            toast.error(errorMessage);
            console.log(error);
        }
    };

    const resendOtp = async () => {
        try {
            const response = await axios.post(`${backendUrl}/user/resend-otp`, { email: otpSentEmail });
            console.log(response);
            toast.success(response.data?.message);
        } catch (error) {
            const errorMessage = error instanceof AxiosError
                ? error?.response?.data?.message
                : "Something went wrong. Please try again.";
            toast.error(errorMessage);
            console.log(error);
        }
    };

    const submitOtp = async (otp: string) => {
        console.log('OTP submitted:', otp);
        try {
            const response = await axios.post(backendUrl + "/user/verify-signup-otp", { email: otpSentEmail, otp });
            console.log(response);
            toast.success(response.data?.message);
            setOtpVerified(true);
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.success(error?.response?.data?.message);
            } else {
                toast.success("Something went wrong. Please try again.");
            }
            console.log(error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-grey-10 px-4">

            {
                isSignupSuccessful ?
                    <OtpInput
                        email={otpSentEmail}
                        submitAction={submitOtp}
                        resendAction={resendOtp}
                    /> :
                    <div className="w-full max-w-md p-6 border border-grey-15 rounded-md shadow-lg">
                        <h1 className="text-3xl font-bold text-center text-green-60 mb-4">Create an Account</h1>
                        <p className="text-center text-grey-75 mb-6">Join CinePass to easily book tickets and explore movie showtimes.</p>
                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                            <Form>
                                {/* Email Field */}
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-grey-75 mb-2">Email</label>
                                    <Field
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="w-full px-4 py-2 bg-grey-10 text-absolute-white rounded-md focus:outline-none border border-grey-15 placeholder:text-grey-35 focus:ring-1 focus:ring-green-80"
                                        placeholder="Enter your email"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                {/* Phone Number Field */}
                                <div className="mb-4">
                                    <label htmlFor="phone" className="block text-grey-75 mb-2">Phone Number</label>
                                    <div className="relative">
                                        <Field
                                            type="text"
                                            id="phone"
                                            name="phone"
                                            className="w-full px-4 py-2 pl-16 bg-grey-10 text-absolute-white border border-grey-15 rounded-md focus:outline-none focus:ring-1 placeholder:text-grey-35 focus:ring-green-80"
                                            placeholder="Enter your 10-digit number"
                                            maxLength={10}
                                        />
                                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">+91</span>
                                    </div>
                                    <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                {/* Password Field */}
                                <div className="mb-4 relative">
                                    <label htmlFor="password" className="block text-grey-75 mb-2">Password</label>
                                    <Field
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        className="w-full px-4 py-2 bg-grey-10 text-absolute-white border border-grey-15 rounded-md focus:outline-none focus:ring-1 focus:ring-green-80 placeholder:text-grey-35"
                                        placeholder="Enter your password"
                                    />
                                    <span
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-11 cursor-pointer text-grey-35 hover:text-grey-75"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                {/* Confirm Password Field */}
                                <div className="mb-4 relative">
                                    <label htmlFor="confirmPassword" className="block text-grey-75 mb-2">Confirm Password</label>
                                    <Field
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        className="w-full px-4 py-2 bg-grey-10 text-absolute-white border border-grey-15 rounded-md focus:outline-none focus:ring-1 focus:ring-green-80 placeholder:text-grey-35"
                                        placeholder="Re-enter your password"
                                    />
                                    <span
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 top-11 cursor-pointer text-grey-35 hover:text-grey-75"
                                    >
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                    <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-green-60 text-grey-15 py-2 rounded-md hover:bg-green-80 transition duration-300"
                                >
                                    Sign Up
                                </button>
                            </Form>
                        </Formik>

                        {/* Additional Links */}
                        <div className="mt-4 text-center">
                            <p className="text-sm text-grey-70">
                                Already have an account?{' '}
                                <Link to="/login" className="text-absolute-white hover:underline">
                                    Log in
                                </Link>
                            </p>
                        </div>
                    </div>
            }
        </div>
    );
};

export default Signup;
