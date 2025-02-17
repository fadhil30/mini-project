import Image from "next/image";

export default async function CategorySection() {
  const response = await fetch("http://localhost:8000/category");
  const categories = await response.json();

  return (
    <section className="py-12 px-4 md:px-20 font-montserrat">
      <h2 className="text-3xl md:text-4xl font-bold text-left mb-8 md:mb-12">
        Explore Categories
      </h2>
      <div className="flex flex-wrap justify-center gap-4 md:gap-8">
        {categories.data.map((category, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shadow-md">
              <Image
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
                fill
              />
            </div>
            <p className="mt-2 md:mt-4 text-center font-medium text-sm md:text-base">
              {category.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
