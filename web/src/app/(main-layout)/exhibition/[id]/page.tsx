import Image from "next/image";
import Link from "next/link";

export default async function EventDetailPage({ params }) {
  const id = (await params).id;
  console.log(id);
  const response = await fetch(`http://localhost:8000/events/${id}`);
  const eventDetail = await response.json();

  // Format harga ke dalam Rupiah (IDR)
  const formatPrice = (price: number) => {
    return price.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
  };

  // Format tanggal menjadi "Saturday, June 15, 2024"
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Format waktu menjadi "4:00 PM"
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <section>
      <div className="max-w-5xl mx-auto pt-32 pb-12">
        {/* Event Header */}
        <div className="relative w-full h-[400px] mb-6">
          {/* Back Button (sebelah kiri gambar) */}
          <Link
            href="/exhibition"
            className="z-10 absolute top-4 left-4 bg-white bg-opacity-75 px-3 py-2 rounded-full shadow-md hover:bg-opacity-100 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </Link>
          {/* Event Image */}
          <Image
            src={eventDetail.data.image as string}
            alt={eventDetail.data.title as string}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        {/* Event Title and CTA */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">{eventDetail.data.title}</h1>
          </div>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <Link href={`/transaction/${id}`}>
              <button className="bg-yellow-400 px-6 py-2 text-sm font-bold rounded-lg hover:scale-105 transition">
                Buy Tickets
              </button>
            </Link>
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L12 13.5l-5.25-5.25"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Event Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="col-span-2 space-y-6">
            {/* Date and Time */}
            <div>
              <h3 className="font-bold text-lg mb-2">Date and Time</h3>
              <p>{formatDate(eventDetail.data.eventSchedule)}</p>
              <p>{formatTime(eventDetail.data.eventSchedule)}</p>
              <p className="text-blue-500 hover:underline cursor-pointer">
                + Add to Calendar
              </p>
            </div>

            {/* Location */}
            <div>
              <h3 className="font-bold text-lg mb-2">Location</h3>
              <p>{eventDetail.data.location}</p>
              <div className="relative w-full h-60 mt-4">
                <Image
                  src="/map.png"
                  alt="Location Map"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Hosted By */}
            <div>
              <h3 className="font-bold text-lg mb-2">Hosted by</h3>
              <div className="flex items-center gap-4">
                <div>
                  <p className="font-bold">{eventDetail.data.host}</p>
                  <div className="flex gap-2 mt-1">
                    <button className="px-4 py-1 text-sm border rounded-lg hover:bg-gray-100">
                      Contact
                    </button>
                    <button className="px-4 py-1 text-sm border rounded-lg hover:bg-gray-100">
                      + Follow
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Description */}
            <div>
              <h3 className="font-bold text-lg mb-2">Event Description</h3>
              <p>{eventDetail.data.description}</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Ticket Information */}
            <div>
              <h3 className="font-bold text-lg mb-2">Ticket Price</h3>
              <p>
                {formatPrice(
                  eventDetail.data.ticketPrice === 0
                    ? "FREE"
                    : eventDetail.data.ticketPrice
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
