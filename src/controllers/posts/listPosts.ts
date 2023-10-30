import { Request, Response, NextFunction } from "express";
import db from "../../database/connection";

export default async function listPosts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const criteria = req.query;
  
  console.log('criteria - ', criteria)
  const where: { [key: string]: any } = {};

  if (criteria?.id) {
    where.id = criteria.id;
  }
  console.log('where - ', where)
  const result: any = await db.posts.findAll({ where });

  if (!result.length) {
    // throw new Error(`Error getting posts!`);
    return res.status(404).json({
      error: `Error getting posts!`,
    });
  }

  return res.status(200).json({
    message: result,
  });
}
