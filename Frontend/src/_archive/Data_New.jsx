import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useTransactionData } from '../hooks/useTransactionData';
import { useTransactionFilters } from '../hooks/useTransactionFilters';
import DataNavbar from './data/DataNavbar';
import FilterPanel from './data/FilterPanel';
import TabsFilter from './data/TabsFilter';
import TransactionTable from './data/TransactionTable';
import TransactionSummary from './data/TransactionSummary';
import TransactionModals from './data/TransactionModals';
import MobileMenu from './data/MobileMenu';

export default function Viewdata() {
    const params = useParams();
    const pdfRef = useRef(null);
    
    // UI State
    const [showFilters, setShowFilters] = useState(false);
    const [showCreditModal, setShowCreditModal] = useState(false);
    const [showDebitModal, setShowDebitModal] = useState(false);
    const [editModalData, setEditModalData] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showMobileDropdown, setShowMobileDropdown] = useState(false);

    // Custom hooks
    const {
        transactions,
        isLoading,
        addCreditTransaction,
        addDebitTransaction,
        updateTransaction,
        deleteTransaction,
        getSummary
    } = useTransactionData(params.id);

    const {
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        sortOrder,
        setSortOrder,
        dateRange,
        setDateRange,
        amountRange,
        setAmountRange,
        timeFilter,
        setTimeFilter,
        activeTab,
        setActiveTab,
        filteredAndSortedTransactions,
        clearAllFilters
    } = useTransactionFilters(transactions);

    // PDF download handler
    const handleDownloadPDF = async () => {
        if (!pdfRef.current) return;
        
        // Dynamically load html2pdf.js from CDN if not present
        if (!window.html2pdf) {
            await new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
                script.onload = resolve;
                script.onerror = reject;
                document.body.appendChild(script);
            });
        }
        
        const opt = {
            margin: 0.2,
            filename: 'transactions.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };
        
        window.html2pdf().set(opt).from(pdfRef.current).save();
    };

    // Modal handlers
    const handleOpenCreditModal = () => {
        setShowCreditModal(true);
        setShowDebitModal(false);
        setShowDropdown(false);
        setShowMobileMenu(false);
    };

    const handleOpenDebitModal = () => {
        setShowDebitModal(true);
        setShowCreditModal(false);
        setShowDropdown(false);
        setShowMobileMenu(false);
    };

    const handleCloseCreditModal = () => {
        setShowCreditModal(false);
    };

    const handleCloseDebitModal = () => {
        setShowDebitModal(false);
    };

    const handleSubmitCreditTransaction = async (description, amount, date, time) => {
        const success = await addCreditTransaction(description, amount, date, time);
        if (success) {
            setShowCreditModal(false);
        }
    };

    const handleSubmitDebitTransaction = async (description, amount, date, time) => {
        const success = await addDebitTransaction(description, amount, date, time);
        if (success) {
            setShowDebitModal(false);
        }
    };

    const handleEditTransaction = (transaction) => {
        setEditModalData({
            id: transaction.id,
            name: transaction.description,
            amount: transaction.amount,
            date: transaction.date,
            time: transaction.time
        });
    };

    const handleUpdateTransaction = async (id, name, amount, date, time) => {
        const success = await updateTransaction(id, name, amount, date, time);
        if (success) {
            setEditModalData(null);
        }
    };

    const handleDeleteTransaction = async (id) => {
        if (window.confirm('Are you sure you want to delete this transaction?')) {
            await deleteTransaction(id);
        }
    };

    const handleCloseEditModal = () => {
        setEditModalData(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Navigation Bar */}
            <DataNavbar
                showFilters={showFilters}
                setShowFilters={setShowFilters}
                onCreditClick={handleOpenCreditModal}
                onDebitClick={handleOpenDebitModal}
                onDownloadPDF={handleDownloadPDF}
                onShareLink={() => console.log('Share link')}
                onLogout={() => window.location.href = "/login"}
                showDropdown={showDropdown}
                setShowDropdown={setShowDropdown}
                showMobileMenu={showMobileMenu}
                setShowMobileMenu={setShowMobileMenu}
            />

            {/* Mobile Menu */}
            <MobileMenu
                isOpen={showMobileMenu}
                onClose={() => setShowMobileMenu(false)}
                showFilters={showFilters}
                setShowFilters={setShowFilters}
                onCreditClick={handleOpenCreditModal}
                onDebitClick={handleOpenDebitModal}
                showMobileDropdown={showMobileDropdown}
                setShowMobileDropdown={setShowMobileDropdown}
            />

            {/* Filter Panel */}
            <FilterPanel
                showFilters={showFilters}
                sortBy={sortBy}
                setSortBy={setSortBy}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                timeFilter={timeFilter}
                setTimeFilter={setTimeFilter}
                dateRange={dateRange}
                setDateRange={setDateRange}
                amountRange={amountRange}
                setAmountRange={setAmountRange}
                onClearAll={clearAllFilters}
            />

            {/* Modals */}
            <TransactionModals
                showCreditModal={showCreditModal}
                onCloseCreditModal={handleCloseCreditModal}
                onSubmitCreditTransaction={handleSubmitCreditTransaction}
                showDebitModal={showDebitModal}
                onCloseDebitModal={handleCloseDebitModal}
                onSubmitDebitTransaction={handleSubmitDebitTransaction}
                editModalData={editModalData}
                onCloseEditModal={handleCloseEditModal}
                onUpdateTransaction={handleUpdateTransaction}
            />

            {/* Main Content - PDF Export Section */}
            <div className="flex flex-col items-center w-full" ref={pdfRef}>
                {/* Tabs Filter */}
                <TabsFilter
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />

                {/* Transaction Table */}
                <TransactionTable
                    transactions={filteredAndSortedTransactions}
                    activeTab={activeTab}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                    onEdit={handleEditTransaction}
                    onDelete={handleDeleteTransaction}
                />

                {/* Transaction Summary */}
                <TransactionSummary
                    transactions={filteredAndSortedTransactions}
                />
            </div>
        </div>
    );
}
