"use client"

import React, { useState } from 'react';

const PaymentPage = () => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock order details - in real app, this would come from props or context
  const orderDetails = {
    ticketQty: 2,
    subtotal: 400000,
    tax: 24000,
    total: 424000
  };

  const formatIDR = (number: number) => {
    return `IDR ${number.toLocaleString('id-ID')}`;
  };

  const paymentMethods = [
    {
      id: 'bca',
      name: 'BCA Virtual Account',
      icon: '🏦',
    },
    {
      id: 'mandiri',
      name: 'Mandiri Virtual Account',
      icon: '🏦',
    },
    {
      id: 'bni',
      name: 'BNI Virtual Account',
      icon: '🏦',
    },
    {
      id: 'gopay',
      name: 'GoPay',
      icon: '📱',
    },
    {
      id: 'ovo',
      name: 'OVO',
      icon: '📱',
    },
    {
      id: 'dana',
      name: 'DANA',
      icon: '📱',
    }
  ];

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!selectedMethod) {
      alert('Please select a payment method');
      return;
    }
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      alert('Payment successful! Redirecting to confirmation page...');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Payment Details</h1>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Standard Ticket x {orderDetails.ticketQty}</span>
                <span>{formatIDR(orderDetails.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Tax</span>
                <span>{formatIDR(orderDetails.tax)}</span>
              </div>
              <div className="h-px bg-gray-200 my-2"></div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{formatIDR(orderDetails.total)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <form onSubmit={handlePaymentSubmit}>
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
              <div className="grid grid-cols-1 gap-4">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedMethod === method.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={selectedMethod === method.id}
                      onChange={(e) => setSelectedMethod(e.target.value)}
                      className="mr-4"
                    />
                    <span className="mr-2">{method.icon}</span>
                    <span>{method.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="px-6 pb-6">
              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
                  isProcessing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isProcessing ? 'Processing...' : `Pay ${formatIDR(orderDetails.total)}`}
              </button>
            </div>
          </form>

          <div className="border-t p-6 bg-gray-50">
            <div className="flex items-center justify-center text-sm text-gray-600">
              <span className="mr-2">🔒</span>
              <span>Your payment information is secure and encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;