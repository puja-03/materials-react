import { Form, Head, setLayoutProps } from '@inertiajs/react';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useMemo, useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import { Spinner } from '@/components/ui/spinner';
import { OTP_MAX_LENGTH } from '@/hooks/use-two-factor-auth';
import { store } from '@/routes/two-factor/login';

export default function TwoFactorChallenge() {
    const [showRecoveryInput, setShowRecoveryInput] = useState<boolean>(false);
    const [code, setCode] = useState<string>('');

    const authConfigContent = useMemo<{
        title: string;
        description: string;
        toggleText: string;
    }>(() => {
        if (showRecoveryInput) {
            return {
                title: 'Recovery Override',
                description:
                    'Please confirm node access by providing an emergency recovery token from your physical secure backup.',
                toggleText: 'Use dynamic authenticator code instead',
            };
        }

        return {
            title: 'Dynamic Authentication',
            description:
                'Provide the unique 6-digit synchronization code from your registered authentication node.',
            toggleText: 'Use physical recovery token instead',
        };
    }, [showRecoveryInput]);

    setLayoutProps({
        title: authConfigContent.title,
        description: authConfigContent.description,
    });

    const toggleRecoveryMode = (clearErrors: () => void): void => {
        setShowRecoveryInput(!showRecoveryInput);
        clearErrors();
        setCode('');
    };

    return (
        <>
            <Head title="Secondary Authorization Protocol" />

            <div className="space-y-8">
                <Form
                    {...store.form()}
                    className="space-y-8"
                    resetOnError
                    resetOnSuccess={!showRecoveryInput}
                >
                    {({ errors, processing, clearErrors }) => (
                        <div className="space-y-10">
                            {showRecoveryInput ? (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div>
                                        <h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Emergency Override Protocol</h3>
                                    </div>
                                    <Input
                                        name="recovery_code"
                                        type="text"
                                        placeholder="Enter recovery token"
                                        autoFocus={showRecoveryInput}
                                        required
                                        className="h-12 rounded-xl bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-rose-500"
                                    />
                                    <InputError
                                        message={errors.recovery_code}
                                    />
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center space-y-6">
                                    <div className="flex items-center gap-2 self-start">
                                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse"></div>
                                        <h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Awaiting Synchronized Code</h3>
                                    </div>
                                    <div className="flex w-full items-center justify-center">
                                        <InputOTP
                                            name="code"
                                            maxLength={OTP_MAX_LENGTH}
                                            value={code}
                                            onChange={(value) => setCode(value)}
                                            disabled={processing}
                                            pattern={REGEXP_ONLY_DIGITS}
                                        >
                                            <InputOTPGroup className="gap-3">
                                                {Array.from(
                                                    { length: OTP_MAX_LENGTH },
                                                    (_, index) => (
                                                        <InputOTPSlot
                                                            key={index}
                                                            index={index}
                                                            className="w-12 h-14 rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xl font-bold"
                                                        />
                                                    ),
                                                )}
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </div>
                                    <InputError message={errors.code} />
                                </div>
                            )}

                            <div className="space-y-6">
                                <Button
                                    type="submit"
                                    className="h-14 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] uppercase tracking-[0.2em] rounded-xl shadow-lg shadow-indigo-600/20 active:scale-[0.98] transition-all"
                                    disabled={processing}
                                >
                                    {processing ? <Spinner className="mr-2" /> : <span className="material-symbols-outlined mr-2 text-[18px]">verified</span>}
                                    Complete Authorization
                                </Button>

                                <div className="text-center">
                                    <button
                                        type="button"
                                        className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                        onClick={() =>
                                            toggleRecoveryMode(clearErrors)
                                        }
                                    >
                                        {authConfigContent.toggleText}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </Form>
            </div>
        </>
    );
}
