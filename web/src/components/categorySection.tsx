import Image from "next/image";

export default async function CategorySection() {
  const response = await fetch("http://localhost:8000/api/v1/categories");
  const categories = await response.json();

  return (
    <section className="py-12 px-36 font-montserrat">
      <h2 className="text-3xl font-bold text-left mb-8">Explore Categories</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {categories.data.map((category, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="relative w-28 h-28 rounded-full overflow-hidden shadow-md">
              <Image
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
                fill
              />
            </div>
            <p className="mt-4 text-center font-medium">{category.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
