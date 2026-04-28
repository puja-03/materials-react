import { Link } from '@inertiajs/react';

export default function SiteFooter() {
    return (
        <>
            <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 w-full mt-auto">
                <div className="flex flex-col md:flex-row justify-between items-center py-8 px-6 max-w-7xl mx-auto gap-4 font-inter text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-4">
                        <span className="font-bold text-slate-900 dark:text-white">Materials Market</span>
                        <span className="text-slate-400">|</span>
                        <span>© 2024 Materials Market. Industrial Precision for Professionals.</span>
                    </div>
                    <div className="flex gap-6">
                        <Link className="no-underline hover:text-primary dark:hover:text-primary-foreground transition-colors" href="#">Terms of Service</Link>
                        <Link className="no-underline hover:text-primary dark:hover:text-primary-foreground transition-colors" href="#">Privacy Policy</Link>
                        <Link className="no-underline hover:text-primary dark:hover:text-primary-foreground transition-colors" href="#">Vendor Guidelines</Link>
                        <Link className="no-underline hover:text-primary dark:hover:text-primary-foreground transition-colors" href="#">Help Center</Link>
                    </div>
                </div>
            </footer>

            {/* Mobile Navigation */}
            <div className="md:hidden fixed bottom-0 w-full z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-100 dark:border-slate-800 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] h-16 flex justify-around items-center px-2 pb-safe">
                <button className="flex flex-col items-center justify-center text-primary dark:text-primary-foreground transition-transform active:scale-90">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
                    <span className="font-inter text-[10px] font-semibold uppercase tracking-wider">Home</span>
                </button>
                <button className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 transition-transform active:scale-90">
                    <span className="material-symbols-outlined">search</span>
                    <span className="font-inter text-[10px] font-semibold uppercase tracking-wider">Search</span>
                </button>
                <button className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 transition-transform active:scale-90">
                    <span className="material-symbols-outlined">shopping_cart</span>
                    <span className="font-inter text-[10px] font-semibold uppercase tracking-wider">Cart</span>
                </button>
                <button className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 transition-transform active:scale-90">
                    <span className="material-symbols-outlined">inventory_2</span>
                    <span className="font-inter text-[10px] font-semibold uppercase tracking-wider">Orders</span>
                </button>
                <button className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 transition-transform active:scale-90">
                    <span className="material-symbols-outlined">person</span>
                    <span className="font-inter text-[10px] font-semibold uppercase tracking-wider">Profile</span>
                </button>
            </div>
        </>
    );
}
