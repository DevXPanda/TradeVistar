import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const users = [
    { name: "Alice", email: "alice@example.com" },
    { name: "Bob", email: "bob@example.com" },
    { name: "Charlie", email: "charlie@example.com" },
    { name: "satyam pandey", email: "satyamkumarpandey4567@gmail.com", phone: "234932t4545" },
    { name: "panduranga", email: "satyampandey@gmail.com", phone: "12928292900" },
  ];

  for (const user of users) {
    await prisma.test.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }

  const all = await prisma.test.findMany();
  console.log("Rows in Test table:", all);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
