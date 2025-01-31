export default function SubscribeSection() {
  return (
    <section>
      <div className="text-center px-6 py-10 bg-[#FFE047]">
        <h3 className="text-2xl font-bold mb-4">Subscribe to our Newsletter</h3>
        <p className="text-sm mb-6">
          Receive our weekly newsletter & updates with new events from your
          favourite organizers & venues.
        </p>
        <div className="flex justify-center items-center">
          <input
            type="email"
            placeholder="Enter your e-mail address"
            className="px-4 py-2 rounded-l-lg text-gray-700 w-full max-w-md focus:outline-none"
          />
          <button className="bg-black text-white px-6 py-2 rounded-r-lg hover:bg-gray-800 transition">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}
