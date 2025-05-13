import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter, usePathname } from 'next/navigation';
import { Navbar } from './navbar';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    usePathname: jest.fn(),
}));

describe('Navbar Component', () => {
    const mockPush = jest.fn();
    const mockUseRouter = useRouter as jest.Mock;
    const mockUsePathname = usePathname as jest.Mock;

    beforeEach(() => {
        mockUseRouter.mockReturnValue({ push: mockPush });
        mockUsePathname.mockReturnValue('/dashboard');
        jest.clearAllMocks();
    });

    it('renders navigation items correctly', () => {
        render(<Navbar />);
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Transactions')).toBeInTheDocument();
        const profileMenu = screen.getByRole('button', { name: 'Profile' });
        expect(profileMenu).toBeInTheDocument();
    });

    it('navigates to the correct path when a navigation item is clicked', () => {
        render(<Navbar />);
        const dashboardNav = screen.getByText('Dashboard');
        fireEvent.click(dashboardNav);
        expect(mockPush).toHaveBeenCalledWith('/dashboard');
    });

    it('opens the profile menu when the profile button is clicked', () => {
        render(<Navbar />);
        const profileButton = screen.getByRole('button', { name: 'Profile' });
        fireEvent.click(profileButton);
        const profileMenuItem = screen.getByRole('menuitem', { name: 'Profile' });
        expect(profileMenuItem).toBeInTheDocument();
        expect(screen.getByText('Logout')).toBeInTheDocument();
    });

    it('logs out and navigates to the login page when the logout menu item is clicked', () => {
        render(<Navbar />);
        const profileButton = screen.getByRole('button', { name: 'Profile' });
        fireEvent.click(profileButton);
        const logoutMenuItem = screen.getByRole('menuitem', { name: 'Logout' });
        fireEvent.click(logoutMenuItem);
        expect(mockPush).toHaveBeenCalledWith('/login');
    });
});