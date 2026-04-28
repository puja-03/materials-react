import { Head, Link, useForm } from '@inertiajs/react';
import SiteNavbar from '@/components/site-navbar';
import SiteFooter from '@/components/site-footer';

export default function CreateProduct({ categories }: { categories: any[] }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        price: '',
        stock: '',
        category_id: '',
        image_url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('products.store'));
    };

    return (
        <div className="flex flex-col min-h-screen bg-surface text-on-surface font-sans">
            <Head title="Add New Product - Materials Market" />
            <SiteNavbar />

            <main className="max-w-4xl mx-auto px-6 py-12 w-full flex-grow">
                <Link
                    href={route('dashboard')}
                    className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all mb-8"
                >
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    Back to Dashboard
                </Link>

                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden">
                    <div className="bg-slate-900 p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
                        <h1 className="text-3xl font-bold relative z-10">Add New Product</h1>
                        <p className="text-slate-400 mt-2 relative z-10">List your material in the marketplace.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Product Name */}
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Product Name</label>
                                <input
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary outline-none transition-all text-slate-900 dark:text-white font-medium"
                                    placeholder="e.g. UltraTech Cement 50kg"
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    required
                                />
                                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                            </div>

                            {/* Category */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Category</label>
                                <select
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary outline-none transition-all text-slate-900 dark:text-white font-medium appearance-none cursor-pointer"
                                    value={data.category_id}
                                    onChange={e => setData('category_id', e.target.value)}
                                    required
                                >
                                    <option value="">Select a category</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                                {errors.category_id && <p className="text-xs text-destructive mt-1">{errors.category_id}</p>}
                            </div>

                            {/* Price */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Price (₹)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                                    <input
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-4 pl-8 focus:ring-2 focus:ring-primary outline-none transition-all text-slate-900 dark:text-white font-medium"
                                        placeholder="0.00"
                                        type="number"
                                        step="0.01"
                                        value={data.price}
                                        onChange={e => setData('price', e.target.value)}
                                        required
                                    />
                                </div>
                                {errors.price && <p className="text-xs text-destructive mt-1">{errors.price}</p>}
                            </div>

                            {/* Stock */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Stock Level</label>
                                <input
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary outline-none transition-all text-slate-900 dark:text-white font-medium"
                                    placeholder="Available quantity"
                                    type="number"
                                    value={data.stock}
                                    onChange={e => setData('stock', e.target.value)}
                                    required
                                />
                                {errors.stock && <p className="text-xs text-destructive mt-1">{errors.stock}</p>}
                            </div>

                            {/* Image URL */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Image URL</label>
                                <input
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary outline-none transition-all text-slate-900 dark:text-white font-medium text-sm"
                                    placeholder="https://example.com/image.jpg"
                                    type="url"
                                    value={data.image_url}
                                    onChange={e => setData('image_url', e.target.value)}
                                />
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Description</label>
                                <textarea
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary outline-none transition-all text-slate-900 dark:text-white font-medium"
                                    placeholder="Detail the specifications, grade, and application..."
                                    rows={4}
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    required
                                ></textarea>
                                {errors.description && <p className="text-xs text-destructive mt-1">{errors.description}</p>}
                            </div>
                        </div>

                        <div className="pt-6 flex gap-4">
                            <button
                                disabled={processing}
                                type="submit"
                                className="flex-grow bg-primary text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:brightness-110 transform hover:-translate-y-1 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                            >
                                {processing ? 'Publishing...' : 'Publish Product'}
                                <span className="material-symbols-outlined">rocket_launch</span>
                            </button>
                            <Link
                                href={route('dashboard')}
                                className="px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </main>

            <SiteFooter />
        </div>
    );
}
