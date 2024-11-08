import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { FC, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

interface ForgotPasswordFormValues {
    email: string;
}

const ForgotPassword: FC = () => {
    const [otpSent, setOtpSent] = useState(true);
    const [email, setEmail] = useState<string>('');

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Email is required'),
    });

    const initialValues: ForgotPasswordFormValues = {
        email: '',
    };

    const sendOtp = async (email: string) => {
        console.log(`Sending OTP to ${email}`);
        return new Promise((resolve) => setTimeout(resolve, 1000));
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

    const otpRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    const handleOtpChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number,
        setFieldValue: FormikHelpers<{ otp1: string; otp2: string; otp3: string; otp4: string }>['setFieldValue']
    ) => {
        const value = e.target.value;
        setFieldValue(`otp${index + 1}`, value);
        if (value.length === 1 && index < otpRefs.length - 1) {
            otpRefs[index + 1].current?.focus();
        }
    };

    const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !e.currentTarget.value && index > 0) {
            otpRefs[index - 1].current?.focus();
        }
    };

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
                    <Formik
                        initialValues={{ otp1: '', otp2: '', otp3: '', otp4: '' }}
                        validationSchema={Yup.object({
                            otp1: Yup.string().required('Required').length(1),
                            otp2: Yup.string().required('Required').length(1),
                            otp3: Yup.string().required('Required').length(1),
                            otp4: Yup.string().required('Required').length(1),
                        })}
                        onSubmit={(values) => {
                            const otp = `${values.otp1}${values.otp2}${values.otp3}${values.otp4}`;
                            console.log('OTP Submitted:', otp);
                        }}
                    >
                        {({ errors, touched, setFieldValue }) => (
                            <Form>
                                <div className='px-20 mb-5'>
                                    <div className="flex gap-2 mb-2">
                                        {['otp1', 'otp2', 'otp3', 'otp4'].map((otpField, index) => (
                                            <div key={index} className="w-1/4">
                                                <Field
                                                    type="text"
                                                    name={otpField}
                                                    innerRef={otpRefs[index]}
                                                    className="w-full px-4 py-3 bg-grey-10 text-absolute-white rounded-md focus:outline-none border border-grey-15 placeholder:text-grey-35 focus:ring-1 focus:ring-green-80"
                                                    maxLength={1}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                        handleOtpChange(e, index, setFieldValue)
                                                    }
                                                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                                                        handleOtpKeyDown(e, index)
                                                    }
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {touched.otp1 && (errors.otp1 || errors.otp2 || errors.otp3 || errors.otp4) && (
                                    <div className="text-red-500 text-sm mb-4 ">
                                        Required
                                    </div>
                                )}
                                <button
                                    type="submit"
                                    className="w-full bg-green-60 text-grey-15 py-2 rounded-md hover:bg-green-80 transition duration-300"
                                >
                                    Verify OTP
                                </button>
                            </Form>
                        )}
                    </Formik>
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
                            <button
                                type="submit"
                                className="w-full bg-green-60 text-grey-15 py-2 rounded-md hover:bg-green-80 transition duration-300"
                            >
                                Send OTP
                            </button>
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
        </div>
    );
};

export default ForgotPassword;
