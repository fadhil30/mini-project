import Image from "next/image";

export default function PopularEvent() {
  const events = [
    {
      date: "NOV 25 - 26",
      title: "Lakeside Camping at Rancabali",
      category: "Travel & Adventure",
      image: "/lakeside-camping-event.png",
      location: "Rancabali, Bandung, Indonesia",
      time: "8:30 AM - 7:30 PM",
      price: "Rp 1.400.000",
      interested: "14 interested",
    },
    {
      date: "DEC 02",
      title: "Sound Of Christmas 2023",
      category: "Cultural & Arts",
      image: "/sound-of-christmas-event.png",
      location: "Balai Kartini, Jakarta, Indonesia",
      time: "6:30 PM - 9:30 PM",
      price: "Rp 499.000",
      interested: "16 interested",
    },
    {
      date: "DEC 02",
      title: "Meet the Royal College of Art in Indonesia 2023",
      category: "Educational & Business",
      image: "/royal-college-event.png",
      location: "Hotel Mulia, Jakarta, Indonesia",
      time: "10 AM - 5 PM",
      price: "Rp 200.000",
    },
    {
      date: "DEC 03",
      title: "Global Engineering Education Expo 2023",
      category: "Educational & Business",
      image: "/engineering-expo-event.png",
      location: "The Ritz-Carlton, Jakarta, Indonesia",
      time: "10 AM - 2 PM",
      price: "Rp 150.000",
      interested: "48 interested",
    },
    {
      date: "DEC 08",
      title: "Cricket & Business Meetup",
      category: "Sports & Fitness",
      image: "/cricket-meetup-event.png",
      location: "Gelora Bung Karno, Jakarta, Indonesia",
      time: "6:30 PM - 9:30 PM",
      price: "Rp 399.000",
    },
    {
      date: "FEB 14",
      title: "Valentine's Day Sail on a Yacht in Bali",
      category: "Travel & Adventure",
      image: "/valentine-sail-event.png",
      location: "Sanur, Bali, Indonesia",
      time: "7 AM - 8 PM",
      price: "Rp 2.999.000",
      interested: "160 interested",
    },
  ];

  return (
    <section className="py-12 px-36">
      <h2 className="text-3xl font-bold text-left mb-8">Popular Events</h2>
      {/* Event Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event, index) => (
          <div
            key={index}
            className="border rounded-lg overflow-hidden shadow-md bg-white"
          >
            <div className="relative w-full h-40">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
              />
              <span className="absolute top-2 left-2 bg-yellow-400 text-black px-2 py-1 text-xs rounded">
                {event.category}
              </span>
              <button className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">
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
                    d="M11.25 20.25L6.75 16.5m0 0l-4.5-4.5m4.5 4.5L20.25 3.75M6.75 16.5l10.5-10.5"
                  />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <span className="text-sm text-gray-500">{event.date}</span>
              <h3 className="text-lg font-bold mt-2">{event.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{event.location}</p>
              <p className="text-sm text-gray-600">{event.time}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm font-bold">{event.price}</span>
                {event.interested && (
                  <span className="text-sm text-gray-500">
                    {event.interested}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* See More Button */}
      <div className="flex justify-center mt-8">
        <button className="px-6 py-2 border rounded-lg hover:bg-gray-100 focus:outline-none">
          See More
        </button>
      </div>
    </section>
  );
}
