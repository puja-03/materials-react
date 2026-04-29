import { Link } from '@inertiajs/react';
import AppLogo from '@/components/app-logo';
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
import { index as walletIndex } from '@/routes/wallet/index';
import { index as productsIndex } from '@/routes/products/index';
import { index as ordersIndex } from '@/routes/orders/index';
import { edit as profileEdit } from '@/routes/profile/index';
import { home } from '@/routes';

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
        href: walletIndex.url(),
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
    const userRole = auth.user?.role;

    const adminNavItems: NavItem[] = [
        { title: 'Admin Dashboard', href: dashboard(), icon: 'dashboard' },
        { title: 'User Management', href: users.url(), icon: 'group' },
        { title: 'Global Wallet', href: walletIndex.url(), icon: 'account_balance_wallet' },
        { title: 'All Orders', href: ordersIndex.url(), icon: 'receipt_long' },
        { title: 'Categories', href: '#', icon: 'category' },
        { title: 'System Reports', href: '#', icon: 'analytics' },
    ];

    const sellerNavItems: NavItem[] = [
        { title: 'Seller Dashboard', href: dashboard(), icon: 'dashboard' },
        { title: 'My Products', href: productsIndex.url(), icon: 'inventory_2' },
        { title: 'My Orders', href: ordersIndex.url(), icon: 'shopping_cart_checkout' },
        { title: 'Seller Wallet', href: walletIndex.url(), icon: 'account_balance_wallet' },
        { title: 'Earnings Report', href: '#', icon: 'payments' },
    ];

    const userNavItems: NavItem[] = [
        { title: 'Marketplace', href: home.url(), icon: 'storefront' },
        { title: 'My Orders', href: ordersIndex.url(), icon: 'package_2' },
        { title: 'My Wallet', href: walletIndex.url(), icon: 'account_balance_wallet' },
        { title: 'Settings', href: profileEdit.url(), icon: 'settings' },
    ];

    const guestNavItems: NavItem[] = [
        { title: 'Marketplace', href: home.url(), icon: 'storefront' },
    ];

    const currentNavItems = 
        !auth.user ? guestNavItems :
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
