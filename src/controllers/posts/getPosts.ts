import { Request, Response, NextFunction } from "express";
import db from "../../database/connection";

export default async function getPosts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const postId: Number = parseInt(req.params.id);

  const result: any = await db.posts.findByPk(postId);

  if (!result) {
    return res.status(404).json({
      error: `Post with id ${postId} not found.`,
    });
  }

  res.locals.responseBody = {
    message: result,
  };

  res.status(200).json(res.locals.responseBody);

  // next();
}
