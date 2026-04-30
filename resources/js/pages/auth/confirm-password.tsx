import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/password/confirm';

export default function ConfirmPassword() {
    return (
        <>
            <Head title="Secure Protocol Confirmation" />

            <Form {...store.form()} resetOnSuccess={['password']}>
                {({ processing, errors }) => (
                    <div className="space-y-8">
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Access Key Verification</Label>
                            <PasswordInput
                                id="password"
                                name="password"
                                placeholder="Enter secure access key"
                                autoComplete="current-password"
                                autoFocus
                                className="h-12 rounded-xl bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-indigo-500"
                            />

                            <InputError message={errors.password} />
                        </div>

                        <Button
                            type="submit"
                            className="h-14 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] uppercase tracking-[0.2em] rounded-xl shadow-lg shadow-indigo-600/20 active:scale-[0.98] transition-all"
                            disabled={processing}
                            data-test="confirm-password-button"
                        >
                            {processing ? <Spinner className="mr-2" /> : <span className="material-symbols-outlined mr-2 text-[18px]">verified_user</span>}
                            Authorize Transaction
                        </Button>
                    </div>
                )}
            </Form>
        </>
    );
}

ConfirmPassword.layout = {
    title: 'Secure Access Confirmation',
    description:
        'You are entering a high-clearance zone. Please provide your secure access key to proceed with the authorization.',
};
