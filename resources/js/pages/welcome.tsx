import { Head, Link } from '@inertiajs/react';
import SiteNavbar from '@/components/site-navbar';
import SiteFooter from '@/components/site-footer';
import { register } from '@/routes';
import { index as productsIndex } from '@/routes/products/index';

export default function Welcome({ featuredProducts }: { featuredProducts: any[] }) {
    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white selection:bg-indigo-100 dark:selection:bg-indigo-500/30">
            <Head title="Materials Market — India's Direct Hardware Protocol" />

            <SiteNavbar />

            <main className="flex-grow">
                {/* Hero Node */}
                <section className="relative overflow-hidden pt-20 pb-20 md:pt-32 md:pb-32 px-6">
                    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
                        <div className="flex-1 text-center lg:text-left z-10 animate-in fade-in slide-in-from-left-8 duration-1000">
                            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                                <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-500 animate-pulse"></span>
                                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">Protocol: DIRECT_INDUSTRIAL_SOURCE</span>
                            </div>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-slate-900 dark:text-white mb-8 leading-[1.1] tracking-tighter">
                                Industrial Sourcing <span className="text-indigo-600 dark:text-indigo-400">Without Friction.</span>
                            </h1>
                            <p className="text-xl text-slate-500 dark:text-slate-400 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                                Eliminate broker overhead. Source hardware fittings, TMT steel, and structural materials directly from verified manufacturing nodes and shop networks.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                                <Link
                                    href={productsIndex.url()}
                                    className="flex items-center justify-center gap-3 px-10 py-5 bg-indigo-600 text-white font-bold text-[11px] uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-indigo-600/20 hover:scale-105 active:scale-95 transition-all group"
                                >
                                    <span className="material-symbols-outlined text-[20px]">explore</span>
                                    Browse Materials
                                </Link>
                                <Link
                                    href={register.url()}
                                    className="flex items-center justify-center gap-3 px-10 py-5 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-[11px] uppercase tracking-[0.2em] rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 shadow-sm"
                                >
                                    <span className="material-symbols-outlined text-[20px]">hub</span>
                                    Node Registration
                                </Link>
                            </div>
                        </div>
                        <div className="flex-1 relative animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
                            <div className="absolute -top-20 -right-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] opacity-60"></div>
                            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] opacity-40"></div>
                            <div className="relative z-10 p-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-100 dark:border-slate-800 rounded-[3rem] shadow-2xl overflow-hidden">
                                <img
                                    alt="Hardware Materials"
                                    className="w-full h-auto rounded-[2.5rem] shadow-lg grayscale hover:grayscale-0 transition-all duration-700 hover:scale-[1.02]"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuATij9lY0He_yefwIlZDr9y5bLN2VdBUYOdTdm9IUXzcRb-yFfl0sMT1DvIpNVMCyMjFaRhsBf59GA4JY3p6OhTBz9Qv8tIDHTZjA7SGYQSR5JSHrdRbaGXYWU12wECBsm1CpiyuFOTfIIBEmALPvZo3N62pNCFXXSJBzEFabl6a8b8T_mhXhqnscQ_NiTOT2D6Ecqy9I1KjxEj14tNzw2Sq5QAj4_fbsAjjrCtZVM187KWOvHiApDDDgLIQwzHmrnBVz4EdQz_1iB_"
                                />
                                <div className="absolute bottom-10 left-10 right-10 bg-slate-900/90 backdrop-blur-md p-6 rounded-[2rem] border border-white/10 shadow-2xl">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Live Asset Stream</p>
                                            <p className="text-white font-semibold text-sm">Industrial TMT Reinforcement</p>
                                        </div>
                                        <div className="text-emerald-400 flex items-center gap-1 font-bold text-xs">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                            IN_STOCK
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Conflict/Resolution Stream */}
                <section className="py-24 md:py-32 px-6 bg-slate-50/50 dark:bg-slate-900/30">
                    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
                        <div className="bg-white dark:bg-slate-900 p-12 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm group hover:border-rose-200 dark:hover:border-rose-900/50 transition-all relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-rose-50 dark:bg-rose-500/10 text-rose-500 border border-rose-100 dark:border-rose-900/50 flex items-center justify-center rounded-2xl mb-8 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-[32px]">warning</span>
                                </div>
                                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">The Friction Ledger</h3>
                                <h4 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">Fragmented Sourcing & Opaque Pricing</h4>
                                <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                                    Project delays caused by vendor hunting, broker commissions, and the manual comparison of non-standardized quotes. Hidden markups drain industrial liquidity.
                                </p>
                            </div>
                            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-rose-500/5 rounded-full blur-[80px]"></div>
                        </div>
                        
                        <div className="bg-indigo-600 p-12 rounded-[2.5rem] shadow-2xl shadow-indigo-600/20 transition-all hover:scale-[1.01] relative overflow-hidden group">
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-white/10 text-white border border-white/20 flex items-center justify-center rounded-2xl mb-8 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-[32px]">bolt</span>
                                </div>
                                <h3 className="text-[10px] font-bold text-indigo-200 uppercase tracking-[0.2em] mb-4">The Unified Protocol</h3>
                                <h4 className="text-2xl font-semibold text-white mb-6 tracking-tight leading-tight">Digital Supply Nodes & Instant Verification</h4>
                                <p className="text-white/80 leading-relaxed font-medium">
                                    One centralized dashboard to visualize manufacturing inventory across India. Direct-to-source pricing, verified asset quality, and automated logistics routing.
                                </p>
                            </div>
                            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-[100px] -mr-40 -mt-40"></div>
                        </div>
                    </div>
                </section>

                {/* Asset Ledger Feed */}
                <section className="py-24 md:py-32 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 pb-8 border-b border-slate-100 dark:border-slate-800">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Ledger: FEATURED_ASSETS</span>
                                </div>
                                <h2 className="text-4xl font-semibold text-slate-900 dark:text-white tracking-tighter">Manufacturing Stream</h2>
                            </div>
                            <Link href={productsIndex.url()} className="group flex items-center gap-3 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em] hover:translate-x-2 transition-transform">
                                Full Asset Database
                                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {featuredProducts.map((product) => (
                                <div key={product.id} className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-indigo-100 dark:hover:border-indigo-900 transition-all group">
                                    <div className="relative aspect-[4/5] overflow-hidden bg-slate-50 dark:bg-slate-800">
                                        <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 opacity-90 group-hover:opacity-100" src={product.image_url} alt={product.name} />
                                        <div className="absolute top-6 left-6">
                                            <span className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-100 dark:border-slate-800 rounded-xl text-[9px] font-bold uppercase tracking-[0.2em] shadow-sm">{product.category?.name || 'Asset'}</span>
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors tracking-tight">{product.name}</h3>
                                        <p className="text-[10px] text-slate-500 dark:text-slate-500 mb-6 font-bold uppercase tracking-widest truncate">{product.description}</p>
                                        <div className="flex justify-between items-center pt-6 border-t border-slate-50 dark:border-slate-800">
                                            <span className="text-2xl font-semibold text-slate-900 dark:text-white tracking-tighter">₹{parseFloat(product.price).toLocaleString()}</span>
                                            <Link href={productsIndex.url()} className="w-10 h-10 bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all flex items-center justify-center">
                                                <span className="material-symbols-outlined text-[20px]">add</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Protocol Layers */}
                <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto">
                    <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-indigo-600 dark:text-indigo-400">Core Capabilities</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 dark:text-white mb-6 tracking-tighter">Industrial Power. Managed.</h2>
                        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">Infrastructure for the next generation of hardware distribution and project procurement.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {[
                            { title: 'Neural Asset Discovery', icon: 'search_insights', desc: 'Identify complex hardware fittings via visual recognition or structured protocol metadata.' },
                            { title: 'Zero-Leads Privacy', icon: 'lock_person', desc: 'Trade secrets protected. Node identities remain encrypted until mutual procurement consensus.' },
                            { title: 'Automated Fiscal Audit', icon: 'receipt_long', desc: 'Instant GST-compliant invoicing synchronized with global manufacturing ledger standards.' },
                            { title: 'Real-time Yield Analysis', icon: 'analytics', desc: 'Visualize procurement margins and identifying bulk-acquisition opportunities instantly.' },
                            { title: 'RBAC Node Control', icon: 'groups', desc: 'Secure authorization streams for owners, managers, and logistics fleet operators.' },
                            { title: 'Commission-Free Flow', icon: 'workspace_premium', desc: 'Fixed subscription model. Zero tax on individual sales. Your growth is our primary metric.' },
                        ].map((f) => (
                            <div key={f.title} className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-indigo-100 dark:hover:border-indigo-900/50 transition-all group">
                                <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all">
                                    <span className="material-symbols-outlined text-[32px]">{f.icon}</span>
                                </div>
                                <h4 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white tracking-tight leading-tight">{f.title}</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Pipeline Logic */}
                <section className="py-24 md:py-32 px-6 bg-slate-900 text-white relative overflow-hidden">
                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="text-center mb-24">
                            <h2 className="text-4xl md:text-5xl font-semibold mb-6 tracking-tighter">The Procurement Pipeline</h2>
                            <p className="text-slate-400 font-medium uppercase tracking-[0.2em] text-[11px]">System: ORDER_ROUTING_PROTOCOL_V4</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                            {[
                                { step: '01', title: 'Asset Ingestion', desc: 'Vendors synchronize local inventory with the global node registry.' },
                                { step: '02', title: 'Constraint Search', desc: 'Procurement agents define brand, volume, and material specifications.' },
                                { step: '03', title: 'Consensus Order', desc: 'Buyer authorizes procurement from the most efficient supply node.' },
                                { step: '04', title: 'Rapid Dispatch', desc: 'Local logistics fleet routes assets to the project site instantly.' },
                            ].map((s, idx) => (
                                <div key={s.step} className="relative group">
                                    <div className="text-6xl font-bold text-white/5 absolute -top-10 -left-4 select-none group-hover:text-white/10 transition-colors">{s.step}</div>
                                    <div className="relative z-10 space-y-6">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xs border ${idx === 3 ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-white/5 border-white/10 text-slate-400'}`}>
                                            {s.step}
                                        </div>
                                        <h5 className="text-lg font-semibold tracking-tight">{s.title}</h5>
                                        <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
                                    </div>
                                    {idx < 3 && <div className="hidden md:block absolute top-6 left-12 w-full h-px bg-white/5"></div>}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-indigo-600/5 rounded-full blur-[120px] -mr-[25rem] -mt-[25rem]"></div>
                </section>

                {/* Final Call Node */}
                <section className="py-24 md:py-40 px-6">
                    <div className="max-w-6xl mx-auto bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <div className="inline-flex items-center gap-2 mb-8 bg-indigo-50 dark:bg-indigo-500/10 px-4 py-2 rounded-full border border-indigo-100 dark:border-indigo-900/50">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse"></span>
                                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Network Status: READY</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 dark:text-white mb-8 tracking-tighter leading-tight">
                                Cut the Middleman. <br/>
                                <span className="text-indigo-600 dark:text-indigo-400 italic">Scale the Source.</span>
                            </h2>
                            <p className="text-lg text-slate-500 dark:text-slate-400 mb-12 font-medium">
                                Join 5,000+ manufacturing nodes and procurement agents defining the future of industrial distribution.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <Link href={register.url()} className="px-12 py-5 bg-indigo-600 text-white font-bold text-[11px] uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-indigo-600/20 hover:scale-105 active:scale-95 transition-all">Initialize Node</Link>
                                <button className="px-12 py-5 border-2 border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-[11px] uppercase tracking-[0.2em] rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95">Inquiry Protocol</button>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/5 rounded-full blur-[100px] -mr-40 -mt-40"></div>
                        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px] -ml-40 -mb-40"></div>
                    </div>
                </section>
            </main>

            <SiteFooter />
        </div>
    );
}
