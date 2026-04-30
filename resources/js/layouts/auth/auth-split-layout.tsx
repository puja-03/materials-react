import { Link, usePage } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSplitLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    const { name } = usePage().props;

    return (
        <div className="relative min-h-screen grid lg:grid-cols-2 bg-white dark:bg-slate-950">
            {/* Branding/Visual Side */}
            <div className="relative hidden lg:flex flex-col p-16 justify-between overflow-hidden bg-slate-900">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuATij9lY0He_yefwIlZDr9y5bLN2VdBUYOdTdm9IUXzcRb-yFfl0sMT1DvIpNVMCyMjFaRhsBf59GA4JY3p6OhTBz9Qv8tIDHTZjA7SGYQSR5JSHrdRbaGXYWU12wECBsm1CpiyuFOTfIIBEmALPvZo3N62pNCFXXSJBzEFabl6a8b8T_mhXhqnscQ_NiTOT2D6Ecqy9I1KjxEj14tNzw2Sq5QAj4_fbsAjjrCtZVM187KWOvHiApDDDgLIQwzHmrnBVz4EdQz_1iB_" 
                        className="w-full h-full object-cover opacity-30 grayscale contrast-125"
                        alt="Industrial Backdrop"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
                </div>

                <div className="relative z-10">
                    <Link
                        href={home()}
                        className="inline-flex items-center gap-4 group"
                    >
                        <div className="w-12 h-12 bg-white flex items-center justify-center rounded-2xl group-hover:scale-110 transition-transform shadow-xl">
                            <AppLogoIcon className="size-8 fill-indigo-600" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white font-bold text-lg tracking-tighter uppercase">{name}</span>
                            <span className="text-slate-400 text-[10px] font-bold tracking-[0.2em] uppercase">Enterprise Ledger v4.0</span>
                        </div>
                    </Link>
                </div>

                <div className="relative z-10 max-w-lg">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="w-8 h-px bg-indigo-500"></span>
                        <span className="text-indigo-400 text-[10px] font-bold uppercase tracking-[0.3em]">Verified Access Node</span>
                    </div>
                    <h2 className="text-5xl font-semibold text-white mb-8 tracking-tighter leading-tight">
                        Secure Industrial <br/>
                        <span className="text-indigo-400">Authentication Protocol.</span>
                    </h2>
                    <p className="text-slate-400 text-lg font-medium leading-relaxed">
                        Access India's premier hardware procurement network. Manage manufacturing nodes, track logistics streams, and authorize fiscal disbursements.
                    </p>
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-6">
                        <div className="flex -space-x-3">
                            {[1,2,3,4].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center overflow-hidden">
                                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" />
                                </div>
                            ))}
                        </div>
                        <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">
                            <span className="text-white">5,000+</span> ACTIVE NODES ONLINE
                        </p>
                    </div>
                </div>
            </div>

            {/* Form Side */}
            <div className="flex items-center justify-center p-8 md:p-16">
                <div className="w-full max-w-md space-y-10">
                    <div className="flex flex-col gap-8">
                        <Link
                            href={home()}
                            className="lg:hidden flex items-center gap-3"
                        >
                            <div className="w-10 h-10 bg-indigo-600 flex items-center justify-center rounded-xl shadow-lg">
                                <AppLogoIcon className="size-6 fill-white" />
                            </div>
                            <span className="font-bold text-lg tracking-tighter dark:text-white uppercase">{name}</span>
                        </Link>

                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-600"></div>
                                <h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">System: {title}</h3>
                            </div>
                            <h1 className="text-4xl font-semibold text-slate-900 dark:text-white tracking-tighter">{title}</h1>
                            <p className="text-slate-500 dark:text-slate-400 font-medium">
                                {description}
                            </p>
                        </div>
                    </div>

                    <div className="p-1 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-[2rem]">
                        <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[1.75rem] shadow-sm">
                            {children}
                        </div>
                    </div>

                    <div className="text-center">
                        <p className="text-[10px] font-bold text-slate-300 dark:text-slate-600 uppercase tracking-[0.4em]">
                            ENCRYPTION: AES_256_GCM_PROTOCOL
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
