import { Head, Link } from '@inertiajs/react';
import SiteNavbar from '@/components/site-navbar';
import SiteFooter from '@/components/site-footer';
import { index as productsIndex } from '@/routes/products/index';

export default function Cart() {
    return (
        <div className="flex flex-col min-h-screen bg-surface text-on-surface">
            <Head title="Your Cart - Materials Market" />
            <SiteNavbar />

            <main className="max-w-7xl mx-auto px-6 py-8 md:py-12 w-full">
                {/* Back Link */}
                <Link
                    href={productsIndex.url()}
                    className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all mb-8"
                >
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    Back to shopping
                </Link>

                <h1 className="text-3xl font-bold mb-10 text-slate-900 dark:text-white">Your Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left Column: Cart Items & Form */}
                    <div className="lg:col-span-8 space-y-12">
                        {/* Cart Items List */}
                        <section className="space-y-6">
                            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                                {/* Item 1 */}
                                <div className="flex flex-col sm:flex-row items-center p-6 gap-6 border-b border-slate-100 dark:border-slate-800 last:border-0">
                                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 dark:bg-slate-800">
                                        <img
                                            alt="Cement Bags"
                                            className="w-full h-full object-cover"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGrKHKfU4756X9Q3Ih4sl1qnyBF_ZfZ6e_U92s04m6RKeKQ2XiIeyD8OPC340aFnmx5_Eim7RA7StGZtDwTAVOvTEPphSDy66rbesORFmlLgFlNeX_Dbwe3JINQePOcEZBJBhWD2y353-_FHXXlpVot_mFSY0YMylAFmQwYHKA6C0Xjvw6b-cfdo4KWRl9F35x1CPgCyRenECNXeYbDPjxrRheAaa6PQ45PX9DRrzW2wCNBIQevfiBiZP8_D4p4SMocwSlM1X1NVHs"
                                        />
                                    </div>
                                    <div className="flex-grow space-y-1 text-center sm:text-left">
                                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">Premium Portland Cement (50kg)</h3>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm">Vendor: BuildReady Solutions</p>
                                    </div>
                                    <div className="flex flex-col items-center sm:items-end gap-3 sm:w-48">
                                        <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                                            <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400">
                                                <span className="material-symbols-outlined text-[18px]">remove</span>
                                            </button>
                                            <input
                                                className="w-12 text-center border-none focus:ring-0 font-bold text-slate-900 dark:text-white bg-transparent"
                                                readOnly
                                                type="number"
                                                value="10"
                                            />
                                            <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400">
                                                <span className="material-symbols-outlined text-[18px]">add</span>
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="font-bold text-lg text-primary">₹4,500.00</span>
                                            <button className="text-destructive hover:brightness-110 p-1">
                                                <span className="material-symbols-outlined">delete</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Item 2 */}
                                <div className="flex flex-col sm:flex-row items-center p-6 gap-6 border-b border-slate-100 dark:border-slate-800 last:border-0">
                                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 dark:bg-slate-800">
                                        <img
                                            alt="Reinforcement Steel"
                                            className="w-full h-full object-cover"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3IrMI_APN91wJWkrNnNeNIXKKoePwukQWs8C4jz5yhwYgIc9KYw_WSzalKJWhLxMh5nLnYdT6tgwM3YIGDKG0tM3I7_GwCWIkgQNOuVJBT0rP7snUyVZ0y8Lkdu2QtSbssmoU4oGwg69GX0i-J3p1FTV9kGBwTZDkJ48RfZ7KKOFGVU_bQmIR2oF_i1qc1tR0dyR4vs1K73KJQmIOqmQl4zeC61BjdA6ruWF4_1p7kLuHxX-WH6Z34hmb3_vj6B69eseFDImZ966S"
                                        />
                                    </div>
                                    <div className="flex-grow space-y-1 text-center sm:text-left">
                                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">TMT Steel Bars (12mm)</h3>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm">Vendor: IronCore Materials</p>
                                    </div>
                                    <div className="flex flex-col items-center sm:items-end gap-3 sm:w-48">
                                        <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                                            <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400">
                                                <span className="material-symbols-outlined text-[18px]">remove</span>
                                            </button>
                                            <input
                                                className="w-12 text-center border-none focus:ring-0 font-bold text-slate-900 dark:text-white bg-transparent"
                                                readOnly
                                                type="number"
                                                value="5"
                                            />
                                            <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400">
                                                <span className="material-symbols-outlined text-[18px]">add</span>
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="font-bold text-lg text-primary">₹12,750.00</span>
                                            <button className="text-destructive hover:brightness-110 p-1">
                                                <span className="material-symbols-outlined">delete</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Checkout Form */}
                        <section className="space-y-8 bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Shipping Information</h2>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">Enter the delivery details for this project site.</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-500 dark:text-slate-400 ml-1">Full Name</label>
                                    <input
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all text-slate-900 dark:text-white"
                                        placeholder="John Doe"
                                        type="text"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-500 dark:text-slate-400 ml-1">Phone Number</label>
                                    <input
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all text-slate-900 dark:text-white"
                                        placeholder="+91 98765 43210"
                                        type="tel"
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-sm font-medium text-slate-500 dark:text-slate-400 ml-1">Delivery Address</label>
                                    <textarea
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all text-slate-900 dark:text-white"
                                        placeholder="Plot No. 42, Industrial Area Phase 2..."
                                        rows={3}
                                    ></textarea>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-500 dark:text-slate-400 ml-1">Pincode</label>
                                    <input
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all text-slate-900 dark:text-white"
                                        placeholder="400001"
                                        type="text"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-500 dark:text-slate-400 ml-1">Project Site Code (Optional)</label>
                                    <input
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all text-slate-900 dark:text-white"
                                        placeholder="B-204"
                                        type="text"
                                    />
                                </div>
                            </div>

                            <hr className="border-slate-100 dark:border-slate-800" />

                            {/* Payment Options */}
                            <div className="space-y-4">
                                <h3 className="font-bold text-lg text-slate-900 dark:text-white">Payment Method</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        { id: 'cod', label: 'COD (Cash on Delivery)', icon: 'account_balance_wallet' },
                                        { id: 'nb', label: 'Net Banking', icon: 'payments' },
                                        { id: 'card', label: 'Credit / Debit Card', icon: 'credit_card' },
                                        { id: 'emi', label: 'EMI / Financing', icon: 'schedule' },
                                    ].map((method, idx) => (
                                        <label
                                            key={method.id}
                                            className="flex items-center gap-3 p-4 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer hover:border-primary transition-all has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                                        >
                                            <input
                                                defaultChecked={idx === 0}
                                                className="w-4 h-4 text-primary focus:ring-primary border-slate-300"
                                                name="payment"
                                                type="radio"
                                            />
                                            <div className="flex items-center gap-3 text-slate-900 dark:text-white">
                                                <span className="material-symbols-outlined text-slate-500">{method.icon}</span>
                                                <span className="font-medium text-sm">{method.label}</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Summary */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-28 space-y-6">
                            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 shadow-lg">
                                <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Order Summary</h3>
                                <div className="space-y-4 text-sm mb-6">
                                    <div className="flex justify-between text-slate-500 dark:text-slate-400">
                                        <span>Subtotal</span>
                                        <span>₹17,250.00</span>
                                    </div>
                                    <div className="flex justify-between text-slate-500 dark:text-slate-400">
                                        <span>Shipping</span>
                                        <span className="text-emerald-600 font-bold">FREE</span>
                                    </div>
                                    <div className="flex justify-between text-slate-500 dark:text-slate-400">
                                        <span>GST (18%)</span>
                                        <span>₹3,105.00</span>
                                    </div>
                                    <hr className="border-slate-100 dark:border-slate-800" />
                                    <div className="flex justify-between font-bold text-xl text-slate-900 dark:text-white pt-2">
                                        <span>Total</span>
                                        <span>₹20,355.00</span>
                                    </div>
                                </div>
                                <button className="w-full bg-primary text-white py-4 rounded-lg font-bold text-lg shadow-md hover:brightness-110 transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                                    Place Order
                                    <span className="material-symbols-outlined">chevron_right</span>
                                </button>
                                <div className="mt-6 flex flex-col gap-4">
                                    <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-xs bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
                                        <span className="material-symbols-outlined text-[20px] text-emerald-600">verified</span>
                                        Secure checkout with end-to-end encryption.
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-xs bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
                                        <span className="material-symbols-outlined text-[20px] text-blue-600">local_shipping</span>
                                        Estimated delivery: 24-48 hours.
                                    </div>
                                </div>
                            </div>
                            {/* Discount Code */}
                            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                                <label className="text-sm font-medium text-slate-900 dark:text-white block mb-3">Discount Code</label>
                                <div className="flex gap-2">
                                    <input
                                        className="flex-grow bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 outline-none focus:border-primary text-sm text-slate-900 dark:text-white"
                                        placeholder="BULK500"
                                        type="text"
                                    />
                                    <button className="bg-slate-900 dark:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:brightness-110 transition-all">Apply</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <SiteFooter />
        </div>
    );
}
