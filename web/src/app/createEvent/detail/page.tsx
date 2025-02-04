import React from "react";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";

const EventReviewPage = () => {
  return (
    <section className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex flex-row pl-11 pt-28 justify-start items-center text-center gap-12 w-full">
        <div className="relative w-12 h-12">
          <Image
            src="/back-button.svg"
            alt="Back Button"
            fill
            className="object-cover"
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex-grow text-center">
          Event Title
        </h2>
      </div>

      {/* Progress Bar */}
      <div className="flex justify-between mx-11">
        <span className="text-sm text-gray-500">Edit</span>
        <span className="text-sm text-gray-500">Banner</span>
        <span className="text-sm text-gray-500">Ticketing</span>
        <span className="text-sm font-bold text-gray-800">Review</span>
      </div>

      <div className="max-w-5xl mx-auto py-8 px-12 space-y-8">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700">Event Title</h3>
          <div className="relative w-full h-48 bg-gray-200">
            <Image
              src="/event-placeholder.png"
              alt="Event Image"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Event Info */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">
              Date and Time
            </h3>
            <p className="text-gray-600">Day, Date</p>
            <p className="text-gray-600">Time</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700">
              Ticket Information
            </h3>
            <p className="text-gray-600">Ticket Type: Price</p>
            <p className="text-gray-600">Ticket: $50</p>
          </div>
        </div>

        {/* Location Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Location</h3>
          <p className="text-gray-600">Address</p>
          <div className="relative w-full h-48 bg-gray-200">
            <Image
              src="/map-placeholder.png" // Replace with actual map image or map embed
              alt="Map"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Hosted By Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Hosted by</h3>
          <p className="text-gray-600">Host Name</p>
          <button className="text-indigo-600">Contact</button>
          <button className="ml-4 text-indigo-600">+ Follow</button>
        </div>

        {/* Event Description Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700">
            Event Description
          </h3>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur. Eget vulputate socis sit
            urna sit aliquet. Vivamus facilisis diam libero dolor volutpat diam
            eu. Quis a id posuere etiam at enim vivamus. Urna nisi malesuada
            libero enim ornare in viverra.
          </p>
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex justify-between items-center py-8 px-12">
        <button className="px-6 py-2 border rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200">
          Save for Later
        </button>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Publish Event
        </button>
      </div>
      <Footer />
    </section>
  );
};

export default EventReviewPage;
