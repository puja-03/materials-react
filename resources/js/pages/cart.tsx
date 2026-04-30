import { Head, Link, useForm } from '@inertiajs/react';
import SiteNavbar from '@/components/site-navbar';
import SiteFooter from '@/components/site-footer';
import { index as productsIndex } from '@/routes/products/index';
import { useState, useEffect } from 'react';

export default function Cart() {
    // Mock cart items for demo purposes
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            product_id: 1,
            name: 'Premium Portland Cement (50kg)',
            vendor: 'BuildReady Solutions',
            price: 450,
            quantity: 10,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGrKHKfU4756X9Q3Ih4sl1qnyBF_ZfZ6e_U92s04m6RKeKQ2XiIeyD8OPC340aFnmx5_Eim7RA7StGZtDwTAVOvTEPphSDy66rbesORFmlLgFlNeX_Dbwe3JINQePOcEZBJBhWD2y353-_FHXXlpVot_mFSY0YMylAFmQwYHKA6C0Xjvw6b-cfdo4KWRl9F35x1CPgCyRenECNXeYbDPjxrRheAaa6PQ45PX9DRrzW2wCNBIQevfiBiZP8_D4p4SMocwSlM1X1NVHs'
        },
        {
            id: 2,
            product_id: 2,
            name: 'TMT Steel Bars (12mm)',
            vendor: 'IronCore Materials',
            price: 2550,
            quantity: 5,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3IrMI_APN91wJWkrNnNeNIXKKoePwukQWs8C4jz5yhwYgIc9KYw_WSzalKJWhLxMh5nLnYdT6tgwM3YIGDKG0tM3I7_GwCWIkgQNOuVJBT0rP7snUyVZ0y8Lkdu2QtSbssmoU4oGwg69GX0i-J3p1FTV9kGBwTZDkJ48RfZ7KKOFGVU_bQmIR2oF_i1qc1tR0dyR4vs1K73KJQmIOqmQl4zeC61BjdA6ruWF4_1p7kLuHxX-WH6Z34hmb3_vj6B69eseFDImZ966S'
        }
    ]);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        phone_number: '',
        shipping_address: '',
        pincode: '',
        payment_method: 'cod',
        items: cartItems.map(item => ({ product_id: item.product_id, quantity: item.quantity }))
    });

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const gst = subtotal * 0.18;
    const total = subtotal + gst;

    useEffect(() => {
        setData('items', cartItems.map(item => ({ product_id: item.product_id, quantity: item.quantity })) as any);
    }, [cartItems]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('checkout.store'));
    };

    const updateQuantity = (id: number, delta: number) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }));
    };

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white selection:bg-indigo-100 dark:selection:bg-indigo-500/30">
            <Head title="Procurement Cart — Materials Market" />
            <SiteNavbar />

            <main className="max-w-7xl mx-auto px-6 py-12 md:py-20 w-full animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 pb-6 border-b border-slate-200 dark:border-slate-800">
                    <div>
                        <Link
                            href={productsIndex.url()}
                            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400 hover:gap-3 transition-all mb-4"
                        >
                            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                            Continue Procurement
                        </Link>
                        <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">Procurement Basket</h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Finalize your industrial asset acquisition and delivery parameters.</p>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                        <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-500 animate-pulse"></span>
                        Status: ACTIVE_SESSION
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8 space-y-12">
                        {/* Cart Items */}
                        <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-sm">
                            <div className="px-8 py-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Asset Stack ({cartItems.length})</span>
                            </div>
                            <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex flex-col sm:flex-row items-center p-8 gap-8 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                                        <div className="w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-100 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 transition-transform group-hover:scale-105 shadow-sm">
                                            <img alt={item.name} className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal opacity-90" src={item.image} />
                                        </div>
                                        <div className="flex-grow space-y-2 text-center sm:text-left">
                                            <h3 className="font-semibold text-xl text-slate-900 dark:text-white tracking-tight">{item.name}</h3>
                                            <div className="flex items-center justify-center sm:justify-start gap-2">
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Vendor:</span>
                                                <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{item.vendor}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center sm:items-end gap-4 sm:w-56">
                                            <div className="flex items-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden p-1 shadow-inner">
                                                <button type="button" onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-all text-slate-600 dark:text-slate-400">
                                                    <span className="material-symbols-outlined text-[18px]">remove</span>
                                                </button>
                                                <span className="w-10 text-center font-bold text-slate-900 dark:text-white text-sm">{item.quantity}</span>
                                                <button type="button" onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-all text-slate-600 dark:text-slate-400">
                                                    <span className="material-symbols-outlined text-[18px]">add</span>
                                                </button>
                                            </div>
                                            <div className="flex items-center gap-6">
                                                <span className="font-semibold text-xl text-slate-900 dark:text-white tracking-tighter">₹{(item.price * item.quantity).toLocaleString()}</span>
                                                <button type="button" onClick={() => setCartItems(prev => prev.filter(i => i.id !== item.id))} className="w-10 h-10 flex items-center justify-center rounded-xl bg-rose-50 dark:bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm">
                                                    <span className="material-symbols-outlined text-[20px]">delete_outline</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {cartItems.length === 0 && (
                                    <div className="p-20 text-center flex flex-col items-center gap-4 opacity-20">
                                        <span className="material-symbols-outlined text-7xl">shopping_cart</span>
                                        <p className="text-sm font-bold uppercase tracking-[0.2em]">Procurement Stack Void</p>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Shipping Hub */}
                        <section className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm space-y-10">
                            <div>
                                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white tracking-tight mb-2">Delivery Parameters</h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-widest font-medium">Registry: SHIPMENT_PROTOCOL_LATEST</p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Consignee Name</label>
                                    <input
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-slate-900 dark:text-white font-medium shadow-sm"
                                        placeholder="Full legal name"
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        required
                                    />
                                    {errors.name && <p className="text-xs text-rose-500 mt-1 ml-1">{errors.name}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Contact Protocol</label>
                                    <input
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-slate-900 dark:text-white font-medium shadow-sm"
                                        placeholder="+91 00000 00000"
                                        type="tel"
                                        value={data.phone_number}
                                        onChange={e => setData('phone_number', e.target.value)}
                                        required
                                    />
                                    {errors.phone_number && <p className="text-xs text-rose-500 mt-1 ml-1">{errors.phone_number}</p>}
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Asset Drop-off Address</label>
                                    <textarea
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-slate-900 dark:text-white font-medium shadow-sm"
                                        placeholder="Industrial site, plot number, area coordinates..."
                                        rows={3}
                                        value={data.shipping_address}
                                        onChange={e => setData('shipping_address', e.target.value)}
                                        required
                                    ></textarea>
                                    {errors.shipping_address && <p className="text-xs text-rose-500 mt-1 ml-1">{errors.shipping_address}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Regional Pin</label>
                                    <input
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-slate-900 dark:text-white font-medium shadow-sm"
                                        placeholder="000000"
                                        type="text"
                                        value={data.pincode}
                                        onChange={e => setData('pincode', e.target.value)}
                                        required
                                    />
                                    {errors.pincode && <p className="text-xs text-rose-500 mt-1 ml-1">{errors.pincode}</p>}
                                </div>
                            </div>

                            <div className="pt-6 space-y-6">
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800 pb-4">Settlement Methodology</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        { id: 'cod', label: 'COD — Physical Capital', icon: 'account_balance_wallet' },
                                        { id: 'nb', label: 'NB — Digital Gateway', icon: 'payments' },
                                        { id: 'card', label: 'CC/DC — Swipe Auth', icon: 'credit_card' },
                                        { id: 'emi', label: 'EMI — Future Yield', icon: 'schedule' },
                                    ].map((method) => (
                                        <label
                                            key={method.id}
                                            className={`flex items-center gap-4 p-5 border-2 rounded-2xl cursor-pointer transition-all ${
                                                data.payment_method === method.id ? 'border-indigo-600 bg-indigo-50/30 dark:bg-indigo-500/10' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900'
                                            } hover:border-indigo-200 dark:hover:border-indigo-800 group`}
                                        >
                                            <div className="relative flex items-center justify-center w-5 h-5">
                                                <input
                                                    className="w-5 h-5 text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-700 rounded-full cursor-pointer appearance-none border-2 checked:border-indigo-600"
                                                    name="payment"
                                                    type="radio"
                                                    value={method.id}
                                                    checked={data.payment_method === method.id}
                                                    onChange={e => setData('payment_method', e.target.value)}
                                                />
                                                {data.payment_method === method.id && <span className="absolute w-2 h-2 bg-indigo-600 rounded-full"></span>}
                                            </div>
                                            <div className="flex items-center gap-4 text-slate-900 dark:text-white flex-grow">
                                                <span className={`material-symbols-outlined ${data.payment_method === method.id ? 'text-indigo-600' : 'text-slate-400'} group-hover:scale-110 transition-transform`}>{method.icon}</span>
                                                <span className="font-semibold text-sm tracking-tight">{method.label}</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                                {errors.payment_method && <p className="text-xs text-rose-500 ml-1">{errors.payment_method}</p>}
                            </div>
                        </section>
                    </div>

                    <div className="lg:col-span-4">
                        <div className="sticky top-28 space-y-8">
                            <div className="bg-slate-900 dark:bg-white p-8 rounded-[2.5rem] text-white dark:text-slate-900 shadow-2xl shadow-slate-900/20 dark:shadow-white/10 group relative overflow-hidden">
                                <div className="relative z-10">
                                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-8 border-b border-white/10 dark:border-slate-200 pb-4">Audit Breakdown</h3>
                                    <div className="space-y-5 text-sm mb-10">
                                        <div className="flex justify-between items-center text-slate-400 dark:text-slate-500">
                                            <span className="uppercase tracking-widest font-medium">Asset Subtotal</span>
                                            <span className="font-semibold text-white dark:text-slate-900">₹{subtotal.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-slate-400 dark:text-slate-500">
                                            <span className="uppercase tracking-widest font-medium">Logistics Yield</span>
                                            <span className="text-emerald-400 dark:text-emerald-600 font-bold tracking-widest uppercase">Nullified</span>
                                        </div>
                                        <div className="flex justify-between items-center text-slate-400 dark:text-slate-500">
                                            <span className="uppercase tracking-widest font-medium">Tax Aggregate (18%)</span>
                                            <span className="font-semibold text-white dark:text-slate-900">₹{gst.toLocaleString()}</span>
                                        </div>
                                        <div className="pt-6 border-t border-white/10 dark:border-slate-200 flex justify-between items-end">
                                            <span className="uppercase tracking-[0.2em] font-bold text-[11px] text-indigo-400 dark:text-indigo-600">Total Capital Req.</span>
                                            <span className="text-4xl font-semibold tracking-tighter text-white dark:text-slate-900">₹{total.toLocaleString()}</span>
                                        </div>
                                    </div>
                                    
                                    <button
                                        disabled={processing || cartItems.length === 0}
                                        type="submit"
                                        className="w-full bg-indigo-600 dark:bg-indigo-600 text-white py-5 rounded-2xl font-bold text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-indigo-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                                    >
                                        {processing ? 'Processing Authorization...' : 'Authorize Procurement'}
                                        <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">bolt</span>
                                    </button>
                                </div>
                                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                <div className="flex items-center gap-4 p-5 rounded-[2rem] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
                                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900">
                                        <span className="material-symbols-outlined text-[20px]">verified</span>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-900 dark:text-white">Secure Node</p>
                                        <p className="text-[9px] text-slate-400 dark:text-slate-500 font-medium tracking-tight">AES-256 Encrypted Tunnel</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-5 rounded-[2rem] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
                                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900">
                                        <span className="material-symbols-outlined text-[20px]">local_shipping</span>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-900 dark:text-white">Rapid Dispatch</p>
                                        <p className="text-[9px] text-slate-400 dark:text-slate-500 font-medium tracking-tight">Est: 24-48 Business Hours</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </main>

            <SiteFooter />
        </div>
    );
}
