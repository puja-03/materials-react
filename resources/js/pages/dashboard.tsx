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
        <div className="p-6 w-full space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">Admin Dashboard</h2>
                    <p className="text-sm text-slate-500 mt-0.5">Platform-wide overview & controls</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-full border border-purple-100 dark:border-purple-800">
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>admin_panel_settings</span>
                    <span className="text-[11px] font-bold uppercase tracking-tight">Super Admin Access</span>
                </div>
            </div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Big Revenue Card */}
                <div className="md:col-span-1 relative overflow-hidden bg-slate-900 dark:bg-white p-7 rounded-3xl text-white dark:text-slate-900 shadow-xl shadow-slate-900/20 dark:shadow-white/10">
                    <div className="relative z-10">
                        <p className="text-white/60 dark:text-slate-500 text-xs font-bold uppercase tracking-wider">Total Platform Revenue</p>
                        <h2 className="text-4xl font-black mt-2 tracking-tight">₹{Number(stats.total_revenue || 0).toLocaleString()}</h2>
                        <div className="mt-5 flex items-center gap-2">
                            <span className="flex items-center gap-1 text-[10px] font-black bg-emerald-500 text-white px-2 py-0.5 rounded-full uppercase tracking-tight">
                                <span className="material-symbols-outlined text-[12px]">trending_up</span>
                                +18.2%
                            </span>
                            <span className="text-[10px] text-white/40 dark:text-slate-400 font-bold uppercase">vs last month</span>
                        </div>
                    </div>
                    <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/5 dark:bg-slate-900/5 rounded-full blur-2xl"></div>
                </div>

                {/* Small stats & Links */}
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        { label: 'Commission', value: `₹${Number(stats.total_commission || 0).toLocaleString()}`, icon: 'account_balance', color: 'bg-primary/10 text-primary', badge: '5% Cut' },
                        { label: 'Total Users', value: Number(stats.total_users || 0).toLocaleString(), icon: 'group', color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600', badge: 'Platform' },
                        { label: 'Products', value: Number(stats.total_products || 0).toLocaleString(), icon: 'inventory_2', color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600', badge: 'Listed' },
                    ].map((s) => (
                        <div key={s.label} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col gap-3">
                            <div className="flex justify-between items-center">
                                <div className={`p-2.5 rounded-xl ${s.color}`}>
                                    <span className="material-symbols-outlined text-[20px]">{s.icon}</span>
                                </div>
                                <span className="text-[9px] font-black uppercase text-slate-400 bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 rounded">{s.badge}</span>
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">{s.label}</p>
                                <h3 className="text-xl font-black text-slate-900 dark:text-white">{s.value}</h3>
                            </div>
                        </div>
                    ))}

                    {/* Quick Links */}
                    <div className="sm:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                            { label: 'Users', icon: 'manage_accounts', href: admin.users.url(), color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700' },
                            { label: 'Orders', icon: 'receipt_long', href: orders.index.url(), color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700' },
                            { label: 'Wallet', icon: 'account_balance_wallet', href: wallet.index.url(), color: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700' },
                            { label: 'Items', icon: 'inventory', href: products.index.url(), color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700' },
                        ].map((q) => (
                            <Link key={q.label} href={q.href} className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl border border-transparent hover:border-slate-200 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-900 transition-all group`}>
                                <div className={`p-2 rounded-xl ${q.color} group-hover:scale-110 transition-all`}>
                                    <span className="material-symbols-outlined text-[20px]">{q.icon}</span>
                                </div>
                                <span className="text-[10px] font-black uppercase text-slate-600 dark:text-slate-400">{q.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Orders Table */}
            <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">Recent Platform Orders</h4>
                    <Link href={orders.index.url()} className="text-xs font-bold text-primary hover:underline">View All</Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                            <tr>
                                <th className="px-6 py-4">Order</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4 text-emerald-600">Cut (5%)</th>
                                <th className="px-6 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {recent_orders.length > 0 ? recent_orders.map((order: any) => (
                                <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">#{String(order.id).padStart(5, '0')}</td>
                                    <td className="px-6 py-4">
                                        <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{order.user?.name || 'Guest'}</p>
                                        <p className="text-[10px] text-slate-400">{order.user?.email || ''}</p>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-black">₹{Number(order.total_amount).toLocaleString()}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-emerald-600">₹{Number(order.admin_commission_amount || 0).toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <span className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase ${
                                            order.status === 'paid' ? 'bg-emerald-100 text-emerald-700' :
                                            order.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                                            'bg-slate-100 text-slate-600'
                                        }`}>{order.status}</span>
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-400 font-medium">No orders yet.</td></tr>
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
        <div className="p-6 w-full space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">Seller Dashboard</h2>
                    <p className="text-sm text-slate-500 mt-0.5">Track your sales, earnings, and inventory</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full border border-blue-100 dark:border-blue-800">
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>storefront</span>
                    <span className="text-[11px] font-bold uppercase tracking-tight">Verified Seller</span>
                </div>
            </div>

            {/* Wallet Card + Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Big wallet */}
                <div className="md:col-span-1 relative overflow-hidden bg-primary p-7 rounded-3xl text-white shadow-xl shadow-primary/20">
                    <div className="relative z-10">
                        <p className="text-primary-foreground/70 text-xs font-bold uppercase tracking-wider">Total Earnings</p>
                        <h2 className="text-4xl font-black mt-2 tracking-tight">₹{Number(stats.my_earnings || 0).toLocaleString()}</h2>
                        <Link href={wallet.index.url()} className="mt-5 inline-flex items-center gap-2 bg-white/20 border border-white/20 text-white font-bold px-4 py-2 rounded-lg hover:bg-white/30 transition-all text-sm">
                            <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
                            Manage Wallet
                        </Link>
                    </div>
                    <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute -left-6 -top-6 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
                </div>

                {/* Small stats */}
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        { label: 'Total Sales', value: Number(stats.total_sales || 0), icon: 'shopping_cart_checkout', color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600', badge: 'Paid' },
                        { label: 'My Products', value: Number(stats.my_products || 0), icon: 'inventory_2', color: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600', badge: 'Listed' },
                        { label: 'Pending', value: Number(stats.pending_orders || 0), icon: 'pending_actions', color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600', badge: 'Action' },
                    ].map((s) => (
                        <div key={s.label} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col gap-3">
                            <div className="flex justify-between items-center">
                                <div className={`p-2.5 rounded-xl ${s.color}`}>
                                    <span className="material-symbols-outlined text-[20px]">{s.icon}</span>
                                </div>
                                <span className="text-[9px] font-black uppercase text-slate-400 bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 rounded">{s.badge}</span>
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">{s.label}</p>
                                <h3 className="text-xl font-black text-slate-900 dark:text-white">{s.value.toLocaleString()}</h3>
                            </div>
                        </div>
                    ))}

                    {/* Quick Actions */}
                    <div className="sm:col-span-3 flex flex-wrap gap-3">
                        <Link href={products.create.url()} className="flex-1 flex items-center justify-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-3 rounded-2xl font-black text-xs hover:scale-[1.02] transition-all shadow-lg">
                            <span className="material-symbols-outlined text-[18px]">add_circle</span>
                            LIST NEW PRODUCT
                        </Link>
                        <Link href={orders.index.url()} className="flex-1 flex items-center justify-center gap-2 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-5 py-3 rounded-2xl font-black text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                            <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                            VIEW MY ORDERS
                        </Link>
                    </div>
                </div>
            </div>

            {/* Recent Orders */}
            <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">Recent Sales</h4>
                    <Link href={orders.index.url()} className="text-xs font-bold text-primary hover:underline">View All</Link>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {recent_orders.length > 0 ? recent_orders.map((order: any) => (
                        <div key={order.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">Order #{String(order.id).padStart(5, '0')}</p>
                                    <p className="text-[10px] text-slate-500 uppercase font-bold">{order.user?.name || 'Customer'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right mr-2">
                                    <p className="text-sm font-black text-slate-900 dark:text-white">₹{Number(order.seller_amount || 0).toLocaleString()}</p>
                                    <p className="text-[9px] text-emerald-600 font-bold uppercase tracking-tight">Your Share</p>
                                </div>
                                <span className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase ${
                                    order.status === 'paid' ? 'bg-emerald-100 text-emerald-700' :
                                    order.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                                    'bg-slate-100 text-slate-600'
                                }`}>{order.status}</span>
                            </div>
                        </div>
                    )) : (
                        <div className="px-6 py-12 text-center text-slate-400 font-medium">No sales yet.</div>
                    )}
                </div>
            </section>
        </div>
    );
}

// ─── User Panel ───────────────────────────────────────────────────────────────
function UserPanel({ stats, recent_orders }: any) {
    return (
        <div className="p-6 w-full space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">My Dashboard</h2>
                    <p className="text-sm text-slate-500 mt-0.5">Track your orders and manage your wallet</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 rounded-full border border-emerald-100 dark:border-emerald-800">
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                    <span className="text-[11px] font-bold uppercase tracking-tight">Verified Buyer</span>
                </div>
            </div>

            {/* Wallet Card + Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Big wallet */}
                <div className="md:col-span-1 relative overflow-hidden bg-primary p-7 rounded-3xl text-white shadow-xl shadow-primary/20">
                    <div className="relative z-10">
                        <p className="text-primary-foreground/70 text-xs font-bold uppercase tracking-wider">Wallet Balance</p>
                        <h2 className="text-4xl font-black mt-2 tracking-tight">₹{Number(stats.wallet_balance || 0).toLocaleString()}</h2>
                        <Link href={wallet.index.url()} className="mt-5 inline-flex items-center gap-2 bg-white/20 border border-white/20 text-white font-bold px-4 py-2 rounded-lg hover:bg-white/30 transition-all text-sm">
                            <span className="material-symbols-outlined text-[18px]">add</span>
                            Add Money
                        </Link>
                    </div>
                    <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                </div>

                {/* Small stats */}
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        { label: 'Total Orders', value: Number(stats.total_orders || 0), icon: 'package_2', color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600' },
                        { label: 'Active Orders', value: Number(stats.active_orders || 0), icon: 'local_shipping', color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600' },
                    ].map((s) => (
                        <div key={s.label} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex items-center gap-4">
                            <div className={`p-3 rounded-xl ${s.color}`}>
                                <span className="material-symbols-outlined">{s.icon}</span>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{s.label}</p>
                                <h3 className="text-2xl font-bold mt-0.5 text-slate-900 dark:text-white">{s.value.toLocaleString()}</h3>
                            </div>
                        </div>
                    ))}

                    <Link href={products.index.url()} className="sm:col-span-2 flex items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-3xl">storefront</span>
                            <div>
                                <p className="font-black text-lg">Browse Marketplace</p>
                                <p className="text-white/70 text-xs">Find the best materials & products</p>
                            </div>
                        </div>
                        <span className="material-symbols-outlined text-2xl">chevron_right</span>
                    </Link>
                </div>
            </div>

            {/* Recent Orders */}
            <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">My Recent Orders</h4>
                    <Link href={orders.index.url()} className="text-xs font-bold text-primary hover:underline">View All</Link>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {recent_orders.length > 0 ? recent_orders.map((order: any) => (
                        <div key={order.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[20px]">package_2</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">Order #{String(order.id).padStart(5, '0')}</p>
                                    <p className="text-xs text-slate-500">{new Date(order.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${
                                    order.status === 'paid' ? 'bg-emerald-100 text-emerald-700' :
                                    order.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                                    order.status === 'refunded' ? 'bg-blue-100 text-blue-700' :
                                    'bg-slate-100 text-slate-600'
                                }`}>{order.status}</span>
                                <span className="text-sm font-black text-slate-900 dark:text-white">₹{Number(order.total_amount).toLocaleString()}</span>
                            </div>
                        </div>
                    )) : (
                        <div className="px-6 py-20 text-center">
                            <div className="flex flex-col items-center gap-3 opacity-30">
                                <span className="material-symbols-outlined text-6xl">shopping_cart</span>
                                <p className="font-bold">No orders yet. Start shopping!</p>
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
