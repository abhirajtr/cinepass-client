'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { X, Search } from 'lucide-react'

interface Cinema {
    name: string
    location: string
    features: string
}

const cinemas: Cinema[] = [
    { name: "PVR: Lulu", location: "Kochi", features: "4K Dolby Atmos" },
    { name: "PVR: Forum Mall", location: "Kochi", features: "4K 3D" },
    { name: "Cinepolis: Centre Square", location: "Kochi", features: "4K Dolby Atmos" },
    { name: "PVR: Oberon Mall", location: "Kochi", features: "4K 3D" },
    { name: "G Cinemas Fort Kochi", location: "Kochi", features: "4K Dolby ATMOS" },
    { name: "Vanitha Cineplex RGB Laser", location: "Edappally", features: "4K 3D ATMOS" },
    { name: "Kairali Sree Theater", location: "North Parvur", features: "2K Dolby" },
    { name: "MY Cinemas, KSRT Complex", location: "Angamaly", features: "4K 3D Dolby ATMOS" },
    { name: "Shenoys", location: "Kochi", features: "4K Dolby" },
    { name: "MY Cinemas RedCarpet", location: "Kariyad", features: "4K 3D" },
    { name: "Padma Cinema", location: "Kochi", features: "2K Dolby" },
    { name: "New Central Talkies", location: "Thripun", features: "Dolby Atmos 2K and 3D" },
    { name: "Central Talkies RGB Laser", location: "Kochi", features: "4K 3D Dolby Atmos" },
    { name: "Cinepolis: VIP Centre Square Mall", location: "Kochi", features: "4K Dolby ATMOS" },
    { name: "K Cinemas 4K", location: "Cherai", features: "Dolby Atmos Tripplebeam 3D" },
    { name: "Pan Cinemas", location: "Nucleus Mall", features: "4K Dolby" },
    { name: "Matha Madhurya Theatre", location: "Aluva", features: "DOLBY ATMOS 2K 3D" },
    { name: "Aashirvad Cineplexx", location: "Perumbavoor", features: "4K Dolby" },
    { name: "Zeenath Theatre", location: "Aluva", features: "2K A/C" },
    { name: "Sridar: Marine Drive", location: "Kochi", features: "4K Dolby" },
]

export default function SearchModal() {
    const [searchQuery, setSearchQuery] = useState('')
    const [open, setOpen] = useState(false)

    const filteredCinemas = cinemas.filter(cinema =>
        cinema.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cinema.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cinema.features.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <Search className="mr-2 h-4 w-4" />
                    <span>Search for Movies, Events, Plays, Sports and Activities</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
                <div className="py-6">
                    <div className="relative mb-6">
                        <Input
                            type="text"
                            placeholder="Search for Movies, Events, Plays, Sports and Activities"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-4 pr-10 py-3 text-base"
                            autoFocus
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                                <X className="h-5 w-5 text-gray-400" />
                            </button>
                        )}
                    </div>

                    <Tabs defaultValue="movies" className="mb-8">
                        <TabsList className="grid w-[400px] grid-cols-2">
                            <TabsTrigger value="movies" className="text-base">MOVIES</TabsTrigger>
                            <TabsTrigger value="cinemas" className="text-base">CINEMAS</TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCinemas.map((cinema, index) => (
                            <div
                                key={index}
                                className="group cursor-pointer"
                            >
                                <div className="text-sm hover:text-primary transition-colors">
                                    <h3 className="font-medium">{cinema.name}</h3>
                                    <p className="text-muted-foreground text-xs mt-1">
                                        {cinema.features}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

