import { useState, useRef, useEffect } from 'react'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { backendUrl } from '../../constants'
import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'
import { useLocation, useNavigate } from 'react-router-dom'

const VerifyOtpPageTheatreOwner = () => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [isResendDisabled, setIsResendDisabled] = useState(false);
    const [resendTimer, setResendTimer] = useState(60);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const navigate = useNavigate();

    const location = useLocation();
    const email = location.state?.email;

    useEffect(() => {
        if (resendTimer > 0) {
            const timerId = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
            return () => clearTimeout(timerId)
        } else {
            setIsResendDisabled(false)
        }
    }, [resendTimer])

    const handleChange = (index: number, value: string) => {
        if (isNaN(Number(value))) return

        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        // Move to next input
        if (value !== '' && index < 3) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData('text').slice(0, 4).split('')
        const newOtp = [...otp]
        pastedData.forEach((value, index) => {
            if (index < 4 && !isNaN(Number(value))) {
                newOtp[index] = value
            }
        })
        setOtp(newOtp)
        inputRefs.current[Math.min(pastedData.length, 3)]?.focus()
    }

    const handleSubmit = async () => {
        const otpString = otp.join('');
        try {
            const response = await axios.post(`${backendUrl}/theatreOwner/verify-otp`, { email, otp: otpString })
            toast.error(response.data.responseMessage);
            navigate("/theatreOwner/login");
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.responseMessage || "An unexpected error occured");
            }
            console.log(error);
        }
    }

    const handleResend = async () => {
        try {
            const response = await axios.post(`${backendUrl}/user/resent-otp`, { email })
            toast.error(response.data.responseMessage);
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.responseMessage || "An unexpected error occured");
            }
            console.log(error);
        }
        console.log('Resending OTP')
        setIsResendDisabled(true)
        setResendTimer(10)
    }

    if (!email) {
        navigate("/signup");
        return null;
    }

    return (
        <div className='flex justify-center min-h-screen items-center'>

            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Email Verification</CardTitle>
                    <CardDescription>Enter the 4-digit code sent to your email {email}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between mb-4">
                        {otp.map((digit, index) => (
                            <Input
                                key={index}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={handlePaste}
                                ref={(el) => (inputRefs.current[index] = el)}
                                className="w-14 h-14 text-center text-2xl"
                                aria-label={`Digit ${index + 1}`}
                            />
                        ))}
                    </div>
                    <Button onClick={handleSubmit} className="w-full">Verify</Button>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button
                        variant="outline"
                        onClick={handleResend}
                        disabled={isResendDisabled}
                    >
                        {isResendDisabled ? `Resend in ${resendTimer}s` : 'Resend Code'}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default VerifyOtpPageTheatreOwner;