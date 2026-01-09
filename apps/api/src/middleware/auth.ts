import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import { ensureUser } from "./ensureUser";

import { Request, Response, NextFunction } from "express";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("SUPABASE_URL or SUPABASE_ANON_KEY missing");
}

const client = jwksClient({
  jwksUri: `${supabaseUrl}/auth/v1/.well-known/jwks.json`,
  requestHeaders: {
    apikey: supabaseAnonKey,
  },
  cache: true,
  rateLimit: true,
});

function getKey(header: jwt.JwtHeader, callback: jwt.SigningKeyCallback) {
  if (!header.kid) {
    callback(new Error("Missing kid"));
    return;
  }

  client.getSigningKey(header.kid, (err, key) => {
    if (err || !key) {
      console.error("JWKS ERROR:", err);
      callback(err || new Error("Key not found"));
      return;
    }

    callback(null, key.getPublicKey());
  });
}

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.replace("Bearer ", "");

  jwt.verify(
    token,
    getKey,
    { algorithms: ["ES256"], issuer: `${supabaseUrl}/auth/v1` },
    async (err, decoded) => {
      if (err) return res.sendStatus(401);

      (req as any).user = decoded;
      await ensureUser(decoded);
      next();
    }
  );
}
