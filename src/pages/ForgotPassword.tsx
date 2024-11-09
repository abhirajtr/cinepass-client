import { FC, useState } from 'react';

import axios, { AxiosError } from 'axios';
import { backendUrl } from '../constants';
import { toast } from 'sonner';
import OtpInput from '../components/OtpInput';
import PasswordReset from '../components/PasswordReset ';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import { useNavigate } from 'react-router-dom';


interface ForgotPasswordProps {
    user: string;
}


const ForgotPassword: FC<ForgotPasswordProps> = ({ user }) => {

    const [otpSent, setOtpSent] = useState(false);
    const [email, setEmail] = useState<string>('');
    const [otpVerified, setOtpVerified] = useState(false);
    const navigate = useNavigate();

    const onSubmitForgotPassword = async (email: string) => {
        try {
            const response = await axios.post(backendUrl + `/${user}/forgot-Password`, { email });
            toast.success(response.data?.message);
            setEmail(email);
            setOtpSent(true);
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message || "An unexpected error occurred. Please try again.");
            }
            console.log(error);
        }
    };


    const handleVerifyOtp = async (otp: string) => {
        try {
            const response = await axios.post(backendUrl + `/${user}/forgot-Password/verify-otp`, { email, otp });
            setOtpVerified(true);
            toast.success(response.data?.message);
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message || "An unexpected error occurred. Please try again.");
            }
            console.log(error);
        }
    }

    const handleResendOtp = async () => {
        try {
            const response = await axios.post(`${backendUrl}/user/resend-otp`, { email });
            toast.success(response.data?.message);
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message || "An unexpected error occurred. Please try again.");
            }
            console.log(error);
        }
    };
    
    const handleOnSubmitPassword = async (password: string, confirmPassword: string) => {
        try {
            const response = await axios.post(`${backendUrl}/user/password-reset`, {email, password, confirmPassword});
            toast.success(response.data?.message);
            navigate("/login");
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message || "An unexpected error occurred. Please try again.");
            }
            console.log(error);
        }
    }

    return (

        <div className="flex items-center justify-center min-h-screen bg-grey-10 px-4">
            {
                otpVerified ?
                    <PasswordReset onSubmit={handleOnSubmitPassword} /> :
                    otpSent ?
                        <OtpInput email={email} resendAction={handleResendOtp} submitAction={handleVerifyOtp} /> :
                        <ForgotPasswordForm onSubmit={onSubmitForgotPassword} />
            }
        </div >
    );
};

export default ForgotPassword;
