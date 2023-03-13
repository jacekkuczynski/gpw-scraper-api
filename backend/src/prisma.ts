import { PrismaClient } from "@prisma/client";

export const saveAllCompaniesDataToDatabase = async (
  allCompaniesDataArray: any[]
) => {
  const prisma = new PrismaClient();
  async function main() {
    const company = await prisma.company.createMany({
      data: allCompaniesDataArray,
    });
  }

  await main()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
};

export const readAllCompaniesData = async () => {
  const prisma = new PrismaClient();
  async function main() {
    const allCompaniesData = await prisma.company.findMany();
    return allCompaniesData;
  }

  return await main()
    .then(async (data) => {
      await prisma.$disconnect();
      return data;
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
};
