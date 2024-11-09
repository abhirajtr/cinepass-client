import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FC, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios, { AxiosError } from 'axios';
import { backendUrl } from '../constants';
import { toast } from 'sonner';

interface ForgotPasswordFormValues {
    email: string;
}
interface ForgotPasswordProps {
    user: string;
}


const ForgotPassword: FC<ForgotPasswordProps> = ({ user }) => {
    const [otpSent, setOtpSent] = useState(true);
    const [email, setEmail] = useState<string>('');
    const [otp, setOtp] = useState<string[]>(['', '', '', '']);
    const inputsRef = useRef<HTMLInputElement[]>([]); // Refs for input fields

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Email is required'),
    });

    const initialValues: ForgotPasswordFormValues = {
        email: '',
    };

    const sendOtp = async (email: string) => {
        console.log(`Sending OTP to ${email}`);
        try {
            const response = await axios.post(backendUrl + `/${user}/forgot-Password`, { email });
            toast.success(response.data?.message);
            setOtpSent(true);
            console.log(response);
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message || "An unexpected error occurred. Please try again.");
            }
            console.log(error);
        }
    };

    const onSubmit = async (values: ForgotPasswordFormValues) => {
        try {
            await sendOtp(values.email);
            setEmail(values.email);
            setOtpSent(true);
        } catch (error) {
            console.error('Error sending OTP:', error);
        }
    };



    // Move focus to the next input if the current one is filled
    const handleChange = (value: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = value;

        if (value.length === 1 && index < 3) {
            inputsRef.current[index + 1]?.focus();
        }

        setOtp(newOtp);
    };

    // Move focus to the previous input on backspace if the current one is empty
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleVerifyOtp = async () => {
        const otpValue = otp.join('');
        console.log(email, otpValue);

        try {
            const response = await axios.post(backendUrl + `/${user}/forgot-Password/verify-otp`, { email, otp: otpValue });
            toast.success(response.data?.message);
            console.log(response);
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message || "An unexpected error occurred. Please try again.");
            }
            console.log(error);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-grey-10 px-4">
            <div className="w-full max-w-md p-6 border border-grey-15 rounded-md shadow-lg">
                <h1 className="text-3xl font-bold text-center text-green-60 mb-4">Forgot Password</h1>
                <p className="text-center text-grey-75 mb-6">
                    {otpSent
                        ? `Enter the 4-digit OTP sent to ${email}`
                        : 'Enter your email address to receive a reset OTP.'}
                </p>

                {otpSent ? (
                    <>
                        <div className="flex justify-center mb-4 space-x-2">
                            {otp.map((_, index) => (
                                <input
                                    key={index}
                                    type="text" 
                                    maxLength={1}
                                    className="w-12 h-12 text-center rounded-lg text-xl bg-grey-10 text-absolute-white focus:outline-none border border-grey-15 placeholder:text-grey-35 focus:ring-1 focus:ring-green-80"
                                    value={otp[index]}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/[^0-9]/g, ''); // Only allow numbers
                                        handleChange(value, index);
                                    }}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    ref={(el) => (inputsRef.current[index] = el!)} // Store ref for each input
                                />

                            ))}
                        </div>
                        <motion.button
                            disabled={otp.join('').length < 4 ? true : false}
                            onClick={handleVerifyOtp}
                            type="submit"
                            className="w-full bg-green-60 text-grey-15 py-2 rounded-md hover:bg-green-80 transition duration-300"
                            whileTap={{ scale: 0.9 }}
                        >
                            Verify OTP
                        </motion.button>

                    </>

                ) : (
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        <Form>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-grey-75 mb-2">
                                    Email
                                </label>
                                <Field
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full px-4 py-2 bg-grey-10 text-absolute-white rounded-md focus:outline-none border border-grey-15 placeholder:text-grey-35 focus:ring-1 focus:ring-green-80"
                                    placeholder="Enter your email"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                            <motion.button
                                type="submit"
                                className="w-full bg-green-60 text-grey-15 py-2 rounded-md hover:bg-green-80 transition duration-300"
                                whileTap={{ scale: 0.9 }}
                            >
                                Send OTP
                            </motion.button>
                        </Form>
                    </Formik>
                )}

                <div className="mt-4 text-center">
                    <p className="text-sm text-grey-75">
                        Remembered your password?{' '}
                        <Link to="/login" className="text-absolute-white hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div >
    );
};

export default ForgotPassword;
