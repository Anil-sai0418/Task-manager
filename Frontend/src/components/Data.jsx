import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTransactionData } from '../hooks/useTransactionData';
import { useTransactionFilters } from '../hooks/useTransactionFilters';
import DataNavbar from './data/DataNavbar';
import FilterPanel from './data/FilterPanel';
import TabsFilter from './data/TabsFilter';
import TransactionTable from './data/TransactionTable';
import TransactionSummary from './data/TransactionSummary';
import TransactionModals from './data/TransactionModals';
import MobileMenu from './data/MobileMenu';
import { ConfirmDialog } from './ConfirmDialog';
import { generateTransactionsPDF } from '../utils/pdfGenerator';
import Footer from './Footer';
import API_BASE_URL from '../config/api';
import { toast } from 'sonner';

export default function Viewdata() {
    const params = useParams();
    const navigate = useNavigate();
    
    // UI State
    const [showFilters, setShowFilters] = useState(false);
    const [showCreditModal, setShowCreditModal] = useState(false);
    const [showDebitModal, setShowDebitModal] = useState(false);
    const [editModalData, setEditModalData] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showMobileDropdown, setShowMobileDropdown] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState({ open: false, transactionId: null });
    const [taskName, setTaskName] = useState('');

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

    // Get task name from transactions
    useEffect(() => {
        if (transactions && transactions.length > 0 && transactions[0].task) {
            const name = transactions[0].task.name;

            setTaskName(name);
        }
    }, [transactions]);

    // PDF download handler
    const handleDownloadPDF = async () => {
        if (transactions.length === 0) {
            toast.error('No transactions to export');
            return;
        }

        try {
            const summary = getSummary();
            generateTransactionsPDF(taskName || 'Transactions', filteredAndSortedTransactions, summary);
            toast.success('PDF downloaded successfully');
        } catch (error) {
            console.error('Failed to generate PDF:', error);
            toast.error('Failed to generate PDF');
        }
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
        setDeleteConfirm({ open: true, transactionId: id });
    };

    const confirmDeleteTransaction = async () => {
        if (deleteConfirm.transactionId) {
            await deleteTransaction(deleteConfirm.transactionId);
        }
    };

    const handleCloseEditModal = () => {
        setEditModalData(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Navigation Bar */}
            <DataNavbar
                taskName={taskName}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                showFilters={showFilters}
                setShowFilters={setShowFilters}
                onCreditClick={handleOpenCreditModal}
                onDebitClick={handleOpenDebitModal}
                onDownloadPDF={handleDownloadPDF}
                onShareLink={() => navigate(`/List/${params.id}/graph`)}
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
                onDownloadPDF={handleDownloadPDF}
                onShareLink={() => navigate(`/List/${params.id}/graph`)}
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

            {/* Main Content */}
            <div className="flex flex-col items-center w-full">
                {/* Tabs Filter */}
                <TabsFilter
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    taskName={taskName}
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

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                open={deleteConfirm.open}
                onOpenChange={(open) => setDeleteConfirm({ open, transactionId: null })}
                onConfirm={confirmDeleteTransaction}
                title="Delete Transaction"
                description="Are you sure you want to delete this transaction? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                variant="destructive"
            />
            <Footer />
        </div>
    );
}
