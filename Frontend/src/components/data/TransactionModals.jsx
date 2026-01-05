import React, { useState } from 'react';
import { Input } from '../ui/input';

export default function TransactionModals({
    // Credit modal props
    showCreditModal,
    onCloseCreditModal,
    onSubmitCreditTransaction,
    // Debit modal props
    showDebitModal,
    onCloseDebitModal,
    onSubmitDebitTransaction,
    // Edit modal props
    editModalData,
    onCloseEditModal,
    onUpdateTransaction,
}) {
    // Credit modal state
    const [creditDescription, setCreditDescription] = useState('');
    const [creditAmount, setCreditAmount] = useState('');
    const [creditDate, setCreditDate] = useState('');
    const [creditTime, setCreditTime] = useState('');

    // Debit modal state
    const [debitDescription, setDebitDescription] = useState('');
    const [debitAmount, setDebitAmount] = useState('');
    const [debitDate, setDebitDate] = useState('');
    const [debitTime, setDebitTime] = useState('');

    // Edit modal state
    const [editData, setEditData] = useState(editModalData || { name: '', amount: '', date: '', time: '' });

    // Initialize credit modal with current date/time
    React.useEffect(() => {
        if (showCreditModal) {
            const now = new Date();
            setCreditDate(now.toISOString().slice(0, 10));
            setCreditTime(now.toTimeString().slice(0, 5));
        }
    }, [showCreditModal]);

    // Initialize debit modal with current date/time
    React.useEffect(() => {
        if (showDebitModal) {
            const now = new Date();
            setDebitDate(now.toISOString().slice(0, 10));
            setDebitTime(now.toTimeString().slice(0, 5));
        }
    }, [showDebitModal]);

    // Update edit data when editModalData changes
    React.useEffect(() => {
        if (editModalData) {
            setEditData(editModalData);
        }
    }, [editModalData]);

    const handleCreditSubmit = () => {
        onSubmitCreditTransaction(creditDescription, creditAmount, creditDate, creditTime);
        // Reset form
        setCreditDescription('');
        setCreditAmount('');
    };

    const handleDebitSubmit = () => {
        onSubmitDebitTransaction(debitDescription, debitAmount, debitDate, debitTime);
        // Reset form
        setDebitDescription('');
        setDebitAmount('');
    };

    const handleEditSubmit = () => {
        onUpdateTransaction(editData.id, editData.name, editData.amount, editData.date, editData.time);
    };

    return (
        <>
            {/* Credit Modal */}
            {showCreditModal && (
                <div className="fixed top-0 bg-primary/30 left-0 right-0 bottom-0 pointer-events-none flex items-center justify-center z-[60]">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 max-w-md mx-4 relative z-[61] pointer-events-auto shadow-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">
                                Add Credit Transaction
                            </h2>
                            <button
                                onClick={onCloseCreditModal}
                                className="w-8 h-8 flex items-center justify-center border border-gray-400 dark:border-gray-600 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 rounded-lg shadow hover:text-green-600 hover:border-green-600 transition duration-150"
                                aria-label="Close"
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto">
                                    <line x1="6" y1="6" x2="14" y2="14" />
                                    <line x1="14" y1="6" x2="6" y2="14" />
                                </svg>
                            </button>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Purpose/Description
                            </label>
                            <Input
                                type="text"
                                value={creditDescription}
                                onChange={(e) => setCreditDescription(e.target.value)}
                                placeholder="Enter transaction purpose"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black dark:text-white bg-white dark:bg-gray-700"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Amount ($)
                            </label>
                            <Input
                                type="number"
                                value={creditAmount}
                                onChange={(e) => setCreditAmount(e.target.value)}
                                placeholder="Enter amount"
                                min="0"
                                step="0.01"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black dark:text-white bg-white dark:bg-gray-700"
                            />
                        </div>

                        <div className="mb-6 flex gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Date
                                </label>
                                <Input
                                    type="date"
                                    value={creditDate}
                                    onChange={(e) => setCreditDate(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black dark:text-white bg-white dark:bg-gray-700"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Time
                                </label>
                                <Input
                                    type="time"
                                    value={creditTime}
                                    onChange={(e) => setCreditTime(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black dark:text-white bg-white dark:bg-gray-700"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={handleCreditSubmit}
                                className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md font-medium text-white transition-colors"
                            >
                                Add Credit
                            </button>
                            <button
                                onClick={onCloseCreditModal}
                                className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-md font-medium hover:bg-gray-600 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Debit Modal */}
            {showDebitModal && (
                <div className="fixed top-0 bg-red-500/15 left-0 right-0 bottom-0 pointer-events-none flex items-center justify-center z-[60]">
                    <div className="bg-white dark:bg-gray-800 backdrop-blur-md rounded-lg p-6 w-96 max-w-md mx-4 relative z-[61] pointer-events-auto shadow-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">
                                Add Debit Transaction
                            </h2>
                            <button
                                onClick={onCloseDebitModal}
                                className="w-8 h-8 flex items-center justify-center border border-gray-400 dark:border-gray-600 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 rounded-lg shadow hover:text-red-600 hover:border-red-600 transition duration-150"
                                aria-label="Close"
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto">
                                    <line x1="6" y1="6" x2="14" y2="14" />
                                    <line x1="14" y1="6" x2="6" y2="14" />
                                </svg>
                            </button>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Purpose/Description
                            </label>
                            <Input
                                type="text"
                                value={debitDescription}
                                onChange={(e) => setDebitDescription(e.target.value)}
                                placeholder="Enter transaction purpose"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black dark:text-white bg-white dark:bg-gray-700"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Amount ($)
                            </label>
                            <Input
                                type="number"
                                value={debitAmount}
                                onChange={(e) => setDebitAmount(e.target.value)}
                                placeholder="Enter amount"
                                min="0"
                                step="0.01"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black dark:text-white bg-white dark:bg-gray-700"
                            />
                        </div>

                        <div className="mb-6 flex gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Date
                                </label>
                                <Input
                                    type="date"
                                    value={debitDate}
                                    onChange={(e) => setDebitDate(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black dark:text-white bg-white dark:bg-gray-700"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Time
                                </label>
                                <Input
                                    type="time"
                                    value={debitTime}
                                    onChange={(e) => setDebitTime(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black dark:text-white bg-white dark:bg-gray-700"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={handleDebitSubmit}
                                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md font-medium text-white transition-colors"
                            >
                                Add Debit
                            </button>
                            <button
                                onClick={onCloseDebitModal}
                                className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-md font-medium hover:bg-gray-600 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {editModalData && (
                <div className="fixed inset-0 flex items-center justify-center z-[60]">
                    <div className="fixed inset-0 bg-black/30" onClick={onCloseEditModal} />
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-96 max-w-md relative z-[61]">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">Edit Transaction</h2>
                            <button
                                onClick={onCloseEditModal}
                                className="w-8 h-8 flex items-center justify-center border border-gray-400 dark:border-gray-600 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 rounded-lg shadow hover:text-blue-600 hover:border-blue-600 transition duration-150"
                                aria-label="Close"
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto">
                                    <line x1="6" y1="6" x2="14" y2="14" />
                                    <line x1="14" y1="6" x2="6" y2="14" />
                                </svg>
                            </button>
                        </div>
                        <Input
                            className="w-full mb-3 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-black dark:text-white bg-white dark:bg-gray-700"
                            value={editData.name}
                            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                            placeholder="Purpose"
                        />
                        <Input
                            type="number"
                            className="w-full mb-3 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-black dark:text-white bg-white dark:bg-gray-700"
                            value={editData.amount}
                            onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
                            placeholder="Amount"
                        />
                        <div className="flex gap-2 mb-4">
                            <Input
                                type="date"
                                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-black dark:text-white bg-white dark:bg-gray-700"
                                value={editData.date}
                                onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                            />
                            <Input
                                type="time"
                                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-black dark:text-white bg-white dark:bg-gray-700"
                                value={editData.time}
                                onChange={(e) => setEditData({ ...editData, time: e.target.value })}
                            />
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={handleEditSubmit}
                                className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                            >
                                Update
                            </button>
                            <button
                                onClick={onCloseEditModal}
                                className="flex-1 bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
