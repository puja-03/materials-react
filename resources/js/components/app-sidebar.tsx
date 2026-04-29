import { Link } from '@inertiajs/react';
import { BookOpen, FolderGit2, LayoutGrid } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

import { users } from '@/routes/admin';
import { route } from '@/route-global';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: 'dashboard',
    },
    {
        title: 'Users',
        href: users.url(),
        icon: 'group',
    },
    {
        title: 'Wallet',
        href: route('wallet.index'),
        icon: 'account_balance_wallet',
    },
    {
        title: 'Orders',
        href: '#',
        icon: 'receipt_long',
    },
    {
        title: 'Categories',
        href: '#',
        icon: 'category',
    },
    {
        title: 'Reports',
        href: '#',
        icon: 'analytics',
    },
];

import { usePage } from '@inertiajs/react';

export function AppSidebar() {
    const { auth } = usePage().props as any;
    const userRole = auth.user.role;

    const adminNavItems: NavItem[] = [
        { title: 'Admin Dashboard', href: dashboard(), icon: 'dashboard' },
        { title: 'User Management', href: users.url(), icon: 'group' },
        { title: 'Global Wallet', href: route('wallet.index'), icon: 'account_balance_wallet' },
        { title: 'All Orders', href: route('orders.index'), icon: 'receipt_long' },
        { title: 'Categories', href: '#', icon: 'category' },
        { title: 'System Reports', href: '#', icon: 'analytics' },
    ];

    const sellerNavItems: NavItem[] = [
        { title: 'Seller Dashboard', href: dashboard(), icon: 'dashboard' },
        { title: 'My Products', href: route('products.index'), icon: 'inventory_2' },
        { title: 'My Orders', href: route('orders.index'), icon: 'shopping_cart_checkout' },
        { title: 'Seller Wallet', href: route('wallet.index'), icon: 'account_balance_wallet' },
        { title: 'Earnings Report', href: '#', icon: 'payments' },
    ];

    const userNavItems: NavItem[] = [
        { title: 'Marketplace', href: route('home'), icon: 'storefront' },
        { title: 'My Orders', href: route('orders.index'), icon: 'package_2' },
        { title: 'My Wallet', href: route('wallet.index'), icon: 'account_balance_wallet' },
        { title: 'Settings', href: route('profile.edit'), icon: 'settings' },
    ];

    const currentNavItems = 
        userRole === 'admin' ? adminNavItems :
        userRole === 'shopkeeper' ? sellerNavItems :
        userNavItems;

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={currentNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
