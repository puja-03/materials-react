import React from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

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
        if (status === 'paid')      return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
        if (status === 'pending')   return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
        if (status === 'refunded')  return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
        if (status === 'cancelled') return 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400';
        return 'bg-slate-100 text-slate-600';
    };

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            <Head title={isAdmin ? 'All Orders — Admin' : isSeller ? 'My Sales' : 'My Orders'} />

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                        {isAdmin ? 'All Platform Orders' : isSeller ? 'Sales Orders' : 'My Orders'}
                    </h2>
                    <p className="text-sm text-slate-500 mt-0.5">
                        {isAdmin ? 'Monitor, approve & refund any order' : isSeller ? 'Orders containing your products' : 'Track your purchase history'}
                    </p>
                </div>
                <div className="relative w-full md:w-72">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
                    <input
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                        placeholder="Search by Order ID or Customer…"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* Orders Table */}
            <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                            <tr>
                                <th className="px-6 py-4">Order</th>
                                {(isAdmin || isSeller) && <th className="px-6 py-4">Customer</th>}
                                <th className="px-6 py-4">Items</th>
                                <th className="px-6 py-4">Amount</th>
                                {isAdmin && <th className="px-6 py-4">Commission</th>}
                                {isSeller && <th className="px-6 py-4">Your Earning</th>}
                                <th className="px-6 py-4">Payment</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {filtered.length > 0 ? filtered.map((order) => (
                                <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="px-6 py-5">
                                        <p className="font-bold text-slate-900 dark:text-white text-sm">#{String(order.id).padStart(6, '0')}</p>
                                        <p className="text-[10px] text-slate-400 mt-0.5">{new Date(order.created_at).toLocaleDateString()}</p>
                                    </td>
                                    {(isAdmin || isSeller) && (
                                        <td className="px-6 py-5">
                                            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{order.user?.name || 'Guest'}</p>
                                            <p className="text-[10px] text-slate-400">{order.user?.email || ''}</p>
                                        </td>
                                    )}
                                    <td className="px-6 py-5">
                                        <div className="flex -space-x-2">
                                            {(order.items || []).slice(0, 3).map((item: any, i: number) => (
                                                <img key={i} src={item.product?.image_url} alt="" className="w-8 h-8 rounded-full object-cover ring-2 ring-white dark:ring-slate-900" />
                                            ))}
                                            {order.items?.length > 3 && (
                                                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 ring-2 ring-white dark:ring-slate-900 flex items-center justify-center text-[9px] font-bold text-slate-600">
                                                    +{order.items.length - 3}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <p className="font-black text-slate-900 dark:text-white">₹{Number(order.total_amount).toLocaleString()}</p>
                                    </td>
                                    {isAdmin && (
                                        <td className="px-6 py-5">
                                            <p className="font-bold text-emerald-600">₹{Number(order.admin_commission_amount || 0).toLocaleString()}</p>
                                        </td>
                                    )}
                                    {isSeller && (
                                        <td className="px-6 py-5">
                                            <p className="font-bold text-emerald-600">₹{Number(order.seller_amount || 0).toLocaleString()}</p>
                                        </td>
                                    )}
                                    <td className="px-6 py-5">
                                        <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">{order.payment_method}</span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${statusColor(order.status)}`}>
                                            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={route('orders.track', order.id)}
                                                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-primary transition-all"
                                                title="Track Order"
                                            >
                                                <span className="material-symbols-outlined text-[18px]">visibility</span>
                                            </Link>
                                            {/* Admin: approve / refund */}
                                            {isAdmin && order.status === 'pending' && (
                                                <button
                                                    onClick={() => router.patch(route('admin.orders.status', order.id), { status: 'paid' })}
                                                    className="p-2 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 rounded-lg text-slate-400 hover:text-emerald-600 transition-all"
                                                    title="Mark as Paid"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                                                </button>
                                            )}
                                            {isAdmin && order.status === 'paid' && (
                                                <button
                                                    onClick={() => {
                                                        if (confirm('Refund this order to customer wallet?')) {
                                                            router.patch(route('admin.orders.refund', order.id));
                                                        }
                                                    }}
                                                    className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg text-slate-400 hover:text-blue-600 transition-all"
                                                    title="Refund Order"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">currency_exchange</span>
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={10} className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center gap-3 opacity-20">
                                            <span className="material-symbols-outlined text-6xl">receipt_long</span>
                                            <p className="font-bold">No orders found</p>
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
        { title: 'Orders', href: route('orders.index') },
    ];
    return <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>;
};
