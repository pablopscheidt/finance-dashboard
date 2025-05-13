import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Sidebar } from './sidebar';
import { usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
    usePathname: jest.fn(() => '/'),
    useRouter: jest.fn(() => ({
        push: jest.fn(),
        replace: jest.fn(),
        prefetch: jest.fn(),
    })),
}));

describe('Sidebar Component', () => {
    it('renders the ProfileMenu component', () => {
        (usePathname as jest.Mock).mockReturnValue('/dashboard');
        render(<Sidebar />);
        const avatarElement = screen.getByAltText('User Avatar');
        expect(avatarElement).toBeInTheDocument();
    });

    it('highlights the active nav item based on the current path', () => {
        (usePathname as jest.Mock).mockReturnValue('/dashboard/transactions');
        render(<Sidebar />);
        const activeNavItem = screen.getByText('Transactions');
        expect(activeNavItem).toHaveStyle('font-weight: 500');
    });

    it('renders all navigation items', () => {
        (usePathname as jest.Mock).mockReturnValue('/dashboard');
        render(<Sidebar />);
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Transactions')).toBeInTheDocument();
        expect(screen.getByText('Users')).toBeInTheDocument();
    });
});