import { Head, Link } from '@inertiajs/react';
import SiteNavbar from '@/components/site-navbar';
import SiteFooter from '@/components/site-footer';

export default function ProductListing({ products, categories }: { products: any[], categories: any[] }) {
    const displayCategories = [
        { name: 'All Materials', active: true },
        ...categories.map(c => ({ name: c.name, active: false }))
    ];

    const displayProducts = products.map(p => ({
        id: p.id,
        name: p.name,
        desc: p.description,
        price: `₹${p.price.toLocaleString()}`,
        status: 'In Stock', // Defaulting for now
        statusColor: 'bg-emerald-500',
        img: p.image_url
    }));

    return (
        <div className="flex flex-col min-h-screen bg-surface text-on-surface">
            <Head title="Products - Materials Market" />
            <SiteNavbar />

            <main className="max-w-screen-2xl mx-auto px-6 py-8 pb-32 w-full">
                {/* Search for Mobile */}
                <div className="sm:hidden mb-6">
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                        <input
                            className="w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-3 pl-10 pr-10 shadow-sm"
                            placeholder="Search hardware..."
                            type="text"
                        />
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">photo_camera</span>
                    </div>
                </div>

                {/* Category Chips */}
                <div className="mb-8 overflow-hidden">
                    <div className="flex overflow-x-auto no-scrollbar gap-3 pb-2">
                        {displayCategories.map((cat) => (
                            <button
                                key={cat.name}
                                className={`whitespace-nowrap px-6 py-2 rounded-full font-medium text-sm transition-all active:scale-95 shadow-sm ${
                                    cat.active
                                        ? 'bg-primary text-white shadow-md'
                                        : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-primary/30 hover:text-primary'
                                }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {displayProducts.map((product) => (
                        <div
                            key={product.id}
                            className="group bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
                        >
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <img
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    src={product.img}
                                    alt={product.name}
                                />
                                <span className={`absolute top-3 right-3 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${product.statusColor}`}>
                                    {product.status}
                                </span>
                            </div>
                            <div className="p-4 flex flex-col flex-grow">
                                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 line-clamp-1">{product.name}</h3>
                                <div className="mt-auto">
                                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">{product.desc}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xl font-bold text-slate-900 dark:text-white">{product.price}</span>
                                        <button className="bg-primary text-white p-2 rounded-lg hover:brightness-110 transition-all flex items-center justify-center shadow-md">
                                            <span className="material-symbols-outlined">add_shopping_cart</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <SiteFooter />
        </div>
    );
}
