"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Categories } from "@/types/category";
import Image from "next/image";
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
  const [categories, setCategories] = useState<Categories>();

  useEffect(() => {
    async function getCategories() {
      try {
        const response = await fetch("http://localhost:8000/category");

        const data: Categories = await response.json();

        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    }

    getCategories();
  }, []);

  async function handleSubmit() {
    console.log(formData);
    try {
      const formEvent = new FormData();
      formEvent.append("title", formData.title);
      formEvent.append("categoryId", formData.categoryId);
      formEvent.append("description", formData.description);
      // formEvent.append("date", formData.eventStartDate);
      // formEvent.append("time", formData.eventStartTime);
      formEvent.append("location", formData.location);
      formEvent.append("ticketAvailability", formData.ticketAvailability);
      formEvent.append("ticketPrice", formData.ticketPrice);
      if (formData.image) {
        formEvent.append("image", formData.image);
      }
      formEvent.append("eventType", formData.eventType);
      formEvent.append(
        "eventSchedule",
        new Date(
          `${formData.eventStartDate}T${formData.eventStartTime}`
        ).toISOString()
      );
      formEvent.append("host", "Ahmad");

      await fetch("http://localhost:8000/events", {
        method: "POST",
        body: formEvent,
      });
    } catch (error) {
      console.error(error);
    }
  }

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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
            // setFormData({
            //   title: "",
            //   categoryId: "",
            //   description: "",
            //   eventStartDate: "",
            //   eventStartTime: "",
            //   location: "",
            //   ticketAvailability: "",
            //   ticketPrice: "0",
            //   image: null as File | null,
            //   eventType: "ticketed",
            // });
          }}
          className="space-y-6"
        >
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
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
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
                id="category"
                value={formData.categoryId}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    categoryId: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled>
                  Select Category
                </option>
                {categories?.data.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
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
                id="date"
                value={formData.eventStartDate}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    eventStartDate: e.target.value,
                  }))
                }
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
                id="time"
                value={formData.eventStartTime}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    eventStartTime: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Location and Ticket Availability */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Location and Ticket Availability
            </h3>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="location"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                value={formData.location}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, location: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Event Location"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ticket Availability
              </label>
              <input
                type="number"
                id="ticketAvailability"
                value={formData.ticketAvailability}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    ticketAvailability: e.target.value,
                  }))
                }
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
                    value="TICKETED"
                    checked={formData.eventType === "TICKETED"}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        eventType: e.target.value,
                      }))
                    }
                    name="eventType"
                    className="mr-2"
                  />
                  Ticketed Event
                </label>
                <label>
                  <input
                    type="radio"
                    value="FREE"
                    checked={formData.eventType === "FREE"}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        eventType: e.target.value,
                      }))
                    }
                    className="mr-2"
                    name="eventType"
                  />
                  Free Event
                </label>
              </div>
            </div>

            {formData.eventType === "TICKETED" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Ticket Price (IDR)
                  </label>
                  <input
                    type="number"
                    name="ticketPrice"
                    value={formData.ticketPrice}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        ticketPrice: e.target.value,
                      }))
                    }
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
                id="image"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setFormData((prev) => ({ ...prev, image: file }));
                }}
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
