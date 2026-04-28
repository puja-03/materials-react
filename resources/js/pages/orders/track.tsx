import { Head } from '@inertiajs/react';
import SiteNavbar from '@/components/site-navbar';
import SiteFooter from '@/components/site-footer';

export default function OrderTrack({ order }: { order: any }) {
    const formatDateTime = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ', ' + 
               date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const statusSteps = ['pending', 'accepted', 'dispatched', 'delivered'];
    const currentStep = statusSteps.indexOf(order.status);

    const steps = [
        { label: 'Order Placed', icon: 'check_circle', status: 'pending', date: formatDateTime(order.created_at) },
        { label: 'Shop Accepted', icon: 'store', status: 'accepted', date: currentStep >= 1 ? formatDateTime(order.created_at) : 'Pending' },
        { label: 'Dispatched', icon: 'local_shipping', status: 'dispatched', date: currentStep >= 2 ? formatDateTime(order.updated_at) : 'Pending' },
        { label: 'Delivered', icon: 'inventory_2', status: 'delivered', date: currentStep >= 3 ? formatDateTime(order.updated_at) : 'Pending' },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-surface text-on-surface">
            <Head title={`Track Order #${order.id} - Materials Market`} />
            <SiteNavbar />

            <main className="max-w-7xl mx-auto px-6 py-12 w-full flex-grow">
                {/* Back Button */}
                <div className="mb-8">
                    <button className="flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
                        <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                        Back to orders
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Tracking & Items */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Order Status Timeline Card */}
                        <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl shadow-md p-8">
                            <div className="flex justify-between items-center mb-10">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Tracking Order</h2>
                                    <p className="text-slate-500 dark:text-slate-400">Shipment by <span className="font-bold text-slate-900 dark:text-white">{order.items[0]?.product?.vendor_name || 'Materials Market'}</span></p>
                                </div>
                                <div className="bg-secondary/10 text-secondary dark:text-secondary-fixed-dim px-4 py-1.5 rounded-full text-sm font-bold">
                                    Estimated Delivery: Oct 24
                                </div>
                            </div>

                            <div className="relative flex justify-between items-start w-full px-4">
                                {/* Progress Bar Background */}
                                <div className="absolute top-[22px] left-[10%] right-[10%] h-1 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
                                {/* Active Progress Bar */}
                                <div 
                                    className="absolute top-[22px] left-[10%] h-1 bg-primary rounded-full transition-all duration-1000"
                                    style={{ width: `${(currentStep / (steps.length - 1)) * 80}%` }}
                                ></div>

                                {steps.map((step, idx) => {
                                    const isActive = idx <= currentStep;
                                    const isCurrent = idx === currentStep;
                                    return (
                                        <div key={step.label} className="relative flex flex-col items-center text-center w-1/4">
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center z-10 shadow-lg mb-4 transition-all duration-500 ${
                                                isActive ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                                            } ${isCurrent ? 'ring-4 ring-primary/20' : ''}`}>
                                                <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "''" }}>{step.icon}</span>
                                            </div>
                                            <span className={`text-sm font-bold ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>{step.label}</span>
                                            <span className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">{step.date}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                        {/* Order Items List */}
                        <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl shadow-md overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Order Items ({order.items.length})</h3>
                            </div>
                            <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                {order.items.map((item: any) => (
                                    <div key={item.id} className="p-6 flex items-center gap-6 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                                        <img className="w-20 h-20 rounded-lg object-cover border border-slate-200 dark:border-slate-700" src={item.product.image_url} alt={item.product.name} />
                                        <div className="flex-grow">
                                            <h4 className="font-bold text-slate-900 dark:text-white text-lg">{item.product.name}</h4>
                                            <p className="text-xs text-slate-500">{item.product.description} • SKU: {item.product.id.toString().padStart(4, '0')}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-slate-900 dark:text-white">₹{parseFloat(item.price).toLocaleString()}</p>
                                            <p className="text-xs text-slate-500 uppercase tracking-wider">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Invoice & Summary */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Invoice Card */}
                        <aside className="bg-primary text-white rounded-xl shadow-xl overflow-hidden relative group">
                            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] bg-[length:24px_24px]"></div>
                            <div className="p-8 relative z-10">
                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <span className="text-[10px] uppercase tracking-[0.2em] font-black opacity-70">Tax Invoice</span>
                                        <h3 className="text-2xl font-black leading-none mt-1">INV-2024-{order.id.toString().padStart(4, '0')}</h3>
                                    </div>
                                    <button className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-all transform hover:scale-110">
                                        <span className="material-symbols-outlined text-[20px]">download</span>
                                    </button>
                                </div>
                                <div className="space-y-4 border-t border-white/10 pt-6 text-sm">
                                    <div className="flex justify-between">
                                        <span className="opacity-70 font-medium">Order ID</span>
                                        <span className="font-mono font-bold">#MM-{order.id.toString().padStart(6, '0')}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="opacity-70 font-medium">Date Issued</span>
                                        <span className="font-bold">{formatDate(order.created_at)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="opacity-70 font-medium">Vendor</span>
                                        <span className="font-black">{order.items[0]?.product?.vendor_name || 'Materials Market'}</span>
                                    </div>
                                </div>
                                <div className="mt-12 bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/5">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <span className="text-[10px] uppercase tracking-[0.1em] opacity-70 block mb-1 font-bold">Total Amount Paid</span>
                                            <span className="text-3xl font-black">₹{parseFloat(order.total_amount).toLocaleString()}</span>
                                        </div>
                                        <span className="material-symbols-outlined text-emerald-400 text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                                    </div>
                                </div>
                            </div>
                            {/* Decorative bottom cutout */}
                            <div className="h-4 w-full bg-surface dark:bg-slate-950 flex justify-between px-2">
                                {[...Array(8)].map((_, i) => (
                                    <div key={i} className="w-4 h-4 rounded-full bg-primary -mt-2"></div>
                                ))}
                            </div>
                        </aside>

                        {/* Help Center Card */}
                        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl p-6 shadow-md">
                            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Need Assistance?</h4>
                            <div className="space-y-4">
                                <button className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-slate-900 dark:text-white">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-primary">support_agent</span>
                                        <span className="text-sm font-bold">Chat with Vendor</span>
                                    </div>
                                    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                                </button>
                                <button className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-slate-900 dark:text-white">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-primary">report_problem</span>
                                        <span className="text-sm font-bold">Report Issue</span>
                                    </div>
                                    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <SiteFooter />
        </div>
    );
}
