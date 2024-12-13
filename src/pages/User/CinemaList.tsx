'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Coffee, Ticket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

interface ShowTime {
    time: string
    price: string
}

interface Theater {
    name: string
    location: string
    hasFood: boolean
    hasMticket: boolean
    showTimes: ShowTime[]
    cancellationAvailable: boolean
}

const theaters: Theater[] = [
    {
        name: "Shenoys",
        location: "Kochi",
        hasFood: false,
        hasMticket: true,
        showTimes: [
            { time: "10:30 AM", price: "₹180" },
            { time: "01:30 PM", price: "₹180" }
        ],
        cancellationAvailable: true
    },
    {
        name: "PVR: Lulu Mall",
        location: "Kochi",
        hasFood: true,
        hasMticket: true,
        showTimes: [
            { time: "10:30 AM", price: "₹180" },
            { time: "01:30 PM", price: "₹180" },
            { time: "04:30 PM", price: "₹200" }
        ],
        cancellationAvailable: true
    },
    {
        name: "Cinepolis: Centre Square",
        location: "Kochi",
        hasFood: true,
        hasMticket: true,
        showTimes: [
            { time: "11:00 AM", price: "₹150" },
            { time: "02:30 PM", price: "₹150" }
        ],
        cancellationAvailable: true
    }
]

const dates = [
    { date: 12, day: 'MON' },
    { date: 13, day: 'TUE' },
    { date: 14, day: 'WED' },
    { date: 15, day: 'THU' },
    { date: 16, day: 'FRI' }
]

export default function MovieShowtimes() {
    const [selectedDate, setSelectedDate] = useState(12)

    return (
        <div className="mx-auto px-8 py-8">
            {/* Movie Title */}
            <div className="mb-6">
                <h1 className="text-2xl font-semibold mb-2">Pushpa 2: The Rule (Malayalam) - Malayalam</h1>
                <div className="flex items-center gap-2">
                    <Badge variant="secondary">2D</Badge>
                    <Badge variant="secondary">ACTION</Badge>
                </div>
            </div>

            {/* Date Selector */}
            <div className="flex items-center gap-4 mb-8">
                <Button variant="ghost" size="icon">
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex gap-2">
                    {dates.map(({ date, day }) => (
                        <Button
                            key={date}
                            variant={selectedDate === date ? "default" : "ghost"}
                            className="flex flex-col justify-center items-center py-6 px-8"
                            onClick={() => setSelectedDate(date)}
                        >
                            <span className="text-sm">{day}</span>
                            <span className="text-sm font-semibold">{date}</span>
                        </Button>
                    ))}
                </div>
                <Button variant="ghost" size="icon">
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4 mb-6">
                <Select defaultValue="malayalam">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="malayalam">Malayalam</SelectItem>
                        <SelectItem value="hindi">Hindi</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                    </SelectContent>
                </Select>
                <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Show Timings" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Timings</SelectItem>
                        <SelectItem value="morning">Morning</SelectItem>
                        <SelectItem value="afternoon">Afternoon</SelectItem>
                        <SelectItem value="evening">Evening</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Theater List */}
            <div className="space-y-6">
                {theaters.map((theater, index) => (
                    <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-lg font-semibold mb-1">{theater.name}</h3>
                                <div className="flex items-center gap-2">
                                    {theater.hasMticket && (
                                        <div className="flex items-center text-xs text-green-600">
                                            <Ticket className="h-3 w-3 mr-1" />
                                            M-Ticket
                                        </div>
                                    )}
                                    {theater.hasFood && (
                                        <div className="flex items-center text-xs text-amber-600">
                                            <Coffee className="h-3 w-3 mr-1" />
                                            Food & Beverage
                                        </div>
                                    )}
                                </div>
                            </div>
                            <Button variant="ghost" size="sm">
                                INFO
                            </Button>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {theater.showTimes.map((showTime, idx) => (
                                <Button
                                    key={idx}
                                    variant="outline"
                                    className="flex flex-col items-center"
                                >
                                    <span className="text-sm font-medium">{showTime.time}</span>
                                    <span className="text-xs text-muted-foreground">{showTime.price}</span>
                                </Button>
                            ))}
                        </div>
                        {theater.cancellationAvailable && (
                            <p className="text-xs text-green-600 mt-2">
                                Cancellation Available
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

