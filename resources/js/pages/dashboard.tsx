import { Head } from '@inertiajs/react';
import { dashboard } from '@/routes';

export default function Dashboard({ total_orders, total_products, total_users, recent_orders, products }: any) {
    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            <Head title="Shopkeeper Dashboard - Materials Market" />

            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h2>
                    <p className="text-sm text-slate-500">Welcome back, your shop is performing well today.</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 rounded-full border border-emerald-100 dark:border-emerald-800">
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                    <span className="text-[11px] font-bold uppercase tracking-tight">Premium Plan - Active</span>
                </div>
            </div>

            {/* Stats Cards */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-primary/10 rounded-lg text-primary">
                            <span className="material-symbols-outlined">inventory_2</span>
                        </div>
                        <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded">+12%</span>
                    </div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Total Products</p>
                    <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">{total_products.toLocaleString()}</h3>
                </div>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600">
                            <span className="material-symbols-outlined">shopping_cart</span>
                        </div>
                        <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded">+5.4%</span>
                    </div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Total Orders</p>
                    <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">{total_orders.toLocaleString()}</h3>
                </div>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg text-emerald-600">
                            <span className="material-symbols-outlined">payments</span>
                        </div>
                        <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded">+18.2%</span>
                    </div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Total Users</p>
                    <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">{total_users.toLocaleString()}</h3>
                </div>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border-2 border-destructive/20 shadow-sm hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-destructive/10 rounded-lg text-destructive">
                            <span className="material-symbols-outlined">warning</span>
                        </div>
                        <span className="text-xs font-bold text-destructive bg-destructive/10 px-2 py-0.5 rounded">Critical</span>
                    </div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Low Stock Alert</p>
                    <h3 className="text-2xl font-bold mt-1 text-destructive">14 Items</h3>
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Weekly Profit Trend Chart */}
                <section className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white">Weekly Profit Trend</h4>
                        <div className="flex gap-2">
                            <button className="text-xs px-3 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 transition-colors">Daily</button>
                            <button className="text-xs px-3 py-1 bg-primary text-white rounded-lg">Weekly</button>
                        </div>
                    </div>
                    <div className="flex items-end justify-between h-64 gap-2 pb-6 relative">
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6">
                            <div className="border-t border-slate-100 dark:border-slate-800 w-full"></div>
                            <div className="border-t border-slate-100 dark:border-slate-800 w-full"></div>
                            <div className="border-t border-slate-100 dark:border-slate-800 w-full"></div>
                            <div className="border-t border-slate-100 dark:border-slate-800 w-full"></div>
                        </div>
                        {[
                            { day: 'Mon', h: 'h-[40%]', color: 'bg-primary/20' },
                            { day: 'Tue', h: 'h-[65%]', color: 'bg-primary/40' },
                            { day: 'Wed', h: 'h-[55%]', color: 'bg-primary/60' },
                            { day: 'Thu', h: 'h-[90%]', color: 'bg-primary' },
                            { day: 'Fri', h: 'h-[75%]', color: 'bg-primary/80' },
                            { day: 'Sat', h: 'h-[45%]', color: 'bg-primary/50' },
                            { day: 'Sun', h: 'h-[30%]', color: 'bg-primary/30' },
                        ].map((item) => (
                            <div key={item.day} className="flex flex-col items-center flex-1 gap-2 z-10">
                                <div className={`w-full max-w-[40px] ${item.color} rounded-t-lg ${item.h} hover:brightness-110 transition-all duration-300 shadow-sm`}></div>
                                <span className="text-[10px] text-slate-400 font-bold uppercase">{item.day}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* New Orders Section */}
                <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white">New Orders</h4>
                        <button className="text-xs font-bold text-primary hover:underline">View All</button>
                    </div>
                    <div className="space-y-4">
                        {recent_orders.map((order: any) => (
                            <div key={order.id} className="p-4 border border-slate-100 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-800/30">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">ORD-{order.id.toString().padStart(5, '0')}</p>
                                        <p className="text-xs text-slate-500">₹{parseFloat(order.total_amount).toLocaleString()} • {order.user.name}</p>
                                    </div>
                                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                                        order.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                                    }`}>
                                        {order.status}
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <button className="flex-1 py-2 text-xs font-bold bg-primary text-white rounded-lg hover:brightness-110 transition-all">Details</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Inventory Management Table */}
            <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">Inventory Management</h4>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
                            <input
                                className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-slate-900 dark:text-white"
                                placeholder="Search inventory..."
                                type="text"
                            />
                        </div>
                        <Link
                            href={route('products.create')}
                            className="bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm hover:brightness-110 flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined text-[18px]">add</span>
                            Add New
                        </Link>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-bold">Product Name</th>
                                <th className="px-6 py-4 font-bold">Price</th>
                                <th className="px-6 py-4 font-bold">Vendor</th>
                                <th className="px-6 py-4 font-bold">Status</th>
                                <th className="px-6 py-4 text-right font-bold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {products.length > 0 ? (
                                products.map((product: any) => (
                                    <tr key={product.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden border border-slate-200 dark:border-slate-700">
                                                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-slate-900 dark:text-white line-clamp-1">{product.name}</span>
                                                    <span className="text-[10px] text-slate-500 font-medium uppercase tracking-tight">{product.category.name}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-bold text-slate-900 dark:text-white">₹{parseFloat(product.price).toLocaleString()}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                    <span className="material-symbols-outlined text-[12px]">verified_user</span>
                                                </div>
                                                <span className="text-xs text-slate-600 dark:text-slate-400">Verified Vendor</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                                                product.stock > 10 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                                            }`}>
                                                {product.stock > 10 ? 'In Stock' : 'Low Stock'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-primary transition-all">
                                                    <span className="material-symbols-outlined text-[18px]">edit</span>
                                                </button>
                                                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-destructive transition-all">
                                                    <span className="material-symbols-outlined text-[18px]">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="px-6 py-4" colSpan={5}>
                                        <p className="text-center text-slate-500 py-4 font-medium">No inventory items found. Add your first product!</p>
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

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
