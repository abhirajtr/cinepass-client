"use client"

import { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { AlertCircle, Eye, EyeOff } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import axiosInstance from "@/axiosInstance"
import { AxiosError } from "axios"

// Define the schema for user information
const userInfoSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
})

// Define the schema for password change
const passwordChangeSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "New password must be at least 8 characters long"),
    confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

type UserInfoFormData = z.infer<typeof userInfoSchema>
type PasswordChangeFormData = z.infer<typeof passwordChangeSchema>

export default function UserProfile() {
    const [isChangingPassword, setIsChangingPassword] = useState(false)
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [userEmail, setUserEmail] = useState("")
    const [userPhone, setUserPhone] = useState("")

    const {
        register: registerUserInfo,
        handleSubmit: handleSubmitUserInfo,
        formState: { errors: userInfoErrors },
        control: userInfoControl,
        setValue: setUserInfoValue,
    } = useForm<UserInfoFormData>({
        resolver: zodResolver(userInfoSchema),
        defaultValues: {
            name: "",
        },
    })

    const {
        register: registerPasswordChange,
        handleSubmit: handleSubmitPasswordChange,
        formState: { errors: passwordChangeErrors },
        reset: resetPasswordChange,
    } = useForm<PasswordChangeFormData>({
        resolver: zodResolver(passwordChangeSchema),
    })

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true)
            setErrorMessage("")
            try {
                // Replace this with your actual API endpoint
                const { data } = await axiosInstance.get('/user/getUserInfo');
                console.log("userInfo", data);

                setUserInfoValue("name", data.responseData?.name)
                setUserEmail(data.responseData.email)
                setUserPhone(data.responseData.phone)
            } catch (error) {
                console.error('Error fetching user data:', error)
                setErrorMessage("Failed to load user data. Please try again later.")
            } finally {
                setIsLoading(false)
            }
        }

        fetchUserData()
    }, [setUserInfoValue])

    const onSubmitUserInfo = async (data: UserInfoFormData) => {
        setErrorMessage("")
        setSuccessMessage("")
        try {
            // Replace this with your actual API endpoint
            await axiosInstance.post('/user/update-name', { name: data.name });
            setSuccessMessage("User information updated successfully!")
        } catch (error) {
            console.error('Error updating user info:', error)
            setErrorMessage("Failed to update user information. Please try again.")
        }
        setTimeout(() => {
            setSuccessMessage("")
            setErrorMessage("")
        }, 3000)
    }

    const onSubmitPasswordChange = async (data: PasswordChangeFormData) => {
        setErrorMessage("")
        setSuccessMessage("")
        try {
            await axiosInstance.put('/user/update-password', {
                currentPassword: data.currentPassword,
                newPassword: data.newPassword,
                confirmPassword: data.confirmPassword,
            })
            setSuccessMessage("Password changed successfully!")
            setIsChangingPassword(false)
            resetPasswordChange()
        } catch (error) {
            if (error instanceof AxiosError) {
                setErrorMessage(error.response?.data?.responseMessage ||"Failed to change password. Please try again")
            }
            console.error('Error changing password:', error)
        }
        setTimeout(() => {
            setSuccessMessage("")
            setErrorMessage("")
        }, 3000)
    }

    const PasswordInput = ({ register, name, label, error, show, setShow }) => (
        <div className="space-y-2">
            <Label htmlFor={name}>{label}</Label>
            <div className="relative">
                <Input
                    id={name}
                    type={show ? "text" : "password"}
                    {...register(name)}
                    className={error ? "border-red-500" : ""}
                />
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShow(!show)}
                >
                    {show ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                    )}
                    <span className="sr-only">
                        {show ? "Hide password" : "Show password"}
                    </span>
                </Button>
            </div>
            {error && <p className="text-sm text-red-500">{error.message}</p>}
        </div>
    )

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-10">
                <Card className="w-[400px]">
                    <CardContent className="pt-6">
                        <p className="text-center">Loading user data...</p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center p-10">
            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle>User Profile</CardTitle>
                    <CardDescription>Manage your account settings</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmitUserInfo(onSubmitUserInfo)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Controller
                                name="name"
                                control={userInfoControl}
                                render={({ field }) => (
                                    <Input id="name" {...field} className={userInfoErrors.name ? "border-red-500" : ""} />
                                )}
                            />
                            {userInfoErrors.name && (
                                <p className="text-sm text-red-500">{userInfoErrors.name.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" value={userEmail} disabled />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" value={userPhone} disabled />
                        </div>
                        <Button type="submit">Save Changes</Button>
                    </form>

                    {!isChangingPassword ? (
                        <Button onClick={() => setIsChangingPassword(true)} className="mt-4 w-full">
                            Change Password
                        </Button>
                    ) : (
                        <form onSubmit={handleSubmitPasswordChange(onSubmitPasswordChange)} className="mt-4 space-y-4">
                            <PasswordInput
                                register={registerPasswordChange}
                                name="currentPassword"
                                label="Current Password"
                                error={passwordChangeErrors.currentPassword}
                                show={showCurrentPassword}
                                setShow={setShowCurrentPassword}
                            />
                            <PasswordInput
                                register={registerPasswordChange}
                                name="newPassword"
                                label="New Password"
                                error={passwordChangeErrors.newPassword}
                                show={showNewPassword}
                                setShow={setShowNewPassword}
                            />
                            <PasswordInput
                                register={registerPasswordChange}
                                name="confirmPassword"
                                label="Confirm New Password"
                                error={passwordChangeErrors.confirmPassword}
                                show={showConfirmPassword}
                                setShow={setShowConfirmPassword}
                            />
                            <div className="flex space-x-2">
                                <Button type="submit" className="flex-grow">Update Password</Button>
                                <Button type="button" variant="outline" onClick={() => {
                                    setIsChangingPassword(false)
                                    resetPasswordChange()
                                }}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    )}
                </CardContent>
                <CardFooter>
                    {successMessage && (
                        <Alert variant="default" className="w-full bg-green-100 text-green-800 border-green-300">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Success</AlertTitle>
                            <AlertDescription>{successMessage}</AlertDescription>
                        </Alert>
                    )}
                    {errorMessage && (
                        <Alert variant="destructive" className="w-full">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{errorMessage}</AlertDescription>
                        </Alert>
                    )}
                </CardFooter>
            </Card>
        </div>
    )
}

