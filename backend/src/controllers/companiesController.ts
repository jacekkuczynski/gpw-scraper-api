import { prisma } from "..";
import { readAllCompaniesData } from "../prisma";

export const getAllCompaniesData = async (req, res) => {
  try {
    const isAll = req.query.all;
    if (isAll) {
      const allCompaniesData = await readAllCompaniesData(prisma);
      res.json(allCompaniesData);
    } else {
      res.status(418).json({ error: "error" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
