import React from 'react';

interface ConfirmationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-lg">
                <p>{message}</p>
                <div className="mt-4 flex justify-end space-x-2">
                    <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                    <button onClick={onConfirm} className="bg-red-500 text-white px-4 py-2 rounded">Confirm</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationDialog;