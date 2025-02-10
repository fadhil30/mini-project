import Footer from "@/components/footer";
import Header from "@/components/header";
import Image from "next/image";
import Link from "next/link";

export default async function EventPage() {
  const eventResponse = await fetch("http://localhost:8000/events");
  const events = await eventResponse.json();
  const categoryResponse = await fetch("http://localhost:8000/categories");
  const categories = await categoryResponse.json();

  const formatEventDate = (isoString) => {
    const date = new Date(isoString);
    return date.toISOString().split("T")[0]; // Hanya mengambil tanggal (YYYY-MM-DD)
  };

  const formatEventTime = (isoString) => {
    const date = new Date(isoString);
    // Mengubah waktu ke GMT+7
    date.setHours(date.getHours() + 7); // Menambahkan 7 jam untuk GMT+7
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); // Menampilkan jam dalam format HH:MM
  };

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
            {categories.data.map((category, index) => (
              <div key={index}>
                <ul className="space-y-2">
                  <li>
                    <label>
                      <input type="checkbox" className="mr-2" /> {category.name}
                    </label>
                  </li>
                </ul>
              </div>
            ))}
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
            {events.data.map((event, index) => (
              <Link key={index} href={`/exhibition/${event.id}`}>
                <div className="border rounded-lg shadow bg-white flex flex-col justify-between">
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
                      {event.Category.name}
                    </span>
                    <h4 className="font-bold text-lg mt-2">{event.title}</h4>
                    <p className="text-sm text-gray-500">{event.location}</p>
                    <p className="text-sm text-gray-500">
                      {formatEventDate(event.eventSchedule)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatEventTime(event.eventSchedule)}
                    </p>
                  </div>
                  <div className="p-4 border-t mt-auto">
                    <p className="font-bold text-lg">{`Rp. ${event.ticketPrice}`}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
}
