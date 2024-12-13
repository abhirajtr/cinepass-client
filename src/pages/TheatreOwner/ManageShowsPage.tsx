// import { useEffect, useState } from 'react'
// import { useForm, Controller } from 'react-hook-form'
// import { Clock, Pencil, Trash } from 'lucide-react'
// import { format } from 'date-fns'
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// import { Button } from "@/components/ui/button"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { AxiosError } from 'axios'
// import { toast } from 'sonner'
// import theatreOwnerApi from '@/axiosInstance/theatreOwnerApi'
// import { useParams } from 'react-router-dom'

// type Show = {
//     id: number
//     movie: string
//     movieId: string
//     startDateTime: Date
//     endDateTime: Date
// }

// interface Movie {
//     id: string;
//     title: string;
// }

// export default function ManageShows() {
//     const [shows, setShows] = useState<Show[]>([])
//     const [editingId, setEditingId] = useState<number | null>(null);
//     const [movies, setMovies] = useState<Movie[]>([]);
//     const { theatreId, screenId } = useParams();

//     useEffect(() => {
//         const fetchMoviesList = async () => {
//             try {
//                 const response = await theatreOwnerApi.get("/movies");
//                 setMovies(response.data.responseData?.movies);
//                 console.log(movies);

//             } catch (error) {
//                 if (error instanceof AxiosError) {
//                     toast.error(error.response?.data?.responseMessage || "An unexpected error occured");
//                 }
//             }
//         }
//         fetchMoviesList();
//     }, []);

//     const { register, handleSubmit, control, reset, setValue } = useForm<Show>()

//     const onSubmit = async (data: Show) => {
//         try {
//             console.log(data);
//             // return;
//             await theatreOwnerApi.post("/theatre/screen/add-show", { theatreId, screenId, ...data });
//         } catch (error) {
//             if (error instanceof AxiosError) {
//                 toast.error(error.response?.data?.responseMessage || "An unexpected error occured");
//             }
//         }
//         if (editingId !== null) {
//             setShows(shows.map(show => show.id === editingId ? { ...data, id: editingId } : show))
//             setEditingId(null)
//         } else {
//             setShows([...shows, { ...data, id: Date.now() }])
//         }
//         reset();
//     }

//     const editShow = (show: Show) => {
//         setEditingId(show.id)
//         setValue('movie', show.movie)
//         setValue('movieId', show.movieId)
//         setValue('startDateTime', show.startDateTime)
//         setValue('endDateTime', show.endDateTime)
//     }

//     const deleteShow = (id: number) => {
//         setShows(shows.filter(show => show.id !== id))
//     }

//     return (
//         <div className="container mx-auto p-4">
//             <h1 className="text-2xl font-bold mb-4">Manage Shows</h1>

//             <Card className="mb-8">
//                 <CardHeader>
//                     <CardTitle>{editingId !== null ? 'Edit Show' : 'Add New Show'}</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                         <div>
//                             <Label htmlFor="movie">Movie</Label>
//                             <Controller
//                                 name="movie"
//                                 control={control}
//                                 rules={{ required: true }}
//                                 render={({ field }) => (
//                                     <Select onValueChange={field.onChange} value={field.value}>
//                                         <SelectTrigger>
//                                             <SelectValue placeholder="Select a movie" />
//                                         </SelectTrigger>
//                                         <SelectContent>
//                                             {movies.map((movie) => (
//                                                 <SelectItem key={movie.id} value={movie.title}>
//                                                     {movie.title}
//                                                 </SelectItem>
//                                             ))}
//                                         </SelectContent>
//                                     </Select>
//                                 )}
//                             />
//                         </div>

//                         <div>
//                             <Label htmlFor="startDateTime">Start Date and Time</Label>
//                             <Controller
//                                 name="startDateTime"
//                                 control={control}
//                                 rules={{ required: true }}
//                                 render={({ field }) => (
//                                     <Popover>
//                                         <PopoverTrigger asChild>
//                                             <Button
//                                                 variant={"outline"}
//                                                 className={`w-full justify-start text-left font-normal ${!field.value && "text-muted-foreground"}`}
//                                             >
//                                                 <Clock className="mr-2 h-4 w-4" />
//                                                 {field.value ? format(field.value, "PPP p") : <span>Pick start date and time</span>}
//                                             </Button>
//                                         </PopoverTrigger>
//                                         <PopoverContent className="w-auto p-0">
//                                             <DatePicker
//                                                 selected={field.value}
//                                                 onChange={(date: Date) => field.onChange(date)}
//                                                 showTimeSelect
//                                                 dateFormat="MMMM d, yyyy h:mm aa"
//                                                 wrapperClassName="w-full"
//                                                 className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//                                             />
//                                         </PopoverContent>
//                                     </Popover>
//                                 )}
//                             />
//                         </div>

//                         <div>
//                             <Label htmlFor="endDateTime">End Date and Time</Label>
//                             <Controller
//                                 name="endDateTime"
//                                 control={control}
//                                 rules={{ required: true }}
//                                 render={({ field }) => (
//                                     <Popover>
//                                         <PopoverTrigger asChild>
//                                             <Button
//                                                 variant={"outline"}
//                                                 className={`w-full justify-start text-left font-normal ${!field.value && "text-muted-foreground"}`}
//                                             >
//                                                 <Clock className="mr-2 h-4 w-4" />
//                                                 {field.value ? format(field.value, "PPP p") : <span>Pick end date and time</span>}
//                                             </Button>
//                                         </PopoverTrigger>
//                                         <PopoverContent className="w-auto p-0">
//                                             <DatePicker
//                                                 selected={field.value}
//                                                 onChange={(date: Date) => field.onChange(date)}
//                                                 showTimeSelect
//                                                 dateFormat="MMMM d, yyyy h:mm aa"
//                                                 wrapperClassName="w-full"
//                                                 className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//                                             />
//                                         </PopoverContent>
//                                     </Popover>
//                                 )}
//                             />
//                         </div>

//                         <Button type="submit">{editingId !== null ? 'Update Show' : 'Add Show'}</Button>
//                     </form>
//                 </CardContent>
//             </Card>

//             <h2 className="text-xl font-semibold mb-4">Scheduled Shows</h2>
//             {shows.length === 0 ? (
//                 <p>No shows scheduled yet.</p>
//             ) : (
//                 <div className="space-y-4">
//                     {shows.map((show) => (
//                         <Card key={show.id}>
//                             <CardContent className="flex items-center justify-between p-4">
//                                 <div>
//                                     <h3 className="font-semibold">{show.movie}</h3>
//                                     <p className="text-sm text-gray-500">
//                                         {format(show.startDateTime, "PPP p")} - {format(show.endDateTime, "p")}
//                                     </p>
//                                 </div>
//                                 <div>
//                                     <Button variant="ghost" size="icon" onClick={() => editShow(show)}>
//                                         <Pencil className="h-4 w-4" />
//                                     </Button>
//                                     <Button variant="ghost" size="icon" onClick={() => deleteShow(show.id)}>
//                                         <Trash className="h-4 w-4" />
//                                     </Button>
//                                 </div>
//                             </CardContent>
//                         </Card>
//                     ))}
//                 </div>
//             )}
//         </div>
//     )
// }

