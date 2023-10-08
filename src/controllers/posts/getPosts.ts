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
			throw new Error(`Error getting post with id - ${postId}`);
		}
    
  return res.status(200).json({
    message: result,
  });
}
