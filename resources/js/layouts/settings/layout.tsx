import type { PropsWithChildren } from 'react';
import Heading from '@/components/heading';

export default function SettingsLayout({ children }: PropsWithChildren) {
    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="mb-10">
                <Heading
                    title="System Configuration"
                    description="Update your node identifier and personal authorization parameters."
                    className="text-slate-900 dark:text-white"
                />
            </div>

            <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 shadow-sm">
                <section className="w-full">
                    {children}
                </section>
            </div>
        </div>
    );
}
