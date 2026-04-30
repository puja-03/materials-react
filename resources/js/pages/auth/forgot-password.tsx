import { Form, Head, Link } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { email } from '@/routes/password';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <>
            <Head title="Key Recovery Protocol" />

            {status && (
                <div className="mb-8 p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-900/30 rounded-xl text-center text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                    {status}
                </div>
            )}

            <div className="space-y-8">
                <Form {...email.form()}>
                    {({ processing, errors }) => (
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Node Identifier</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    autoComplete="off"
                                    autoFocus
                                    placeholder="Enter your registered email"
                                    className="h-12 rounded-xl bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-indigo-500"
                                />

                                <InputError message={errors.email} />
                            </div>

                            <Button
                                className="h-14 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] uppercase tracking-[0.2em] rounded-xl shadow-lg shadow-indigo-600/20 active:scale-[0.98] transition-all"
                                disabled={processing}
                                data-test="email-password-reset-link-button"
                            >
                                {processing ? <Spinner className="mr-2" /> : <span className="material-symbols-outlined mr-2 text-[18px]">contact_mail</span>}
                                Request Recovery Link
                            </Button>
                        </div>
                    )}
                </Form>

                <div className="text-center pt-4">
                    <p className="text-xs text-slate-500 dark:text-slate-500 font-medium">
                        Remembered your key?{' '}
                        <Link href={login()} className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">
                            Return to Authorization
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}

ForgotPassword.layout = {
    title: 'Key Recovery',
    description: 'Enter your node identifier to receive an encrypted session recovery link via secure dispatch.',
};
