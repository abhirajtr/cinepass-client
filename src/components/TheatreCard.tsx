import React from 'react';
import { BsGearFill, BsFillHouseFill, BsFillTelephoneFill } from 'react-icons/bs';
import { FaKey } from 'react-icons/fa';
import { MdVerified } from "react-icons/md";

interface TheatreData {
    theatreName: string;
    theatreId: string;
    contactEmail: string;
    phoneNumber: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    isVerified: boolean;
}

const TheatreCard: React.FC<{ theatreData: TheatreData; onConfigure: (theatreId: string) => void }> = ({
    theatreData,
    onConfigure,
}) => {
    const {
        theatreName,
        theatreId,
        contactEmail,
        phoneNumber,
        streetAddress,
        city,
        state,
        zipCode,
        isVerified,
    } = theatreData;

    const address = `${streetAddress}, ${city}, ${state} ${zipCode}`;
    const contact = `${contactEmail} | ${phoneNumber}`;

    return (
        <div className="relative max-w-sm p-6 bg-white rounded-lg shadow-md bg-grey-10 border border-grey-15 flex flex-col align-items-flex-start">
            <div className='flex w-full items-center justify-end absolute right-0 top-0'>
                <span
                    className={`inline-flex items-center justify-center px-2 py-1  text-xs font-medium   border-b border-l border-grey-15 ${isVerified ? ' text-green-500' : 'text-yellow-500'}`}
                >
                    {isVerified && <MdVerified />}
                    {isVerified ? 'Verified' : 'Not Verified'}
                </span>
            </div>
            <div className="relative"> {/* Added align-items-flex-start */}
                <h2 className="text-xl font-bold text-white min-w-[150px] break-words">
                    {theatreName}
                </h2>
            </div>
            <div className="flex items-center mb-1">
                <FaKey className="mr-2 text-white w-4" />
                <p className="text-grey-75 mb-1">ID: {theatreId}</p>
            </div>
            <div className="flex items-center mb-1">
                <BsFillHouseFill className="mr-2 text-white w-4" />
                <p className="text-grey-75 mb-1">Address: {address}</p>
            </div>
            <div className="flex items-center mb-1">
                <BsFillTelephoneFill className="mr-2 text-white w-4" />
                <p className="text-grey-75 mb-1">Contact: {contact}</p>
            </div>

            {/* Flex container for button alignment */}
            <div className="flex justify-end mt-auto"
            >
                <button
                    disabled={!isVerified}
                    onClick={() => onConfigure(theatreId)}
                    className="text-absolute-white border-1 border-green-60/50 hover:bg-green-60 hover:text-black font-bold py-1 px-2 rounded flex text-center items-center"
                >
                    <BsGearFill className="inline mr-2" /> Customize
                </button>
            </div>
        </div>

    );
};

export default TheatreCard;