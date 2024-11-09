import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { loginAdmin } from '../../feature/authThunk';
import { AppDispatch, RootState } from '../../store';
import { useNavigate } from 'react-router-dom';

interface LoginFormValues {
    email: string;
    password: string;
}

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const isAuthenticated = useSelector((state: RootState) => state.authReducer.isAuthenticated);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/admin/");
        }
    }, [isAuthenticated, navigate]);


    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
    });

    const handleSubmit = (values: LoginFormValues) => {
        console.log('Form data', values);
        dispatch(loginAdmin(values));

    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-black px-4">
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl text-gray-200 border border-gray-700">
                <h1 className="text-2xl font-bold text-center">Login</h1>

                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {() => (
                        <Form className="space-y-6">
                            {/* Email Field */}
                            <div className="space-y-1 text-sm">
                                <label htmlFor="email" className="block text-gray-300">Email</label>
                                <Field
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    className="w-full px-4 py-3 rounded-md border border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400 focus:border-violet-500 focus:ring focus:ring-violet-300"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-400 text-xs" />
                            </div>

                            {/* Password Field */}
                            <div className="space-y-1 text-sm">
                                <label htmlFor="password" className="block text-gray-300">Password</label>
                                <div className="relative">
                                    <Field
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        id="password"
                                        placeholder="Password"
                                        className="w-full px-4 py-3 rounded-md border border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400 focus:border-violet-500 focus:ring focus:ring-violet-300"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-200"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                <ErrorMessage name="password" component="div" className="text-red-400 text-xs" />
                                <div className="flex justify-end text-xs text-gray-400">
                                    <a rel="noopener noreferrer" href="#">Forgot Password?</a>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button type="submit" className="block w-full p-3 text-center rounded-md text-gray-50 bg-violet-600 hover:bg-violet-700 transition duration-200">
                                Sign in
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Login;