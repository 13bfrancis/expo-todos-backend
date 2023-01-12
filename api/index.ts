import { VercelRequest, VercelResponse } from "@vercel/node";
import { isAuthenticated } from "../libs/auth";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!(await isAuthenticated(req))) return res.json({ status: "error" });

  res.json({
    hello: "world",
  });
}
