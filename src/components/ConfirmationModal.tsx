import React from 'react';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
    title?: string; 
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, message, title }) => {
    if (!isOpen) return null; // Do not render the modal if not open
    
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="flex flex-col max-w-md gap-2 p-6 rounded-md shadow-md bg-absolute-white text-grey-10">
                <h2 className="text-xl font-semibold leading-tight tracking-wide">{title || 'Are you sure?'}</h2>
                <p className="flex-1 dark:text-gray-600">{message}
                    {/* <a href="#" rel="noopener noreferrer" className="font-semibold dark:text-violet-600">Learn more</a> */}
                </p>
                <div className="flex flex-col justify-center gap-3 mt-6 sm:flex-row">
                    <button className="px-6 py-2 rounded-sm"
                        onClick={onClose}
                    >Cancel</button>
                    <button className="px-6 py-2 rounded-sm shadow-sm bg-green-60 text-grey-10"
                        onClick={onConfirm}
                    >Confirm</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
