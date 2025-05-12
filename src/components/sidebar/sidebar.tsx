'use client';

import { ProfileMenu } from '../profile-menu';
import { usePathname } from 'next/navigation';
import { Divider } from '@mui/material';
import {
    ChartDonut,
    Swap,
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
                    <ChartDonut size={20} />
                    Dashboard
                </NavItem>

                <NavItem
                    href="/dashboard/transactions"
                    $active={isActive('/dashboard/transactions')}
                >
                    <Swap size={20} />
                    Transactions
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
