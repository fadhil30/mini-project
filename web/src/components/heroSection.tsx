export default function HeroSection() {
  return (
    <section className="flex items-center justify-center bg-[url('/hero-bg.png')] bg-cover bg-center py-12 text-white">
      <div className="text-center pt-24">
        <div className="text-left">
          <h1 className="font-montserrat font-bold text-5xl">
            Don&apos;t Miss out!
          </h1>
          <h1 className="font-montserrat font-bold text-5xl mt-4">
            Explore the <span className="text-[#FFE047]">vibrant events</span>{" "}
            happening locally
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
    </section>
  );
}
