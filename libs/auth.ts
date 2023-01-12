import type { VercelRequest } from "@vercel/node";
import { JwtPayload, verify } from "jsonwebtoken";
import jwksClient from "jwks-rsa";

export const isAuthenticated = async (req: VercelRequest) => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  const jwksUri = process.env.JWKSURI;

  if (!token || !jwksUri) return false;

  const client = jwksClient({
    jwksUri,
    timeout: 30000, // Defaults to 30s
  });

  const secret = (await client.getSigningKeys())[0].getPublicKey();

  try {
    const jwt: JwtPayload = verify(token, secret, {
      audience: process.env.AUTH0_AUDIENCE,
      issuer: process.env.AUTH0_ISSUER,
      algorithms: ["RS256"],
    }) as JwtPayload;

    return jwt;
  } catch (err) {
    console.log(err);
    return false;
  }
};
