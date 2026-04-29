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
        <div className="p-6 w-full space-y-8 animate-in fade-in duration-500">
            <Head title="My Wallet" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Balance Card */}
                <div className="md:col-span-1 bg-primary text-white p-8 rounded-3xl shadow-xl shadow-primary/20 relative overflow-hidden">
                    <div className="relative z-10">
                        <p className="text-primary-foreground/70 text-sm font-bold uppercase tracking-wider">Total Balance</p>
                        <h2 className="text-5xl font-black mt-2 tracking-tight">₹{Number(wallet.balance).toLocaleString()}</h2>
                        
                        <div className="mt-8 flex flex-col gap-3">
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Enter amount"
                                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50"
                            />
                            <div className="flex gap-2">
                                <button
                                    onClick={handleAddMoney}
                                    className="flex-1 bg-white text-primary font-bold py-3 rounded-xl hover:bg-slate-50 transition-all shadow-lg"
                                >
                                    Add Money
                                </button>
                                {auth.user.role === 'shopkeeper' && (
                                    <button
                                        onClick={handleWithdraw}
                                        className="flex-1 bg-primary-foreground/20 border border-white/20 text-white font-bold py-3 rounded-xl hover:bg-white/10 transition-all"
                                    >
                                        Withdraw
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* Decorative element */}
                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                </div>

                {/* Info / Quick Actions */}
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-4">
                        <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl">
                            <span className="material-symbols-outlined">payments</span>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-bold uppercase">Total Earned</p>
                            <p className="text-xl font-black">₹{transactions.data.filter((t: any) => t.type === 'credit').reduce((acc: number, t: any) => acc + Number(t.amount), 0).toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-4">
                        <div className="p-3 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-xl">
                            <span className="material-symbols-outlined">shopping_cart_checkout</span>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-bold uppercase">Total Spent</p>
                            <p className="text-xl font-black">₹{transactions.data.filter((t: any) => t.type === 'debit').reduce((acc: number, t: any) => acc + Number(t.amount), 0).toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Transactions Section */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <h3 className="text-xl font-black tracking-tight">Recent Transactions</h3>
                    <button className="text-primary text-sm font-bold">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-[10px] font-black uppercase tracking-widest text-left">
                                <th className="px-8 py-4">Transaction Details</th>
                                <th className="px-8 py-4">Type</th>
                                <th className="px-8 py-4">Status</th>
                                <th className="px-8 py-4">Date</th>
                                <th className="px-8 py-4 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {transactions.data.map((transaction: any) => (
                                <tr key={transaction.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                                transaction.type === 'credit' 
                                                ? 'bg-emerald-100 text-emerald-600' 
                                                : 'bg-rose-100 text-rose-600'
                                            }`}>
                                                <span className="material-symbols-outlined text-[20px]">
                                                    {transaction.type === 'credit' ? 'arrow_downward' : 'arrow_upward'}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900 dark:text-white">
                                                    {transaction.description || 'Transaction'}
                                                </p>
                                                {transaction.reference_id && (
                                                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">Ref: #{transaction.reference_id}</p>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className={`text-[10px] font-black uppercase tracking-wider ${
                                            transaction.type === 'credit' ? 'text-emerald-600' : 'text-rose-600'
                                        }`}>
                                            {transaction.type}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                                            {transaction.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-xs text-slate-500 font-medium">
                                        {new Date(transaction.created_at).toLocaleDateString()}
                                    </td>
                                    <td className={`px-8 py-5 text-right font-black text-sm ${
                                        transaction.type === 'credit' ? 'text-emerald-600' : 'text-slate-900 dark:text-white'
                                    }`}>
                                        {transaction.type === 'credit' ? '+' : '-'}₹{Number(transaction.amount).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                            {transactions.data.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center gap-3 opacity-20">
                                            <span className="material-symbols-outlined text-6xl">receipt_long</span>
                                            <p className="font-bold">No transactions found</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

WalletIndex.layout = (page: React.ReactNode) => {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'My Wallet',
            href: '/wallet',
        },
    ];

    return <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>;
};
