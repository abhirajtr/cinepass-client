import { ErrorMessage, Field, Form, Formik } from "formik"
import { motion } from "framer-motion";
import { FC, useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";
import * as Yup from "yup";

interface PasswordResetProps {
    onSubmit: (password: string, confirmPassword: string) => void;
}

interface FormValues {
    password: string;
    confirmPassword: string;
}

const PasswordReset: FC<PasswordResetProps> = ({ onSubmit }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const initialValues: FormValues = {
        password: '',
        confirmPassword: '',
    };

    const validationSchema = Yup.object({
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    return (
        <div className="w-full max-w-md p-6 border border-grey-15 rounded-md shadow-lg">
            <h1 className="text-3xl font-bold text-center text-green-60 mb-4">Reset Your Password</h1>
            <p className="text-center text-grey-75 mb-6">Please enter a new password to reset it.</p>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => onSubmit(values.password, values.confirmPassword)}>
                <Form>

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
                    <motion.button
                        type="submit"
                        className="w-full bg-green-60 text-grey-15 py-2 rounded-md hover:bg-green-80 transition duration-300"
                        whileTap={{ scale: 0.9 }}
                    >
                        Reset Password
                    </motion.button>
                </Form>
            </Formik>

            {/* Additional Links */}
            <div className="mt-4 text-center">
                <p className="text-sm text-grey-70">
                    Remembered your password?{' '}
                    <Link to="/login" className="text-absolute-white hover:underline">
                        Log in
                    </Link>
                </p>
            </div>

        </div>
    )
}

export default PasswordReset 