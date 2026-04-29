import React from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { index as productsIndex, create, edit, destroy } from '@/routes/products/index';
import { price as adminProductsPrice } from '@/routes/admin/products/index';

export default function ProductListing({ products, categories }: { products: any[]; categories: any[] }) {
    const { auth } = usePage().props as any;
    const userRole = auth.user?.role;
    const isAdmin = userRole === 'admin';
    const isSeller = userRole === 'shopkeeper';
    const isUser = !isAdmin && !isSeller;

    const [search, setSearch] = React.useState('');
    const [activeCategory, setActiveCategory] = React.useState<string | null>(null);
    const [editingPrice, setEditingPrice] = React.useState<number | null>(null);
    const [newPrice, setNewPrice] = React.useState('');

    const filtered = products.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
        const matchCat = activeCategory ? p.category?.name === activeCategory : true;
        return matchSearch && matchCat;
    });

    const handleDelete = (id: number) => {
        if (confirm('Remove this product from the marketplace?')) {
            router.delete(destroy({ product: id }).url());
        }
    };

    const handlePriceUpdate = (productId: number) => {
        router.patch(adminProductsPrice({ product: productId }).url(), { price: newPrice }, {
            onSuccess: () => { setEditingPrice(null); setNewPrice(''); },
        });
    };

    const handleAddToCart = (product: any) => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existing = cart.find((i: any) => i.id === product.id);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ id: product.id, name: product.name, price: product.price, image_url: product.image_url, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        window.dispatchEvent(new Event('cart-updated'));
        alert(`${product.name} added to cart!`);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            <Head title={isAdmin ? 'All Products — Admin' : isSeller ? 'My Products' : 'Marketplace'} />

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                        {isAdmin ? 'Platform Products' : isSeller ? 'My Products' : 'Marketplace'}
                    </h2>
                    <p className="text-sm text-slate-500 mt-0.5">
                        {isAdmin
                            ? 'Manage all products and set global prices'
                            : isSeller
                            ? 'Your listed products — manage stock and inventory'
                            : 'Browse and purchase from our curated marketplace'}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
                        <input
                            className="pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-primary outline-none w-64"
                            placeholder="Search products…"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                    {(isAdmin || isSeller) && (
                        <Link
                            href={create.url()}
                            className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:brightness-110 transition-all shadow-lg shadow-primary/20"
                        >
                            <span className="material-symbols-outlined text-[18px]">add</span>
                            {isAdmin ? 'Add Product' : 'List Product'}
                        </Link>
                    )}
                </div>
            </div>

            {/* Category Chips */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                <button
                    onClick={() => setActiveCategory(null)}
                    className={`whitespace-nowrap px-5 py-2 rounded-full font-bold text-sm transition-all ${!activeCategory ? 'bg-primary text-white shadow-md' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-primary/40 hover:text-primary'}`}
                >
                    All
                </button>
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.name)}
                        className={`whitespace-nowrap px-5 py-2 rounded-full font-bold text-sm transition-all ${activeCategory === cat.name ? 'bg-primary text-white shadow-md' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-primary/40 hover:text-primary'}`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            {/* ── User: card grid ── */}
            {isUser && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filtered.map(product => (
                        <div key={product.id} className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <img
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    src={product.image_url}
                                    alt={product.name}
                                />
                                <span className={`absolute top-3 right-3 text-white text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-wider ${product.stock > 0 ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </div>
                            <div className="p-4 flex flex-col flex-grow">
                                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">{product.category?.name}</p>
                                <h3 className="font-bold text-slate-900 dark:text-white mt-1 line-clamp-1">{product.name}</h3>
                                <p className="text-xs text-slate-500 mt-1 line-clamp-2 flex-grow">{product.description}</p>
                                <div className="flex items-center justify-between mt-4">
                                    <span className="text-xl font-black text-slate-900 dark:text-white">₹{Number(product.price).toLocaleString()}</span>
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        disabled={product.stock === 0}
                                        className="bg-primary text-white p-2.5 rounded-xl hover:brightness-110 transition-all shadow-md disabled:opacity-40"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {filtered.length === 0 && (
                        <div className="col-span-full py-20 text-center opacity-20">
                            <span className="material-symbols-outlined text-6xl">inventory_2</span>
                            <p className="font-bold mt-2">No products found</p>
                        </div>
                    )}
                </div>
            )}

            {/* ── Admin & Seller: management table ── */}
            {(isAdmin || isSeller) && (
                <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                                <tr>
                                    <th className="px-6 py-4">Product</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">Price</th>
                                    <th className="px-6 py-4">Stock</th>
                                    {isAdmin && <th className="px-6 py-4">Seller</th>}
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {filtered.map(product => (
                                    <tr key={product.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 flex-shrink-0">
                                                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900 dark:text-white line-clamp-1 text-sm">{product.name}</p>
                                                    <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{product.description}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{product.category?.name}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {isAdmin && editingPrice === product.id ? (
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="number"
                                                        value={newPrice}
                                                        onChange={e => setNewPrice(e.target.value)}
                                                        className="w-24 text-sm border border-slate-300 dark:border-slate-600 rounded-lg px-2 py-1 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary"
                                                        autoFocus
                                                    />
                                                    <button onClick={() => handlePriceUpdate(product.id)} className="text-emerald-600 hover:text-emerald-700">
                                                        <span className="material-symbols-outlined text-[18px]">check</span>
                                                    </button>
                                                    <button onClick={() => setEditingPrice(null)} className="text-slate-400 hover:text-slate-600">
                                                        <span className="material-symbols-outlined text-[18px]">close</span>
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <span className="font-black text-slate-900 dark:text-white text-sm">₹{Number(product.price).toLocaleString()}</span>
                                                    {isAdmin && (
                                                        <button
                                                            onClick={() => { setEditingPrice(product.id); setNewPrice(String(product.price)); }}
                                                            className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-primary transition-all"
                                                            title="Edit price"
                                                        >
                                                            <span className="material-symbols-outlined text-[14px]">edit</span>
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${product.stock > 10 ? 'bg-emerald-100 text-emerald-700' : product.stock > 0 ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>
                                                {product.stock > 10 ? `${product.stock} In Stock` : product.stock > 0 ? `Low: ${product.stock}` : 'Out of Stock'}
                                            </span>
                                        </td>
                                        {isAdmin && (
                                            <td className="px-6 py-4 text-xs text-slate-500">{product.vendor_name || '—'}</td>
                                        )}
                                        <td className="px-6 py-4">
                                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${product.stock > 0 ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>
                                                {product.stock > 0 ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-1">
                                                <Link
                                                    href={edit({ product: product.id }).url()}
                                                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-primary transition-all"
                                                    title="Edit"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">edit</span>
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="p-2 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg text-slate-400 hover:text-rose-500 transition-all"
                                                    title="Delete"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filtered.length === 0 && (
                                    <tr>
                                        <td colSpan={8} className="px-6 py-20 text-center">
                                            <div className="flex flex-col items-center gap-3 opacity-20">
                                                <span className="material-symbols-outlined text-6xl">inventory_2</span>
                                                <p className="font-bold">No products found</p>
                                                {isSeller && <p className="text-sm">Start by listing your first product!</p>}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}
        </div>
    );
}

ProductListing.layout = (page: React.ReactNode) => {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Products', href: productsIndex.url() },
    ];
    return <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>;
};
