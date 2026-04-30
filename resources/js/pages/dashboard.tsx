import React from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import orders from '@/routes/orders';
import products from '@/routes/products';
import wallet from '@/routes/wallet';
import admin from '@/routes/admin';

// ─── Admin Panel ──────────────────────────────────────────────────────────────
function AdminPanel({ stats, recent_orders }: any) {
    return (
        <div className="p-8 w-full space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 bg-white dark:bg-slate-950">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-purple-600 dark:bg-purple-500 animate-pulse"></span>
                        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">System: PLATFORM_NUCLEUS</span>
                    </div>
                    <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Executive Control Center</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Holistic oversight of materials market operations and capital flow.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 rounded-2xl border border-purple-100 dark:border-purple-900 shadow-sm">
                        <span className="material-symbols-outlined text-[18px]">verified_user</span>
                        <span className="text-[11px] font-bold uppercase tracking-widest">Root Authority</span>
                    </div>
                </div>
            </div>

            {/* Metrics Engine */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Primary Liquidity Card */}
                <div className="lg:col-span-1 relative overflow-hidden bg-slate-900 dark:bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-slate-900/20 group">
                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div>
                            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">Gross Market Volume</p>
                            <h2 className="text-5xl font-semibold mt-4 tracking-tighter">₹{Number(stats.total_revenue || 0).toLocaleString()}</h2>
                        </div>
                        <div className="mt-8 flex items-center gap-3">
                            <span className="flex items-center gap-1.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-xl border border-emerald-500/20 uppercase tracking-widest">
                                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                                +18.2%
                            </span>
                            <span className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">Performance/Mo</span>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-[80px] -mr-32 -mt-32 transition-all group-hover:bg-indigo-600/20"></div>
                </div>

                {/* Secondary Metrics */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {[
                        { label: 'Platform Revenue', value: `₹${Number(stats.total_commission || 0).toLocaleString()}`, icon: 'payments', color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-500/10', border: 'border-indigo-100 dark:border-indigo-900', badge: 'Net Yield' },
                        { label: 'Network Nodes', value: Number(stats.total_users || 0).toLocaleString(), icon: 'hub', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-500/10', border: 'border-blue-100 dark:border-blue-900', badge: 'Userbase' },
                        { label: 'Asset Inventory', value: Number(stats.total_products || 0).toLocaleString(), icon: 'inventory_2', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/10', border: 'border-amber-100 dark:border-amber-900', badge: 'SKU Count' },
                    ].map((s) => (
                        <div key={s.label} className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                            <div className="flex justify-between items-start">
                                <div className={`w-12 h-12 flex items-center justify-center rounded-2xl ${s.bg} ${s.color} ${s.border} border transition-transform group-hover:scale-110`}>
                                    <span className="material-symbols-outlined text-[22px]">{s.icon}</span>
                                </div>
                                <span className="text-[9px] font-bold uppercase text-slate-400 tracking-widest">{s.badge}</span>
                            </div>
                            <div className="mt-6">
                                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-medium mb-1">{s.label}</p>
                                <h3 className="text-2xl font-semibold text-slate-900 dark:text-white tracking-tight">{s.value}</h3>
                            </div>
                        </div>
                    ))}

                    {/* Navigation Hub */}
                    <div className="sm:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                        {[
                            { label: 'Registry', icon: 'manage_accounts', href: admin.users.url(), color: 'bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100' },
                            { label: 'Ledger', icon: 'receipt_long', href: orders.index.url(), color: 'bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100' },
                            { label: 'Treasury', icon: 'account_balance_wallet', href: wallet.index.url(), color: 'bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100' },
                            { label: 'Assets', icon: 'inventory', href: products.index.url(), color: 'bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100' },
                        ].map((q) => (
                            <Link key={q.label} href={q.href} className={`flex items-center gap-3 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800 bg-white dark:bg-slate-900 transition-all group shadow-sm`}>
                                <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${q.color} transition-all group-hover:bg-indigo-600 group-hover:text-white`}>
                                    <span className="material-symbols-outlined text-[20px]">{q.icon}</span>
                                </div>
                                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white">{q.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Audit Logs */}
            <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/30 dark:bg-slate-800/20">
                    <div>
                        <h4 className="text-lg font-semibold text-slate-900 dark:text-white tracking-tight">Real-time Transaction Feed</h4>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">Stream: LEDGER_RECAP_LATEST</p>
                    </div>
                    <Link href={orders.index.url()} className="flex items-center gap-2 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest hover:translate-x-1 transition-transform">
                        Access Full Ledger
                        <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] border-b border-slate-100 dark:border-slate-800">
                                <th className="px-8 py-5">Entry Token</th>
                                <th className="px-8 py-5">Agent Node</th>
                                <th className="px-8 py-5">Value</th>
                                <th className="px-8 py-5 text-indigo-600 dark:text-indigo-400">Yield</th>
                                <th className="px-8 py-5">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {recent_orders.length > 0 ? recent_orders.map((order: any) => (
                                <tr key={order.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group">
                                    <td className="px-8 py-5">
                                        <span className="text-sm font-semibold text-slate-900 dark:text-white tracking-tight">#{String(order.id).padStart(5, '0')}</span>
                                        <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-tighter mt-1">{new Date(order.created_at).toLocaleDateString()}</p>
                                    </td>
                                    <td className="px-8 py-5">
                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{order.user?.name || 'External Agent'}</p>
                                        <p className="text-[10px] text-slate-400 dark:text-slate-500 tracking-tight">{order.user?.email || 'N/A'}</p>
                                    </td>
                                    <td className="px-8 py-5 text-sm font-semibold text-slate-900 dark:text-white">₹{Number(order.total_amount).toLocaleString()}</td>
                                    <td className="px-8 py-5 text-sm font-bold text-indigo-600 dark:text-indigo-400">₹{Number(order.admin_commission_amount || 0).toLocaleString()}</td>
                                    <td className="px-8 py-5">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest border ${
                                            order.status === 'paid' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900' :
                                            order.status === 'pending' ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900' :
                                            'bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-100 dark:border-slate-700'
                                        }`}>
                                            <span className={`w-1 h-1 rounded-full ${order.status === 'paid' ? 'bg-emerald-500' : 'bg-current'}`}></span>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan={5} className="px-8 py-24 text-center">
                                    <div className="flex flex-col items-center gap-4 opacity-20">
                                        <span className="material-symbols-outlined text-6xl">inventory_2</span>
                                        <p className="text-sm font-bold uppercase tracking-[0.2em]">Void Buffer</p>
                                    </div>
                                </td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}

// ─── Seller Panel ─────────────────────────────────────────────────────────────
function SellerPanel({ stats, recent_orders }: any) {
    return (
        <div className="p-8 w-full space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 bg-white dark:bg-slate-950">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-500"></span>
                        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Node: MERCHANT_OPERATIONS</span>
                    </div>
                    <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Merchant Command</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Real-time asset management and revenue optimization.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 rounded-2xl border border-indigo-100 dark:border-indigo-900 shadow-sm">
                        <span className="material-symbols-outlined text-[18px]">storefront</span>
                        <span className="text-[11px] font-bold uppercase tracking-widest">Verified Merchant</span>
                    </div>
                </div>
            </div>

            {/* Merchant Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Liquidity Card */}
                <div className="lg:col-span-1 relative overflow-hidden bg-slate-900 dark:bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-500/20 group">
                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div>
                            <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em]">Net Capital Yield</p>
                            <h2 className="text-5xl font-semibold mt-4 tracking-tighter">₹{Number(stats.my_earnings || 0).toLocaleString()}</h2>
                        </div>
                        <Link href={wallet.index.url()} className="mt-10 inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-3 rounded-2xl transition-all text-[11px] uppercase tracking-widest">
                            <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
                            Access Treasury
                        </Link>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -mr-32 -mt-32"></div>
                </div>

                {/* Performance Grids */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {[
                        { label: 'Asset Sales', value: Number(stats.total_sales || 0), icon: 'shopping_cart_checkout', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-500/10', border: 'border-blue-100 dark:border-blue-900', badge: 'Fulfilled' },
                        { label: 'Market Assets', value: Number(stats.my_products || 0), icon: 'inventory_2', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10', border: 'border-emerald-100 dark:border-emerald-900', badge: 'Live SKU' },
                        { label: 'Pending Action', value: Number(stats.pending_orders || 0), icon: 'pending_actions', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/10', border: 'border-amber-100 dark:border-amber-900', badge: 'Critical' },
                    ].map((s) => (
                        <div key={s.label} className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                            <div className="flex justify-between items-start">
                                <div className={`w-12 h-12 flex items-center justify-center rounded-2xl ${s.bg} ${s.color} ${s.border} border transition-transform group-hover:scale-110`}>
                                    <span className="material-symbols-outlined text-[22px]">{s.icon}</span>
                                </div>
                                <span className="text-[9px] font-bold uppercase text-slate-400 tracking-widest">{s.badge}</span>
                            </div>
                            <div className="mt-6">
                                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-medium mb-1">{s.label}</p>
                                <h3 className="text-2xl font-semibold text-slate-900 dark:text-white tracking-tight">{s.value.toLocaleString()}</h3>
                            </div>
                        </div>
                    ))}

                    {/* Operational Actions */}
                    <div className="sm:col-span-3 flex flex-wrap gap-4 pt-2">
                        <Link href={products.create.url()} className="flex-1 flex items-center justify-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-2xl font-bold text-[11px] uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-slate-900/10">
                            <span className="material-symbols-outlined text-[20px]">add_circle</span>
                            Initialize New Asset
                        </Link>
                        <Link href={orders.index.url()} className="flex-1 flex items-center justify-center gap-3 border-2 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 px-8 py-4 rounded-2xl font-bold text-[11px] uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                            <span className="material-symbols-outlined text-[20px]">receipt_long</span>
                            Audit Sales Ledger
                        </Link>
                    </div>
                </div>
            </div>

            {/* Sales Feed */}
            <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/30 dark:bg-slate-800/20">
                    <div>
                        <h4 className="text-lg font-semibold text-slate-900 dark:text-white tracking-tight">Recent Sales Stream</h4>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">Source: TRANSACTION_LOG_SELLER</p>
                    </div>
                    <Link href={orders.index.url()} className="flex items-center gap-2 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest hover:translate-x-1 transition-transform">
                        View History
                        <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                    </Link>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {recent_orders.length > 0 ? recent_orders.map((order: any) => (
                        <div key={order.id} className="px-8 py-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                            <div className="flex items-center gap-5">
                                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900 flex items-center justify-center transition-transform group-hover:scale-110">
                                    <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white tracking-tight">Order Token #{String(order.id).padStart(5, '0')}</p>
                                    <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-medium mt-0.5">{order.user?.name || 'External Agent'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-8">
                                <div className="text-right">
                                    <p className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">₹{Number(order.seller_amount || 0).toLocaleString()}</p>
                                    <p className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest">Revenue Share</p>
                                </div>
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest border ${
                                    order.status === 'paid' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900' :
                                    order.status === 'pending' ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900' :
                                    'bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-100 dark:border-slate-700'
                                }`}>
                                    <span className={`w-1 h-1 rounded-full ${order.status === 'paid' ? 'bg-emerald-500' : 'bg-current'}`}></span>
                                    {order.status}
                                </span>
                            </div>
                        </div>
                    )) : (
                        <div className="px-8 py-24 text-center">
                            <div className="flex flex-col items-center gap-4 opacity-20">
                                <span className="material-symbols-outlined text-6xl">receipt_long</span>
                                <p className="text-sm font-bold uppercase tracking-[0.2em]">Void Transaction Record</p>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

// ─── User Panel ───────────────────────────────────────────────────────────────
function UserPanel({ stats, recent_orders }: any) {
    return (
        <div className="p-8 w-full space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 bg-white dark:bg-slate-950">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-500"></span>
                        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Node: CONSUMER_LEDGER</span>
                    </div>
                    <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Procurement Hub</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage your active procurement streams and digital assets.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-2xl border border-emerald-100 dark:border-emerald-900 shadow-sm">
                        <span className="material-symbols-outlined text-[18px]">verified</span>
                        <span className="text-[11px] font-bold uppercase tracking-widest">Verified Client</span>
                    </div>
                </div>
            </div>

            {/* Client Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Liquidity Card */}
                <div className="lg:col-span-1 relative overflow-hidden bg-slate-900 dark:bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-slate-900/20 group">
                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div>
                            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">Available Liquidity</p>
                            <h2 className="text-5xl font-semibold mt-4 tracking-tighter">₹{Number(stats.wallet_balance || 0).toLocaleString()}</h2>
                        </div>
                        <Link href={wallet.index.url()} className="mt-10 inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-3 rounded-2xl transition-all text-[11px] uppercase tracking-widest">
                            <span className="material-symbols-outlined text-[18px]">add</span>
                            Capitalize Wallet
                        </Link>
                    </div>
                    <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-indigo-600/10 rounded-full blur-[80px]"></div>
                </div>

                {/* Status Metrics */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                        { label: 'Total Procurements', value: Number(stats.total_orders || 0), icon: 'package_2', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-500/10', border: 'border-blue-100 dark:border-blue-900' },
                        { label: 'In-Transit Assets', value: Number(stats.active_orders || 0), icon: 'local_shipping', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/10', border: 'border-amber-100 dark:border-amber-900' },
                    ].map((s) => (
                        <div key={s.label} className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex items-center gap-6 group">
                            <div className={`w-16 h-16 flex items-center justify-center rounded-2xl ${s.bg} ${s.color} ${s.border} border transition-transform group-hover:scale-110`}>
                                <span className="material-symbols-outlined text-[28px]">{s.icon}</span>
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold mb-1">{s.label}</p>
                                <h3 className="text-3xl font-semibold text-slate-900 dark:text-white tracking-tighter">{s.value.toLocaleString()}</h3>
                            </div>
                        </div>
                    ))}

                    <Link href={products.index.url()} className="sm:col-span-2 flex items-center justify-between gap-6 p-8 rounded-[2.5rem] bg-indigo-600 text-white shadow-2xl shadow-indigo-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all group overflow-hidden relative">
                        <div className="relative z-10 flex items-center gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-[32px]">storefront</span>
                            </div>
                            <div>
                                <p className="text-xl font-semibold tracking-tight">Marketplace Access</p>
                                <p className="text-white/60 text-xs font-medium uppercase tracking-widest mt-1">Acquire New Materials & Assets</p>
                            </div>
                        </div>
                        <span className="material-symbols-outlined text-3xl opacity-40 group-hover:translate-x-2 transition-transform relative z-10">chevron_right</span>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    </Link>
                </div>
            </div>

            {/* Procurements Feed */}
            <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/30 dark:bg-slate-800/20">
                    <div>
                        <h4 className="text-lg font-semibold text-slate-900 dark:text-white tracking-tight">Recent Activity Stream</h4>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">Stream: PERSONAL_LEDGER_FEED</p>
                    </div>
                    <Link href={orders.index.url()} className="flex items-center gap-2 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest hover:translate-x-1 transition-transform">
                        Detailed Ledger
                        <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                    </Link>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {recent_orders.length > 0 ? recent_orders.map((order: any) => (
                        <div key={order.id} className="px-8 py-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                            <div className="flex items-center gap-5">
                                <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-100 dark:border-slate-800 flex items-center justify-center transition-all group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600">
                                    <span className="material-symbols-outlined text-[24px]">package_2</span>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white tracking-tight">Token #{String(order.id).padStart(5, '0')}</p>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-medium mt-0.5">{new Date(order.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-8">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest border ${
                                    order.status === 'paid' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900' :
                                    order.status === 'pending' ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900' :
                                    order.status === 'refunded' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900' :
                                    'bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-100 dark:border-slate-700'
                                }`}>
                                    <span className={`w-1 h-1 rounded-full ${order.status === 'paid' ? 'bg-emerald-500' : 'bg-current'}`}></span>
                                    {order.status}
                                </span>
                                <span className="text-base font-semibold text-slate-900 dark:text-white tracking-tight">₹{Number(order.total_amount).toLocaleString()}</span>
                            </div>
                        </div>
                    )) : (
                        <div className="px-8 py-24 text-center">
                            <div className="flex flex-col items-center gap-4 opacity-20">
                                <span className="material-symbols-outlined text-6xl">shopping_cart</span>
                                <p className="text-sm font-bold uppercase tracking-[0.2em]">Procurement Record Void</p>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

// ─── Main Dashboard (Role Router) ─────────────────────────────────────────────
export default function Dashboard({ stats, recent_orders, role }: any) {
    return (
        <>
            <Head title="Dashboard" />
            {role === 'admin' && <AdminPanel stats={stats} recent_orders={recent_orders} />}
            {role === 'seller' && <SellerPanel stats={stats} recent_orders={recent_orders} />}
            {role === 'user' && <UserPanel stats={stats} recent_orders={recent_orders} />}
        </>
    );
}

Dashboard.layout = (page: React.ReactNode) => {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard() },
    ];
    return <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>;
};
