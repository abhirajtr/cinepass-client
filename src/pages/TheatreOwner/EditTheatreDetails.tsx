import { useState, useEffect, useRef, useCallback } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form"
import theatreOwnerApi from '../../axiosInstance/theatreOwnerApi'
import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '../../components/ui/breadcrumb'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOXGL_ACCESSTOKEN;

interface MapboxFeature {
    place_name: string;
    context: Array<{
        id: string;
        text: string;
    }>;
}

const theatreSchema = z.object({
    name: z.string().min(1, "Name is required"),
    phone: z.string()
        .min(10, "Phone is required")
        .max(10, "phone number must be 10 digits")
        .regex(/^\+?[\d\s-()]+$/, "Invalid phone number format"),
    email: z.string().email("Invalid email"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    country: z.string().min(1, "Country is required"),
    zipCode: z.string().min(1, "Zip Code is required"),
    latitude: z.number().nullable(),
    longitude: z.number().nullable(),
    licenseNumber: z.string().min(1, "License number is required"),
    verificationDocument: z.any().optional()
})

type TheatreDetails = z.infer<typeof theatreSchema>

const EditTheatre = () => {
    const [mapCenter, setMapCenter] = useState<[number, number]>([-74.5, 40])
    const [isMapReady, setIsMapReady] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const mapContainer = useRef<HTMLDivElement>(null)
    const map = useRef<mapboxgl.Map | null>(null)
    const marker = useRef<mapboxgl.Marker | null>(null)
    const navigate = useNavigate()
    const { theatreId } = useParams<{ theatreId: string }>()

    const form = useForm<TheatreDetails>({
        resolver: zodResolver(theatreSchema),
        defaultValues: {
            name: '',
            phone: '',
            email: '',
            address: '',
            city: '',
            state: '',
            country: '',
            zipCode: '',
            latitude: null,
            longitude: null,
            licenseNumber: '',
        },
    })

    useEffect(() => {
        const fetchTheatreDetails = async () => {
            console.log(theatreId);

            if (!theatreId) return
            setIsLoading(true)
            try {
                const response = await theatreOwnerApi.get(`/theatres/${theatreId}`)
                console.log(response);
                const theatreData = response.data.responseData.theatre
                form.reset(theatreData)
                if (theatreData.latitude && theatreData.longitude) {
                    setMapCenter([theatreData.longitude, theatreData.latitude])
                    if (map.current) {
                        map.current.setCenter([theatreData.longitude, theatreData.latitude])
                        if (marker.current) {
                            marker.current.setLngLat([theatreData.longitude, theatreData.latitude])
                        }
                    }
                }
            } catch (error) {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data.responseMessage || "Failed to fetch theatre details")
                }
                console.error('Error fetching theatre details:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchTheatreDetails()
    }, [theatreId, form])

    const updateFormWithLocation = useCallback(async (coords: [number, number]) => {
        setIsLoading(true);
        try {
            const [lng, lat] = coords
            form.setValue('latitude', lat)
            form.setValue('longitude', lng)

            const response = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`
            )
            const data = await response.json();
            if (!response.ok) {
                throw new Error('Failed to fetch address details')
            }

            if (data.features && data.features.length > 0) {
                const features = data.features[0] as MapboxFeature;
                const context = features.context;

                const street = features.place_name;
                const city = context.find((item) => item.id.startsWith('place'))?.text || '';
                const state = context.find((item) => item.id.startsWith('region'))?.text || '';
                const country = context.find((item) => item.id.startsWith('country'))?.text || '';
                const postalCode = context.find((item) => item.id.startsWith('postcode'))?.text || '';

                form.setValue('address', street)
                form.setValue('city', city)
                form.setValue('state', state)
                form.setValue('country', country)
                form.setValue('zipCode', postalCode)
            }
        } catch (error) {
            console.error('Error fetching address:', error);
            form.setError('address', {
                type: 'manual',
                message: 'Failed to fetch address details'
            });
        } finally {
            setIsLoading(false)
        }
    }, [form, setIsLoading]);

    const initializeMap = useCallback((center: [number, number]) => {
        if (!mapContainer.current) return;

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: center,
            zoom: 13
        })

        map.current.addControl(new mapboxgl.NavigationControl())

        map.current.on('load', () => {
            setIsMapReady(true)
            marker.current = new mapboxgl.Marker()
                .setLngLat(center)
                .addTo(map.current!)

            updateFormWithLocation(center)
        })

        map.current.on('click', (e) => {
            const { lng, lat } = e.lngLat
            marker.current?.setLngLat([lng, lat])
            updateFormWithLocation([lng, lat])
        })
    }, [updateFormWithLocation])

    useEffect(() => {
        if (!mapContainer.current || map.current) return

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords
                setMapCenter([longitude, latitude])
                initializeMap([longitude, latitude])
            },
            () => {
                console.error("Unable to retrieve your location")
                initializeMap(mapCenter)
            }
        )
    }, [mapCenter, initializeMap])

    useEffect(() => {
        return () => {
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
            if (marker.current) {
                marker.current.remove();
                marker.current = null;
            }
        };
    }, []);

    const onSubmit = async (data: TheatreDetails) => {
        if (!theatreId) return
        try {
            setIsLoading(true);
            const response = await theatreOwnerApi.patch(`/theatres/${theatreId}/edit`, data);
            if (data.verificationDocument instanceof File) {
                toast.info("uploading file")
                await axios.put(response.data?.responseData.presignedUrl, data.verificationDocument);
            }
            toast.success("Theatre updated successfully")
            navigate("/theatreOwner/theatres");
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.responseMessage || "An unexpected error occurred");
            }
            console.error('Error submitting form:', error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="container">
            <div className="w-full max-w-4xl">
                {isLoading && (
                    <div className="text-center py-2">
                        <p className="text-sm text-gray-500">Loading...</p>
                    </div>
                )}
                <CardHeader>
                    <Breadcrumb className='mb-3'>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link to="/theatreOwner/theatres">Theatres</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Edit Theatre</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <CardTitle>Edit Theatre Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Theatre Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="email" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="licenseNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>License Number</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Address</FormLabel>
                                            <FormControl>
                                                <Input {...field} readOnly />
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
                                                <Input {...field} readOnly />
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
                                                <Input {...field} readOnly />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="country"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Country</FormLabel>
                                            <FormControl>
                                                <Input {...field} readOnly />
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
                                                <Input {...field} readOnly />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div ref={mapContainer} className="h-64 w-full rounded-md" />

                            {isMapReady && form.watch('latitude') && form.watch('longitude') && (
                                <p className="text-sm text-gray-500">
                                    Selected coordinates: {form.watch('latitude')?.toFixed(6)}, {form.watch('longitude')?.toFixed(6)}
                                </p>
                            )}

                            <FormField
                                control={form.control}
                                name="verificationDocument"
                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                render={({ field: { onChange, value, ...field } }) => (
                                    <FormItem>
                                        <FormLabel>Verification Document</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                accept=".pdf,.jpg,.jpeg,.png"
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                    const file = e.target.files?.[0]
                                                    if (file) onChange(file)
                                                }}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>Upload a new verification document if needed (PDF, JPEG, or PNG, max 5MB)</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                className="w-full sm:w-1/2"
                                disabled={isLoading}
                            >
                                {isLoading ? "Updating..." : "Update Theatre"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </div>
        </div>
    )
}

export default EditTheatre