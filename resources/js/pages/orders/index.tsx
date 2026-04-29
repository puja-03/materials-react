import { Head, Link } from '@inertiajs/react';
import SiteNavbar from '@/components/site-navbar';
import SiteFooter from '@/components/site-footer';

export default function OrderIndex({ orders }: { orders: any[] }) {
    return (
        <div className="flex flex-col min-h-screen bg-surface text-on-surface">
            <Head title="My Orders - Materials Market" />
            <SiteNavbar />

            <main className="max-w-screen-2xl mx-auto px-6 py-12 w-full flex-grow">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Order History</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">Track and manage your procurement history.</p>
                    </div>
                    <div className="flex gap-3">
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
                            <input
                                className="pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none transition-all w-full md:w-64"
                                placeholder="Search by Order ID..."
                                type="text"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs uppercase tracking-[0.1em] font-bold">
                                    <th className="px-8 py-4">Order Details</th>
                                    <th className="px-8 py-4">Vendor / Items</th>
                                    <th className="px-8 py-4">Total Amount</th>
                                    <th className="px-8 py-4">Status</th>
                                    <th className="px-8 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="space-y-1">
                                                <p className="font-bold text-slate-900 dark:text-white">#MM-{order.id.toString().padStart(6, '0')}</p>
                                                <p className="text-xs text-slate-500">{new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="flex -space-x-3 overflow-hidden">
                                                    {order.items.slice(0, 3).map((item: any, idx: number) => (
                                                        <img 
                                                            key={idx}
                                                            className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover" 
                                                            src={item.product.image_url} 
                                                            alt={item.product.name} 
                                                        />
                                                    ))}
                                                    {order.items.length > 3 && (
                                                        <div className="flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900 bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-500">
                                                            +{order.items.length - 3}
                                                        </div>
                                                    )}
                                                </div>
                                                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                                    {order.items[0]?.product?.vendor_name || 'Materials Market'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="font-black text-slate-900 dark:text-white text-lg">₹{parseFloat(order.total_amount).toLocaleString()}</p>
                                            <p className="text-[10px] text-slate-400 uppercase tracking-wider">{order.payment_method.toUpperCase()}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                                order.status === 'delivered' 
                                                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
                                                    : 'bg-primary/10 text-primary'
                                            }`}>
                                                <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <Link
                                                href={route('orders.track', order.id)}
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-slate-800 text-white rounded-lg text-xs font-bold hover:brightness-110 transition-all"
                                            >
                                                Track Order
                                                <span className="material-symbols-outlined text-[16px]">trending_flat</span>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {orders.length === 0 && (
                    <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 mt-8">
                        <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="material-symbols-outlined text-slate-400 text-4xl">inventory_2</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No orders found</h3>
                        <p className="text-slate-500 mb-8">You haven't placed any orders in the marketplace yet.</p>
                        <Link 
                            href={route('products.index')}
                            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-xl font-bold hover:shadow-lg transition-all"
                        >
                            Start Shopping
                        </Link>
                    </div>
                )}
            </main>

            <SiteFooter />
        </div>
    );
}
