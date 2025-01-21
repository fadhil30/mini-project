import Footer from "@/components/footer";
import Header from "@/components/header";
import Image from "next/image";

export default function EventPage() {
  const events = [
    {
      title: "Jakarta Culinary Fiesta",
      category: "Food & Drink",
      image: "/food-event.png",
      location: "Jakarta, Indonesia",
      date: "Nov 23 - 29",
      time: "7 PM - 11 PM",
      price: "Rp 1.200.000",
    },
    {
      title: "Startup Talks - Innovative Event for Founders",
      category: "Educational & Business",
      image: "/startup-talks.png",
      location: "Jakarta, Indonesia",
      date: "Dec 17",
      time: "3 PM - 6 PM",
      price: "Rp 500.000",
    },
    {
      title: "Sinful Sunday By Party Out",
      category: "Entertainment",
      image: "/sinful-sunday.png",
      location: "Bali, Indonesia",
      date: "Nov 26",
      time: "8:30 PM - 11:45 PM",
      price: "Rp 1.100.000 - Rp 2.800.000",
    },
    {
      title: "Peaceful Investing Workshop",
      category: "Educational & Business",
      image: "/investing-workshop.png",
      location: "Bandung, Indonesia",
      date: "Dec 10",
      time: "8 AM - 5 PM",
      price: "Rp 800.000",
    },
    {
      title: "Poetry and Storytelling Open Mic",
      category: "Cultural & Arts",
      image: "/open-mic.png",
      location: "Yogyakarta, Indonesia",
      date: "Dec 31",
      time: "11 AM - 2 PM",
      price: "Rp 100.000 - Rp 300.000",
    },
    {
      title: "South Jakarta Box Cricket Cup",
      category: "Sports & Fitness",
      image: "/cricket-event.png",
      location: "Jakarta, Indonesia",
      date: "Dec 16 - 17",
      time: "3 PM - 8 PM",
      price: "Rp 4.000.000",
    },
    {
      title: "MindFool Indonesia Tour - Vir Das",
      category: "Entertainment",
      image: "/mindfool-tour.png",
      location: "Surabaya, Indonesia",
      date: "Dec 24",
      time: "8 PM - 9:30 PM",
      price: "Rp 800.000 - Rp 2.500.000",
    },
    {
      title: "Indonesia 2024 Venture Capital World Summit",
      category: "Educational & Business",
      image: "/venture-summit.png",
      location: "Bali, Indonesia",
      date: "Feb 06",
      time: "9 AM - 2 PM",
      price: "Rp 20.000.000 - Rp 45.000.000",
    },
  ];

  return (
    <section className="min-h-screen">
      <Header />
      <div className="flex items-center justify-center bg-[url('/hero-event-bg.png')] bg-cover bg-center py-12 text-white">
        <div className="text-center pt-24">
          <div>
            <h1 className="font-montserrat font-bold text-4xl">
              Explore a world of events. Find what excites you!
            </h1>
          </div>
          <form className="mt-14 flex justify-center">
            <input
              type="text"
              placeholder="Search for events"
              className="w-4/5 px-4 py-3 rounded-lg text-black focus:outline-none"
            />
          </form>
        </div>
      </div>

      <div className="flex px-6 py-8">
        {/* Sidebar Filter */}
        <aside className="w-1/4 p-6">
          <h3 className="font-bold text-lg mb-6">Filters</h3>
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Price</h4>
            <ul className="space-y-2">
              <li>
                <label>
                  <input type="checkbox" className="mr-2" /> Free
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" className="mr-2" /> Paid
                </label>
              </li>
            </ul>
          </div>
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Date</h4>
            <ul className="space-y-2">
              <li>
                <label>
                  <input type="checkbox" className="mr-2" /> Today
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" className="mr-2" /> Tomorrow
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" className="mr-2" /> This Week
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" className="mr-2" /> This Weekend
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" className="mr-2" /> Pick a Date
                </label>
              </li>
            </ul>
          </div>
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Category</h4>
            <ul className="space-y-2">
              <li>Adventure Travel</li>
              <li>Art Exhibitions</li>
              <li>Auctions & Fundraisers</li>
              <li>Beer Festivals</li>
              <li>Benefit Concerts</li>
            </ul>
          </div>
        </aside>

        {/* Event Cards */}
        <div className="w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold">Events</h3>
            <select className="border px-4 py-2 rounded shadow-sm">
              <option>Relevance</option>
              <option>Date</option>
              <option>Price (Low to High)</option>
              <option>Price (High to Low)</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <div
                key={index}
                className="border rounded-lg shadow bg-white flex flex-col justify-between"
              >
                <div className="relative w-full h-40">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-4 flex-grow flex flex-col">
                  <span className="text-xs text-yellow-600 font-bold">
                    {event.category}
                  </span>
                  <h4 className="font-bold text-lg mt-2">{event.title}</h4>
                  <p className="text-sm text-gray-500">{event.location}</p>
                  <p className="text-sm text-gray-500">{event.date}</p>
                  <p className="text-sm text-gray-500">{event.time}</p>
                </div>
                <div className="p-4 border-t mt-auto">
                  <p className="font-bold text-lg">{event.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
}
