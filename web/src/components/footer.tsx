import Image from "next/image";

export default async function Footer() {
  const response = await fetch("http://localhost:8000/categories");
  const categories = await response.json();

  return (
    <footer>
      <div className="bg-[#232536] text-white py-10 px-6">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          <div>
            <h4 className="font-bold mb-4">Company Info</h4>
            <ul className="space-y-2 text-sm">
              <li>About Us</li>
              <li>Contact Us</li>
              <li>Careers</li>
              <li>FAQs</li>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Help</h4>
            <ul className="space-y-2 text-sm">
              <li>Account Support</li>
              <li>Listing Events</li>
              <li>Event Ticketing</li>
              <li>Ticket Purchase Terms & Conditions</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Categories</h4>
            {categories.data.map((category, index) => (
              <ul key={index} className="space-y-2 text-sm">
                <li>{category.name}</li>
              </ul>
            ))}
          </div>
          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <ul className="space-y-2 text-sm">
              <li>Facebook</li>
              <li>Instagram</li>
              <li>Twitter</li>
              <li>Youtube</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Download The App</h4>
            <ul className="space-y-4">
              <li>
                <button className="flex items-center space-x-2 border px-4 py-2 rounded-lg hover:bg-gray-700 w-[243px] h-[78px]">
                  <div className="relative h-12 w-12">
                    <Image
                      src="/google-play-icon.svg"
                      alt="Google Play"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-sm">Get it on Google Play</span>
                </button>
              </li>
              <li>
                <button className="flex items-center space-x-2 border px-4 py-2 rounded-lg hover:bg-gray-700 w-[243px] h-[78px]">
                  <div className="relative h-12 w-12">
                    <Image
                      src="/app-store-icon.svg"
                      alt="App Store"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-sm">Download on the App Store</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center text-sm mt-10 border-t border-gray-700 pt-6">
          &copy;2023 Eventify. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
