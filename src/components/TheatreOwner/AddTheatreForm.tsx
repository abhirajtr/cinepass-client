import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AddTheatre } from '@/pages/TheatreOwner/TheatresPageTheatreOwner'

const formSchema = z.object({
    theatreName: z.string().min(1, "Theatre name is required."),
    contactEmail: z.string().email("Invalid email address."),
    contactNumber: z
        .string()
        .min(10, "Contact number must be 10 digits.")
        .max(10, "Contact number must be 10 digits.")
        .regex(/^\d{10}$/, "Contact number must be digits only."),
    streetAddress: z.string().min(1, "Street address is required."),
    city: z.string().min(1, "City is required."),
    state: z.string().min(1, "State is required."),
    zipCode: z.string().min(1, "Zip code is required."),
    verificationDocument: z
        .instanceof(File, { message: "Please upload a verification document." })
        .refine((file) => !!file, {
            message: "Verification document is required.",
        }),
});


interface AddTheatreFormProps {
    onSubmit: (data: AddTheatre) => void; onCancel: () => void
}

export default function AddTheatreForm({ onSubmit, onCancel }: AddTheatreFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            theatreName: "",
            contactEmail: "",
            contactNumber: "",
            streetAddress: "",
            city: "",
            state: "",
            zipCode: "",
            verificationDocument: undefined,
        },
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-6">
                <FormField
                    control={form.control}
                    name="theatreName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Theatre Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter theatre name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contact Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter contact email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="contactNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contact Number</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter contact number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="streetAddress"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Street Address</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Enter full address" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter city" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter state" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Zip Code</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter zip code" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="verificationDocument"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Verification Document</FormLabel>
                            <FormControl>
                                {/* <Input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0] || null; // Handle no file selected
                                        field.onChange(file);
                                    }}
                                /> */}
                                <Input type="file" accept=".pdf,.doc,.docx" onChange={(e) => field.onChange(e.target.files?.[0])} />
                            </FormControl>
                            <FormDescription>
                                Upload a document for theatre verification (PDF, DOC, or DOCX)
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-end space-x-4">
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </Form>
    )
}