import React from 'react';
import { Head, router } from '@inertiajs/react';
import SiteNavbar from '@/components/site-navbar';
import SiteFooter from '@/components/site-footer';

export default function UserManagement({ users, total_users, filters }: any) {
    const [search, setSearch] = React.useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('admin.users'), { search }, { preserveState: true });
    };

    return (
        <div className="flex flex-col min-h-screen bg-surface text-on-surface">
            <Head title="User Management - Admin Console" />
            <SiteNavbar />

            <main className="flex-grow p-6 max-w-7xl mx-auto w-full space-y-8 animate-in fade-in duration-500">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">User Management</h2>
                        <p className="text-sm text-slate-500">Monitor and verify platform participants</p>
                    </div>
                    <form onSubmit={handleSearch} className="flex gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
                            <input
                                className="w-full pl-10 pr-4 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-primary outline-none text-slate-900 dark:text-white"
                                placeholder="Search by name, email or ID..."
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-md hover:brightness-110 transition-all">
                            <span className="material-symbols-outlined text-[18px]">search</span>
                            Search
                        </button>
                    </form>
                </div>

                {/* Stats Grid */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-2">
                            <div className="p-2 bg-primary/10 text-primary rounded-lg">
                                <span className="material-symbols-outlined">groups</span>
                            </div>
                            <span className="text-emerald-600 text-xs font-bold">+12%</span>
                        </div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Total Users</p>
                        <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">{total_users.toLocaleString()}</h3>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-2">
                            <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg">
                                <span className="material-symbols-outlined">storefront</span>
                            </div>
                            <span className="text-emerald-600 text-xs font-bold">+5%</span>
                        </div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Active Shops</p>
                        <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">843</h3>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-2">
                            <div className="p-2 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-lg">
                                <span className="material-symbols-outlined">pending_actions</span>
                            </div>
                            <span className="text-amber-600 text-xs font-bold">Priority</span>
                        </div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Pending Verifications</p>
                        <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">27</h3>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-2">
                            <div className="p-2 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg">
                                <span className="material-symbols-outlined">payments</span>
                            </div>
                            <span className="text-emerald-600 text-xs font-bold">+18.2%</span>
                        </div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Monthly Revenue</p>
                        <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">₹1.42L</h3>
                    </div>
                </section>

                {/* Filters & Table Section */}
                <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex gap-2">
                            {['All', 'Shopkeepers', 'Clients', 'Pending KYC'].map((filter, idx) => (
                                <button
                                    key={filter}
                                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                                        idx === 0
                                            ? 'bg-primary text-white'
                                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                                    }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                        <button className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-sm">filter_list</span>
                            Advanced Filters
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs uppercase tracking-wider">
                                    <th className="px-6 py-4 font-bold">User</th>
                                    <th className="px-6 py-4 font-bold">Email</th>
                                    <th className="px-6 py-4 font-bold">Role</th>
                                    <th className="px-6 py-4 font-bold">KYC Status</th>
                                    <th className="px-6 py-4 font-bold">Joined</th>
                                    <th className="px-6 py-4 text-right font-bold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {users.map((user: any) => (
                                    <tr key={user.email} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-900 dark:text-white">{user.name}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-xs text-slate-500">{user.email}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                                user.role === 'admin' 
                                                    ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' 
                                                    : user.role === 'shopkeeper'
                                                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                                        : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                                            }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                                    user.kyc_status === 'approved'
                                                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                                                        : user.kyc_status === 'rejected'
                                                            ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
                                                            : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                                }`}>
                                                    {user.kyc_status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{new Date(user.created_at).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2 items-center">
                                                <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1 mr-4">
                                                    {['client', 'shopkeeper', 'admin'].map((r) => (
                                                        <button
                                                            key={r}
                                                            onClick={() => router.patch(route('admin.users.role', user.id), { role: r })}
                                                            className={`px-2 py-1 text-[9px] font-black uppercase rounded transition-all ${
                                                                user.role === r 
                                                                    ? 'bg-white dark:bg-slate-700 shadow-sm text-primary' 
                                                                    : 'text-slate-400 hover:text-slate-600'
                                                            }`}
                                                        >
                                                            {r.replace('keeper', '')}
                                                        </button>
                                                    ))}
                                                </div>
                                                <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1 mr-2">
                                                    <button
                                                        onClick={() => router.patch(route('admin.users.kyc', user.id), { status: 'approved' })}
                                                        className={`p-1 rounded transition-all hover:bg-emerald-500 hover:text-white ${user.kyc_status === 'approved' ? 'text-emerald-600' : 'text-slate-400'}`}
                                                        title="Approve KYC"
                                                    >
                                                        <span className="material-symbols-outlined text-sm">check</span>
                                                    </button>
                                                    <button
                                                        onClick={() => router.patch(route('admin.users.kyc', user.id), { status: 'rejected' })}
                                                        className={`p-1 rounded transition-all hover:bg-rose-500 hover:text-white ${user.kyc_status === 'rejected' ? 'text-rose-600' : 'text-slate-400'}`}
                                                        title="Reject KYC"
                                                    >
                                                        <span className="material-symbols-outlined text-sm">close</span>
                                                    </button>
                                                </div>
                                                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-all">
                                                    <span className="material-symbols-outlined text-lg">visibility</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/30">
                        <p className="text-xs text-slate-500 font-medium">
                            Showing <span className="font-bold text-slate-900 dark:text-white">1-{users.length}</span> of <span className="font-bold text-slate-900 dark:text-white">{total_users}</span> users
                        </p>
                        <div className="flex gap-2">
                            <button className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-400 disabled:opacity-50" disabled>
                                <span className="material-symbols-outlined text-sm">chevron_left</span>
                            </button>
                            <button className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                <span className="material-symbols-outlined text-sm">chevron_right</span>
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            <SiteFooter />
        </div>
    );
}
