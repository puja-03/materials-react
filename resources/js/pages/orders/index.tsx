import React from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { index as ordersIndex, track as ordersTrack } from '@/routes/orders/index';
import { status as adminOrdersStatus, refund as adminOrdersRefund } from '@/routes/admin/orders/index';

export default function OrderIndex({ orders }: { orders: any[] }) {
    const { auth } = usePage().props as any;
    const isAdmin = auth.user.role === 'admin';
    const isSeller = auth.user.role === 'shopkeeper';

    const [search, setSearch] = React.useState('');
    const filtered = orders.filter(o =>
        String(o.id).includes(search) ||
        (o.user?.name || '').toLowerCase().includes(search.toLowerCase())
    );

    const statusColor = (status: string) => {
        if (status === 'paid')      return 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900';
        if (status === 'pending')   return 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900';
        if (status === 'refunded')  return 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900';
        if (status === 'cancelled') return 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-900';
        return 'bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-100 dark:border-slate-700';
    };

    return (
        <div className="p-8 w-full space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-700 bg-white dark:bg-slate-950">
            <Head title={isAdmin ? 'Platform Audit — Orders' : isSeller ? 'Merchant Sales' : 'Procurement History'} />

            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-500"></span>
                        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Database: TRANSACTION_LEDGER</span>
                    </div>
                    <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
                        {isAdmin ? 'Global Order Ledger' : isSeller ? 'Merchant Sales Record' : 'Procurement History'}
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        {isAdmin ? 'Platform-wide transaction monitoring and capital authorization.' : isSeller ? 'Real-time record of asset sales and revenue distribution.' : 'Detailed log of your industrial procurement operations.'}
                    </p>
                </div>
                
                <div className="relative w-full md:w-80">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-[20px]">search</span>
                    <input
                        className="w-full pl-12 pr-4 py-3 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-slate-900 dark:text-white"
                        placeholder="Search ledger entries..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* Orders Table */}
            <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                                <th className="px-8 py-5 text-[10px] font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500">Order Token</th>
                                {(isAdmin || isSeller) && <th className="px-8 py-5 text-[10px] font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500">Agent Node</th>}
                                <th className="px-8 py-5 text-[10px] font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500">Asset Stack</th>
                                <th className="px-8 py-5 text-[10px] font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500">Transaction Value</th>
                                {isAdmin && <th className="px-8 py-5 text-[10px] font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500">Commission</th>}
                                {isSeller && <th className="px-8 py-5 text-[10px] font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500">Revenue Share</th>}
                                <th className="px-8 py-5 text-[10px] font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500 text-right">Audit Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {filtered.length > 0 ? filtered.map((order) => (
                                <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                    <td className="px-8 py-5">
                                        <p className="text-sm font-semibold text-slate-900 dark:text-white tracking-tight">#{String(order.id).padStart(6, '0')}</p>
                                        <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-tighter mt-1">{new Date(order.created_at).toLocaleDateString()}</p>
                                    </td>
                                    {(isAdmin || isSeller) && (
                                        <td className="px-8 py-5">
                                            <p className="text-sm font-medium text-slate-900 dark:text-white">{order.user?.name || 'Guest User'}</p>
                                            <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-tight">{order.user?.email || 'OFFLINE'}</p>
                                        </td>
                                    )}
                                    <td className="px-8 py-5">
                                        <div className="flex -space-x-3">
                                            {(order.items || []).slice(0, 3).map((item: any, i: number) => (
                                                <div key={i} className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-800 shadow-sm">
                                                    <img src={item.product?.image_url} alt="" className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal opacity-80" />
                                                </div>
                                            ))}
                                            {order.items?.length > 3 && (
                                                <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-slate-800 border-2 border-white dark:border-slate-800 flex items-center justify-center text-[9px] font-bold text-white dark:text-slate-300 tracking-widest shadow-sm">
                                                    +{order.items.length - 3}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <p className="text-sm font-semibold text-slate-900 dark:text-white">₹{Number(order.total_amount).toLocaleString()}</p>
                                        <p className="text-[9px] text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">{order.payment_method}</p>
                                    </td>
                                    {isAdmin && (
                                        <td className="px-8 py-5">
                                            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">₹{Number(order.admin_commission_amount || 0).toLocaleString()}</p>
                                        </td>
                                    )}
                                    {isSeller && (
                                        <td className="px-8 py-5">
                                            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">₹{Number(order.seller_amount || 0).toLocaleString()}</p>
                                        </td>
                                    )}
                                    <td className="px-8 py-5">
                                        <div className="flex items-center justify-end gap-3">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[9px] font-semibold uppercase tracking-widest border ${statusColor(order.status)}`}>
                                                <span className={`w-1 h-1 rounded-full ${order.status === 'paid' ? 'bg-emerald-500' : 'bg-current'}`}></span>
                                                {order.status}
                                            </span>
                                            
                                            <div className="flex items-center gap-1 ml-2">
                                                <Link
                                                    href={ordersTrack.url(order.id)}
                                                    className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 hover:border-indigo-200 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all"
                                                    title="Trace Lifecycle"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">visibility</span>
                                                </Link>
                                                {isAdmin && order.status === 'pending' && (
                                                    <button
                                                        onClick={() => router.patch(adminOrdersStatus.url(order.id), { status: 'paid' })}
                                                        className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 hover:border-emerald-200 dark:hover:border-emerald-700 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-all"
                                                        title="Authorize Payment"
                                                    >
                                                        <span className="material-symbols-outlined text-[18px]">check_circle</span>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={10} className="px-8 py-32 text-center">
                                        <div className="flex flex-col items-center gap-4 opacity-20 dark:opacity-40">
                                            <span className="material-symbols-outlined text-7xl dark:text-white">receipt_long</span>
                                            <p className="text-sm font-medium uppercase tracking-[0.2em] dark:text-white">Ledger is currently void.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}

OrderIndex.layout = (page: React.ReactNode) => {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Ledger Audit', href: ordersIndex.url() },
    ];
    return <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>;
};
