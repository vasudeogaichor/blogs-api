import { Request, Response, NextFunction } from "express";
import db from "../../database/connection";

export default async function listPosts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const criteria = req.query;
  
  const result: any = await db.posts.findAll();

  if (!result.length) {
    // throw new Error(`Error getting posts!`);
    return res.status(404).json({
      error: `Error getting posts!`
    })
  }

  return res.status(200).json({
    message: result,
  });
}
