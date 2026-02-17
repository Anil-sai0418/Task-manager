import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "./ui/dialog";
import {
    Code,
    Mail,
    Copy,
    Check,
    X
} from 'lucide-react';
import { toast } from 'sonner';

export default function ShareModal({ open, onOpenChange }) {
    const shareUrl = "https://task-manager-anil.vercel.app/";
    const [copied, setCopied] = useState(false);

    // Track responsive breakpoints
    useEffect(() => {
        const handleResize = () => {
            // Responsive logic can be extended here
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            toast.success("Link copied to clipboard");
            setTimeout(() => setCopied(false), 2000);
        } catch {
            toast.error("Failed to copy link");
        }
    };

    const shareOptions = [
        {
            name: "Embed",
            icon: <Code className="h-6 w-6" />,
            color: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300",
            action: () => {
                const embedCode = `<iframe src="${shareUrl}" width="100%" height="500px"></iframe>`;
                navigator.clipboard.writeText(embedCode);
                toast.success("Embed code copied!");
            }
        },
        {
            name: "WhatsApp",
            icon: (
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
            ),
            color: "bg-[#25D366] text-white",
            action: () => window.open(`https://wa.me/?text=${encodeURIComponent(shareUrl)}`, '_blank')
        },
        {
            name: "Facebook",
            icon: (
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
            ),
            color: "bg-[#1877F2] text-white",
            action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')
        },
        {
            name: "X",
            icon: (
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            ),
            color: "bg-black text-white dark:bg-white dark:text-black border border-transparent dark:border-gray-300",
            action: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`, '_blank')
        },
        {
            name: "Email",
            icon: <Mail className="h-6 w-6" />,
            color: "bg-gray-500 text-white",
            action: () => window.open(`mailto:?subject=Check this out&body=${encodeURIComponent(shareUrl)}`, '_blank')
        }
    ];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent showCloseButton={false} className="w-[95vw] sm:w-[90vw] md:w-[85vw] lg:w-full sm:max-w-lg p-0 bg-white/95 dark:bg-[#1f1f1f]/95 backdrop-blur-xl border border-gray-200 dark:border-gray-700 shadow-2xl rounded-2xl max-h-[92vh] sm:max-h-[90vh] overflow-y-auto">
                {/* Header Section with Close Button - Responsive */}
                <div className="relative">
                    {/* Close Button - X icon positioned at top right */}
                    <button
                        onClick={() => onOpenChange(false)}
                        className="absolute top-4 xs:top-5 right-4 xs:right-5 z-10 p-1 xs:p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors group"
                        aria-label="Close dialog"
                    >
                        <X className="w-5 xs:w-6 h-5 xs:h-6 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                    </button>

                    {/* Content - Flex layout with space for close button on mobile */}
                    <div className="flex flex-col xs:flex-row xs:items-center gap-4 xs:gap-6 px-4 xs:px-6 pt-6 xs:pt-8 pb-4">
                        {/* Logo - Responsive Size */}
                        <div className="w-12 xs:w-14 sm:w-16 h-12 xs:h-14 sm:h-16 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg flex-shrink-0 mx-auto xs:mx-0">
                            <img
                                src="../TM.png"
                                alt="Task Manager Logo"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Title & Description - Responsive */}
                        <div className="text-center xs:text-left flex-1">
                            <DialogTitle className="text-xl xs:text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white tracking-tight">
                                Share this app
                            </DialogTitle>
                            <p className="text-xs xs:text-sm text-gray-500 dark:text-gray-400 mt-1 xs:mt-2">
                                Invite your friends and team to try this Task Manager 🚀
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-4 xs:p-6 pt-2 xs:pt-4 space-y-4 xs:space-y-6">
                    {/* Share Options - Fully Responsive Grid */}
                    <div>
                        <h3 className="text-xs xs:text-sm font-semibold text-gray-600 dark:text-gray-300 mb-3 xs:mb-4 uppercase">
                            Share Via
                        </h3>

                        {/* Mobile: Horizontal Scroll */}
                        <div className="sm:hidden">
                            <div className="flex gap-3 xs:gap-4 overflow-x-auto overflow-y-visible py-2 px-0 hide-scrollbar">
                                {shareOptions.map((option) => (
                                    <button
                                        key={option.name}
                                        onClick={option.action}
                                        className="flex flex-col items-center gap-2 min-w-[70px] xs:min-w-[80px] flex-shrink-0 group transition-all duration-300"
                                    >
                                        <div className={`w-14 xs:w-16 h-14 xs:h-16 rounded-full flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:shadow-xl ${option.color}`}>
                                            {option.icon}
                                        </div>
                                        <span className="text-xs text-gray-600 dark:text-gray-300 font-medium whitespace-nowrap">
                                            {option.name}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tablet & Desktop: Grid Layout */}
                        <div className="hidden sm:grid grid-cols-5 md:grid-cols-5 gap-3 md:gap-4">
                            {shareOptions.map((option) => (
                                <button
                                    key={option.name}
                                    onClick={option.action}
                                    className="flex flex-col items-center gap-2 group transition-all duration-300"
                                >
                                    <div className={`w-14 md:w-16 h-14 md:h-16 rounded-full flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-105 ${option.color}`}>
                                        {option.icon}
                                    </div>
                                    <span className="text-xs md:text-sm text-gray-600 dark:text-gray-300 font-medium whitespace-nowrap">
                                        {option.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />

                    {/* Link Section - Responsive */}
                    <div>
                        <h3 className="text-xs xs:text-sm font-semibold text-gray-600 dark:text-gray-300 mb-3 xs:mb-4 uppercase">
                            Share Link
                        </h3>
                        <div className="flex items-center gap-3 p-3 xs:p-4 rounded-xl xs:rounded-2xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#141414] shadow-inner">
                            <input
                                type="text"
                                value={shareUrl}
                                readOnly
                                className="flex-1 bg-transparent border-none focus:outline-none text-xs xs:text-sm text-gray-600 dark:text-gray-300 truncate"
                            />
                            <button
                                onClick={handleCopy}
                                className={`px-4 sm:px-5 py-2 sm:py-2.5 min-w-max sm:min-w-[100px] flex items-center justify-center gap-2 transition-all duration-300 rounded-full font-medium text-xs sm:text-sm whitespace-nowrap ml-auto ${copied
                                        ? 'bg-green-500 hover:bg-green-600 text-white'
                                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                                    }`}
                            >
                                {copied ? (
                                    <>
                                        <p>copied !</p>
                                        <span className="hidden xs:inline">Copied</span>
                                    </>
                                ) : (
                                    <>
                                        <p>copy</p>
                                        <span className="hidden xs:inline">Copy</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Close Button - Responsive and Dark Mode Optimized */}
                    <button
                        onClick={() => onOpenChange(false)}
                        className="w-full py-2.5 xs:py-3 px-4 xs:px-6 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 active:bg-gray-300 dark:active:bg-gray-600 text-gray-900 dark:text-gray-100 font-semibold text-sm xs:text-base rounded-lg xs:rounded-xl transition-colors duration-200"
                    >
                        Close
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
