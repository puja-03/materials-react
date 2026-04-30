import { Form, Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { logout } from '@/routes';
import { send } from '@/routes/verification';

export default function VerifyEmail({ status }: { status?: string }) {
    return (
        <>
            <Head title="Node Verification Protocol" />

            {status === 'verification-link-sent' && (
                <div className="mb-8 p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-900/30 rounded-xl text-center text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                    Verification payload dispatched. Check your node identifier for the link.
                </div>
            )}

            <Form {...send.form()} className="space-y-8">
                {({ processing }) => (
                    <div className="space-y-6">
                        <Button 
                            disabled={processing} 
                            className="h-14 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] uppercase tracking-[0.2em] rounded-xl shadow-lg shadow-indigo-600/20 active:scale-[0.98] transition-all"
                        >
                            {processing ? <Spinner className="mr-2" /> : <span className="material-symbols-outlined mr-2 text-[18px]">mark_email_unread</span>}
                            Resend Verification Link
                        </Button>

                        <div className="text-center">
                            <Link
                                href={logout()}
                                method="post"
                                as="button"
                                className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-rose-500 transition-colors"
                            >
                                Terminate Session
                            </Link>
                        </div>
                    </div>
                )}
            </Form>
        </>
    );
}

VerifyEmail.layout = {
    title: 'Node Verification',
    description:
        'Please authorize your node identifier by clicking the encrypted link dispatched to your inbox.',
};
