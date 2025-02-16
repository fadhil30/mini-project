"use client"; // Mengaktifkan komponen sebagai Client Component

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function EventPage() {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State untuk search
  const [searchTerm, setSearchTerm] = useState(""); // State untuk menampilkan hasil search

  // Fetch data dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventResponse = await fetch("http://localhost:8000/events");
        const eventData = await eventResponse.json();
        setEvents(eventData.data);
        const categoryResponse = await fetch("http://localhost:8000/category");
        const categoryData = await categoryResponse.json();
        setCategories(categoryData.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // Fungsi untuk menangani perubahan checkbox
  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Fungsi untuk menangani pencarian hanya ketika tombol enter ditekan
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(searchQuery);
  };

  // Filter event berdasarkan kategori yang dipilih
  let filteredEvents =
    selectedCategories.length > 0
      ? events.filter((event) => selectedCategories.includes(event.categoryId))
      : events;

  // Filter event berdasarkan search term
  filteredEvents = searchTerm
    ? filteredEvents.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredEvents;

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
      <div className="flex items-center justify-center bg-[url('/hero-event-bg.png')] bg-cover bg-center py-12 text-white">
        <div className="text-center pt-24">
          <h1 className="font-montserrat font-bold text-4xl">
            Explore a world of events. Find what excites you!
          </h1>
          <form
            className="mt-14 flex justify-center"
            onSubmit={handleSearchSubmit}
          >
            <input
              type="text"
              placeholder="Search for events"
              className="w-4/5 px-4 py-3 rounded-lg text-black focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
      </div>

      <div className="flex px-6 py-8">
        {/* Sidebar Filter */}
        <aside className="w-1/4 p-6">
          <h3 className="font-bold text-lg mb-6">Filters</h3>
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Category</h4>
            {categories.map((category) => (
              <div key={category.id} className="mb-2">
                <label>
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCategoryChange(category.id)}
                  />
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        </aside>

        {/* Event Cards */}
        <div className="w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold">Events</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents?.length > 0 ? (
              filteredEvents.map((event) => (
                <Link key={event.id} href={`/exhibition/${event.id}`}>
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
                      <span className="text-sm text-gray-500 pt-2">
                        {formatEventDate(event.eventSchedule)}
                      </span>
                      <h3 className="text-lg font-bold mt-2">{event.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {event.location}
                      </p>
                      <p className="text-sm text-gray-600">
                        {formatEventTime(event.eventSchedule)}
                      </p>
                      <div className="pt-2 border-t mt-4">
                        <p className="font-bold text-lg text-[#287921]">
                          {event.ticketPrice === 0
                            ? "FREE"
                            : `Rp. ${event.ticketPrice.toLocaleString()}`}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-3">
                No events found.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
