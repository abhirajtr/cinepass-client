import { useState, useEffect, useCallback } from "react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { AxiosError } from "axios"
import { toast } from "sonner"
import theatreOwnerApi from "../../axiosInstance/theatreOwnerApi"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "../../components/ui/breadcrumb"

interface Seat {
    id: string
    type: string
    label: string
    price: number
    isBooked: boolean
}




interface SeatTier {
    name: string
    price: number
}

const ScreenConfig = () => {
    const [rows, setRows] = useState(0)
    const [columns, setColumns] = useState(0)
    const [selectedType, setSelectedType] = useState<string>("standard")
    const [seats, setSeats] = useState<Seat[][]>([])
    const [selectedRow, setSelectedRow] = useState<number | null>(null)
    const [selectedColumn, setSelectedColumn] = useState<number | null>(null)
    const [screenName, setScreenName] = useState("")
    const [seatTiers, setSeatTiers] = useState<SeatTier[]>([]);
    const [newTierName, setNewTierName] = useState("")
    const [newTierPrice, setNewTierPrice] = useState("")
    const { theatreId } = useParams();
    const navigate = useNavigate();

    const handleSave = async () => {
        try {
            console.log(seats);
            if (!screenName) {
                return toast.error('Please enter a screen name');
            }
            if (rows <= 0 || columns <= 0) {
                return toast.error('Rows and columns must be greater than zero');
            }
            if (!seats || seats.length === 0) {
                return toast.error('Please generate the seats first');
            }
            const capacity = seats.flat().filter(seat => seat.type !== "disabled").length;
            await theatreOwnerApi.post(`/theatre/${theatreId}/add-screen`, {
                theatreId,
                screenName,
                seats,
                capacity,
            });
            toast.success("Seat configuration saved successfully");
            navigate(-1);
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.responseMessage || "An unexpected error occurred");
            }
        }
    }
    const generateSeats = useCallback((rowCount: number, columnCount: number) => {
        const newSeats: Seat[][] = []
        for (let i = 0; i < rowCount; i++) {
            const row: Seat[] = []
            let seatNumber = 1;
            for (let j = 0; j < columnCount; j++) {
                const existingSeat = seats[i]?.[j]
                const seatType = existingSeat?.type || "standard"
                const label = seatType !== "disabled" ? `${String.fromCharCode(65 + i)}${seatNumber}` : "null"
                const price = seatType !== "disabled" ? seatTiers.find(tier => tier.name.toLowerCase() === seatType.toLowerCase())?.price || 0 : 0
                row.push({
                    id: `${i}-${j}`,
                    type: seatType,
                    label: label,
                    price: price,
                    isBooked: false
                })
                if (seatType !== "disabled") {
                    seatNumber++
                }
            }
            newSeats.push(row)
        }
        setSeats(newSeats)
    }, [seats, seatTiers]);

    useEffect(() => {
        generateSeats(rows, columns)
    }, [rows, columns, generateSeats]);



    const handleSeatClick = (rowIndex: number, colIndex: number) => {
        const newSeats = [...seats]
        const currentType = newSeats[rowIndex][colIndex].type
        const newType = currentType === "disabled" ? "standard" : selectedType
        newSeats[rowIndex][colIndex].type = newType
        newSeats[rowIndex][colIndex].price = newType !== "disabled"
            ? seatTiers.find(tier => tier.name.toLowerCase() === newType.toLowerCase())?.price || 0
            : 0
        let seatNumber = 1
        for (let i = 0; i < newSeats[rowIndex].length; i++) {
            if (newSeats[rowIndex][i].type !== "disabled") {
                newSeats[rowIndex][i].label = `${String.fromCharCode(65 + rowIndex)}${seatNumber}`
                seatNumber++
            } else {
                newSeats[rowIndex][i].label = "null"
            }
        }
        setSeats(newSeats)
    }

    const handleResize = (newRows: number, newColumns: number) => {
        if (seatTiers.length < 1) {
            return toast.error("Please add atleast one seat tier");
        }
        setRows(newRows)
        setColumns(newColumns)
    }

    const handleFillRow = () => {
        if (selectedRow !== null) {
            const newSeats = [...seats]
            newSeats[selectedRow] = newSeats[selectedRow].map((seat, index) => ({
                ...seat,
                type: selectedType,
                label: selectedType !== "disabled" ? `${String.fromCharCode(65 + selectedRow)}${index + 1}` : "null",
                price: selectedType !== "disabled"
                    ? seatTiers.find(tier => tier.name.toLowerCase() === selectedType.toLowerCase())?.price || 0
                    : 0
            }))
            setSeats(newSeats)
        }
    }

    const handleFillColumn = () => {
        if (selectedColumn !== null) {
            const newSeats = seats.map((row, rowIndex) => {
                const newRow = [...row];
                newRow[selectedColumn] = {
                    ...newRow[selectedColumn],
                    type: selectedType,
                    label: selectedType !== "disabled" ? `${String.fromCharCode(65 + rowIndex)}${selectedColumn + 1}` : "null",
                    price: selectedType !== "disabled"
                        ? seatTiers.find(tier => tier.name.toLowerCase() === selectedType.toLowerCase())?.price || 0
                        : 0
                };
                return newRow;
            });

            newSeats.forEach((row, rowIndex) => {
                let seatNumber = 1;
                for (let i = 0; i < row.length; i++) {
                    if (row[i].type !== "disabled") {
                        row[i].label = `${String.fromCharCode(65 + rowIndex)}${seatNumber}`;
                        seatNumber++;
                    } else {
                        row[i].label = "null";
                    }
                }
            });
            setSeats(newSeats);
        }
    };

    const handleAddTier = () => {
        if (newTierName && newTierPrice) {
            setSeatTiers([...seatTiers, { name: newTierName, price: parseFloat(newTierPrice) }])
            setNewTierName("")
            setNewTierPrice("")
        }
    }

    const getColorForSeatType = (type: string) => {
        const index = seatTiers.findIndex(tier => tier.name.toLowerCase() === type.toLowerCase());
        const colors = ["bg-gray-300", "bg-yellow-400", "bg-purple-800", "bg-red-500", "bg-green-500", "bg-blue-500"];
        return colors[index % colors.length];
    }

    return (
        <div className="container mx-auto p-4">
            <Breadcrumb className='mb-3'>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/theatreOwner/theatres">Theatres</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to={`/theatreOwner/theatres/${theatreId}/screens`}>Screens</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Add Screen</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-2xl font-bold mb-4">Screen Configuration</h1>
            <div className="flex flex-col md:flex-row gap-4">
                <Card className="w-full md:w-1/4">
                    <CardHeader>
                        <CardTitle>Controls</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="screenName">Screen Name</Label>
                            <Input
                                id="screenName"
                                value={screenName}
                                onChange={(e) => setScreenName(e.target.value)}
                                placeholder="Enter screen name"
                            />
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {seatTiers.map((tier, index) => (
                                <div key={index} className="flex items-center gap-1">
                                    <div className={`w-4 h-4 ${getColorForSeatType(tier.name)}`}></div>
                                    <span className="text-sm">{tier.name} (₹{tier.price})</span>
                                </div>
                            ))}
                        </div>
                        <div>
                            <Label>Add Seat Tier</Label>
                            <Input
                                placeholder="Tier Name"
                                value={newTierName}
                                onChange={(e) => setNewTierName(e.target.value)}
                                className="mb-2"
                            />
                            <Input
                                type="number"
                                placeholder="Price"
                                value={newTierPrice}
                                onChange={(e) => setNewTierPrice(e.target.value)}
                                className="mb-2"
                            />
                            <Button onClick={handleAddTier} className="w-full">Add Tier</Button>
                        </div>
                        <div>
                            <Label htmlFor="rows">Rows</Label>
                            <Input
                                id="rows"
                                type="number"
                                value={rows}
                                onChange={(e) => handleResize(parseInt(e.target.value), columns)}
                                min={1}
                                max={26}
                            />
                        </div>
                        <div>
                            <Label htmlFor="columns">Columns</Label>
                            <Input
                                id="columns"
                                type="number"
                                value={columns}
                                onChange={(e) => handleResize(rows, parseInt(e.target.value))}
                                min={1}
                                max={50}
                            />
                        </div>
                        <div>
                            <Label>Seat Type</Label>
                            <Select onValueChange={setSelectedType} defaultValue={selectedType}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {seatTiers.map((tier, index) => (
                                        <SelectItem key={index} value={tier.name.toLowerCase()}>
                                            {tier.name} (₹{tier.price})
                                        </SelectItem>
                                    ))}
                                    <SelectItem value="disabled">Disabled</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Fill Row</Label>
                            <div className="flex space-x-2">
                                <Select onValueChange={(value) => setSelectedRow(Number(value))}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select row" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Array.from({ length: rows }, (_, i) => (
                                            <SelectItem key={i} value={i.toString()}>
                                                {String.fromCharCode(65 + i)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Button onClick={handleFillRow} disabled={selectedRow === null}>
                                    Fill Row
                                </Button>
                            </div>
                        </div>
                        <div>
                            <Label>Fill Column</Label>
                            <div className="flex space-x-2">
                                <Select onValueChange={(value) => setSelectedColumn(Number(value))}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select column" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Array.from({ length: columns }, (_, i) => (
                                            <SelectItem key={i} value={i.toString()}>
                                                {i + 1}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Button onClick={handleFillColumn} disabled={selectedColumn === null}>
                                    Fill Column
                                </Button>
                            </div>
                        </div>
                        <Button className="w-full" onClick={handleSave}>Save Configuration</Button>
                    </CardContent>
                </Card>
                <Card className="flex-grow">
                    <CardContent>
                        <div className="pl-6 mt-2">
                            <div className="mb-8 bg-destructive h-8 rounded-t-lg flex items-center justify-center text-white font-bold">
                                <span className="uppercase tracking-wide">{screenName || "Screen"}</span>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <div className="inline-grid gap-2 mb-4" style={{ gridTemplateColumns: `auto repeat(${columns}, minmax(0, 1fr))` }}>
                                {seats.map((row, rowIndex) => (
                                    <>
                                        <div key={`row-${rowIndex}`} className="flex items-center justify-center font-bold">
                                            {String.fromCharCode(65 + rowIndex)}
                                        </div>
                                        {row.map((seat) => (
                                            <button
                                                key={seat.id}
                                                className={`h-6 w-6 rounded text-xs flex items-center justify-center ${seat.type === "disabled" ? "bg-muted text-muted-foreground" : getColorForSeatType(seat.type)
                                                    }`}
                                                onClick={() => handleSeatClick(rowIndex, parseInt(seat.id.split('-')[1]))}
                                            >
                                                {seat.label != "null" ? seat.label : ""}
                                            </button>
                                        ))}
                                    </>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
export default ScreenConfig;

