import React, { useState, useRef, useEffect } from 'react';

interface OtpInputProps {
    email: string;
    submitAction: (otp: string) => void;
    resendAction: () => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ email, submitAction, resendAction }) => {
    const [otp, setOtp] = useState<string[]>(['', '', '', '']);
    const [isResendDisabled, setIsResendDisabled] = useState<boolean>(true);
    const [timer, setTimer] = useState<number>(60);
    const [error, setError] = useState<string | null>(null);
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
    


    
    useEffect(() => {
        if (isResendDisabled) {
            const interval = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        setIsResendDisabled(false);
                        clearInterval(interval);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isResendDisabled]);

    
    const handleChange = (value: string, index: number) => {
        if (!/^\d*$/.test(value)) return;
        const updatedOtp = [...otp];
        updatedOtp[index] = value;

        if (value.length === 1 && index < 3) {
            inputsRef.current[index + 1]?.focus();
        }
        setOtp(updatedOtp);
    };

    // Handle backspace to move focus back
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    
    const handleSubmit = () => {
        const otpValue = otp.join('');
        if (otpValue.length === 4) {
            submitAction(otpValue);
            setError(null);
        } else {
            setError('Please enter the full 4-digit OTP');
        }
    };

    // Resend OTP
    const handleResendOtp = () => {
        resendAction();
        setIsResendDisabled(true);
        setTimer(60);
    };

    return (
        
            <div className="w-full max-w-md p-6 bg-black border border-gray-700 rounded-md shadow-lg">
                <h1 className="text-3xl font-bold text-center text-white mb-4">Enter OTP</h1>
                <p className="text-center text-gray-400 mb-6">
                    We have sent a 4-digit OTP to your email: <span className="font-bold">{email}</span>
                </p>

                {/* OTP Inputs */}
                <div className="flex justify-center mb-4 space-x-2">
                    {otp.map((_, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            className="w-12 h-12 text-center text-white bg-gray-900 border border-gray-700 rounded-md text-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                            value={otp[index]}
                            onChange={(e) => handleChange(e.target.value, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            ref={(el) => (inputsRef.current[index] = el)}
                        />
                    ))}
                </div>

                {/* Error Message */}
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    className="w-full bg-pink-600 text-white py-2 rounded-md mt-4 hover:bg-pink-700 transition duration-300"
                    disabled={otp.some((digit) => digit === '') || otp.length !== 4} // Disable if any field is empty or OTP is not 4 digits
                >
                    Submit OTP
                </button>

                {/* Resend OTP Section */}
                <div className="mt-4 text-center flex items-center min-h-16">
                    {isResendDisabled ? (
                        <p className="text-gray-400 mr-2">
                            You can resend OTP in {timer} seconds
                        </p>
                    ) : (
                        <button
                            onClick={handleResendOtp}
                            className="bg-pink-600 text-white rounded-md p-2 mt-2 hover:bg-pink-700 transition duration-300"
                        >
                            Resend OTP
                        </button>
                    )}
                </div>
            </div>
    );
};

export default OtpInput;
