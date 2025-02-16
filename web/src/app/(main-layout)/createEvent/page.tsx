"use client";
import { Categories } from "@/types/category";
import React, { useState, useEffect } from "react";

const EventForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    categoryId: "",
    description: "",
    eventStartDate: "",
    eventStartTime: "",
    location: "",
    ticketAvailability: "",
    ticketPrice: "0",
    image: null as File | null,
    eventType: "TICKETED",
  });

  const [categories, setCategories] = useState<Categories[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("http://localhost:8000/category");
      const data = await response.json();
      setCategories(data.data);
    };

    fetchCategories();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFormData({
      ...formData,
      image: file || null,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 md:p-12 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Create Event
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="w-full md:w-1/2">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="w-full md:w-1/2">
              <label
                htmlFor="categoryId"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
              rows={4}
            />
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="w-full md:w-1/2">
              <label
                htmlFor="eventStartDate"
                className="block text-sm font-medium text-gray-700"
              >
                Event Start Date
              </label>
              <input
                type="date"
                id="eventStartDate"
                name="eventStartDate"
                value={formData.eventStartDate}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="w-full md:w-1/2">
              <label
                htmlFor="eventStartTime"
                className="block text-sm font-medium text-gray-700"
              >
                Event Start Time
              </label>
              <input
                type="time"
                id="eventStartTime"
                name="eventStartTime"
                value={formData.eventStartTime}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="w-full md:w-1/2">
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="w-full md:w-1/2">
              <label
                htmlFor="ticketAvailability"
                className="block text-sm font-medium text-gray-700"
              >
                Ticket Availability
              </label>
              <input
                type="number"
                id="ticketAvailability"
                name="ticketAvailability"
                value={formData.ticketAvailability}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="w-full md:w-1/2">
              <label
                htmlFor="ticketPrice"
                className="block text-sm font-medium text-gray-700"
              >
                Ticket Price
              </label>
              <input
                type="number"
                id="ticketPrice"
                name="ticketPrice"
                value={formData.ticketPrice}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="w-full md:w-1/2">
              <label
                htmlFor="eventType"
                className="block text-sm font-medium text-gray-700"
              >
                Event Type
              </label>
              <select
                id="eventType"
                name="eventType"
                value={formData.eventType}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
              >
                <option value="TICKETED">Ticketed</option>
                <option value="FREE">Free</option>
              </select>
            </div>
          </div>
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Event Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              className="mt-1 p-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
