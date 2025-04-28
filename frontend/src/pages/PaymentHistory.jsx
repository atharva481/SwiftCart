import { usePaymentStore } from "../store/usePaymentStore";
import { Link } from "react-router-dom";
import { ArrowLeftIcon, ReceiptIcon } from "lucide-react";

function PaymentHistory() {
  const { payments, clearPaymentHistory } = usePaymentStore();

  if (payments.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="btn btn-ghost mb-8">
          <ArrowLeftIcon className="size-4 mr-2" />
          Back to Products
        </Link>
        <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4">
          <div className="bg-base-100 rounded-full p-6">
            <ReceiptIcon className="size-12" />
          </div>
          <h2 className="text-2xl font-bold">No payment history</h2>
          <p className="text-gray-500">Your payment history will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <Link to="/" className="btn btn-ghost">
          <ArrowLeftIcon className="size-4 mr-2" />
          Back to Products
        </Link>
        <button 
          className="btn btn-ghost" 
          onClick={clearPaymentHistory}
        >
          Clear History
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-8">Payment History</h1>

      <div className="space-y-4">
        {payments.map((payment) => (
          <div key={payment.payment_id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="card-title text-primary">{payment.payment_id}</h2>
                  <p className="text-sm text-gray-500">
                    {payment.payment_date} at {payment.payment_time}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">₹{payment.total_amount.toFixed(2)}</p>
                  <span className="badge badge-primary">{payment.payment_type}</span>
                </div>
              </div>

              <div className="divider">Items</div>

              <div className="space-y-2">
                {payment.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="size-12 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity} × ₹{item.price}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium">
                    ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaymentHistory;