import { useState, useEffect, useCallback } from 'react';
import { Check, ChevronDown, MapPin, Star } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../../components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '../../components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '../../components/ui/popover';
import { useDispatch, useSelector } from 'react-redux';
import { setLocation } from '../../feature/locationSlice';
import { RootState } from '../../store';

interface Location {
    id: string;
    name: string;
    state: string;
    isPopular: boolean;
}

const locations: Location[] = [
    { id: '1', name: 'Thiruvananthapuram', state: 'Kerala', isPopular: true },
    { id: '2', name: 'Kollam', state: 'Kerala', isPopular: false },
    { id: '3', name: 'Pathanamthitta', state: 'Kerala', isPopular: false },
    { id: '4', name: 'Alappuzha', state: 'Kerala', isPopular: false },
    { id: '5', name: 'Kottayam', state: 'Kerala', isPopular: false },
    { id: '6', name: 'Idukki', state: 'Kerala', isPopular: false },
    { id: '7', name: 'Ernakulam', state: 'Kerala', isPopular: true },
    { id: '8', name: 'Thrissur', state: 'Kerala', isPopular: true },
    { id: '9', name: 'Palakkad', state: 'Kerala', isPopular: false },
    { id: '10', name: 'Malappuram', state: 'Kerala', isPopular: false },
    { id: '11', name: 'Kozhikode', state: 'Kerala', isPopular: true },
    { id: '12', name: 'Wayanad', state: 'Kerala', isPopular: false },
    { id: '13', name: 'Kannur', state: 'Kerala', isPopular: true },
    { id: '14', name: 'Kasaragod', state: 'Kerala', isPopular: false },
];

const mapboxToken = import.meta.env.VITE_MAPBOXGL_ACCESSTOKEN;

export function LocationDropdown() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [currentLocation, setCurrentLocation] = useState<GeolocationPosition | null>(null);
    const [currentDistrict, setCurrentDistrict] = useState<string | null>(null);

    const dispatch = useDispatch();
    const storedLocation = useSelector((state: RootState) => state.location.district); // Access location from Redux store
    const reverseGeocode = useCallback(async (latitude: number, longitude: number) => {
        try {
            const response = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxToken}`
            );
            const data = await response.json();
            console.log("loc", data);

            if (data.features && data.features.length > 0) {
                const districtFeature = data.features.find((feature: { place_type: string | string[]; }) =>
                    feature.place_type.includes("district")
                );
                if (districtFeature) {
                    console.log("District:", districtFeature.text);
                    setCurrentDistrict(districtFeature.text);
                } else {
                    console.log("District information not found.");
                }
            } else {
                console.error("No location data found.");
            }
        } catch (error) {
            console.error('Error reverse geocoding:', error);
        }
    }, []);
    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCurrentLocation(position);
                    reverseGeocode(position.coords.latitude, position.coords.longitude);
                },
                (error) => console.error('Error getting location:', error)
            );
        }
    }, [reverseGeocode]);

    useEffect(() => {
        if (storedLocation) {
            setValue(storedLocation);
        }
    }, [storedLocation]);



    const handleLocationSelect = (locationName: string) => {
        setValue(locationName);
        setOpen(false);
        dispatch(setLocation(locationName)); // Update Redux state and store in localStorage
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value || currentDistrict || "Select location..."}
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
                                        const location = currentDistrict || 'Current Location';
                                        handleLocationSelect(location); // Update Redux state when using current location
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
                                        onSelect={() => handleLocationSelect(location.name)} // Update Redux state when selecting a popular city
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
                                    onSelect={() => handleLocationSelect(location.name)} // Update Redux state when selecting any city
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
    );
}
