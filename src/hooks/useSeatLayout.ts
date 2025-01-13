import { useState, useCallback } from 'react';
import { Seat, SeatType } from '../types/types';

export const useSeatLayout = (initialRows: number, initialColumns: number) => {
    const [rows, setRows] = useState(initialRows);
    const [columns, setColumns] = useState(initialColumns);
    const [seats, setSeats] = useState<Seat[][]>([]);

    const generateSeats = useCallback((rowCount: number, columnCount: number) => {
        const newSeats: Seat[][] = [];
        for (let i = 0; i < rowCount; i++) {
            const row: Seat[] = [];
            let seatNumber = 1;
            for (let j = 0; j < columnCount; j++) {
                const existingSeat = seats[i]?.[j];
                const seatType = existingSeat?.type || 'standard';
                const label = seatType !== 'disabled' ? `${String.fromCharCode(65 + i)}${seatNumber}` : '';
                row.push({
                    id: `${i}-${j}`,
                    type: seatType,
                    label: label,
                });
                if (seatType !== 'disabled') {
                    seatNumber++;
                }
            }
            newSeats.push(row);
        }
        setSeats(newSeats);
    }, [seats]);

    const handleResize = useCallback((newRows: number, newColumns: number) => {
        setRows(newRows);
        setColumns(newColumns);
        generateSeats(newRows, newColumns);
    }, [generateSeats]);

    const handleSeatClick = useCallback((rowIndex: number, colIndex: number, selectedType: SeatType) => {
        setSeats(prevSeats => {
            const newSeats = [...prevSeats];
            const currentType = newSeats[rowIndex][colIndex].type;
            const newType = currentType === 'disabled' ? 'standard' : selectedType;
            newSeats[rowIndex][colIndex].type = newType;

            let seatNumber = 1;
            for (let i = 0; i < newSeats[rowIndex].length; i++) {
                if (newSeats[rowIndex][i].type !== 'disabled') {
                    newSeats[rowIndex][i].label = `${String.fromCharCode(65 + rowIndex)}${seatNumber}`;
                    seatNumber++;
                } else {
                    newSeats[rowIndex][i].label = '';
                }
            }

            return newSeats;
        });
    }, []);

    const handleFillRow = useCallback((selectedRow: number, selectedType: SeatType) => {
        setSeats(prevSeats => {
            const newSeats = [...prevSeats];
            newSeats[selectedRow] = newSeats[selectedRow].map((seat, index) => ({
                ...seat,
                type: selectedType,
                label: selectedType !== 'disabled' ? `${String.fromCharCode(65 + selectedRow)}${index + 1}` : '',
            }));
            return newSeats;
        });
    }, []);

    const handleFillColumn = useCallback((selectedColumn: number, selectedType: SeatType) => {
        setSeats(prevSeats => {
            const newSeats = prevSeats.map((row, rowIndex) => {
                const newRow = [...row];
                newRow[selectedColumn] = {
                    ...newRow[selectedColumn],
                    type: selectedType,
                    label: selectedType !== 'disabled' ? `${String.fromCharCode(65 + rowIndex)}${selectedColumn + 1}` : '',
                };
                return newRow;
            });

            newSeats.forEach((row, rowIndex) => {
                let seatNumber = 1;
                for (let i = 0; i < row.length; i++) {
                    if (row[i].type !== 'disabled') {
                        row[i].label = `${String.fromCharCode(65 + rowIndex)}${seatNumber}`;
                        seatNumber++;
                    } else {
                        row[i].label = '';
                    }
                }
            });

            return newSeats;
        });
    }, []);

    return {
        rows,
        columns,
        seats,
        handleResize,
        handleSeatClick,
        handleFillRow,
        handleFillColumn,
    };
};
