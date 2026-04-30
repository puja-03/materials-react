import React from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

export default function WalletIndex({ wallet, transactions }: any) {
    const { auth } = usePage().props as any;
    const [amount, setAmount] = React.useState('');

    const handleAddMoney = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(route('wallet.add'), { amount }, {
            onSuccess: () => setAmount(''),
        });
    };

    const handleWithdraw = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(route('wallet.withdraw'), { amount }, {
            onSuccess: () => setAmount(''),
        });
    };

    return (
        <div className="p-8 w-full space-y-10 animate-in fade-in duration-700 bg-white dark:bg-slate-950">
            <Head title="Treasury Management — Materials Market" />

            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-500"></span>
                        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Node: CAPITAL_VAULT</span>
                    </div>
                    <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Treasury Management</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Monitor project liquidity and authorize capital transfers.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Balance & Actions Card */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-slate-900 dark:bg-slate-900/80 text-white p-10 rounded-[2.5rem] shadow-2xl shadow-slate-950/20 relative overflow-hidden border border-slate-800">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="relative z-10">
                            <p className="text-indigo-400 text-[10px] font-semibold uppercase tracking-[0.3em] mb-4">Total Liquidity</p>
                            <h2 className="text-5xl font-semibold tracking-tighter">₹{Number(wallet.balance).toLocaleString()}</h2>
                            
                            <div className="mt-12 flex flex-col gap-4">
                                <div className="space-y-2">
                                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Transfer Amount</label>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="Enter value..."
                                        className="w-full bg-white/5 dark:bg-slate-800 border border-white/10 dark:border-slate-700 rounded-2xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
                                    />
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={handleAddMoney}
                                        className="flex-1 bg-white text-slate-950 font-semibold py-4 rounded-2xl hover:bg-indigo-50 transition-all text-[10px] uppercase tracking-widest flex items-center justify-center gap-2"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">add</span>
                                        Inject
                                    </button>
                                    {auth.user.role === 'shopkeeper' && (
                                        <button
                                            onClick={handleWithdraw}
                                            className="flex-1 bg-indigo-600 dark:bg-indigo-700 text-white font-semibold py-4 rounded-2xl hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 border border-indigo-500/30"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">account_balance</span>
                                            Extract
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 flex items-center gap-6 shadow-sm">
                            <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center">
                                <span className="material-symbols-outlined text-[24px]">payments</span>
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-widest">Aggregate Inflow</p>
                                <p className="text-xl font-semibold dark:text-white">₹{transactions.data.filter((t: any) => t.type === 'credit').reduce((acc: number, t: any) => acc + Number(t.amount), 0).toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 flex items-center gap-6 shadow-sm">
                            <div className="w-12 h-12 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-2xl flex items-center justify-center">
                                <span className="material-symbols-outlined text-[24px]">shopping_cart_checkout</span>
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-widest">Aggregate Outflow</p>
                                <p className="text-xl font-semibold dark:text-white">₹{transactions.data.filter((t: any) => t.type === 'debit').reduce((acc: number, t: any) => acc + Number(t.amount), 0).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transactions Section */}
                <div className="lg:col-span-8">
                    <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden h-full">
                        <div className="px-10 py-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
                            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Ledger Protocol Stream</h3>
                            <button className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest hover:underline">Full Log Report</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-800/20 text-slate-400 dark:text-slate-500 text-[10px] font-semibold uppercase tracking-widest text-left">
                                        <th className="px-10 py-5">Audit Details</th>
                                        <th className="px-10 py-5">Protocol</th>
                                        <th className="px-10 py-5">Status</th>
                                        <th className="px-10 py-5 text-right">Yield</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {transactions.data.map((transaction: any) => (
                                        <tr key={transaction.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                            <td className="px-10 py-6">
                                                <div className="flex items-center gap-5">
                                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                                        transaction.type === 'credit' 
                                                        ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' 
                                                        : 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400'
                                                    }`}>
                                                        <span className="material-symbols-outlined text-[20px]">
                                                            {transaction.type === 'credit' ? 'download' : 'upload'}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                                                            {transaction.description || 'Transaction Protocol'}
                                                        </p>
                                                        <p className="text-[9px] text-slate-400 dark:text-slate-500 font-medium uppercase tracking-widest mt-1">
                                                            {new Date(transaction.created_at).toLocaleDateString()} — Ref: #{transaction.reference_id || 'INTERNAL'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-10 py-6">
                                                <span className={`text-[10px] font-bold uppercase tracking-widest ${
                                                    transaction.type === 'credit' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                                                }`}>
                                                    {transaction.type}
                                                </span>
                                            </td>
                                            <td className="px-10 py-6">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[9px] font-semibold uppercase tracking-widest bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                                                    <span className="w-1 h-1 rounded-full bg-slate-400"></span>
                                                    {transaction.status}
                                                </span>
                                            </td>
                                            <td className={`px-10 py-6 text-right font-semibold text-sm ${
                                                transaction.type === 'credit' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'
                                            }`}>
                                                {transaction.type === 'credit' ? '+' : '-'}₹{Number(transaction.amount).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                    {transactions.data.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="px-10 py-32 text-center">
                                                <div className="flex flex-col items-center gap-5 opacity-20 dark:opacity-40">
                                                    <span className="material-symbols-outlined text-7xl dark:text-white">account_balance_wallet</span>
                                                    <p className="text-sm font-semibold uppercase tracking-[0.2em] dark:text-white">Treasury log is currently void.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

WalletIndex.layout = (page: React.ReactNode) => {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Treasury Vault', href: '/wallet' },
    ];
    return <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>;
};
