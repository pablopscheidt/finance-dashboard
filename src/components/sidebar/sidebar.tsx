'use client';

import { ProfileMenu } from '../profile-menu';
import { usePathname } from 'next/navigation';
import { Divider } from '@mui/material';
import {
    House,
    Package,
    CreditCard,
    Users,
} from '@phosphor-icons/react';
import { 
    NavItem, 
    NavSection, 
    SidebarContainer 
} from './styles';

export function Sidebar() {
    const pathname = usePathname();
    const isActive = (path: string) => pathname === path;

    return (
        <SidebarContainer>
            <ProfileMenu />

            <Divider />

            <NavSection>
                <NavItem
                    href="/dashboard"
                    $active={isActive('/dashboard')}
                >
                    <House size={20} />
                    Dashboard
                </NavItem>

                <NavItem
                    href="/dashboard/products"
                    $active={isActive('/dashboard/products')}
                >
                    <Package size={20} />
                    Products
                </NavItem>

                <NavItem
                    href="/dashboard/payments"
                    $active={isActive('/dashboard/payments')}
                >
                    <CreditCard size={20} />
                    Payments
                </NavItem>

                <NavItem
                    href="/dashboard/users"
                    $active={isActive('/dashboard/users')}
                    $disabled
                >
                    <Users size={20} />
                    Users
                </NavItem>
            </NavSection>
        </SidebarContainer>
    );
}
