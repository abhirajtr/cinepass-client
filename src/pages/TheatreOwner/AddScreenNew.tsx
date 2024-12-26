import { useState, useEffect } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Seat {
    seatId: string;
    type: string;
    isAvailable: boolean;
    price: number;
}

interface SeatType {
    name: string;
    price: number;
    color: string;
}

interface GridSeatArrangement {
    screenName: string;
    grid: (Seat | null)[][];
}

const ScreenConfigAdmin = () => {
    const [screenName, setScreenName] = useState('');
    const [rows, setRows] = useState(5);
    const [cols, setColumns] = useState(5);
    const [selectedSeatType, setSelectedSeatType] = useState('');
    const [seatTypes, setSeatTypes] = useState<Record<string, SeatType>>({
        standard: { name: 'Standard', price: 10, color: 'bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800' },
    });
    const [newSeatType, setNewSeatType] = useState({ name: '', price: 0, color: 'bg-gray-100' });

    const [grid, setGrid] = useState<(Seat | null)[][]>([]);

    useEffect(() => {
        const generateGrid = () => {
            const newGrid: (Seat | null)[][] = Array(rows).fill(null).map(() => Array(cols).fill(null));
            setGrid(newGrid);
        };
        generateGrid();
    }, [rows, cols]);


    const handleGridSizeChange = (newRows: number, newCols: number) => {
        setRows(newRows);
        setColumns(newCols);
    };

    const handleSeatClick = (rowIndex: number, colIndex: number) => {
        const newGrid = [...grid];
        const currentSeat = grid[rowIndex][colIndex];

        if (currentSeat === null || currentSeat.type !== selectedSeatType) {
            if (selectedSeatType === 'gap') {
                newGrid[rowIndex][colIndex] = null;
            } else if (selectedSeatType && seatTypes[selectedSeatType]) {
                newGrid[rowIndex][colIndex] = {
                    seatId: generateSeatId(rowIndex, colIndex, newGrid),
                    type: selectedSeatType,
                    isAvailable: true,
                    price: seatTypes[selectedSeatType].price
                };
            }
        } else {
            newGrid[rowIndex][colIndex] = null;
        }
        setGrid(newGrid);
    };

    const generateSeatId = (rowIndex: number, colIndex: number, grid: (Seat | null)[][]): string => {
        const rowLetter = String.fromCharCode(65 + rowIndex);
        let seatNumber = 1;

        for (let i = 0; i <= rowIndex; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (i === rowIndex && j === colIndex) break;
                if (grid[i][j] !== null) seatNumber++;
            }
        }

        return `${rowLetter}${seatNumber}`;
    };

    const handleSave = () => {
        const configuration: GridSeatArrangement = {
            screenName,
            grid
        };
        console.log('Saving configuration:', configuration);
    };

    const addNewSeatType = () => {
        if (newSeatType.name && newSeatType.price > 0) {
            setSeatTypes(prev => ({
                ...prev,
                [newSeatType.name.toLowerCase()]: {
                    name: newSeatType.name,
                    price: newSeatType.price,
                    color: newSeatType.color
                }
            }));
            setNewSeatType({ name: '', price: 0, color: 'bg-gray-100' });
        }
    };

    const removeSeatType = (typeName: string) => {
        const updatedSeatTypes = { ...seatTypes };
        delete updatedSeatTypes[typeName];
        setSeatTypes(updatedSeatTypes);
        if (selectedSeatType === typeName) {
            setSelectedSeatType('');
        }
    };

    return (
        <div className=" mx-auto p-6 space-y-6">
            <h1>Add Screen</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Screen Configuration</CardTitle>
                </CardHeader>
                <CardContent>
                    {/* Screen Name Input */}
                    <div className="mb-6">
                        <Label htmlFor="screenName">Screen Name</Label>
                        <Input
                            id="screenName"
                            value={screenName}
                            onChange={(e) => setScreenName(e.target.value)}
                            className="w-full md:w-64"
                            placeholder="Enter screen name"
                        />
                    </div>

                    {/* Grid Size Controls */}
                    <div className="flex gap-4 mb-6">
                        <div>
                            <Label htmlFor="rows">Rows</Label>
                            <Input
                                id="rows"
                                type="number"
                                value={rows}
                                onChange={(e) => handleGridSizeChange(parseInt(e.target.value), cols)}
                                min="1"
                                max="26"
                                className="w-20"
                            />
                        </div>
                        <div>
                            <Label htmlFor="columns">Columns</Label>
                            <Input
                                id="columns"
                                type="number"
                                value={cols}
                                onChange={(e) => handleGridSizeChange(rows, parseInt(e.target.value))}
                                min="1"
                                max="20"
                                className="w-20"
                            />
                        </div>
                    </div>

                    {/* Add New Seat Type */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Add New Seat Type</h3>
                        <div className="flex gap-2 mb-2">
                            <Input
                                placeholder="Type Name"
                                value={newSeatType.name}
                                onChange={(e) => setNewSeatType(prev => ({ ...prev, name: e.target.value }))}
                            />
                            <Input
                                type="number"
                                placeholder="Price"
                                value={newSeatType.price || ''}
                                onChange={(e) => setNewSeatType(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                            />
                            <select
                                value={newSeatType.color}
                                onChange={(e) => setNewSeatType(prev => ({ ...prev, color: e.target.value }))}
                                className="border rounded-md p-2"
                            >
                                <option value="bg-gray-100">Gray</option>
                                <option value="bg-red-100">Red</option>
                                <option value="bg-blue-100">Blue</option>
                                <option value="bg-green-100">Green</option>
                                <option value="bg-yellow-100">Yellow</option>
                                <option value="bg-purple-100">Purple</option>
                            </select>
                            <Button onClick={addNewSeatType}>
                                <Plus size={20} />
                                Add
                            </Button>
                        </div>
                    </div>

                    {/* Seat Type Selection */}
                    <div className="mb-6">
                        <Label>Seat Types</Label>
                        <div className="flex gap-2 flex-wrap">
                            {Object.entries(seatTypes).map(([type, { name, price, color }]) => (
                                <Button
                                    key={type}
                                    onClick={() => setSelectedSeatType(type)}
                                    className={`${color} text-black ${selectedSeatType === type ? 'ring-2 ring-blue-500' : ''
                                        }`}
                                >
                                    {name} - ${price}
                                    <Trash2
                                        size={16}
                                        className="ml-2 cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeSeatType(type);
                                        }}
                                    />
                                </Button>
                            ))}
                            <Button
                                onClick={() => setSelectedSeatType('gap')}
                                className={`bg-gray-200 text-black ${selectedSeatType === 'gap' ? 'ring-2 ring-blue-500' : ''
                                    }`}
                            >
                                Gap
                            </Button>
                        </div>
                    </div>

                    {/* Screen Indicator */}
                    <div className="w-full bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700 text-center py-2 mb-8 rounded-lg text-white">
                        SCREEN
                    </div>

                    {/* Seat Grid */}
                    <div className="flex justify-center mb-6 overflow-x-auto">
                        <div className="inline-block">
                            <div className="grid gap-2">
                                {grid.map((row, rowIndex) => (
                                    <div key={rowIndex} className="flex items-center gap-2">
                                        <span className="w-6 text-center font-medium">
                                            {String.fromCharCode(65 + rowIndex)}
                                        </span>
                                        <div className="flex gap-2">
                                            {row.map((seat, colIndex) => (
                                                <button
                                                    key={colIndex}
                                                    onClick={() => handleSeatClick(rowIndex, colIndex)}
                                                    className={`
                            w-10 h-10 rounded-t-xl text-xs flex items-center justify-center
                            ${seat === null
                                                            ? 'border-2 border-dashed border-gray-300'
                                                            : seatTypes[seat.type]?.color || 'bg-gray-200'}
                          `}
                                                >
                                                    {seat !== null && seat.seatId}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                        {Object.entries(seatTypes).map(([type, { name, color }]) => (
                            <div key={type} className="flex items-center gap-2">
                                <div className={`w-6 h-6 rounded-lg ${color}`}></div>
                                <span className="text-sm">{name}</span>
                            </div>
                        ))}
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-lg border-2 border-dashed border-gray-300"></div>
                            <span className="text-sm">Gap</span>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end">
                        <Button
                            onClick={handleSave}
                            className="bg-blue-600 text-white hover:bg-blue-700"
                            disabled={!screenName}
                        >
                            <Save size={20} className="mr-2" /> Save Configuration
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ScreenConfigAdmin;

