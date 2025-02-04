"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Image from "next/image";
import React, { useState, ChangeEvent, FormEvent } from "react";

const EventForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    date: "",
    time: "",
    location: "",
    capacity: "",
    price: "",
    isOnline: false,
    tags: "",
    image: null,
    eventType: "ticketed", // New state for ticketing
    ticketName: "",
    ticketPrice: "",
  });

  const categories = [
    "Conference",
    "Workshop",
    "Seminar",
    "Concert",
    "Exhibition",
    "Sports",
    "Entertainment",
    "Other",
  ];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked, files } = e.target as HTMLInputElement &
      HTMLSelectElement &
      HTMLTextAreaElement;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? (files && files[0]) || null
          : value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    // Add submission logic (e.g., send data to a server)
  };

  return (
    <section className="min-h-screen">
      <Header />
      <div className="flex flex-row pl-11 pt-28 justify-start items-center gap-12 w-full">
        <div className="relative w-7 h-5">
          <Image
            src="/back-button.svg"
            alt="Back Button"
            fill
            className="object-cover"
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex-grow">
          Create a New Event
        </h2>
      </div>
      <div className="mx-auto  pb-20 px-36">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Basic Information
            </h3>
            {/* Event Title, Category, Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Event Title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Event Description"
                required
              />
            </div>
          </div>

          {/* Date and Time */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Date and Time
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Time
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Location and Capacity */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Location and Capacity
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Event Location"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  name="isOnline"
                  checked={formData.isOnline}
                  onChange={handleChange}
                  className="mr-2"
                />
                Online Event
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Capacity
              </label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Event Capacity"
                required
              />
            </div>
          </div>

          {/* Ticketing Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Ticketing</h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Event Type
              </label>
              <div className="flex items-center space-x-4 mt-2">
                <label>
                  <input
                    type="radio"
                    name="eventType"
                    value="ticketed"
                    checked={formData.eventType === "ticketed"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Ticketed Event
                </label>
                <label>
                  <input
                    type="radio"
                    name="eventType"
                    value="free"
                    checked={formData.eventType === "free"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Free Event
                </label>
              </div>
            </div>

            {formData.eventType === "ticketed" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Ticket Name
                  </label>
                  <input
                    type="text"
                    name="ticketName"
                    value={formData.ticketName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., General Admission"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Ticket Price (IDR)
                  </label>
                  <input
                    type="number"
                    name="ticketPrice"
                    value={formData.ticketPrice}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    step="1000"
                    placeholder="e.g., 50000"
                    required
                  />
                </div>
              </>
            )}
          </div>

          {/* Upload Image Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Upload Image
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Feature Image
              </label>
              <input
                type="file"
                name="image"
                accept="image/jpeg, image/png, image/gif"
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-sm text-gray-500 mt-2">
                Feature Image must be at least 1170 pixels wide by 504 pixels
                high. Valid file formats: JPG, GIF, PNG.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="px-6 py-2 bg-[#2B293D] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </section>
  );
};

export default EventForm;
