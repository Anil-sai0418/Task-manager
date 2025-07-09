import React, { useState } from 'react';
import { Menu, Plus, Search, ChevronDown } from 'lucide-react';

export default function Viewdata() {
    const programmingLanguages = [
        {
            id: "1",
            name: "JavaScript",
            releaseYear: "1995",
            developer: "Brendan Eich",
            typing: "Dynamic",
            paradigm: "Multi-paradigm",
            extension: ".js",
            latestVersion: "ES2021",
            popularity: "High",
        },
        {
            id: "2",
            name: "Python",
            releaseYear: "1991",
            developer: "Guido van Rossum",
            typing: "Dynamic",
            paradigm: "Multi-paradigm",
            extension: ".py",
            latestVersion: "3.10",
            popularity: "High",
        },
        {
            id: "3",
            name: "Java",
            releaseYear: "1995",
            developer: "James Gosling",
            typing: "Static",
            paradigm: "Object-oriented",
            extension: ".java",
            latestVersion: "17",
            popularity: "High",
        },
        {
            id: "4",
            name: "C++",
            releaseYear: "1985",
            developer: "Bjarne Stroustrup",
            typing: "Static",
            paradigm: "Multi-paradigm",
            extension: ".cpp",
            latestVersion: "C++20",
            popularity: "High",
        },
        {
            id: "5",
            name: "Ruby",
            releaseYear: "1995",
            developer: "Yukihiro Matsumoto",
            typing: "Dynamic",
            paradigm: "Multi-paradigm",
            extension: ".rb",
            latestVersion: "3.0",
            popularity: "Low",
        },
    ]

    const [activeTab, setActiveTab] = useState("all");
    
    // Credit modal state
    const [showModal, setShowModal] = useState(false);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    // Debit modal state
    const [showDebitModal, setShowDebitModal] = useState(false);
    const [debitDescription, setDebitDescription] = useState('');
    const [debitAmount, setDebitAmount] = useState('');

    // Credit modal functions
    const openCreditModal = () => {
        setShowDebitModal(false); // close debit modal
        setShowModal((prev) => {
            const willOpen = !prev;
            if (willOpen) {
                setDescription('');
                setAmount('');
            }
            return willOpen;
        });
        setShowMobileMenu(false);
    };

    const handleSubmitTransaction = () => {
        if (!description.trim() || !amount || parseFloat(amount) <= 0) {
            alert('Please enter valid description and amount');
            return;
        }

        // Handle the transaction here (you can customize this part)
        console.log('Credit Transaction:', {
            description: description.trim(),
            amount: parseFloat(amount),
            type: 'credit'
        });

        // Close modal and reset form
        setShowModal(false);
        setDescription('');
        setAmount('');
    };

    const closeModal = () => {
        setShowModal(false);
        setDescription('');
        setAmount('');
    };

    // Debit modal functions
    const openDebitModal = () => {
        setShowModal(false); // close credit modal
        setShowDebitModal((prev) => {
            const willOpen = !prev;
            if (willOpen) {
                setDebitDescription('');
                setDebitAmount('');
            }
            return willOpen;
        });
        setShowMobileMenu(false);
    };

    const closeDebitModal = () => {
        setShowDebitModal(false);
        setDebitDescription('');
        setDebitAmount('');
    };

    const handleSubmitDebitTransaction = () => {
        if (!debitDescription.trim() || !debitAmount || parseFloat(debitAmount) <= 0) {
            alert('Please enter valid description and amount');
            return;
        }

        console.log('Debit Transaction:', {
            description: debitDescription.trim(),
            amount: parseFloat(debitAmount),
            type: 'debit'
        });

        setShowDebitModal(false);
        setDebitDescription('');
        setDebitAmount('');
    };

    return (
        <div className="h-screen w-full bg-gray-50">
            <nav className="p-4 w-full bg-white shadow-sm flex items-center max-sm:justify-between">
                <p className="text-xl font-bold text-blue-600">Payment Manager</p>

                <div className="flex-1 flex justify-center max-sm:hidden">
                    <div className="relative w-[80%]">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    </div>
                </div>
                <div className="mr-20 flex items-center space-x-15 max-sm:hidden">
                    <button
                        onClick={openCreditModal}
                        className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md shadow"
                    >
                        Credit
                    </button>
                    <button
                        onClick={openDebitModal}
                        className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md shadow"
                    >
                        Debit
                    </button>

                    <div className="relative">
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="bg-blue-400 hover:bg-blue-600 text-white text-lg px-6 py-3 rounded-lg flex items-center space-x-2"
                        >
                            <span>open</span>
                            <ChevronDown className="h-4 w-4" />
                        </button>
                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                                <div className="py-2">
                                    
                                    <button className="w-full text-left px-4 py-2 text-large  text-gray-700 hover:bg-gray-300">
                                        Save as pdf
                                    </button>
                                    <button className="w-full text-left px-4 py-2 text-large text-gray-700 hover:bg-gray-300">
                                        Share via link
                                    </button>
                                    <button className="w-full text-left px-4 py-2 text-large text-gray-700 hover:bg-gray-300">
                                        More Details
                                    </button>
                                    <button className="w-full text-left px-4 py-2 text-large text-gray-700 hover:bg-gray-300">
                                        Log out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <button
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                    className="md:hidden p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                >
                    <Menu className="h-5 w-5" />
                </button>
            </nav>

            {/* Mobile Menu */}
            {showMobileMenu && (
                <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40">
                    <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg z-50 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-semibold">Are you absolutely sure?</h2>
                            <button
                                onClick={() => setShowMobileMenu(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>
                        
                        <div className="mb-6">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <button
                                onClick={openCreditModal}
                                className="w-full px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md shadow"
                            >
                                Credit
                            </button>
                            <button
                                onClick={openDebitModal}
                                className="w-full px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md shadow"
                            >
                                Debit
                            </button>
                            <button className="w-full bg-blue-400 hover:bg-blue-600 text-white text-lg px-6 py-3 rounded-lg">
                                open
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Credit Modal */}
            {showModal && (
                <div className="fixed top-0 left-0 right-0 bottom-0 pointer-events-none flex items-center justify-center z-[60]">
                    <div className="bg-gray-50 rounded-lg p-6 w-96 max-w-md mx-4 relative z-[61] pointer-events-auto shadow-xl">
                        <h2 className="text-2xl font-bold mb-4 text-green-600">
                            Add Credit Transaction
                        </h2>
                        
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Purpose/Description
                            </label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter transaction purpose"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Amount ($)
                            </label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Enter amount"
                                min="0"
                                step="0.01"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        
                        <div className="flex gap-3 ">
                            <button
                                onClick={handleSubmitTransaction}
                                className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md font-medium text-white transition-colors"
                            >
                                Add Credit
                            </button>
                            
                            <button
                                onClick={closeModal}
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
              <div className="fixed top-0 left-0 right-0 bottom-0 pointer-events-none flex items-center justify-center z-[60]">
                <div className="bg-white/90 backdrop-blur-md rounded-lg p-6 w-96 max-w-md mx-4 relative z-[61] pointer-events-auto shadow-xl">
                  <h2 className="text-2xl font-bold mb-4 text-red-600">
                    Add Debit Transaction
                  </h2>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Purpose/Description
                    </label>
                    <input
                      type="text"
                      value={debitDescription}
                      onChange={(e) => setDebitDescription(e.target.value)}
                      placeholder="Enter transaction purpose"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount ($)
                    </label>
                    <input
                      type="number"
                      value={debitAmount}
                      onChange={(e) => setDebitAmount(e.target.value)}
                      placeholder="Enter amount"
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleSubmitDebitTransaction}
                      className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md font-medium text-white transition-colors"
                    >
                      Add Debit
                    </button>
                    <button
                      onClick={closeDebitModal}
                      className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-md font-medium hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className='flex justify-center flex-col'>
                {/* Selected name and transaction filter row */}
                <div className="w-full flex flex-row gap-90 items-center py-6 px-6">
                    <div className="text-xl font-bold text-gray-700 dark:text-white">
                        Anil Sai
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setActiveTab("all")}
                            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ease-in-out ${
                              activeTab === "all"
                                ? "bg-blue-500 text-white shadow-md scale-105"
                                : "bg-gray-200 text-gray-800"
                            }`}
                        >
                            All Transactions
                        </button>
                        <button
                            onClick={() => setActiveTab("credit")}
                            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ease-in-out ${
                              activeTab === "credit"
                                ? "bg-green-500 text-white shadow-md scale-105"
                                : "bg-gray-200 text-gray-800"
                            }`}
                        >
                            Credits Only
                        </button>
                        <button
                            onClick={() => setActiveTab("debit")}
                            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ease-in-out ${
                              activeTab === "debit"
                                ? "bg-red-500 text-white shadow-md scale-105"
                                : "bg-gray-200 text-gray-800"
                            }`}
                        >
                            Debits Only
                        </button>
                    </div>
                </div>

               <div className="w-full flex justify-center items-center py-4">
                 <div className="bg-white rounded-lg shadow overflow-hidden w-[80%]">
                    <table className="w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="h-9 py-2 px-4 text-left text-sm font-medium text-gray-700">date</th>
                                <th className="h-9 py-2 px-4 text-left text-sm font-medium text-gray-700">time</th>
                                <th className="h-9 py-2 px-4 text-left text-sm font-medium text-gray-700">purpose</th>
                                {(activeTab === "all" || activeTab === "credit") && (
                                  <th className="h-9 py-2 px-4 text-left text-sm font-medium text-gray-700">credit</th>
                                )}
                                {(activeTab === "all" || activeTab === "debit") && (
                                  <th className="h-9 py-2 px-4 text-left text-sm font-medium text-gray-700">debit</th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {programmingLanguages
                              .filter((language) =>
                                activeTab === "all"
                                  ? true
                                  : activeTab === "credit"
                                    ? language.typing === "Dynamic"
                                    : language.typing === "Static"
                              )
                              .map((language) => (
                                <tr key={language.id} className="hover:bg-gray-50">
                                    <td className="py-2 px-4 font-medium">
                                        {language.name}
                                    </td>
                                    <td className="py-2 px-4">{language.releaseYear}</td>
                                    <td className="py-2 px-4">{language.developer}</td>
                                    {(activeTab === "all" || activeTab === "credit") && (
                                      <td className="py-2 px-4">{language.typing}</td>
                                    )}
                                    {(activeTab === "all" || activeTab === "debit") && (
                                      <td className="py-2 px-4">{language.paradigm}</td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                  </div>
                </div>
            </div>

          <div className="flex justify-center py-6">
            <div className="bg-white rounded-lg p-4 shadow w-1/2">
              <div className="grid gap-4 md:grid-cols-3">
                {/* Credit Box */}
                <div className="bg-green-100 dark:bg-green-800 rounded-lg p-4 text-center shadow hover:shadow-lg transition">
                  <p className="text-[16px] font-semibold text-green-700 dark:text-green-200">Credit 📈</p>
                  <p className="text-lg font-semibold text-green-900 dark:text-green-100">₹ 0</p>
                </div>
                {/* Debit Box */}
                <div className="bg-red-100 dark:bg-red-800 rounded-lg p-4 text-center shadow hover:shadow-lg transition">
                  <p className="text-[16px] font-semibold text-red-700 dark:text-red-200">Debit 📉</p>
                  <p className="text-lg font-semibold text-red-900 dark:text-red-100">₹ 0</p>
                </div>
                {/* Balance Box */}
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg p-4 text-center shadow hover:shadow-lg transition">
                  <p className="text-sm font-medium">Balance</p>
                  <p className="text-lg font-semibold">₹ 0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}