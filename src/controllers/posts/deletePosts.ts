import { Request, Response, NextFunction } from "express";
import db from "../../database/connection";

export default async function deletePosts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const postId: Number = parseInt(req.params.id);

  const result: any = await db.posts.findByPk(postId);

  if (!result) {
    return res.status(404).json({
      error: `Post with id ${postId} does not exist`
    });
  }

  const deletedRecord: any = await result.destroy();

  if (!deletedRecord.deleted_at) {
    return res.status(400).json({
      error: `Error deleting post with id ${postId}`
    });
  }

  return res.status(204).json({
    message: "Post deleted successfully",
  });
}
