import React from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

export default function CreateProduct({ categories }: { categories: any[] }) {
    const { auth } = usePage().props as any;
    const isAdmin = auth.user.role === 'admin';

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        price: '',
        stock: '',
        category_id: '',
        image_url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('products.store'));
    };

    const inputClass = "w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-primary outline-none transition-all text-slate-900 dark:text-white font-medium text-sm";
    const labelClass = "text-xs font-black text-slate-500 uppercase tracking-wider mb-1.5 block";

    return (
        <div className="p-6 max-w-4xl mx-auto animate-in fade-in duration-500">
            <Head title="Add New Product" />

            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden">
                {/* Header Banner */}
                <div className="bg-slate-900 dark:bg-slate-950 p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-72 h-72 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
                    <div className="relative z-10">
                        <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">
                            {isAdmin ? 'Admin · Product Management' : 'Seller · My Products'}
                        </p>
                        <h1 className="text-3xl font-black">List New Product</h1>
                        <p className="text-slate-400 mt-1 text-sm">
                            {isAdmin
                                ? 'Add a product to the platform. You can set the price directly.'
                                : 'List your material in the marketplace. Price is set by the platform admin.'}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {/* Live image preview */}
                    {data.image_url && (
                        <div className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                            <img src={data.image_url} alt="Preview" className="w-24 h-24 rounded-xl object-cover border border-slate-200 dark:border-slate-700" onError={e => (e.currentTarget.style.display = 'none')} />
                            <div className="flex-1">
                                <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-1">Image Preview</p>
                                <p className="text-sm text-slate-600 dark:text-slate-400 break-all line-clamp-2">{data.image_url}</p>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="md:col-span-2">
                            <label className={labelClass}>Product Name *</label>
                            <input className={inputClass} placeholder="e.g. UltraTech Cement 50kg" type="text" value={data.name} onChange={e => setData('name', e.target.value)} required />
                            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                        </div>

                        {/* Category */}
                        <div>
                            <label className={labelClass}>Category *</label>
                            <select className={inputClass + ' cursor-pointer'} value={data.category_id} onChange={e => setData('category_id', e.target.value)} required>
                                <option value="">Select a category</option>
                                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                            {errors.category_id && <p className="text-xs text-red-500 mt-1">{errors.category_id}</p>}
                        </div>

                        {/* Price — only admin can set on create */}
                        <div>
                            <label className={labelClass}>
                                Price (₹) {!isAdmin && <span className="text-amber-500 normal-case font-normal">(Set by admin)</span>}
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">₹</span>
                                <input
                                    className={inputClass + ' pl-7'}
                                    placeholder="0.00"
                                    type="number"
                                    step="0.01"
                                    value={data.price}
                                    onChange={e => setData('price', e.target.value)}
                                    required
                                    readOnly={!isAdmin}
                                    style={!isAdmin ? { backgroundColor: 'var(--color-slate-100)', cursor: 'not-allowed', opacity: 0.7 } : {}}
                                />
                            </div>
                            {!isAdmin && <p className="text-[10px] text-slate-400 mt-1">Contact admin to adjust product pricing.</p>}
                            {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
                        </div>

                        {/* Stock */}
                        <div>
                            <label className={labelClass}>Stock Quantity *</label>
                            <input className={inputClass} placeholder="Available quantity" type="number" min="0" value={data.stock} onChange={e => setData('stock', e.target.value)} required />
                            {errors.stock && <p className="text-xs text-red-500 mt-1">{errors.stock}</p>}
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className={labelClass}>Image URL</label>
                            <input className={inputClass} placeholder="https://…" type="url" value={data.image_url} onChange={e => setData('image_url', e.target.value)} />
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label className={labelClass}>Description *</label>
                            <textarea className={inputClass} placeholder="Detail specifications, grade, application…" rows={4} value={data.description} onChange={e => setData('description', e.target.value)} required />
                            {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
                        </div>
                    </div>

                    <div className="flex gap-4 pt-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex-grow bg-primary text-white py-4 rounded-xl font-black text-sm shadow-lg hover:brightness-110 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
                            {processing ? 'Publishing…' : 'Publish Product'}
                        </button>
                        <Link
                            href={route('products.index')}
                            className="px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

CreateProduct.layout = (page: React.ReactNode) => {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Products', href: route('products.index') },
        { title: 'Add New', href: '#' },
    ];
    return <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>;
};
