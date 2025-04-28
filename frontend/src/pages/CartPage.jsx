import { useCartStore } from "../store/useCartStore";
import { usePaymentStore } from "../store/usePaymentStore";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CreditCardIcon, WalletIcon } from "lucide-react";

const CartPage = () => {
  const { cartItems, totalCost, removeFromCart, updateQuantity, clearCart } = useCartStore();
  const { processPayment, loading: paymentLoading } = usePaymentStore();
  const [selectedPaymentType, setSelectedPaymentType] = useState("credit_card");

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <Link to="/" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-grow">
          {cartItems.map((item) => (
            <div key={item.id} className="card card-side bg-base-100 shadow-xl mb-4">
              <figure className="w-48">
                <img src={item.image} alt={item.name} className="object-cover h-full" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{item.name}</h2>
                <p className="text-xl font-semibold">₹{item.price}</p>
                
                <div className="flex items-center gap-4">
                  <div className="join">
                    <button 
                      className="btn join-item"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="btn join-item no-animation">{item.quantity}</span>
                    <button 
                      className="btn join-item"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    className="btn btn-error btn-sm"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>

                <p className="text-lg mt-2">
                  Subtotal: ₹{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Order Summary</h2>
              <div className="text-xl font-bold mt-4">
                Total: ₹{totalCost.toFixed(2)}
              </div>
              {/* Payment Type Selection */}
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text font-medium">Payment Method</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="label cursor-pointer justify-start gap-4 border rounded-lg p-4">
                    <input
                      type="radio"
                      name="payment_type"
                      className="radio radio-primary"
                      value="credit_card"
                      checked={selectedPaymentType === "credit_card"}
                      onChange={(e) => setSelectedPaymentType(e.target.value)}
                    />
                    <CreditCardIcon className="size-5" />
                    <span>Credit Card</span>
                  </label>
                  <label className="label cursor-pointer justify-start gap-4 border rounded-lg p-4">
                    <input
                      type="radio"
                      name="payment_type"
                      className="radio radio-primary"
                      value="wallet"
                      checked={selectedPaymentType === "wallet"}
                      onChange={(e) => setSelectedPaymentType(e.target.value)}
                    />
                    <WalletIcon className="size-5" />
                    <span>Wallet</span>
                  </label>
                </div>
              </div>

              <div className="card-actions mt-6">
                <button
                  className="btn btn-primary btn-block"
                  onClick={() => processPayment(selectedPaymentType)}
                  disabled={paymentLoading}
                >
                  {paymentLoading ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : (
                    "Proceed to Payment"
                  )}
                </button>
                <button 
                  className="btn btn-ghost btn-block"
                  onClick={clearCart}
                  disabled={paymentLoading}
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;