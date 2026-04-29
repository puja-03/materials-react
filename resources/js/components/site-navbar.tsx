import { Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';
import { index as productsIndex } from '@/routes/products/index';
import FlashMessage from './flash-message';

export default function SiteNavbar() {
    const { auth } = usePage().props as any;

    return (
        <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 shadow-sm sticky top-0 z-50">
            <nav className="flex justify-between items-center w-full px-6 py-4 max-w-screen-2xl mx-auto font-inter text-sm font-medium">
                <Link href="/" className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Materials Market
                </Link>
                <div className="hidden md:flex items-center gap-8">
                    <Link className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary-foreground transition-colors duration-200" href="#">Bulk Orders</Link>
                    <Link className="text-primary dark:text-primary-foreground border-b-2 border-primary pb-1" href={productsIndex.url()}>Materials</Link>
                    <Link className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary-foreground transition-colors duration-200" href="#">Rentals</Link>
                </div>
                <div className="flex items-center gap-4">
                    <Link
                        href={route('cart')}
                        className="p-2 text-slate-600 dark:text-slate-400 hover:text-primary transition-all relative"
                    >
                        <span className="material-symbols-outlined text-[24px]">shopping_cart</span>
                        <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900">2</span>
                    </Link>
                    {auth.user ? (
                        <Link
                            href={dashboard()}
                            className="px-5 py-2 text-primary font-semibold border border-primary rounded-lg hover:bg-primary/5 transition-all duration-200 focus:ring-2 focus:ring-primary"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={login()}
                                className="px-5 py-2 text-primary font-semibold border border-primary rounded-lg hover:bg-primary/5 transition-all duration-200 focus:ring-2 focus:ring-primary"
                            >
                                Login
                            </Link>
                            <Link
                                href={register()}
                                className="px-5 py-2 bg-primary text-white font-semibold rounded-lg hover:brightness-110 transition-all duration-200 shadow-md focus:ring-2 focus:ring-primary"
                            >
                                Shop Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </nav>
            <FlashMessage />
        </header>
    );
}
