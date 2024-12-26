import React, { useState } from 'react';

const AddScreen = () => {
    const [theatreName, setTheatreName] = useState('');
    const [screenName, setScreenName] = useState('');
    const [screenType, setScreenType] = useState('');
    const [capacity, setCapacity] = useState<number>(0);
    const [numRows, setNumRows] = useState<number>(0);
    const [numColumns, setNumColumns] = useState<number>(0);
    const [seatLayout, setSeatLayout] = useState<string[][]>([]);
    const [showtimes, setShowtimes] = useState<string[]>([]);

    // Function to generate seat grid dynamically
    const generateSeatLayout = () => {
        const layout: string[][] = [];
        for (let i = 0; i < numRows; i++) {
            const row: string[] = [];
            for (let j = 0; j < numColumns; j++) {
                row.push('Empty'); // 'Empty' can be replaced with seat types like 'Standard', 'VIP', etc.
            }
            layout.push(row);
        }
        setSeatLayout(layout);
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const screenData = {
            theatreName,
            screenName,
            screenType,
            capacity,
            seatLayout,
            showtimes,
        };

        // Call API to save the data
        console.log(screenData);

        // Reset form
        setTheatreName('');
        setScreenName('');
        setScreenType('');
        setCapacity(0);
        setNumRows(0);
        setNumColumns(0);
        setSeatLayout([]);
        setShowtimes([]);
    };

    return (
        <div className="p-4">
            <h2>Add a New Theatre Screen</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Theatre Name:</label>
                    <input
                        type="text"
                        value={theatreName}
                        onChange={(e) => setTheatreName(e.target.value)}
                        placeholder="Enter Theatre Name"
                        required
                    />
                </div>

                <div>
                    <label>Screen Name:</label>
                    <input
                        type="text"
                        value={screenName}
                        onChange={(e) => setScreenName(e.target.value)}
                        placeholder="Enter Screen Name"
                        required
                    />
                </div>

                <div>
                    <label>Screen Type:</label>
                    <select value={screenType} onChange={(e) => setScreenType(e.target.value)} required>
                        <option value="">Select Screen Type</option>
                        <option value="Standard">Standard</option>
                        <option value="IMAX">IMAX</option>
                        <option value="3D">3D</option>
                    </select>
                </div>

                <div>
                    <label>Capacity:</label>
                    <input
                        type="number"
                        value={capacity}
                        onChange={(e) => setCapacity(Number(e.target.value))}
                        placeholder="Enter Seat Capacity"
                        required
                    />
                </div>

                {/* Seat Layout Configuration */}
                <div>
                    <label>Number of Rows:</label>
                    <input
                        type="number"
                        value={numRows}
                        onChange={(e) => setNumRows(Number(e.target.value))}
                        placeholder="Enter Number of Rows"
                        min="1"
                        required
                    />
                </div>

                <div>
                    <label>Number of Columns:</label>
                    <input
                        type="number"
                        value={numColumns}
                        onChange={(e) => setNumColumns(Number(e.target.value))}
                        placeholder="Enter Number of Columns"
                        min="1"
                        required
                    />
                </div>

                <button type="button" onClick={generateSeatLayout}>Generate Seat Layout</button>

                {/* Seat Layout Preview */}
                <div className="seat-layout-preview">
                    {seatLayout.map((row, rowIndex) => (
                        <div key={rowIndex} className="row">
                            {row.map((seat, colIndex) => (
                                <span key={colIndex} className={`seat ${seat}`}>
                                    {seat}
                                </span>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Showtimes */}
                <div>
                    <label>Showtimes:</label>
                    <input
                        type="text"
                        value={showtimes.join(', ')}
                        onChange={(e) => setShowtimes(e.target.value.split(','))}
                        placeholder="Enter Showtimes (e.g., 10:00 AM, 2:00 PM)"
                        required
                    />
                </div>

                <div>
                    <button type="submit">Add Screen</button>
                </div>
            </form>
        </div>
    );
};

export default AddScreen;
