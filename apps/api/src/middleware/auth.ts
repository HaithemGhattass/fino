import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import { Request, Response, NextFunction } from "express";

const client = jwksClient({
  jwksUri: `${process.env.SUPABASE_URL}/auth/v1/keys`,
});

function getKey(header: any, callback: any) {
  client.getSigningKey(header.kid, (err, key) => {
    callback(null, key?.getPublicKey());
  });
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.sendStatus(401);

  jwt.verify(token, getKey, {}, (err, decoded) => {
    if (err) return res.sendStatus(401);
    (req as any).user = decoded;
    next();
  });
}
