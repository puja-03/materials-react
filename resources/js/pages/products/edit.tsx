import React from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number | string;
    stock: number;
    category_id: number | string;
    image_url: string;
    user_id: number;
}

export default function EditProduct({ product, categories }: { product: Product; categories: any[] }) {
    const { auth } = usePage().props as any;
    const isAdmin = auth.user.role === 'admin';

    const { data, setData, put, processing, errors } = useForm({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category_id: product.category_id,
        image_url: product.image_url,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('products.update', product.id));
    };

    const inputClass =
        'w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-primary outline-none transition-all text-slate-900 dark:text-white font-medium text-sm';
    const labelClass = 'text-xs font-black text-slate-500 uppercase tracking-wider mb-1.5 block';

    return (
        <div className="p-6 max-w-4xl mx-auto animate-in fade-in duration-500">
            <Head title={`Edit ${product.name}`} />

            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden">
                {/* Banner */}
                <div className="bg-primary p-8 text-white relative overflow-hidden">
                    <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="relative z-10 flex items-start justify-between">
                        <div>
                            <p className="text-[11px] font-black uppercase tracking-widest text-primary-foreground/60 mb-1">
                                {isAdmin ? 'Admin · Price Control' : 'Seller · Inventory'}
                            </p>
                            <h1 className="text-3xl font-black">Edit Product</h1>
                            <p className="text-primary-foreground/70 mt-1 text-sm">
                                {isAdmin ? 'You can change the price — it updates globally for all sellers.' : 'Update stock and details. Price is controlled by admin.'}
                            </p>
                        </div>
                        {isAdmin && (
                            <div className="flex items-center gap-2 bg-white/20 border border-white/20 px-3 py-1.5 rounded-full">
                                <span className="material-symbols-outlined text-[16px]">admin_panel_settings</span>
                                <span className="text-[11px] font-black uppercase tracking-wide">Admin Mode</span>
                            </div>
                        )}
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {/* Live image preview */}
                    {data.image_url && (
                        <div className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                            <img
                                src={data.image_url as string}
                                alt="Preview"
                                className="w-24 h-24 rounded-xl object-cover border border-slate-200 dark:border-slate-700 flex-shrink-0"
                                onError={e => (e.currentTarget.style.display = 'none')}
                            />
                            <div>
                                <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-1">Current Image</p>
                                <p className="text-sm text-slate-500 break-all line-clamp-3">{data.image_url}</p>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="md:col-span-2">
                            <label className={labelClass}>Product Name *</label>
                            <input
                                className={inputClass}
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                required
                            />
                            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                        </div>

                        {/* Category */}
                        <div>
                            <label className={labelClass}>Category *</label>
                            <select
                                className={inputClass + ' cursor-pointer'}
                                value={data.category_id}
                                onChange={e => setData('category_id', e.target.value)}
                                required
                            >
                                <option value="">Select a category</option>
                                {categories.map(c => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                            {errors.category_id && <p className="text-xs text-red-500 mt-1">{errors.category_id}</p>}
                        </div>

                        {/* Price — admin editable, sellers read-only */}
                        <div>
                            <label className={labelClass}>
                                Price (₹){' '}
                                {!isAdmin && (
                                    <span className="text-amber-500 normal-case font-normal ml-1">(Admin controlled)</span>
                                )}
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">₹</span>
                                <input
                                    className={inputClass + ' pl-7'}
                                    placeholder="0.00"
                                    type="number"
                                    step="0.01"
                                    value={data.price as number}
                                    onChange={e => setData('price', e.target.value)}
                                    readOnly={!isAdmin}
                                    style={!isAdmin ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
                                />
                            </div>
                            {isAdmin && (
                                <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-1 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">warning</span>
                                    Changing price affects all marketplace listings.
                                </p>
                            )}
                            {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
                        </div>

                        {/* Stock */}
                        <div>
                            <label className={labelClass}>Stock Quantity *</label>
                            <input
                                className={inputClass}
                                type="number"
                                min="0"
                                value={data.stock}
                                onChange={e => setData('stock', parseInt(e.target.value) || 0)}
                                required
                            />
                            {data.stock === 0 && (
                                <p className="text-[10px] text-rose-500 mt-1 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">error</span>
                                    Setting stock to 0 marks this product as out of stock.
                                </p>
                            )}
                            {errors.stock && <p className="text-xs text-red-500 mt-1">{errors.stock}</p>}
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className={labelClass}>Image URL</label>
                            <input
                                className={inputClass}
                                type="url"
                                placeholder="https://…"
                                value={data.image_url as string}
                                onChange={e => setData('image_url', e.target.value)}
                            />
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label className={labelClass}>Description *</label>
                            <textarea
                                className={inputClass}
                                rows={4}
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                required
                            />
                            {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
                        </div>
                    </div>

                    <div className="flex gap-4 pt-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex-grow bg-primary text-white py-4 rounded-xl font-black text-sm shadow-lg hover:brightness-110 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined text-[20px]">save</span>
                            {processing ? 'Saving…' : 'Save Changes'}
                        </button>
                        <Link
                            href={route('products.index')}
                            className="px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

EditProduct.layout = (page: React.ReactNode) => {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Products', href: route('products.index') },
        { title: 'Edit Product', href: '#' },
    ];
    return <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>;
};
