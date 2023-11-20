import { Request, Response, NextFunction } from "express";
import db from "../../database/connection";

export default async function getBlogs(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const blogId: Number = parseInt(req.params.id);

  const result: any = await db.blogs.findByPk(blogId);

  if (!result) {
    return res.status(404).json({
      error: `Blog with id ${blogId} not found.`,
    });
  }

  res.locals.responseBody = {
    message: result,
  };

  res.status(200).json(res.locals.responseBody);

  // next();
}
