import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.event.deleteMany();
  await prisma.category.deleteMany();

  const CategoryEnt = await prisma.category.create({
    data: {
      name: "Entertainment",
      image:
        "https://res.cloudinary.com/dwtjculny/image/upload/v1738661628/blog/images/shidwejnbu0xckqxphwf.jpg",
    },
  });

  const CategoryEdu = await prisma.category.create({
    data: {
      name: "Education & Business",
      image:
        "https://res.cloudinary.com/dwtjculny/image/upload/v1738661950/blog/images/fmacmq5xz3aubxzkktuh.jpg",
    },
  });

  const CategoryArt = await prisma.category.create({
    data: {
      name: "Art & Culture",
      image:
        "https://res.cloudinary.com/dwtjculny/image/upload/v1738662035/blog/images/nyxn2xvj7e9powsxta43.jpg",
    },
  });

  const CategorySport = await prisma.category.create({
    data: {
      name: "Sports & Fitness",
      image:
        "https://res.cloudinary.com/dwtjculny/image/upload/v1738662166/blog/images/nw0islqf0jfvjj5on6hb.jpg",
    },
  });

  const CategoryTech = await prisma.category.create({
    data: {
      name: "Technology & Innovation",
      image:
        "https://res.cloudinary.com/dwtjculny/image/upload/v1738662197/blog/images/hagaevxffskefxhhha0m.jpg",
    },
  });

  const CategoryTravel = await prisma.category.create({
    data: {
      name: "Travel & Adventure",
      image:
        "https://res.cloudinary.com/dwtjculny/image/upload/v1738662238/blog/images/ccpupzzyy2lgbrw91rca.jpg",
    },
  });

  await prisma.event.createMany({
    data: [
      {
        title: "The Grand Music Festival",
        image:
          "https://res.cloudinary.com/dwtjculny/image/upload/v1738738374/muneeb-syed-4_M8uIfPEZw-unsplash_aprvfh.jpg",
        description:
          "Get ready for an unforgettable weekend of live performances, electrifying music, and a vibrant festival atmosphere at The Grand Music Festival! This event brings together top local and international artists, with performances spanning multiple genres including pop, rock, EDM, and jazz. Whether you’re here to dance, sing along, or simply soak in the electric vibe, there's something for everyone.\nWith stunning stage setups, state-of-the-art sound systems, and light shows that will leave you in awe, this festival is one you do not want to miss. Experience the thrill of being part of a crowd of music lovers, and create memories that will last a lifetime.",
        location: "Ancol Beach, North Jakarta, Indonesia",
        eventSchedule: "2024-06-15T16:00:00.000Z",
        categoryId: CategoryEnt.id,
        host: "Live Nation Indonesia",
        eventType: "TICKETED",
        ticketPrice: 450000,
        ticketAvailability: 1000,
      },
      {
        title: "Tech Innovators Summit",
        image:
          "https://res.cloudinary.com/dwtjculny/image/upload/v1738739066/teemu-paananen-bzdhc5b3Bxs-unsplash_sfgcxv.jpg",
        description:
          "Join the Tech Innovators Summit, a premier event bringing together the brightest minds in technology, innovation, and entrepreneurship. This summit features inspiring keynotes, interactive workshops, and networking opportunities with industry leaders and tech startups. Discover the latest trends in AI, blockchain, robotics, and the Internet of Things (IoT) while gaining insights from top thought leaders.\nWhether you're a developer, entrepreneur, or technology enthusiast, this event will leave you with invaluable knowledge and connections. Get ready to be inspired and see what the future of technology holds!",
        location: "Grand Hyatt Jakarta, Indonesia",
        eventSchedule: "2024-07-20T08:00:00.000Z",
        categoryId: CategoryTech.id,
        host: "Tech Innovators Summit",
        eventType: "FREE",
        ticketPrice: 0,
        ticketAvailability: 1500,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
  });
