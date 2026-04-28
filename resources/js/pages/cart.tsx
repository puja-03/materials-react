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
        <div className="flex flex-col min-h-screen bg-surface text-on-surface">
            <Head title="Your Cart - Materials Market" />
            <SiteNavbar />

            <main className="max-w-7xl mx-auto px-6 py-8 md:py-12 w-full">
                <Link
                    href={productsIndex.url()}
                    className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all mb-8"
                >
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    Back to shopping
                </Link>

                <h1 className="text-3xl font-bold mb-10 text-slate-900 dark:text-white">Your Cart</h1>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-8 space-y-12">
                        <section className="space-y-6">
                            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex flex-col sm:flex-row items-center p-6 gap-6 border-b border-slate-100 dark:border-slate-800 last:border-0">
                                        <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 dark:bg-slate-800">
                                            <img alt={item.name} className="w-full h-full object-cover" src={item.image} />
                                        </div>
                                        <div className="flex-grow space-y-1 text-center sm:text-left">
                                            <h3 className="font-bold text-lg text-slate-900 dark:text-white">{item.name}</h3>
                                            <p className="text-slate-500 dark:text-slate-400 text-sm">Vendor: {item.vendor}</p>
                                        </div>
                                        <div className="flex flex-col items-center sm:items-end gap-3 sm:w-48">
                                            <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                                                <button type="button" onClick={() => updateQuantity(item.id, -1)} className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400">
                                                    <span className="material-symbols-outlined text-[18px]">remove</span>
                                                </button>
                                                <input
                                                    className="w-12 text-center border-none focus:ring-0 font-bold text-slate-900 dark:text-white bg-transparent"
                                                    readOnly
                                                    type="number"
                                                    value={item.quantity}
                                                />
                                                <button type="button" onClick={() => updateQuantity(item.id, 1)} className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400">
                                                    <span className="material-symbols-outlined text-[18px]">add</span>
                                                </button>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="font-bold text-lg text-primary">₹{(item.price * item.quantity).toLocaleString()}</span>
                                                <button type="button" onClick={() => setCartItems(prev => prev.filter(i => i.id !== item.id))} className="text-destructive hover:brightness-110 p-1">
                                                    <span className="material-symbols-outlined">delete</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

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
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        required
                                    />
                                    {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-500 dark:text-slate-400 ml-1">Phone Number</label>
                                    <input
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all text-slate-900 dark:text-white"
                                        placeholder="+91 98765 43210"
                                        type="tel"
                                        value={data.phone_number}
                                        onChange={e => setData('phone_number', e.target.value)}
                                        required
                                    />
                                    {errors.phone_number && <p className="text-xs text-destructive">{errors.phone_number}</p>}
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-sm font-medium text-slate-500 dark:text-slate-400 ml-1">Delivery Address</label>
                                    <textarea
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all text-slate-900 dark:text-white"
                                        placeholder="Plot No. 42, Industrial Area Phase 2..."
                                        rows={3}
                                        value={data.shipping_address}
                                        onChange={e => setData('shipping_address', e.target.value)}
                                        required
                                    ></textarea>
                                    {errors.shipping_address && <p className="text-xs text-destructive">{errors.shipping_address}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-500 dark:text-slate-400 ml-1">Pincode</label>
                                    <input
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all text-slate-900 dark:text-white"
                                        placeholder="400001"
                                        type="text"
                                        value={data.pincode}
                                        onChange={e => setData('pincode', e.target.value)}
                                        required
                                    />
                                    {errors.pincode && <p className="text-xs text-destructive">{errors.pincode}</p>}
                                </div>
                            </div>

                            <hr className="border-slate-100 dark:border-slate-800" />

                            <div className="space-y-4">
                                <h3 className="font-bold text-lg text-slate-900 dark:text-white">Payment Method</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        { id: 'cod', label: 'COD (Cash on Delivery)', icon: 'account_balance_wallet' },
                                        { id: 'nb', label: 'Net Banking', icon: 'payments' },
                                        { id: 'card', label: 'Credit / Debit Card', icon: 'credit_card' },
                                        { id: 'emi', label: 'EMI / Financing', icon: 'schedule' },
                                    ].map((method) => (
                                        <label
                                            key={method.id}
                                            className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
                                                data.payment_method === method.id ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-700'
                                            }`}
                                        >
                                            <input
                                                className="w-4 h-4 text-primary focus:ring-primary border-slate-300"
                                                name="payment"
                                                type="radio"
                                                value={method.id}
                                                checked={data.payment_method === method.id}
                                                onChange={e => setData('payment_method', e.target.value)}
                                            />
                                            <div className="flex items-center gap-3 text-slate-900 dark:text-white">
                                                <span className="material-symbols-outlined text-slate-500">{method.icon}</span>
                                                <span className="font-medium text-sm">{method.label}</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                                {errors.payment_method && <p className="text-xs text-destructive">{errors.payment_method}</p>}
                            </div>
                        </section>
                    </div>

                    <div className="lg:col-span-4">
                        <div className="sticky top-28 space-y-6">
                            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 shadow-lg">
                                <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Order Summary</h3>
                                <div className="space-y-4 text-sm mb-6">
                                    <div className="flex justify-between text-slate-500 dark:text-slate-400">
                                        <span>Subtotal</span>
                                        <span>₹{subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-500 dark:text-slate-400">
                                        <span>Shipping</span>
                                        <span className="text-emerald-600 font-bold">FREE</span>
                                    </div>
                                    <div className="flex justify-between text-slate-500 dark:text-slate-400">
                                        <span>GST (18%)</span>
                                        <span>₹{gst.toLocaleString()}</span>
                                    </div>
                                    <hr className="border-slate-100 dark:border-slate-800" />
                                    <div className="flex justify-between font-bold text-xl text-slate-900 dark:text-white pt-2">
                                        <span>Total</span>
                                        <span>₹{total.toLocaleString()}</span>
                                    </div>
                                </div>
                                <button
                                    disabled={processing || cartItems.length === 0}
                                    type="submit"
                                    className="w-full bg-primary text-white py-4 rounded-lg font-bold text-lg shadow-md hover:brightness-110 transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Processing...' : 'Place Order'}
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
                        </div>
                    </div>
                </form>
            </main>

            <SiteFooter />
        </div>
    );
}
