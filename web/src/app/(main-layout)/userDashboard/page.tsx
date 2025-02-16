"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
import ReviewForm from "@/components/reviewForm";
import Image from "next/image";

const Dashboard = () => {
  const events = [
    {
      id: "1",
      title: "The Grand Music Festival",
      image:
        "https://res.cloudinary.com/dwtjculny/image/upload/v1738738374/muneeb-syed-4_M8uIfPEZw-unsplash_aprvfh.jpg",
      description: "An unforgettable weekend of live performances.",
      date: "June 15, 2024",
      location: "Ancol Beach, North Jakarta, Indonesia",
    },
    {
      id: "2",
      title: "Tech Innovators Summit",
      image:
        "https://res.cloudinary.com/dwtjculny/image/upload/v1738739066/teemu-paananen-bzdhc5b3Bxs-unsplash_sfgcxv.jpg",
      description:
        "A premier event bringing together the brightest minds in technology.",
      date: "July 20, 2024",
      location: "Grand Hyatt Jakarta, Indonesia",
    },
  ];

  const handleReviewSubmit = (
    eventId: string,
    review: string,
    rating: number
  ) => {
    console.log(
      `Review submitted for event ${eventId}: ${review} (Rating: ${rating})`
    );
    // Here you can handle the review submission logic (e.g., update state, send to API, etc.)
  };

  return (
    <section>
      <Header />
      <div className="max-w-5xl mx-auto pt-32 pb-12">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
        <h2 className="text-2xl font-bold mb-4">Purchased Events</h2>
        {events.map((event) => (
          <div
            key={event.id}
            className="relative mb-12 border p-4 rounded-lg shadow"
          >
            <div className="relative w-full h-[300px] object-cover rounded">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold mt-2">{event.title}</h3>
            <p>{event.description}</p>
            <p className="text-gray-600">Date: {event.date}</p>
            <p className="text-gray-600">Location: {event.location}</p>
            <ReviewForm eventId={event.id} onSubmit={handleReviewSubmit} />
          </div>
        ))}
      </div>
      <Footer />
    </section>
  );
};

export default Dashboard;
