import AppLogoIcon from '@/components/app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-primary text-white">
                <span className="material-symbols-outlined">hardware</span>
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-bold text-slate-900 dark:text-white">
                    Materials Market
                </span>
            </div>
        </>
    );
}
