import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, Wifi, X, AlertTriangle, RefreshCw } from 'lucide-react';
import { useThemeColors } from '../../hooks/useThemeColors';

const OfflineStatus = () => {
    const colors = useThemeColors();
    const [isOffline, setIsOffline] = useState(!navigator.onLine);
    const [showOnlineStatus, setShowOnlineStatus] = useState(false);

    useEffect(() => {
        const handleOnline = () => {
            setIsOffline(false);
            setShowOnlineStatus(true);
            setTimeout(() => setShowOnlineStatus(false), 3000);
        };
        const handleOffline = () => {
            setIsOffline(true);
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return (
        <AnimatePresence>
            {isOffline && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="max-w-md w-full p-8 rounded-[2.5rem] border text-center shadow-2xl relative overflow-hidden"
                        style={{
                            backgroundColor: colors.CARD_BG,
                            borderColor: `${colors.BORDER}40`,
                        }}
                    >
                        {/* Background glow */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-red-500/20 rounded-full blur-[60px] -z-10" />

                        <div className="flex justify-center mb-6">
                            <div className="p-5 rounded-3xl bg-red-500/10 border border-red-500/20 relative">
                                <WifiOff size={48} className="text-red-500 animate-pulse" />
                                <div className="absolute -top-1 -right-1">
                                    <div className="w-4 h-4 bg-red-500 rounded-full animate-ping absolute" />
                                    <div className="w-4 h-4 bg-red-500 rounded-full relative border-2 border-white" />
                                </div>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold mb-3" style={{ color: colors.TEXT_PRIMARY }}>
                            Connection Lost
                        </h2>
                        <p className="text-sm opacity-70 mb-8 max-w-[280px] mx-auto" style={{ color: colors.TEXT_SECONDARY }}>
                            Oops! It seems your internet connection has disconnected. Please check your network to continue browsing.
                        </p>

                        <div className="space-y-3">
                            <button
                                onClick={() => window.location.reload()}
                                className="w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all hover:gap-3 group"
                                style={{
                                    backgroundColor: colors.NEON_CYAN,
                                    color: colors.DARK_BG,
                                }}
                            >
                                <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                                Try Reconnecting
                            </button>

                            <div className="flex items-center justify-center gap-2 text-xs opacity-50" style={{ color: colors.TEXT_TERTIARY }}>
                                <AlertTriangle size={14} />
                                <span>Real-time status monitoring active</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            {showOnlineStatus && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.9 }}
                    className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[1001] px-6 py-3 rounded-full border shadow-lg flex items-center gap-3"
                    style={{
                        backgroundColor: colors.CARD_BG,
                        borderColor: 'rgba(34, 197, 94, 0.4)',
                        backdropFilter: 'blur(12px)'
                    }}
                >
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-semibold" style={{ color: colors.TEXT_PRIMARY }}>
                        Back Online Successfully
                    </span>
                    <Wifi size={16} className="text-green-500" />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default OfflineStatus;
