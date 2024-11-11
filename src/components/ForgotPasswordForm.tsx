import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FC } from 'react';

interface ForgotPasswordFormValues {
    email: string;
}

interface ForgotPasswordFormProps {
    onSubmit: (email: string) => void,

}

const ForgotPasswordForm: FC<ForgotPasswordFormProps> = ({ onSubmit }) => {

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Email is required'),
    });

    const initialValues: ForgotPasswordFormValues = {
        email: '',
    };


    return (
        <div className="w-full max-w-md p-6 border border-grey-15 rounded-md shadow-lg">
            <h1 className="text-3xl font-bold text-center text-green-60 mb-4">Forgot Password</h1>
            <p className="text-center text-grey-75 mb-6">
                Enter your email address, and we’ll send you an OTP to reset your password.
            </p>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => onSubmit(values.email)}>
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

            <div className="mt-4 text-center">
                <p className="text-sm text-grey-75">
                    Remembered your password?{' '}
                    <Link to="/login" className="text-absolute-white hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default ForgotPasswordForm