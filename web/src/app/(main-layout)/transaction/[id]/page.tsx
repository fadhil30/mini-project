"use client"; // Tambahkan direktif ini di bagian atas file

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, use } from "react";

export default function TransactionPage({ params }) {
  const router = useRouter();
  const [eventDetail, setEventDetail] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  const id = use(params).id; // Gunakan React.use() untuk menangani params

  useEffect(() => {
    const fetchEventDetail = async () => {
      const response = await fetch(`http://localhost:8000/events/${id}`);
      const data = await response.json();
      setEventDetail(data);
      if (data && data.data && data.data.ticketPrice) {
        setTotalPrice(data.data.ticketPrice * ticketCount);
      }
    };

    fetchEventDetail();
  }, [id, ticketCount]);

  const formatPrice = (price: number) => {
    return price.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleTicketChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value, 10);
    setTicketCount(count);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!eventDetail || !eventDetail.data) return;

    const transactionData = {
      eventId: eventDetail.data.id,
      ticketCount: ticketCount,
      totalPrice: totalPrice,
    };

    const response = await fetch("http://localhost:8000/transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transactionData),
    });

    if (response.ok) {
      alert("Transaction successfully");
      router.push("/"); // Redirect ke halaman utama atau halaman konfirmasi
    } else {
      alert("There was some problem with the transaction!");
    }
  };

  if (!eventDetail || !eventDetail.data) {
    return <div>Loading...</div>;
  }

  return (
    <section className="min-h-screen p-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md pt-28">
        <h1 className="text-2xl font-bold mb-4">{eventDetail.data.title}</h1>
        <div className="relative w-full h-[200px] mb-4">
          <Image
            src={eventDetail.data.image}
            alt={eventDetail.data.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <p className="text-gray-600 mb-2">
          <strong>Date:</strong> {formatDate(eventDetail.data.eventSchedule)}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Time</strong> {formatTime(eventDetail.data.eventSchedule)}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Ticket Price:</strong>{" "}
          {formatPrice(
            eventDetail.data.ticketPrice === 0
              ? 0
              : eventDetail.data.ticketPrice
          )}
        </p>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label
              htmlFor="ticketCount"
              className="block text-gray-700 font-bold mb-2"
            >
              Ticket Amount
            </label>
            <input
              type="number"
              id="ticketCount"
              value={ticketCount}
              onChange={handleTicketChange}
              min="1"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="totalPrice"
              className="block text-gray-700 font-bold mb-2"
            >
              Total Price
            </label>
            <input
              type="text"
              id="totalPrice"
              value={formatPrice(totalPrice)}
              readOnly
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Buy Ticket
          </button>
        </form>
      </div>
    </section>
  );
}
