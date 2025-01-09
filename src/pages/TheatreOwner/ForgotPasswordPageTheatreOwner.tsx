import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Link } from 'react-router-dom'
// import { sendPasswordResetLink } from '../../feature/authThunk'
import axios, { AxiosError } from 'axios'
import { backendUrl } from '../../constants'
import { toast } from 'sonner'

const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
})

const ForgotPasswordPageTheatreOwner = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await axios.post(`${backendUrl}/theatreOwner/forgot-password`, { email: values.email });
            toast.success(response.data.responseMessage);
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.responseMessage || "An unexpected error occured");
            }
            console.log(error);
        }
    }

    return (
        <div className='flex justify-center min-h-screen items-center'>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Forgot Password</CardTitle>
                    <CardDescription>
                        Enter your email address to receive a password reset link.
                    </CardDescription>
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
                            <Button type="submit" className="w-full">Send Reset Link</Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <p className="text-sm text-center">
                        Remembered your password?{" "}
                        <Link to="/theatreOwner/login" className="text-primary hover:underline">
                            Log In
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}

export default ForgotPasswordPageTheatreOwner;
