import { VercelRequest, VercelResponse } from "@vercel/node";
import { isAuthenticated } from "../../libs/auth";
import { prisma } from "../../libs/db";

export const handler = async (req: VercelRequest, res: VercelResponse) => {
  const user = await isAuthenticated(req);
  if (!user) {
    return res.json({
      error: "error",
    });
  }

  if (req.method === "POST") {
    const list = req.body;

    console.log(list.name, user.sub!);

    const newList = await prisma.list.create({
      data: {
        name: list.name,
        userId: user.sub!,
      },
    });

    return res.json(newList);
  }

  if (req.method === "GET") {
    const lists = await prisma.list.findMany({
      where: {
        userId: user.sub!,
      },
    });

    return res.json(lists);
  }

  return res.json({
    hello: "world",
  });
};

export default handler;
