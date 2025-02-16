import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.review.deleteMany();
  await prisma.ticket.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.promotion.deleteMany();
  await prisma.event.deleteMany();
  await prisma.confirmToken.deleteMany();
  await prisma.point.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.wallet.deleteMany();
  await prisma.category.deleteMany();
  await prisma.promotor.deleteMany();
  await prisma.user.deleteMany();

  // Create Users
  const passwordHash = await bcrypt.hash("password123", 10);
  const users = await prisma.user.createMany({
    data: [
      {
        fullName: "Alice",
        email: "alice@example.com",
        password: passwordHash,
        referralCode: "REF123",
      },
      {
        fullName: "Bob",
        email: "bob@example.com",
        password: passwordHash,
        referralCode: "REF456",
      },
      {
        fullName: "Charlie",
        email: "charlie@example.com",
        password: passwordHash,
        referralCode: "REF789",
      },
    ],
    skipDuplicates: true,
  });

  const userList = await prisma.user.findMany();

  // Create Promotors
  const promotor1 = await prisma.promotor.create({
    data: {
      fullName: "John Doe",
      email: "johndoe@example.com",
      password: passwordHash,
    },
  });

  const promotor2 = await prisma.promotor.create({
    data: {
      fullName: "Jane Smith",
      email: "janesmith@example.com",
      password: passwordHash,
    },
  });

  // Create Categories
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

  // Create Events
  const event1 = await prisma.event.create({
    data: {
      title: "The Grand Music Festival",
      image:
        "https://res.cloudinary.com/dwtjculny/image/upload/v1738738374/muneeb-syed-4_M8uIfPEZw-unsplash_aprvfh.jpg",
      description:
        "Get ready for an unforgettable weekend of live performances, electrifying music, and a vibrant festival atmosphere at The Grand Music Festival! This event brings together top local and international artists, with performances spanning multiple genres including rock, pop, hip-hop, and indie music. Enjoy food stalls, merchandise, and interactive activities throughout the festival.",
      location: "City Park",
      eventSchedule: new Date("2025-05-10T18:00:00Z"),
      ticketPrice: 150000.0,
      ticketAvailability: 1000,
      categoryId: CategoryEnt.id,
      promotorId: promotor1.id,
      host: "City Events",
      eventType: "TICKETED",
    },
  });

  const event2 = await prisma.event.create({
    data: {
      title: "Tech Conference",
      image:
        "https://res.cloudinary.com/dwtjculny/image/upload/v1738739066/teemu-paananen-bzdhc5b3Bxs-unsplash_sfgcxv.jpg",
      description: "A conference about the latest in technology.",
      location: "Convention Center",
      eventSchedule: new Date("2025-03-15T10:00:00Z"),
      ticketPrice: 150000.0,
      ticketAvailability: 100,
      categoryId: CategoryTech.id,
      promotorId: promotor1.id,
      host: "Tech Inc.",
      eventType: "TICKETED",
    },
  });

  const event3 = await prisma.event.create({
    data: {
      title: "Health Workshop",
      image:
        "https://res.cloudinary.com/dwtjculny/image/upload/v1739182814/britt-gaiser-hSAlu33padA-unsplash_obxvxg.jpg",
      description: "A workshop on healthy eating habits.",
      location: "Community Hall",
      eventSchedule: new Date("2025-04-20T14:00:00Z"),
      ticketPrice: 50000.0,
      ticketAvailability: 50,
      categoryId: CategoryEdu.id,
      promotorId: promotor2.id,
      host: "Healthy Living",
      eventType: "TICKETED",
    },
  });

  const event4 = await prisma.event.create({
    data: {
      title: "Art Exhibition",
      image:
        "https://res.cloudinary.com/dwtjculny/image/upload/v1739183197/dario-daniel-silva-RyUOtzoTkZk-unsplash_k7u6xp.jpg",
      description: "An exhibition of contemporary art pieces.",
      location: "Art Gallery",
      eventSchedule: new Date("2025-06-15T10:00:00Z"),
      ticketPrice: 30000.0,
      ticketAvailability: 200,
      categoryId: CategoryArt.id,
      promotorId: promotor1.id,
      host: "Art Society",
      eventType: "TICKETED",
    },
  });

  const event5 = await prisma.event.create({
    data: {
      title: "Sports Day",
      image:
        "https://res.cloudinary.com/dwtjculny/image/upload/v1739182840/md-duran-rE9vgD_TXgM-unsplash_nfcgbs.jpg",
      description:
        "A day filled with various sports activities and competitions.",
      location: "Sports Stadium",
      eventSchedule: new Date("2025-07-20T09:00:00Z"),
      ticketPrice: 75000.0,
      ticketAvailability: 300,
      categoryId: CategorySport.id,
      promotorId: promotor2.id,
      host: "Sports Club",
      eventType: "TICKETED",
    },
  });

  const event6 = await prisma.event.create({
    data: {
      title: "Free Music Festival",
      image:
        "https://res.cloudinary.com/dwtjculny/image/upload/v1739182960/andraz-lazic-NhZtol0U0dE-unsplash_r2ev3v.jpg",
      description: "A free music festival with local artists.",
      location: "City Park",
      eventSchedule: new Date("2025-08-10T18:00:00Z"),
      ticketPrice: 0.0,
      ticketAvailability: 0,
      categoryId: CategoryEnt.id,
      promotorId: promotor1.id,
      host: "City Events",
      eventType: "FREE",
    },
  });

  // Create Promotions
  const promotion1 = await prisma.promotion.create({
    data: {
      promotionCode: "PROMO10",
      title: "10% Discount",
      description: "Get 10% off your next purchase.",
      discountRate: 0.1,
      stock: 20,
      eventId: event1.id,
      expiredDate: new Date("2025-03-31T23:59:59Z"),
    },
  });

  const promotion2 = await prisma.promotion.create({
    data: {
      promotionCode: "PROMO20",
      title: "20% Discount",
      description: "Get 20% off your next purchase.",
      discountRate: 0.2,
      stock: 15,
      eventId: event2.id,
      expiredDate: new Date("2025-04-30T23:59:59Z"),
    },
  });

  // Create Coupons
  const coupon1 = await prisma.coupon.create({
    data: {
      code: "COUPON123",
      discountRate: 10,
      used: false,
      userId: userList[0].id,
      expiredDate: new Date("2025-12-31T23:59:59Z"),
    },
  });

  const coupon2 = await prisma.coupon.create({
    data: {
      code: "COUPON456",
      discountRate: 15,
      used: false,
      userId: userList[1].id,
      expiredDate: new Date("2025-12-31T23:59:59Z"),
    },
  });

  // Create Transactions
  const transaction1 = await prisma.transaction.create({
    data: {
      userId: userList[0].id,
      eventId: event1.id,
      amount: 150.0,
    },
  });

  const transaction2 = await prisma.transaction.create({
    data: {
      userId: userList[1].id,
      eventId: event2.id,
      amount: 150.0,
    },
  });

  // Create Tickets
  const ticket1 = await prisma.ticket.create({
    data: {
      ticketCode: crypto.randomBytes(20).toString("hex"),
      totalPrice: 150.0,
      transactionId: transaction1.id,
    },
  });

  const ticket2 = await prisma.ticket.create({
    data: {
      ticketCode: crypto.randomBytes(20).toString("hex"),
      totalPrice: 150.0,
      transactionId: transaction2.id,
    },
  });

  // Create Wallets
  const wallet1 = await prisma.wallet.create({
    data: {
      userId: userList[0].id,
      balance: 1000000.0,
    },
  });

  const wallet2 = await prisma.wallet.create({
    data: {
      userId: userList[1].id,
      balance: 500000.0,
    },
  });

  // Create Points
  const point1 = await prisma.point.create({
    data: {
      balance: 100,
      userId: userList[0].id,
      expiresAt: new Date("2025-12-31T23:59:59Z"),
    },
  });

  const point2 = await prisma.point.create({
    data: {
      balance: 50,
      userId: userList[1].id,
      expiresAt: new Date("2025-12-31T23:59:59Z"),
    },
  });

  // Create Reviews
  const review1 = await prisma.review.create({
    data: {
      userId: userList[0].id,
      eventId: event1.id,
      rating: 5,
      feedback: "Great conference, learned a lot!",
      createdAt: new Date("2025-03-16T12:00:00Z"),
    },
  });

  const review2 = await prisma.review.create({
    data: {
      userId: userList[1].id,
      eventId: event2.id,
      rating: 4,
      feedback: "Very informative workshop.",
      createdAt: new Date("2025-04-21T16:00:00Z"),
    },
  });

  // Create ConfirmTokens
  const confirmToken1 = await prisma.confirmToken.create({
    data: {
      token: crypto.randomBytes(20).toString("hex"),
      expiredDate: new Date(Date.now() + 1000 * 66 * 60 * 24),
      userId: userList[0].id,
      promotorId: promotor1.id,
    },
  });

  const confirmToken2 = await prisma.confirmToken.create({
    data: {
      token: crypto.randomBytes(20).toString("hex"),
      expiredDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
      userId: userList[1].id,
      promotorId: promotor2.id,
    },
  });

  console.log("Seed data successfully inserted");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
