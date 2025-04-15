import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from './ProductCard';
import { CartProvider } from './CartContext';
import { toast } from 'sonner';

// Mock the toast function
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn()
  }
}));

const mockProduct = {
  id: '1',
  name: 'Test Sofa',
  description: 'A beautiful test sofa',
  price: 999.99,
  images: ['/test-image.jpg'],
  inStock: true,
  category: 'living' as const,
  features: [
    'Comfortable seating',
    'Durable fabric',
    'Modern design',
    'Easy to clean'
  ],
  modelViewerSrc: 'test-model.glb',
  iosArSrc: 'test-model.usdz',
  featured: false
};

describe('ProductCard', () => {
  const renderProductCard = () => {
    return render(
      <BrowserRouter>
        <CartProvider>
          <ProductCard product={mockProduct} />
        </CartProvider>
      </BrowserRouter>
    );
  };

  it('renders product details correctly', () => {
    renderProductCard();
    
    expect(screen.getByText('Test Sofa')).toBeInTheDocument();
    expect(screen.getByText(/A beautiful test sofa/)).toBeInTheDocument();
    expect(screen.getByText('$999.99')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', '/test-image.jpg');
  });

  it('handles add to cart action', () => {
    renderProductCard();
    
    const addToCartButton = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(addToCartButton);
    
    // Check if toast was called
    expect(vi.mocked(toast.success)).toHaveBeenCalledWith('Test Sofa added to your cart');
  });

  it('disables add to cart button when product is out of stock', () => {
    const outOfStockProduct = { ...mockProduct, inStock: false };
    render(
      <BrowserRouter>
        <CartProvider>
          <ProductCard product={outOfStockProduct} />
        </CartProvider>
      </BrowserRouter>
    );
    
    const addToCartButton = screen.getByRole('button', { name: /add to cart/i });
    expect(addToCartButton).toBeDisabled();
  });
});