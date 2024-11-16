'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginTheatreOwner } from '@/feature/authThunk'
import { AppDispatch, RootState } from '@/store'

const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
})

const LoginPageTheatreOwner = () => {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { theaterOwnerToken } = useSelector((state: RootState) => state.authReducer);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        dispatch(loginTheatreOwner({ email: values.email, password: values.password }));
        // Here you would typically send the form data to your backend
    }

    useEffect(() => {
        if (theaterOwnerToken) {
            navigate("/theatreOwner");
        }
    }, [theaterOwnerToken, navigate]);
    if (theaterOwnerToken) return null;

    return (
        <div className='flex justify-center min-h-screen items-center'>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>CinePass Theatre Management Login</CardTitle>
                    <CardDescription>Access your theatre's dashboard to manage showtimes, bookings, reports, and more.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Enter your password"
                                                    {...field}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-4 w-4" />
                                                    ) : (
                                                        <Eye className="h-4 w-4" />
                                                    )}
                                                    <span className="sr-only">
                                                        {showPassword ? "Hide password" : "Show password"}
                                                    </span>
                                                </Button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            /><div className="space-y-2">
                                <div className="text-sm text-right">
                                    <Link to="/theatreOwner/forgot-password" className="text-primary hover:underline">
                                        Forgot Password?
                                    </Link>
                                </div>
                                <Button type="submit" className="w-full">Log In</Button>
                                {/* <Button type="submit" className="w-full">Sign Up</Button> */}
                            </div>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <Button variant="outline" className="w-full">
                        Log In with Google
                    </Button>
                    <p className="text-sm text-center">
                        Dont have an account?{" "}
                        <Link to="/theatreOwner/signup" className="text-primary hover:underline">
                            Sign up
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}

export default LoginPageTheatreOwner;