import { FC } from 'react';
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi'

interface PaginationProps {
    currentPage: number;
    totalCount: number;
    limit: number;
    setCurrentPage: (currentPage: number) => void;
}

const Pagination: FC<PaginationProps> = ({ currentPage, totalCount, setCurrentPage, limit }) => {
    const totalPages = Math.ceil(totalCount / limit);
    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Handle "Next" button click
    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className='flex w-full justify-center'>
            <div className='flex justify-center items-center gap-2'>
                <span className='hover:cursor-pointer'
                    onClick={handlePrevious}
                ><BiSolidLeftArrow /></span>
                <span className='text-green-60 font-bold'>{currentPage}</span>
                <span className='text-sm'>of</span>
                <span className='text-sm'>{totalPages}</span>
                <span className='hover:cursor-pointer'
                    onClick={handleNext}
                ><BiSolidRightArrow /></span>
            </div>
        </div>
    )
}

export default Pagination