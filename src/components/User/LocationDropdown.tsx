import { useState, useEffect } from 'react'
import { Check, ChevronDown, MapPin, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'

interface Location {
    id: string
    name: string
    state: string
    isPopular: boolean
}

const locations: Location[] = [
    { id: '1', name: 'Mumbai', state: 'Maharashtra', isPopular: true },
    { id: '2', name: 'Delhi', state: 'Delhi', isPopular: true },
    { id: '3', name: 'Bangalore', state: 'Karnataka', isPopular: true },
    { id: '4', name: 'Chennai', state: 'Tamil Nadu', isPopular: true },
    { id: '5', name: 'Kolkata', state: 'West Bengal', isPopular: true },
    { id: '6', name: 'Hyderabad', state: 'Telangana', isPopular: true },
    { id: '7', name: 'Pune', state: 'Maharashtra', isPopular: false },
    { id: '8', name: 'Ahmedabad', state: 'Gujarat', isPopular: false },
    { id: '9', name: 'Jaipur', state: 'Rajasthan', isPopular: false },
    { id: '10', name: 'Lucknow', state: 'Uttar Pradesh', isPopular: false },
]

export function LocationDropdown() {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState('')
    const [currentLocation, setCurrentLocation] = useState<GeolocationPosition | null>(null)

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => setCurrentLocation(position),
                (error) => console.error('Error getting location:', error)
            )
        }
    }, [])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? locations.find((location) => location.name === value)?.name
                        : "Select location..."}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search location..." />
                    <CommandList>
                        <CommandEmpty>No location found.</CommandEmpty>
                        {currentLocation && (
                            <CommandGroup heading="Current Location">
                                <CommandItem
                                    onSelect={() => {
                                        setValue('Current Location')
                                        setOpen(false)
                                    }}
                                >
                                    <MapPin className="mr-2 h-4 w-4" />
                                    Use My Current Location
                                </CommandItem>
                            </CommandGroup>
                        )}
                        <CommandGroup heading="Popular Cities">
                            {locations
                                .filter((location) => location.isPopular)
                                .map((location) => (
                                    <CommandItem
                                        key={location.id}
                                        onSelect={() => {
                                            setValue(location.name)
                                            setOpen(false)
                                        }}
                                    >
                                        <Star className="mr-2 h-4 w-4" />
                                        {location.name}
                                        <Check
                                            className={cn(
                                                "ml-auto h-4 w-4",
                                                value === location.name ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                        </CommandGroup>
                        <CommandGroup heading="All Cities">
                            {locations.map((location) => (
                                <CommandItem
                                    key={location.id}
                                    onSelect={() => {
                                        setValue(location.name)
                                        setOpen(false)
                                    }}
                                >
                                    {location.name}, {location.state}
                                    <Check
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            value === location.name ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

