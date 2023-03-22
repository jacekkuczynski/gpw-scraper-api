import { PrismaClient } from "@prisma/client";

export const saveAllCompaniesDataToDatabase = async (
  allCompaniesDataArray: any[],
  prisma: PrismaClient
) => {
  async function main() {
    await prisma.company.createMany({
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

export const readAllCompaniesData = async (prisma: PrismaClient) => {
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

export const saveAllCompaniesInitialData = async (
  companyProfiles,
  prisma: PrismaClient
) => {
  const data = JSON.parse(JSON.stringify([...companyProfiles]));
  const parsedData = data.map((profile) => {
    profile.shareholders = JSON.stringify(profile.shareholders);
    return profile;
  });
  async function main() {
    await prisma.companyProfile.createMany({
      data: parsedData,
    });
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

export const saveCompanyInitialDataToDB = async (
  companyProfile,
  prisma: PrismaClient
) => {
  companyProfile.shareholders = JSON.stringify(companyProfile.shareholders);

  async function main() {
    await prisma.companyProfile.create({
      data: companyProfile,
    });
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

export const readCompaniesInitialData = async (prisma: PrismaClient) => {
  async function main() {
    return await prisma.companyProfile.findMany();
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

export const readCompanyProfile = async (
  prisma: PrismaClient,
  symbol: string
) => {
  async function main() {
    return await prisma.companyProfile.findUnique({
      where: { symbol: symbol },
    });
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
