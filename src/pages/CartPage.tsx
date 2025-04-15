
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/components/CartContext";

const CartPage = () => {
  const cart = useCart();
  const cartItems = cart.items;
  const cartTotal = cart.getCartTotal();
  
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="h-24 w-24 mx-auto mb-6 bg-furniture-tan/20 rounded-full flex items-center justify-center">
            <ShoppingBag className="h-12 w-12 text-furniture-brown" />
          </div>
          <h1 className="text-3xl font-serif font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven't added any furniture to your cart yet.</p>
          <Button asChild>
            <Link to="/products">Shop Now</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-serif font-bold mb-8">Your Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <tr key={item.product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-16 w-16 bg-gray-100 rounded-md overflow-hidden">
                          <img 
                            src={item.product.images[0]} 
                            alt={item.product.name}
                            className="h-full w-full object-cover object-center" 
                          />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-sm font-medium text-gray-900">
                            <Link to={`/products/${item.product.id}`} className="hover:text-furniture-brown">
                              {item.product.name}
                            </Link>
                          </h3>
                          <p className="text-xs text-gray-500">
                            {item.product.category.charAt(0).toUpperCase() + item.product.category.slice(1)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                      ${item.product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center space-x-2">
                        <button 
                          onClick={() => cart.updateQuantity(item.product.id, item.quantity - 1)}
                          className="h-6 w-6 rounded-full border border-gray-300 flex items-center justify-center"
                        >
                          <MinusIcon className="h-3 w-3" />
                        </button>
                        <span className="font-medium text-gray-900">{item.quantity}</span>
                        <button 
                          onClick={() => cart.updateQuantity(item.product.id, item.quantity + 1)}
                          className="h-6 w-6 rounded-full border border-gray-300 flex items-center justify-center"
                        >
                          <PlusIcon className="h-3 w-3" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-4">
                        <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                        <button
                          onClick={() => cart.removeFromCart(item.product.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div>
          <div className="bg-gray-50 rounded-lg p-6 border">
            <h2 className="text-lg font-medium mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t pt-3 border-gray-200 flex justify-between font-medium">
                <span>Total</span>
                <span className="text-furniture-brown">${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-6">
              <Button className="w-full bg-furniture-brown hover:bg-furniture-gray text-white py-6">
                Proceed to Checkout
              </Button>
              <div className="mt-4 text-center">
                <Link to="/products" className="text-furniture-brown hover:text-furniture-tan text-sm">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
