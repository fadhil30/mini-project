import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

async function seedCategories() {
  console.log("🌱 Seeding categories...");

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
        create: user,
      })
    )
  );

  console.log("✅ Users seeded!");
}

async function main() {
  try {
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

//seed error
