import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface TokenInterface {
  user: {
    user_id: number;
    email: string;
  };
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY as string);
    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).end("Not authorized");
    }
    return res.status(400).end("Not authorized");
  }
};

export default verifyToken;
