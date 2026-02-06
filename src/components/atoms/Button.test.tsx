import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
    it('renders a normal link when url is provided', () => {
        render(<Button label="Test Link" url="/test-url" />);

        const link = screen.getByRole('link', { name: /test link/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/test-url');
    });

    it('renders a button for #sold-out url', () => {
        render(<Button label="Add to Cart" url="#sold-out" />);

        const button = screen.getByRole('button', { name: /add to cart/i });
        expect(button).toBeInTheDocument();
        // Should not be a link
        expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });

    it('shows "Item is sold out" message when #sold-out button is clicked', async () => {
        render(<Button label="Add to Cart" url="#sold-out" />);

        const button = screen.getByRole('button', { name: /add to cart/i });
        fireEvent.click(button);

        // Expect Snackbar message to appear
        const message = await screen.findByText('Item is sold out');
        expect(message).toBeInTheDocument();
    });
});
