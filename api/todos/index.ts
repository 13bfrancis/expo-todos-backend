import { VercelRequest, VercelResponse } from "@vercel/node";
import { isAuthenticated } from "../../libs/auth";

export const handler = async (req: VercelRequest, res: VercelResponse) => {
  console.log("hello world");
  if (!(await isAuthenticated(req)))
    return res.json({
      error: "error",
    });

  return res.json({
    hello: "world",
  });
};

export default handler;
