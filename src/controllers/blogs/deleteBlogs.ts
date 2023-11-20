import { Request, Response, NextFunction } from "express";
import db from "../../database/connection";

export default async function deleteBlogs(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const blogId: Number = parseInt(req.params.id);

  const result: any = await db.blogs.findByPk(blogId);

  if (!result) {
    return res.status(404).json({
      error: `Blog with id ${blogId} does not exist`
    });
  }

  const deletedRecord: any = await result.destroy();

  if (!deletedRecord.deleted_at) {
    return res.status(400).json({
      error: `Error deleting blog with id ${blogId}`
    });
  }

  return res.status(204).json({
    message: "Blog deleted successfully",
  });
}
