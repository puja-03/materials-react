import React from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { index as ordersIndex } from '@/routes/orders/index';
import { status as adminOrdersStatus, refund as adminOrdersRefund } from '@/routes/admin/orders/index';

export default function OrderTrack({ order }: { order: any }) {
    const { auth } = usePage().props as any;
    const isAdmin = auth.user.role === 'admin';

    const formatDateTime = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ', ' +
               date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const statusSteps = ['pending', 'paid', 'dispatched', 'delivered'];
    const currentStep = statusSteps.indexOf(order.status) >= 0 ? statusSteps.indexOf(order.status) : 0;

    const steps = [
        { label: 'Order Placed', icon: 'check_circle', date: formatDateTime(order.created_at) },
        { label: 'Payment Confirmed', icon: 'payments', date: currentStep >= 1 ? formatDateTime(order.updated_at) : 'Pending' },
        { label: 'Dispatched', icon: 'local_shipping', date: currentStep >= 2 ? formatDateTime(order.updated_at) : 'Pending' },
        { label: 'Delivered', icon: 'inventory_2', date: currentStep >= 3 ? formatDateTime(order.updated_at) : 'Pending' },
    ];

    return (
        <div className="p-6 space-y-8 animate-in fade-in duration-500">
            <Head title={`Order #${String(order.id).padStart(6, '0')} — Track`} />

            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href={ordersIndex.url()} className="p-2 hover:bg-slate-100 dark:bg-slate-800 rounded-xl transition-all text-slate-400 hover:text-slate-900 dark:hover:text-white">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">Order #{String(order.id).padStart(6, '0')}</h2>
                    <p className="text-sm text-slate-500 mt-0.5">Placed on {formatDate(order.created_at)}</p>
                </div>
                <div className="ml-auto flex items-center gap-3">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-black uppercase ${
                        order.status === 'paid'      ? 'bg-emerald-100 text-emerald-700' :
                        order.status === 'pending'   ? 'bg-amber-100 text-amber-700' :
                        order.status === 'refunded'  ? 'bg-blue-100 text-blue-700' :
                        'bg-slate-100 text-slate-600'
                    }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        {order.status}
                    </span>

                    {/* Admin Actions */}
                    {isAdmin && order.status === 'pending' && (
                        <button
                            onClick={() => router.patch(adminOrdersStatus.url(order.id), { status: 'paid' })}
                            className="flex items-center gap-2 bg-emerald-600 text-white font-bold px-4 py-2 rounded-xl text-sm hover:bg-emerald-700 transition-all"
                        >
                            <span className="material-symbols-outlined text-[18px]">check_circle</span>
                            Mark as Paid
                        </button>
                    )}
                    {isAdmin && order.status === 'paid' && (
                        <button
                            onClick={() => { if (confirm('Issue full refund to customer wallet?')) router.patch(adminOrdersRefund.url(order.id)); }}
                            className="flex items-center gap-2 bg-blue-600 text-white font-bold px-4 py-2 rounded-xl text-sm hover:bg-blue-700 transition-all"
                        >
                            <span className="material-symbols-outlined text-[18px]">currency_exchange</span>
                            Issue Refund
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Tracking Timeline */}
                    <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm p-8">
                        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-10">Shipment Progress</h3>
                        <div className="relative flex justify-between items-start w-full px-2">
                            <div className="absolute top-[24px] left-[5%] right-[5%] h-1 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
                            <div
                                className="absolute top-[24px] left-[5%] h-1 bg-primary rounded-full transition-all duration-1000"
                                style={{ width: `${(currentStep / (steps.length - 1)) * 90}%` }}
                            ></div>
                            {steps.map((step, idx) => {
                                const isActive = idx <= currentStep;
                                const isCurrent = idx === currentStep;
                                return (
                                    <div key={step.label} className="relative flex flex-col items-center text-center w-1/4 z-10">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg mb-3 transition-all ${
                                            isActive ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                                        } ${isCurrent ? 'ring-4 ring-primary/20 scale-110' : ''}`}>
                                            <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "''" }}>{step.icon}</span>
                                        </div>
                                        <span className={`text-xs font-bold ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>{step.label}</span>
                                        <span className="text-[10px] text-slate-400 mt-0.5">{step.date}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* Order Items */}
                    <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                            <h3 className="font-bold text-slate-900 dark:text-white">Order Items ({order.items?.length || 0})</h3>
                        </div>
                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                            {order.items?.map((item: any) => (
                                <div key={item.id} className="p-6 flex items-center gap-5 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                                    <img className="w-16 h-16 rounded-xl object-cover border border-slate-200 dark:border-slate-700" src={item.product?.image_url} alt={item.product?.name} />
                                    <div className="flex-grow">
                                        <h4 className="font-bold text-slate-900 dark:text-white">{item.product?.name}</h4>
                                        <p className="text-xs text-slate-500 mt-0.5">Seller: {item.product?.vendor_name}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-black text-slate-900 dark:text-white">₹{Number(item.price).toLocaleString()}</p>
                                        <p className="text-xs text-slate-500 uppercase mt-0.5">Qty: {item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Shipping Details */}
                    <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm p-6">
                        <h3 className="font-bold text-slate-900 dark:text-white mb-4">Shipping Details</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Phone</p>
                                <p className="font-bold text-slate-900 dark:text-white mt-1">{order.phone_number}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Pincode</p>
                                <p className="font-bold text-slate-900 dark:text-white mt-1">{order.pincode}</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Address</p>
                                <p className="font-bold text-slate-900 dark:text-white mt-1">{order.shipping_address}</p>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Column — Invoice */}
                <div className="lg:col-span-4 space-y-6">
                    <aside className="bg-primary text-white rounded-2xl shadow-xl overflow-hidden relative">
                        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] bg-[length:24px_24px]"></div>
                        <div className="p-7 relative z-10">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <span className="text-[10px] uppercase tracking-[0.2em] font-black opacity-60">Tax Invoice</span>
                                    <h3 className="text-2xl font-black mt-1">INV-{String(order.id).padStart(6, '0')}</h3>
                                </div>
                                <button className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-all">
                                    <span className="material-symbols-outlined text-[20px]">download</span>
                                </button>
                            </div>

                            <div className="space-y-3 text-sm border-t border-white/10 pt-5">
                                {[
                                    { label: 'Subtotal', value: `₹${Number(order.total_amount / 1.18).toFixed(2)}` },
                                    { label: 'GST (18%)', value: `₹${(order.total_amount - order.total_amount / 1.18).toFixed(2)}` },
                                    { label: 'Payment Method', value: order.payment_method?.toUpperCase() },
                                ].map(r => (
                                    <div key={r.label} className="flex justify-between">
                                        <span className="opacity-70 font-medium">{r.label}</span>
                                        <span className="font-bold">{r.value}</span>
                                    </div>
                                ))}
                                {isAdmin && (
                                    <>
                                        <div className="flex justify-between text-emerald-300">
                                            <span className="font-medium">Admin Commission (5%)</span>
                                            <span className="font-bold">₹{Number(order.admin_commission_amount || 0).toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="opacity-70 font-medium">Seller Payout (95%)</span>
                                            <span className="font-bold">₹{Number(order.seller_amount || 0).toLocaleString()}</span>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="mt-6 bg-white/15 rounded-xl p-4 border border-white/10">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <span className="text-[10px] uppercase tracking-wider opacity-70 font-bold">Total Paid</span>
                                        <span className="block text-3xl font-black mt-1">₹{Number(order.total_amount).toLocaleString()}</span>
                                    </div>
                                    <span className="material-symbols-outlined text-emerald-400 text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-4 w-full bg-slate-50 dark:bg-slate-950 flex justify-around px-2">
                            {[...Array(8)].map((_, i) => <div key={i} className="w-4 h-4 rounded-full bg-primary -mt-2"></div>)}
                        </div>
                    </aside>

                    {/* Customer info for admin */}
                    {isAdmin && order.user && (
                        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm p-6">
                            <h4 className="font-bold text-slate-900 dark:text-white mb-4">Customer Info</h4>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black">
                                    {order.user.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900 dark:text-white text-sm">{order.user.name}</p>
                                    <p className="text-xs text-slate-500">{order.user.email}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

OrderTrack.layout = (page: React.ReactNode) => {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Orders', href: ordersIndex.url() },
        { title: 'Track Order', href: '#' },
    ];
    return <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>;
};
