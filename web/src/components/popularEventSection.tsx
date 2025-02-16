import Image from "next/image";
import Link from "next/link";

export default async function PopularEvent() {
  const response = await fetch("http://localhost:8000/events");
  const events = await response.json();

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

  // Membatasi jumlah event maksimal 6
  const limitedEvents = events.data.slice(0, 6);

  return (
    <section className="py-12 px-4 md:px-20 font-montserrat">
      <h2 className="text-3xl font-bold text-left mb-8">Popular Events</h2>
      {/* Event Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {limitedEvents.map((event) => (
          <Link key={event.id} href={`/exhibition/${event.id}`}>
            <div className="border rounded-lg overflow-hidden shadow-md bg-white">
              <div className="relative w-full h-40">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
                <span className="absolute top-2 left-2 bg-yellow-400 text-black px-2 py-1 text-xs rounded">
                  {event.Category.name}
                </span>
                <button className="absolute top-2 right-2 bg-white p-1 rounded-full shadow w-10 h-12">
                  <Image
                    src="/favorite-off-icon.svg"
                    alt="favorite button"
                    fill
                  />
                </button>
              </div>
              <div className="p-4">
                <span className="text-sm text-gray-500">
                  {formatEventDate(event.eventSchedule)} {/* Format tanggal */}
                </span>
                <h3 className="text-lg font-bold mt-2">{event.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{event.location}</p>
                <p className="text-sm text-gray-600">
                  {formatEventTime(event.eventSchedule)}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-bold text-[#287921]">
                    {event.price}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Link
          href={"/exhibition"}
          className="px-6 py-2 border rounded-lg hover:bg-gray-100 focus:outline-none"
        >
          See More
        </Link>
      </div>
    </section>
  );
}
