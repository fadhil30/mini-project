import Footer from "@/components/footer";
import Header from "@/components/header";
import Image from "next/image";
import Link from "next/link";

export default function EventDetailPage() {
  return (
    <section>
      <Header />
      <div className="max-w-5xl mx-auto pt-14">
        {/* Back Button */}
        <button className="mb-6 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        {/* Event Header */}
        <div className="relative w-full h-60 mb-6">
          <Image
            src="/sound-of-christmas-event.png"
            alt="Sound Of Christmas 2023"
            fill
            className="object-cover rounded-lg"
          />
        </div>

        {/* Event Title and CTA */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Sound Of Christmas 2023</h1>
          </div>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <Link href="/ticketbooking">
              <button className="bg-yellow-400 px-6 py-2 text-sm font-bold rounded-lg hover:scale-105 transition">
                Buy Tickets
              </button>
            </Link>
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L12 13.5l-5.25-5.25"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Event Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="col-span-2 space-y-6">
            {/* Date and Time */}
            <div>
              <h3 className="font-bold text-lg mb-2">Date and Time</h3>
              <p>Saturday, 2 December 2023</p>
              <p>6:30 PM - 9:30 PM</p>
              <p className="text-blue-500 hover:underline cursor-pointer">
                + Add to Calendar
              </p>
            </div>

            {/* Location */}
            <div>
              <h3 className="font-bold text-lg mb-2">Location</h3>
              <p>
                Bal Gandharva Rang Mandir, Near Junction Of 24th & 32nd Road &
                Patwardhan Park, Off Linking Road, Bandra West, Mumbai, India
              </p>
              <div className="relative w-full h-60 mt-4">
                <Image
                  src="/map.png"
                  alt="Location Map"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Hosted By */}
            <div>
              <h3 className="font-bold text-lg mb-2">Hosted by</h3>
              <div className="flex items-center gap-4">
                <Image
                  src="/host-avatar.png"
                  alt="Host Avatar"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <p className="font-bold">City Youth Movement</p>
                  <div className="flex gap-2 mt-1">
                    <button className="px-4 py-1 text-sm border rounded-lg hover:bg-gray-100">
                      Contact
                    </button>
                    <button className="px-4 py-1 text-sm border rounded-lg hover:bg-gray-100">
                      + Follow
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Description */}
            <div>
              <h3 className="font-bold text-lg mb-2">Event Description</h3>
              <p>
                Get ready to kick off the Christmas season in Mumbai with{" "}
                <strong>SOUND OF CHRISTMAS</strong> - your favourite LIVE
                Christmas concert!
              </p>
              <p className="mt-4">
                City Youth Movement invites you to the 4th edition of our annual
                Christmas festivities - by the youth and for the youth! Feat.
                your favourite worship leaders, carols, quizzes, and some
                exciting surprises!
              </p>
              <p className="mt-4">
                Bring your family and friends and sing along your favourite
                Christmas carols on the 2nd of December, 6:30 PM onwards at the
                Bal Gandharva Rang Mandir, Bandra West. Book your tickets now!
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>The FIRST Christmas concert of Mumbai!</li>
                <li>A special Christmas Choir!</li>
                <li>Special Dance performances and many more surprises!</li>
              </ul>
            </div>

            {/* Tags */}
            <div>
              <h3 className="font-bold text-lg mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-1 bg-gray-200 text-sm rounded-full">
                  Holiday Concert
                </span>
                <span className="px-4 py-1 bg-gray-200 text-sm rounded-full">
                  Live Performance
                </span>
                <span className="px-4 py-1 bg-gray-200 text-sm rounded-full">
                  Seasonal Event
                </span>
                <span className="px-4 py-1 bg-gray-200 text-sm rounded-full">
                  Family-Friendly
                </span>
                <span className="px-4 py-1 bg-gray-200 text-sm rounded-full">
                  #Christmas_Spirit
                </span>
                <span className="px-4 py-1 bg-gray-200 text-sm rounded-full">
                  @Christmas_Carols
                </span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Ticket Information */}
            <div>
              <h3 className="font-bold text-lg mb-2">Ticket Information</h3>
              <p>Standard Ticket: ₹ 200 each</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}
