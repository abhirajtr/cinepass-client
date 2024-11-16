import React, { useState } from "react";

interface TheatreDetailsModalProps {
    isOpen: () => void;
    onClose: () => void;
    theatre: 
}

const TheatreDetailsModal = ({ isOpen, onClose, theatre, onVerify }) => {
    const [isConfirming, setIsConfirming] = useState(false); // State for confirmation view

    if (!isOpen) return null;

    // Format the date to remove seconds and timezone
    const formattedDate = new Date(theatre.createdAt)
        .toISOString()
        .slice(0, 16)
        .replace("T", " ");

    const handleVerify = () => {
        setIsConfirming(true); // Switch to confirmation view
    };

    const handleCancelVerification = () => {
        setIsConfirming(false); // Go back to details view
    };

    const handleConfirmVerify = () => {
        // Logic to verify the theatre goes here
        console.log("Theatre Verified:", theatre);
        onVerify(theatre); // Call onVerify to update verification status
        onClose(); // Close modal after verification
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4">
                        {isConfirming ? "Verify Theatre" : "Theatre Details"}
                    </h3>

                    {!isConfirming ? (
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-medium">Theatre Name</h4>
                                <p>{theatre.theatreName}</p>
                            </div>
                            <div>
                                <h4 className="font-medium">Contact Email</h4>
                                <p>{theatre.contactEmail}</p>
                            </div>
                            <div>
                                <h4 className="font-medium">Phone Number</h4>
                                <p>{theatre.phoneNumber}</p>
                            </div>
                            <div>
                                <h4 className="font-medium">Street Address</h4>
                                <p>{theatre.streetAddress}</p>
                            </div>
                            <div>
                                <h4 className="font-medium">City</h4>
                                <p>{theatre.city}</p>
                            </div>
                            <div>
                                <h4 className="font-medium">State</h4>
                                <p>{theatre.state}</p>
                            </div>
                            <div>
                                <h4 className="font-medium">ZIP Code</h4>
                                <p>{theatre.zipCode}</p>
                            </div>
                            <div>
                                <h4 className="font-medium">Verification Status</h4>
                                <p>{theatre.isVerified ? "Verified" : "Not Verified"}</p>
                            </div>
                            <div>
                                <h4 className="font-medium">Created At</h4>
                                <p>{formattedDate}</p>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <p className="mb-4">Are you sure you want to verify this theatre?</p>
                            <div className="flex justify-end space-x-4 mt-6">
                                <button
                                    onClick={handleCancelVerification}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleConfirmVerify}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-end space-x-4 mt-6">
                        {!isConfirming && (
                            <button
                                onClick={onClose}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                Close
                            </button>
                        )}
                        {!isConfirming && (
                            <button
                                onClick={handleVerify}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Verify
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const TheatreList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTheatre, setSelectedTheatre] = useState(null);

    const theatres = [
        {
            theatreId: "1",
            theatreName: "CineWorld",
            contactEmail: "contact@cineworld.com",
            phoneNumber: "123-456-7890",
            streetAddress: "123 Cinema St.",
            city: "Los Angeles",
            state: "CA",
            zipCode: "90001",
            verificationDocument: "doc123",
            ownerId: "owner1",
            isVerified: false,
            createdAt: "2024-11-13T11:03:10.940Z",
        },
    ];

    const handleViewDetails = (theatre) => {
        setSelectedTheatre(theatre);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedTheatre(null);
    };

    const handleVerify = (theatre) => {
        // Update the verification status of the theatre
        console.log("Verified Theatre:", theatre);
        // You can call an API or make any necessary updates here
    };

    return (
        <div>
            <table className="min-w-full table-auto">
                <thead>
                    <tr>
                        <th className="px-6 py-4">Theatre Name</th>
                        <th className="px-6 py-4">Created At</th>
                        <th className="px-6 py-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {theatres.map((theatre) => (
                        <tr key={theatre.theatreId}>
                            <td className="px-6 py-4">{theatre.theatreName}</td>
                            <td className="px-6 py-4">
                                {new Date(theatre.createdAt).toISOString().slice(0, 16).replace("T", " ")}
                            </td>
                            <td className="px-6 py-4">
                                <button
                                    onClick={() => handleViewDetails(theatre)}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    View Details
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Theatre Details Modal */}
            {selectedTheatre && (
                <TheatreDetailsModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    theatre={selectedTheatre}
                    onVerify={handleVerify}
                />
            )}
        </div>
    );
};

export default TheatreList;
