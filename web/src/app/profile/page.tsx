import Link from "next/link";

export default function UserProfile() {
  return (
    <section>
      <div className="flex flex-row">
        <Link
          href="/"
          className="top-4 left-4 bg-white bg-opacity-75 px-3 py-2 rounded-full shadow-md hover:bg-opacity-100 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </Link>
        <h1>Profile</h1>
      </div>
      <div className="flex flex-col justify-center bg-[url('/hero-event-bg.png')] bg-cover bg-center py-12 text-white">
        <p>Username</p>
        <p>User Info</p>
        <p>User Info</p>
        <p>User Info</p>
      </div>
    </section>
  );
}
