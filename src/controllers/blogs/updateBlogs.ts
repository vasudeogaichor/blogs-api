import { Request, Response, NextFunction } from "express";
import db from "../../database/connection";
// @TODO - change the type of blogToUpdate to model Blog
// import { Blog } from "../database/models/blogs";

export default async function updateBlogs(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const blogId: Number = parseInt(req.params.id);
  try {
    const title: string | undefined = req.body.title;

    const content: string | undefined = req.body.content;

    let blogToUpdate: any = await db.blogs.findByPk(blogId);

    if (!blogToUpdate) {
      return res.status(404).json({
        error: `Blog with id ${blogId} not found.`,
      });
    }

    const updatedFields: { title?: string; content?: string } = {};

    if (title) {
      updatedFields.title = title;
    }

    if (content) {
      updatedFields.content = content;
    }

    await blogToUpdate.update(updatedFields);

    return res.status(201).json({
      message: blogToUpdate,
    });
  } catch (err) {
    return res.status(400).json({
      error: `Failed to update blog with id ${blogId}`,
    });
  }
}
