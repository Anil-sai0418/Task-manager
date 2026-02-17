import { useEffect, useState } from 'react';

export function useKeyboardShortcut(key, callback) {
    const [os, setOs] = useState('windows');

    useEffect(() => {
        // Detect OS
        const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
        setOs(isMac ? 'mac' : 'windows');

        const handleKeyDown = (event) => {
            const isCmdOrCtrl = isMac ? event.metaKey : event.ctrlKey;

            if (isCmdOrCtrl && event.key.toLowerCase() === key.toLowerCase()) {
                event.preventDefault();
                callback?.();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [key, callback]);

    return {
        os,
        shortcutLabel: os === 'mac' ? '⌘+K' : 'Ctrl+K'
    };
}
