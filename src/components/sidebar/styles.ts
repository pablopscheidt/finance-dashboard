import Link from 'next/link';
import styled from 'styled-components';

export const SidebarContainer = styled.aside`
    width: 280px;
    background: #ffffff;
    border-right: 1px solid #e2e8f0;
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    position: sticky;
    top: 0;
    height: 100vh;
    overflow-y: auto;
`;

export const NavSection = styled.nav`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    margin-top: 1.5rem;
`;

export const NavItem = styled(Link)<{ $active?: boolean, $disabled?: boolean }>`
    padding: 0.75rem 1rem;
    border-radius: 8px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: ${({ $active }) => ($active ? '#ffffff' : '#2d3748')};
    text-decoration: none;
    background: ${({ $active }) => ($active ? '#6b46c1' : 'transparent')};

    &:hover {
        background: ${({ $active }) => ($active ? '#553c9a' : '#f7fafc')};
    }

    ${({ $disabled }) => $disabled && `
        pointer-events: none;
        background: transparent;
        cursor: not-allowed;
        color: #a0aec0;

        &:hover {
            background: transparent;
        }
    `}
`;