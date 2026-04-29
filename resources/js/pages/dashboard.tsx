import React from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';

// ─── Admin Panel ──────────────────────────────────────────────────────────────
function AdminPanel({ stats, recent_orders }: any) {
    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
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

            {/* Admin Stats */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Revenue', value: `₹${Number(stats.total_revenue || 0).toLocaleString()}`, icon: 'payments', color: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400', badge: '+18.2%', badgeColor: 'text-emerald-600 bg-emerald-50' },
                    { label: 'Admin Commission', value: `₹${Number(stats.total_commission || 0).toLocaleString()}`, icon: 'account_balance', color: 'bg-primary/10 text-primary', badge: '5% cut', badgeColor: 'text-primary bg-primary/10' },
                    { label: 'Total Users', value: Number(stats.total_users || 0).toLocaleString(), icon: 'group', color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400', badge: '+12%', badgeColor: 'text-blue-600 bg-blue-50' },
                    { label: 'Total Products', value: Number(stats.total_products || 0).toLocaleString(), icon: 'inventory_2', color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400', badge: 'Active', badgeColor: 'text-amber-600 bg-amber-50' },
                ].map((s) => (
                    <div key={s.label} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-lg ${s.color}`}>
                                <span className="material-symbols-outlined">{s.icon}</span>
                            </div>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded ${s.badgeColor}`}>{s.badge}</span>
                        </div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{s.label}</p>
                        <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">{s.value}</h3>
                    </div>
                ))}
            </section>

            {/* Quick Links */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Manage Users', icon: 'manage_accounts', href: route('admin.users'), color: 'border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/10 text-purple-700 dark:text-purple-300' },
                    { label: 'View All Orders', icon: 'receipt_long', href: route('orders.index'), color: 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/10 text-blue-700 dark:text-blue-300' },
                    { label: 'Admin Wallet', icon: 'account_balance_wallet', href: route('wallet.index'), color: 'border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/10 text-emerald-700 dark:text-emerald-300' },
                    { label: 'All Products', icon: 'inventory', href: route('products.index'), color: 'border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/10 text-amber-700 dark:text-amber-300' },
                ].map((q) => (
                    <Link key={q.label} href={q.href} className={`flex items-center gap-3 p-4 rounded-xl border-2 ${q.color} hover:scale-[1.02] transition-all font-bold text-sm`}>
                        <span className="material-symbols-outlined text-xl">{q.icon}</span>
                        {q.label}
                    </Link>
                ))}
            </section>

            {/* Recent Orders */}
            <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">Recent Platform Orders</h4>
                    <Link href={route('orders.index')} className="text-xs font-bold text-primary hover:underline">View All</Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                            <tr>
                                <th className="px-6 py-3">Order ID</th>
                                <th className="px-6 py-3">Customer</th>
                                <th className="px-6 py-3">Amount</th>
                                <th className="px-6 py-3">Commission</th>
                                <th className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {recent_orders.length > 0 ? recent_orders.map((order: any) => (
                                <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">#{String(order.id).padStart(5, '0')}</td>
                                    <td className="px-6 py-4 text-xs text-slate-500">{order.user?.name || 'Guest'}</td>
                                    <td className="px-6 py-4 text-sm font-bold">₹{Number(order.total_amount).toLocaleString()}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-emerald-600">₹{Number(order.admin_commission_amount || 0).toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
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
        <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
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

            {/* Wallet Highlight */}
            <div className="relative overflow-hidden bg-primary p-8 rounded-3xl text-white shadow-xl shadow-primary/20">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <p className="text-primary-foreground/70 text-sm font-bold uppercase tracking-wider">Seller Wallet Balance</p>
                        <h2 className="text-5xl font-black mt-1 tracking-tight">₹{Number(stats.my_earnings || 0).toLocaleString()}</h2>
                        <p className="text-primary-foreground/60 text-xs mt-2">95% of all your sales go here automatically</p>
                    </div>
                    <Link href={route('wallet.index')} className="flex items-center gap-2 bg-white text-primary font-bold px-6 py-3 rounded-xl hover:bg-slate-50 transition-all shadow-lg">
                        <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                        Manage Wallet
                    </Link>
                </div>
                <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute -left-10 -top-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            </div>

            {/* Seller Stats */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                    { label: 'Total Sales', value: Number(stats.total_sales || 0), icon: 'shopping_cart_checkout', color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600', badge: 'Paid Orders' },
                    { label: 'My Products', value: Number(stats.my_products || 0), icon: 'inventory_2', color: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600', badge: 'Listed' },
                    { label: 'Pending Orders', value: Number(stats.pending_orders || 0), icon: 'pending_actions', color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600', badge: 'Action needed' },
                ].map((s) => (
                    <div key={s.label} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-lg ${s.color}`}>
                                <span className="material-symbols-outlined">{s.icon}</span>
                            </div>
                            <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">{s.badge}</span>
                        </div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{s.label}</p>
                        <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">{s.value.toLocaleString()}</h3>
                    </div>
                ))}
            </section>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-4">
                <Link href={route('products.create')} className="flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-xl font-bold text-sm hover:brightness-110 transition-all shadow-lg shadow-primary/20">
                    <span className="material-symbols-outlined text-[20px]">add_circle</span>
                    List New Product
                </Link>
                <Link href={route('orders.index')} className="flex items-center gap-2 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-5 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                    <span className="material-symbols-outlined text-[20px]">receipt_long</span>
                    View My Orders
                </Link>
            </div>

            {/* Recent Orders */}
            <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">Orders for My Products</h4>
                    <Link href={route('orders.index')} className="text-xs font-bold text-primary hover:underline">View All</Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                            <tr>
                                <th className="px-6 py-3">Order ID</th>
                                <th className="px-6 py-3">Buyer</th>
                                <th className="px-6 py-3">Total</th>
                                <th className="px-6 py-3">Your Earning (95%)</th>
                                <th className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {recent_orders.length > 0 ? recent_orders.map((order: any) => (
                                <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">#{String(order.id).padStart(5, '0')}</td>
                                    <td className="px-6 py-4 text-xs text-slate-500">{order.user?.name || 'Customer'}</td>
                                    <td className="px-6 py-4 text-sm font-bold">₹{Number(order.total_amount).toLocaleString()}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-emerald-600">₹{Number(order.seller_amount || 0).toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                                            order.status === 'paid' ? 'bg-emerald-100 text-emerald-700' :
                                            order.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                                            'bg-slate-100 text-slate-600'
                                        }`}>{order.status}</span>
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-400 font-medium">No orders yet. List products to start selling!</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}

// ─── User Panel ───────────────────────────────────────────────────────────────
function UserPanel({ stats, recent_orders }: any) {
    return (
        <div className="p-6 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
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
                        <Link href={route('wallet.index')} className="mt-5 inline-flex items-center gap-2 bg-white/20 border border-white/20 text-white font-bold px-4 py-2 rounded-lg hover:bg-white/30 transition-all text-sm">
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

                    <Link href={route('products.index')} className="sm:col-span-2 flex items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all">
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
                    <Link href={route('orders.index')} className="text-xs font-bold text-primary hover:underline">View All</Link>
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
