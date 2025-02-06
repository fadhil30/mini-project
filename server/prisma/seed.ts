import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
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

  for (const user of users) {
    try {
      await prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: {
          fullName: user.fullName,
          email: user.email,
          password: user.password,
          role: user.role,
          referralCode: user.referralCode, // Tambahkan referralCode
          createdAt: user.createdAt,
        },
      });
      console.log(`✅ Inserted user: ${user.email} | Referral Code: ${user.referralCode}`);
    } catch (error) {
      console.error(`❌ Error inserting ${user.email}:`, error);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
