import { Head, Link } from '@inertiajs/react';
import SiteNavbar from '@/components/site-navbar';
import SiteFooter from '@/components/site-footer';

export default function Welcome({ featuredProducts }: { featuredProducts: any[] }) {
    return (
        <div className="flex flex-col min-h-screen bg-surface text-on-surface">
            <Head title="Materials Market - India's First Direct Hardware Marketplace" />

            <SiteNavbar />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative overflow-hidden pt-12 pb-12 md:pt-24 md:pb-24 px-6">
                    <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row items-center gap-12">
                        <div className="flex-1 text-center lg:text-left z-10">
                            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-4">Direct Industrial Procurement</span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                                India's First Hardware Marketplace <span className="text-primary">Without the Middleman</span>
                            </h1>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto lg:mx-0">
                                Search handles, locks, screws & fittings directly from manufacturers and trusted shops. No hidden fees, no brokers—your shop contacts stay private.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link
                                    href={route('products.index')}
                                    className="flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-semibold text-lg rounded-xl hover:shadow-lg transition-all active:scale-95"
                                >
                                    <span className="material-symbols-outlined">shopping_basket</span>
                                    Explore Materials
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-lg rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all active:scale-95 shadow-sm"
                                >
                                    <span className="material-symbols-outlined">storefront</span>
                                    Register Your Shop
                                </Link>
                            </div>
                        </div>
                        <div className="flex-1 relative">
                            <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-60"></div>
                            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-tertiary/10 rounded-full blur-2xl opacity-40"></div>
                            <img
                                alt="Hardware Materials"
                                className="w-full h-auto rounded-3xl shadow-2xl relative z-10 border-4 border-white dark:border-slate-800"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuATij9lY0He_yefwIlZDr9y5bLN2VdBUYOdTdm9IUXzcRb-yFfl0sMT1DvIpNVMCyMjFaRhsBf59GA4JY3p6OhTBz9Qv8tIDHTZjA7SGYQSR5JSHrdRbaGXYWU12wECBsm1CpiyuFOTfIIBEmALPvZo3N62pNCFXXSJBzEFabl6a8b8T_mhXhqnscQ_NiTOT2D6Ecqy9I1KjxEj14tNzw2Sq5QAj4_fbsAjjrCtZVM187KWOvHiApDDDgLIQwzHmrnBVz4EdQz_1iB_"
                            />
                        </div>
                    </div>
                </section>

                {/* Problem-Solution Section */}
                <section className="py-16 md:py-24 px-6 bg-slate-100/50 dark:bg-slate-900/50">
                    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
                        {/* Problem Card */}
                        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-md group hover:border-destructive/20 transition-all">
                            <div className="w-12 h-12 bg-destructive/10 text-destructive flex items-center justify-center rounded-xl mb-6">
                                <span className="material-symbols-outlined">timer_off</span>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Problem - Wasting Time</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Endless phone calls, waiting for quotes, and visiting multiple vendors just to compare prices. Middlemen take a cut, and you lose valuable project hours sourcing basic fittings.
                            </p>
                        </div>
                        {/* Solution Card */}
                        <div className="bg-primary text-white p-8 rounded-2xl shadow-xl transition-all hover:scale-[1.02]">
                            <div className="w-12 h-12 bg-white/20 flex items-center justify-center rounded-xl mb-6">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Solution - One App</h3>
                            <p className="opacity-90 leading-relaxed">
                                Access a direct marketplace where you see transparent pricing from thousands of verified shops. Order in seconds, track deliveries, and manage your entire hardware inventory from a single screen.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Featured Products Section */}
                <section className="py-16 md:py-24 px-6">
                    <div className="max-w-screen-2xl mx-auto">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Featured Materials</h2>
                                <p className="text-slate-500 mt-2">Latest arrivals from verified vendors</p>
                            </div>
                            <Link href={route('products.index')} className="text-primary font-bold hover:underline">View All Materials →</Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {featuredProducts.map((product) => (
                                <div key={product.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all group">
                                    <div className="relative aspect-square overflow-hidden">
                                        <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={product.image_url} alt={product.name} />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-2 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-lg text-[10px] font-black uppercase tracking-wider shadow-sm">{product.category?.name || 'Material'}</span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
                                        <p className="text-xs text-slate-500 mb-4 line-clamp-1">{product.description}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-black text-slate-900 dark:text-white">₹{parseFloat(product.price).toLocaleString()}</span>
                                            <Link href={route('products.index')} className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-all">
                                                <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="py-16 md:py-24 px-6 max-w-screen-2xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Industrial Power in Your Pocket</h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Everything you need to manage procurement and sales without the logistical headache.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Search 3 Ways */}
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-md hover:shadow-lg transition-all group">
                            <div className="text-primary mb-4 group-hover:scale-110 transition-transform"><span className="material-symbols-outlined text-4xl">search_insights</span></div>
                            <h4 className="text-lg font-bold mb-2 dark:text-white">Search 3 Ways</h4>
                            <p className="text-slate-600 dark:text-slate-400">Search by brand, category, or photo. Our AI identifies hardware fittings instantly from a single smartphone snap.</p>
                        </div>
                        {/* Private Marketplace */}
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-md hover:shadow-lg transition-all group">
                            <div className="text-primary mb-4 group-hover:scale-110 transition-transform"><span className="material-symbols-outlined text-4xl">lock_person</span></div>
                            <h4 className="text-lg font-bold mb-2 dark:text-white">Private Marketplace</h4>
                            <p className="text-slate-600 dark:text-slate-400">Maintain your vendor relationships. Shop contact details are only shared after a mutual match, protecting your trade secrets.</p>
                        </div>
                        {/* Auto Invoicing */}
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-md hover:shadow-lg transition-all group">
                            <div className="text-primary mb-4 group-hover:scale-110 transition-transform"><span className="material-symbols-outlined text-4xl">receipt_long</span></div>
                            <h4 className="text-lg font-bold mb-2 dark:text-white">Auto Invoicing</h4>
                            <p className="text-slate-600 dark:text-slate-400">Generate professional GST-compliant invoices automatically. Sync directly with your accounting software for seamless filing.</p>
                        </div>
                        {/* Profit Dashboard */}
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-md hover:shadow-lg transition-all group">
                            <div className="text-primary mb-4 group-hover:scale-110 transition-transform"><span className="material-symbols-outlined text-4xl">analytics</span></div>
                            <h4 className="text-lg font-bold mb-2 dark:text-white">Profit Dashboard</h4>
                            <p className="text-slate-600 dark:text-slate-400">Visualize your margins in real-time. See which materials are costing you more and identify bulk-saving opportunities.</p>
                        </div>
                        {/* Multi-Role Support */}
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-md hover:shadow-lg transition-all group">
                            <div className="text-primary mb-4 group-hover:scale-110 transition-transform"><span className="material-symbols-outlined text-4xl">groups</span></div>
                            <h4 className="text-lg font-bold mb-2 dark:text-white">Multi-Role Support</h4>
                            <p className="text-slate-600 dark:text-slate-400">Separate logins for owners, managers, and delivery staff. Control permissions and track activity across your team.</p>
                        </div>
                        {/* Subscription */}
                        <div className="bg-primary p-6 rounded-2xl shadow-xl text-white group hover:brightness-110 transition-all">
                            <div className="text-white mb-4 group-hover:scale-110 transition-transform"><span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span></div>
                            <h4 className="text-lg font-bold mb-2 text-white">₹1999 Subscription</h4>
                            <p className="opacity-90">All-inclusive annual access. Zero commission on orders. We make money from your success, not from taking a cut of your sales.</p>
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="py-16 md:py-24 px-6 bg-slate-100 dark:bg-slate-900/80">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">How It Works</h2>
                            <p className="text-slate-600 dark:text-slate-400">Four simple steps to industrial-grade procurement efficiency.</p>
                        </div>
                        <div className="relative flex flex-col md:flex-row justify-between gap-8">
                            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-300 dark:bg-slate-700 z-0"></div>
                            {/* Step 1 */}
                            <div className="relative z-10 flex flex-col items-center text-center flex-1">
                                <div className="w-16 h-16 bg-white dark:bg-slate-800 border-4 border-primary rounded-full flex items-center justify-center text-primary font-bold text-xl mb-6 shadow-md">1</div>
                                <h5 className="text-lg font-bold mb-2 dark:text-white">Shop Uploads</h5>
                                <p className="text-sm text-slate-600 dark:text-slate-400 px-4">Vendors list their inventory, brands, and current stock levels directly.</p>
                            </div>
                            {/* Step 2 */}
                            <div className="relative z-10 flex flex-col items-center text-center flex-1">
                                <div className="w-16 h-16 bg-white dark:bg-slate-800 border-4 border-primary rounded-full flex items-center justify-center text-primary font-bold text-xl mb-6 shadow-md">2</div>
                                <h5 className="text-lg font-bold mb-2 dark:text-white">Client Searches</h5>
                                <p className="text-sm text-slate-600 dark:text-slate-400 px-4">Contractors search for specific fittings by brand or spec-sheet requirements.</p>
                            </div>
                            {/* Step 3 */}
                            <div className="relative z-10 flex flex-col items-center text-center flex-1">
                                <div className="w-16 h-16 bg-white dark:bg-slate-800 border-4 border-primary rounded-full flex items-center justify-center text-primary font-bold text-xl mb-6 shadow-md">3</div>
                                <h5 className="text-lg font-bold mb-2 dark:text-white">Order Placed</h5>
                                <p className="text-sm text-slate-600 dark:text-slate-400 px-4">Buyer selects the best offer and confirms the order through the app.</p>
                            </div>
                            {/* Step 4 */}
                            <div className="relative z-10 flex flex-col items-center text-center flex-1">
                                <div className="w-16 h-16 bg-primary border-4 border-white dark:border-slate-800 rounded-full flex items-center justify-center text-white font-bold text-xl mb-6 shadow-md">4</div>
                                <h5 className="text-lg font-bold mb-2 dark:text-white">App Routes Order</h5>
                                <p className="text-sm text-slate-600 dark:text-slate-400 px-4">Order is routed to the nearest vendor for same-day logistics.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 md:py-24 px-6">
                    <div className="max-w-5xl mx-auto bg-slate-900 rounded-[2rem] p-12 md:p-24 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"></div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10">Ready to Cut the Middleman?</h2>
                        <p className="text-slate-400 text-lg mb-12 relative z-10 max-w-xl mx-auto">Join 5,000+ shops and contractors who are already scaling their businesses with Materials Market.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                            <Link href={route('register')} className="px-8 py-3 bg-white text-slate-900 font-bold rounded-lg hover:bg-slate-100 transition-colors">Get Started Now</Link>
                            <button className="px-8 py-3 border border-slate-700 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors">Talk to Sales</button>
                        </div>
                    </div>
                </section>
            </main>

            <SiteFooter />
        </div>
    );
}
