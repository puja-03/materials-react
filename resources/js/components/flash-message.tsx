import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function FlashMessage() {
    const { flash } = usePage().props as any;
    const [isVisible, setIsVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState<'success' | 'error'>('success');

    useEffect(() => {
        if (flash.success) {
            setMessage(flash.success);
            setType('success');
            setIsVisible(true);
        } else if (flash.error) {
            setMessage(flash.error);
            setType('error');
            setIsVisible(true);
        }
    }, [flash]);

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[100] animate-in slide-in-from-right duration-300">
            <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border ${
                type === 'success' 
                    ? 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-100 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400' 
                    : 'bg-destructive/10 border-destructive/20 text-destructive'
            }`}>
                <span className="material-symbols-outlined">
                    {type === 'success' ? 'check_circle' : 'error'}
                </span>
                <p className="text-sm font-bold">{message}</p>
                <button 
                    onClick={() => setIsVisible(false)}
                    className="ml-4 p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
                >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
            </div>
        </div>
    );
}
