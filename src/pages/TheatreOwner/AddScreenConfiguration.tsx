import React, { useState, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { PlusCircle, Trash2, Edit2, Save, ChevronDown, ChevronUp, Grid, Settings } from 'lucide-react'
import { toast } from 'sonner'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Switch } from "@/components/ui/switch"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface Seat {
    seatId: string
    type: string
    status: string
    price: number
}

interface Row {
    rowId: string
    seats: (Seat | null)[]
}

interface Screen {
    screenId: string
    screenName: string
    seatLayout: {
        rows: Row[]
    }
}

interface Tier {
    id: string
    name: string
    price: number
    color: string
}

export default function AdminScreenConfiguration() {
    const [currentScreen, setCurrentScreen] = useState<Screen | null>(null)
    const [newRowId, setNewRowId] = useState('')
    const [selectedTier, setSelectedTier] = useState<Tier | null>(null)
    const [tiers, setTiers] = useState<Tier[]>([
        { id: '1', name: 'Standard', price: 100, color: 'bg-blue-500' },
        { id: '2', name: 'VIP', price: 200, color: 'bg-purple-500' }
    ])
    const [newTierName, setNewTierName] = useState('')
    const [newTierPrice, setNewTierPrice] = useState('')
    const [newTierColor, setNewTierColor] = useState('')
    const [isAddingTier, setIsAddingTier] = useState(false)
    const [editingTier, setEditingTier] = useState<Tier | null>(null)
    const [isCompactView, setIsCompactView] = useState(false)

    const handleAddRow = useCallback(() => {
        if (currentScreen && newRowId) {
            setCurrentScreen(prevScreen => {
                if (!prevScreen) return null
                const updatedScreen = { ...prevScreen }
                updatedScreen.seatLayout.rows.push({
                    rowId: newRowId,
                    seats: []
                })
                return updatedScreen
            })
            setNewRowId('')
            toast.success(`Row "${newRowId}" added to ${currentScreen.screenName}`)
        }
    }, [currentScreen, newRowId])

    const handleAddSeat = useCallback((rowIndex: number) => {
        if (currentScreen && selectedTier) {
            setCurrentScreen(prevScreen => {
                if (!prevScreen) return null
                const updatedScreen = { ...prevScreen }
                const row = updatedScreen.seatLayout.rows[rowIndex]
                const seatId = `${row.rowId}${row.seats.length + 1}`
                row.seats.push({
                    seatId,
                    type: selectedTier.name,
                    status: 'available',
                    price: selectedTier.price
                })
                return updatedScreen
            })
            toast.success(`Seat "${selectedTier.name}" added to row ${currentScreen.seatLayout.rows[rowIndex].rowId}`)
        } else {
            toast.error("Please select a tier before adding a seat")
        }
    }, [currentScreen, selectedTier])

    const handleAddGap = useCallback((rowIndex: number) => {
        if (currentScreen) {
            setCurrentScreen(prevScreen => {
                if (!prevScreen) return null
                const updatedScreen = { ...prevScreen }
                updatedScreen.seatLayout.rows[rowIndex].seats.push(null)
                return updatedScreen
            })
            toast.success(`Gap added to row ${currentScreen.seatLayout.rows[rowIndex].rowId}`)
        }
    }, [currentScreen])

    const handleRemoveSeat = useCallback((rowIndex: number, seatIndex: number) => {
        if (currentScreen) {
            setCurrentScreen(prevScreen => {
                if (!prevScreen) return null
                const updatedScreen = { ...prevScreen }
                const row = updatedScreen.seatLayout.rows[rowIndex]
                row.seats.splice(seatIndex, 1)
                return updatedScreen
            })
            toast.success(`Seat removed from row ${currentScreen.seatLayout.rows[rowIndex].rowId}`)
        }
    }, [currentScreen])

    const handleAddTier = useCallback(() => {
        if (newTierName && newTierPrice && newTierColor) {
            const newTier: Tier = {
                id: (tiers.length + 1).toString(),
                name: newTierName,
                price: parseInt(newTierPrice),
                color: newTierColor
            }
            setTiers(prevTiers => [...prevTiers, newTier])
            setNewTierName('')
            setNewTierPrice('')
            setNewTierColor('')
            setIsAddingTier(false)
            toast.success(`New tier "${newTierName}" added successfully`)
        }
    }, [newTierName, newTierPrice, newTierColor, tiers])

    const handleEditTier = useCallback((tier: Tier) => {
        setEditingTier(tier)
        setNewTierName(tier.name)
        setNewTierPrice(tier.price.toString())
        setNewTierColor(tier.color)
    }, [])

    const handleUpdateTier = useCallback(() => {
        if (editingTier && newTierName && newTierPrice && newTierColor) {
            setTiers(prevTiers => prevTiers.map(tier =>
                tier.id === editingTier.id ? { ...tier, name: newTierName, price: parseInt(newTierPrice), color: newTierColor } : tier
            ))
            setEditingTier(null)
            setNewTierName('')
            setNewTierPrice('')
            setNewTierColor('')
            toast.success(`Tier "${newTierName}" updated successfully`)
        }
    }, [editingTier, newTierName, newTierPrice, newTierColor])

    const handleRemoveTier = useCallback((tierId: string) => {
        setTiers(prevTiers => prevTiers.filter(tier => tier.id !== tierId))
        toast.success('Tier removed successfully')
    }, [])

    const handleSaveConfiguration = useCallback(() => {
        if (currentScreen) {
            console.log('Saving configuration:', { screen: currentScreen, tiers })
            toast.success('Screen and tier configuration saved successfully')
        } else {
            toast.error('Please set a screen name before saving')
        }
    }, [currentScreen, tiers])

    const renderSeat = useCallback((seat: Seat | null, rowIndex: number, seatIndex: number) => {
        if (!seat) return <div key={seatIndex} className="w-8 h-8 bg-gray-200 rounded-md"></div>
        const tier = tiers.find(t => t.name === seat.type)
        return (
            <Popover key={seatIndex}>
                <PopoverTrigger asChild>
                    <div className={`relative w-8 h-8 flex items-center justify-center rounded-md text-white cursor-pointer ${tier?.color || 'bg-gray-500'}`}>
                        {isCompactView ? '' : seat.seatId.slice(-2)}
                    </div>
                </PopoverTrigger>
                <PopoverContent className="w-40">
                    <div className="grid gap-2">
                        <p className="font-semibold">{seat.seatId}</p>
                        <p>Type: {seat.type}</p>
                        <p>Price: ₹{seat.price}</p>
                        <Button variant="destructive" size="sm" onClick={() => handleRemoveSeat(rowIndex, seatIndex)}>
                            Remove Seat
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
        )
    }, [tiers, isCompactView, handleRemoveSeat])

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Theater Configuration</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Screen</CardTitle>
                        <CardDescription>Set your theater screen name</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Input
                            placeholder="Screen Name"
                            value={currentScreen?.screenName || ''}
                            onChange={(e) => {
                                const newName = e.target.value;
                                setCurrentScreen(prev => prev ? { ...prev, screenName: newName } : { screenId: '001', screenName: newName, seatLayout: { rows: [] } });
                            }}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Seat Tiers</CardTitle>
                        <CardDescription>Manage seat types and pricing</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-40 mb-4">
                            {tiers.map(tier => (
                                <div key={tier.id} className="flex items-center justify-between py-2">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-4 h-4 rounded-full ${tier.color}`}></div>
                                        <span>{tier.name} - ₹{tier.price}</span>
                                    </div>
                                    <div>
                                        <Button variant="ghost" size="sm" onClick={() => handleEditTier(tier)}>
                                            <Edit2 className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="sm" onClick={() => handleRemoveTier(tier.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </ScrollArea>
                        {isAddingTier ? (
                            <div className="grid gap-2">
                                <Input
                                    placeholder="Tier Name"
                                    value={newTierName}
                                    onChange={(e) => setNewTierName(e.target.value)}
                                />
                                <Input
                                    type="number"
                                    placeholder="Price"
                                    value={newTierPrice}
                                    onChange={(e) => setNewTierPrice(e.target.value)}
                                />
                                <Select value={newTierColor} onValueChange={setNewTierColor}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select color" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="bg-red-500">Red</SelectItem>
                                        <SelectItem value="bg-blue-500">Blue</SelectItem>
                                        <SelectItem value="bg-green-500">Green</SelectItem>
                                        <SelectItem value="bg-yellow-500">Yellow</SelectItem>
                                        <SelectItem value="bg-purple-500">Purple</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button onClick={handleAddTier}>Save</Button>
                            </div>
                        ) : (
                            <Button onClick={() => setIsAddingTier(true)}>Add Tier</Button>
                        )}
                    </CardContent>
                </Card>

                <Dialog open={!!editingTier} onOpenChange={() => setEditingTier(null)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Tier</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="tierName" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="tierName"
                                    value={newTierName}
                                    onChange={(e) => setNewTierName(e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="tierPrice" className="text-right">
                                    Price
                                </Label>
                                <Input
                                    id="tierPrice"
                                    type="number"
                                    value={newTierPrice}
                                    onChange={(e) => setNewTierPrice(e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="tierColor" className="text-right">
                                    Color
                                </Label>
                                <Select value={newTierColor} onValueChange={setNewTierColor}>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select color" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="bg-red-500">Red</SelectItem>
                                        <SelectItem value="bg-blue-500">Blue</SelectItem>
                                        <SelectItem value="bg-green-500">Green</SelectItem>
                                        <SelectItem value="bg-yellow-500">Yellow</SelectItem>
                                        <SelectItem value="bg-purple-500">Purple</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleUpdateTier}>Save Changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <Card>
                    <CardHeader>
                        <CardTitle>Actions</CardTitle>
                        <CardDescription>Global settings and actions</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between mb-4">
                            <Label htmlFor="compact-view">Compact View</Label>
                            <Switch
                                id="compact-view"
                                checked={isCompactView}
                                onCheckedChange={setIsCompactView}
                            />
                        </div>
                        <Button className="w-full" onClick={handleSaveConfiguration}>
                            <Save className="mr-2 h-4 w-4" /> Save All Configuration
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {currentScreen && (
                <Card>
                    <CardHeader>
                        <CardTitle>{currentScreen.screenName} Configuration</CardTitle>
                        <CardDescription>Manage rows and seats for this screen</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4 mb-4">
                            <Input
                                placeholder="Row ID (e.g., A, B, C)"
                                value={newRowId}
                                onChange={(e) => setNewRowId(e.target.value)}
                                className="w-24"
                            />
                            <Button onClick={handleAddRow}>Add Row</Button>
                        </div>
                        <Accordion type="single" collapsible className="w-full">
                            {currentScreen.seatLayout.rows.map((row, rowIndex) => (
                                <AccordionItem key={row.rowId} value={row.rowId}>
                                    <AccordionTrigger>Row {row.rowId}</AccordionTrigger>
                                    <AccordionContent>
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {row.seats.map((seat, seatIndex) => renderSeat(seat, rowIndex, seatIndex))}
                                        </div>
                                        <div className="flex items-center gap-2 mt-4">
                                            <Select value={selectedTier?.id} onValueChange={(value) => setSelectedTier(tiers.find(t => t.id === value) || null)}>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Select Tier" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {tiers.map(tier => (
                                                        <SelectItem key={tier.id} value={tier.id}>{tier.name} - ₹{tier.price}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <Button onClick={() => handleAddSeat(rowIndex)}>Add Seat</Button>
                                            <Button variant="outline" onClick={() => handleAddGap(rowIndex)}>Add Gap</Button>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}