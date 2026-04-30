import { Form, Head, Link } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: Props) {
    return (
        <>
            <Head title="Node Authentication" />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-8"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Node Identifier</Label>
                                </div>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="Enter your registered email"
                                    className="h-12 rounded-xl bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-indigo-500"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Access Key</Label>
                                    {canResetPassword && (
                                        <Link
                                            href={request()}
                                            className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors"
                                            tabIndex={5}
                                        >
                                            Key Recovery?
                                        </Link>
                                    )}
                                </div>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="Enter secure access key"
                                    className="h-12 rounded-xl bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-indigo-500"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-3 bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                    className="rounded-md border-slate-300 dark:border-slate-700 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                                />
                                <Label htmlFor="remember" className="text-xs font-medium text-slate-600 dark:text-slate-400 cursor-pointer">Persist node session on this terminal</Label>
                            </div>

                            <Button
                                type="submit"
                                className="h-14 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] uppercase tracking-[0.2em] rounded-xl shadow-lg shadow-indigo-600/20 active:scale-[0.98] transition-all"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing ? <Spinner className="mr-2" /> : <span className="material-symbols-outlined mr-2 text-[18px]">key</span>}
                                Authorize Session
                            </Button>
                        </div>

                        {canRegister && (
                            <div className="text-center pt-4">
                                <p className="text-xs text-slate-500 dark:text-slate-500 font-medium">
                                    New manufacturing node?{' '}
                                    <Link href={register()} className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline" tabIndex={5}>
                                        Initialize Registration
                                    </Link>
                                </p>
                            </div>
                        )}
                    </>
                )}
            </Form>

            {status && (
                <div className="mt-8 p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-900/30 rounded-xl text-center text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                    {status}
                </div>
            )}
        </>
    );
}

Login.layout = {
    title: 'Node Authorization',
    description: 'Provide your credentials to establish a secure link with the Materials Market industrial ledger.',
};
