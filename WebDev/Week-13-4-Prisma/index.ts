import { PrismaClient } from "./generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const client = new PrismaClient({ adapter });

async function createUser() {
  const user = await client.user.findFirst({
    where: {
      id: 1,
    },
    include: {
        todos: true
    } 
  });
  console.log(user);
}

createUser();

