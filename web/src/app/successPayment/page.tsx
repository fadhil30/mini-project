"use client";

import Link from "next/link";
import React from "react";

const PaymentSuccessPage = () => {
  // Mock transaction details - in real app, this would come from props/context
  const transactionDetails = {
    orderId: "INV/2025/01/123456",
    transactionDate: new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    paymentMethod: "BCA Virtual Account",
    ticketQty: 2,
    ticketType: "Standard Ticket",
    amount: 400000,
    tax: 24000,
    total: 424000,
  };

  const formatIDR = (number: number) => {
    return `IDR ${number.toLocaleString("id-ID")}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mt-2">
            Your ticket has been booked successfully
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Order Details</h2>
              <span className="text-sm text-green-600 font-medium px-3 py-1 bg-green-100 rounded-full">
                Paid
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Order ID</span>
                <span className="font-medium">
                  {transactionDetails.orderId}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Transaction Date</span>
                <span className="font-medium">
                  {transactionDetails.transactionDate}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Payment Method</span>
                <span className="font-medium">
                  {transactionDetails.paymentMethod}
                </span>
              </div>

              <div className="h-px bg-gray-200 my-4"></div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>
                    {transactionDetails.ticketType} x{" "}
                    {transactionDetails.ticketQty}
                  </span>
                  <span>{formatIDR(transactionDetails.amount)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Tax</span>
                  <span>{formatIDR(transactionDetails.tax)}</span>
                </div>
                <div className="h-px bg-gray-200 my-2"></div>
                <div className="flex justify-between font-semibold">
                  <span>Total Amount</span>
                  <span>{formatIDR(transactionDetails.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
            Download E-Ticket
          </button>

          <div className="grid grid-cols-2 gap-4">
            <button className="bg-white hover:bg-gray-50 text-gray-800 font-medium py-3 px-4 rounded-lg border transition-colors">
              View Order Details
            </button>
            
            <Link href="/homePage" className="bg-white hover:bg-gray-50 text-gray-800 font-medium py-3 px-4 rounded-lg border transition-colors">
                Back to Home
            </Link>

          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>A copy of the e-ticket has been sent to your email</p>
          <p className="mt-2">
            For any questions, please contact our support at{" "}
            <a
              href="mailto:support@example.com"
              className="text-blue-600 hover:underline"
            >
              support@example.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
