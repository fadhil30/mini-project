import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

async function seedCategories() {
  console.log("🌱 Seeding categories...");


  // Clear existing categories
  await prisma.event.deleteMany();
  await prisma.category.deleteMany();


  const categoryEnt = await prisma.category.create({
    data: {
      name: "Entertainment",
      image:
        "https://res.cloudinary.com/dwtjculny/image/upload/v1738661628/blog/images/shidwejnbu0xckqxphwf.jpg",
    },
  });

  const categoryTech = await prisma.category.create({
    data: {
      name: "Technology & Innovation",
      image:
        "https://res.cloudinary.com/dwtjculny/image/upload/v1738662197/blog/images/hagaevxffskefxhhha0m.jpg",
    },
  });

  console.log("✅ Categories seeded!");
  return { categoryEnt, categoryTech };
}

async function seedEvents(categories: { categoryEnt: any; categoryTech: any }) {
  console.log("🌱 Seeding events...");
  console.log("✅ Categories for events:", categories);

  const eventsData = [
    {
      title: "The Grand Music Festival",
      image:
        "https://res.cloudinary.com/dwtjculny/image/upload/v1738738374/muneeb-syed-4_M8uIfPEZw-unsplash_aprvfh.jpg",
      description: "An amazing music festival!",
      location: "Ancol Beach, North Jakarta, Indonesia",
      eventSchedule: new Date("2024-06-15T16:00:00.000Z"),
      category: { connect: { id: categories.categoryEnt.id } }, // Perbaikan di sini
      host: "Live Nation Indonesia",
      eventType: "TICKETED",
      ticketPrice: 450000,
      ticketAvailability: 1000,
    },
    {
      title: "Tech Innovators Summit",
      image:
        "https://res.cloudinary.com/dwtjculny/image/upload/v1738739066/teemu-paananen-bzdhc5b3Bxs-unsplash_sfgcxv.jpg",
      description: "The biggest tech summit of the year!",
      location: "Grand Hyatt Jakarta, Indonesia",
      eventSchedule: new Date("2024-07-20T08:00:00.000Z"),
      category: { connect: { id: categories.categoryTech.id } }, // Perbaikan di sini
      host: "Tech Innovators Summit",
      eventType: "FREE",
      ticketPrice: 0,
      ticketAvailability: 1500,
    },
  ];


  console.log("✅ Categories seeded!");
  return {
    CategoryEnt,
    CategoryTech,
    CategoryArt,
    CategoryEdu,
    CategorySport,
    CategoryTravel,
  }; // Return categories needed for events
}

async function seedEvents(categories: {
  CategoryEnt: any;
  CategoryTech: any;
  CategoryTravel: any;
  CategoryArt: any;
  CategoryEdu: any;
  CategorySport: any;
}) {
  console.log("🌱 Seeding events...");

  await prisma.event.createMany({
    data: [
      {
        title: "The Grand Music Festival",
        image:
          "https://res.cloudinary.com/dwtjculny/image/upload/v1738738374/muneeb-syed-4_M8uIfPEZw-unsplash_aprvfh.jpg",
        description:
          "Get ready for an unforgettable weekend of live performances, electrifying music, and a vibrant festival atmosphere at The Grand Music Festival! This event brings together top local and international artists, with performances spanning multiple genres including pop, rock, EDM, and jazz. Whether you're here to dance, sing along, or simply soak in the electric vibe, there's something for everyone.\nWith stunning stage setups, state-of-the-art sound systems, and light shows that will leave you in awe, this festival is one you do not want to miss. Experience the thrill of being part of a crowd of music lovers, and create memories that will last a lifetime.",
        location: "Ancol Beach, North Jakarta, Indonesia",
        eventSchedule: new Date("2024-06-15T16:00:00.000Z"),
        categoryId: categories.CategoryEnt.id,
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
        eventSchedule: new Date("2024-07-20T08:00:00.000Z"),
        categoryId: categories.CategoryTech.id,
        host: "Tech Innovators Summit",
        eventType: "FREE",
        ticketPrice: 0,
        ticketAvailability: 1500,
      },
      {
        title: "Jakarta Art & Culture Expo",
        image:
          "https://res.cloudinary.com/dwtjculny/image/upload/v1739182814/britt-gaiser-hSAlu33padA-unsplash_obxvxg.jpg",
        description:
          "Explore the beauty of art and culture at the Jakarta Art & Culture Expo. Featuring talented artists, performers, and cultural showcases from around Indonesia, this event is perfect for art lovers and enthusiasts. Discover stunning paintings, sculptures, and performances that highlight the rich heritage of Indonesia.",
        location: "Jakarta Convention Center, Jakarta, Indonesia",
        eventSchedule: new Date("2024-07-10T10:00:00.000Z"),
        categoryId: categories.CategoryArt.id,
        host: "Indonesian Art Foundation",
        eventType: "FREE",
        ticketPrice: 0,
        ticketAvailability: 5000,
      },
      {
        title: "Bali International Film Festival",
        image:
          "https://res.cloudinary.com/dwtjculny/image/upload/v1739183197/dario-daniel-silva-RyUOtzoTkZk-unsplash_k7u6xp.jpg",
        description:
          "Experience world-class cinema at the Bali International Film Festival! This prestigious event brings together filmmakers, actors, and film enthusiasts from around the globe to celebrate the art of storytelling. Watch exclusive premieres, join panel discussions, and engage with the creative minds behind your favorite films.",
        location: "Nusa Dua, Bali, Indonesia",
        eventSchedule: new Date("2024-08-05T18:30:00.000Z"),
        categoryId: categories.CategoryEnt.id,
        host: "Bali Film Society",
        eventType: "TICKETED",
        ticketPrice: 250000,
        ticketAvailability: 750,
      },
      {
        title: "Tech Summit Asia 2024",
        image:
          "https://res.cloudinary.com/dwtjculny/image/upload/v1739182840/md-duran-rE9vgD_TXgM-unsplash_nfcgbs.jpg",
        description:
          "Join the biggest tech conference in Asia, where industry leaders, startups, and tech enthusiasts gather to discuss the latest trends and innovations. With keynote speeches from tech giants, hands-on workshops, and networking opportunities, this is the must-attend event for anyone passionate about technology and business.",
        location: "Marina Bay Sands, Singapore",
        eventSchedule: new Date("2024-09-20T09:00:00.000Z"),
        categoryId: categories.CategoryTech.id,
        host: "Tech World Summit",
        eventType: "TICKETED",
        ticketPrice: 750000,
        ticketAvailability: 2000,
      },
      {
        title: "Bromo Adventure Trail 2024",
        image:
          "https://res.cloudinary.com/dwtjculny/image/upload/v1739182960/andraz-lazic-NhZtol0U0dE-unsplash_r2ev3v.jpg",
        description:
          "Embark on an exhilarating adventure at Bromo Adventure Trail 2024! This event is perfect for outdoor enthusiasts who love trail running, hiking, and exploring breathtaking landscapes. Experience the stunning views of Mount Bromo while testing your endurance on one of the most scenic trails in Indonesia.",
        location: "Mount Bromo, East Java, Indonesia",
        eventSchedule: new Date("2024-10-15T05:30:00.000Z"),
        categoryId: categories.CategorySport.id,
        host: "Bromo Trail Runners",
        eventType: "TICKETED",
        ticketPrice: 300000,
        ticketAvailability: 500,
      },
    ],
  });

  for (const event of eventsData) {
    try {
      await prisma.event.create({ data: event });
      console.log(`✅ Event created: ${event.title}`);
    } catch (error) {
      console.error(`❌ Error creating event ${event.title}:`, error);
    }
  }


  console.log("✅ Events seeded!");
}

async function seedUsers() {
  console.log("🌱 Seeding users...");

  const users = [
    {
      fullName: "Ali Budi",
      email: "ali.budi@email.com",
      password: await bcrypt.hash("password123", 10),
      role: Role.CUSTOMER,
      referralCode: uuidv4(),
      createdAt: new Date(),
    },
    {
      fullName: "Siti Nurhaliza",
      email: "siti.nurhaliza@email.com",
      password: await bcrypt.hash("securepass", 10),
      role: Role.CUSTOMER,
      referralCode: uuidv4(),
      createdAt: new Date(),
    },
    {
      fullName: "John Doe",
      email: "john.doe@email.com",
      password: await bcrypt.hash("johndoepass", 10),
      role: Role.CUSTOMER,
      referralCode: uuidv4(),
      createdAt: new Date(),
    },
    {
      fullName: "Jane Smith",
      email: "jane.smith@email.com",
      password: await bcrypt.hash("janepass", 10),
      role: Role.CUSTOMER,
      referralCode: uuidv4(),
      createdAt: new Date(),
    },
  ];

  await Promise.all(
    users.map((user) =>
      prisma.user.upsert({
        where: { email: user.email },
        update: {},

        create: {
          fullName: user.fullName,
          email: user.email,
          password: user.password,
          role: user.role,
          referralCode: user.referralCode,
          createdAt: user.createdAt,
        },
      });
      console.log(
        `✅ Inserted user: ${user.email} | Referral Code: ${user.referralCode}`
      );
    } catch (error) {
      console.error(`❌ Error inserting ${user.email}:`, error);
    }
  }

        create: user,
      })
    )
  );


  console.log("✅ Users seeded!");
}

async function main() {
  try {

    // Seed in correct order

    console.log("🚀 Resetting database...");
    await prisma.ticket.deleteMany();
    await prisma.event.deleteMany();
    await prisma.user.deleteMany();
    await prisma.category.deleteMany();

    console.log("✅ Database reset done!");

    const categories = await seedCategories();
    await seedEvents(categories);
    await seedUsers();

    console.log("🎉 Database seeding completed!");

  } catch (error) {
    console.error("❌ Error during seeding:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
