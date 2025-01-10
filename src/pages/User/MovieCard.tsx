import { Card, CardContent } from "../../components/ui/card"
// import { Star } from 'lucide-react'

interface MovieCardProps {
    title: string
    posterPath: string
    rating: number
}

export function MovieCard({ title, posterPath }: MovieCardProps) {
    return (
        <Card className="w-[250px] flex-shrink-0 hover:cursor-pointer">
            <CardContent className="p-3">
                <img src={`https://image.tmdb.org/t/p/w500`+ posterPath} alt={title} className="w-full h-[280px] object-cover rounded-md mb-2" />
                <h3 className="font-semibold text-sm mb-1 truncate">{title}</h3>
                <div className="flex items-center justify-between">
                    {/* <div className="flex items-center">
                        <Star className="w-3 h-3 text-yellow-400 mr-1" />
                        <span className="text-xs">{rating.toFixed(1)}</span>
                    </div> */}
                    {/* <Button size="sm" className="text-xs">Book</Button> */}
                </div>
            </CardContent>
        </Card>
    )
}

