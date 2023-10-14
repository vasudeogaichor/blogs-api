import { Request, Response, NextFunction } from "express";
import db from "../../database/connection";
// @TODO - change the type of postToUpdate to model Post
// import { Post } from "../database/models/posts";

export default async function updatePosts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const postId: Number = parseInt(req.params.id);
  try {
    const title: string | undefined = req.body.title;

    const content: string | undefined = req.body.content;

    let postToUpdate: any = await db.posts.findByPk(postId);

    if (!postToUpdate) {
      return res.status(404).json({
        error: `Post with id ${postId} not found.`,
      });
    }

    const updatedFields: { title?: string; content?: string } = {};

    if (title) {
      updatedFields.title = title;
    }

    if (content) {
      updatedFields.content = content;
    }

    await postToUpdate.update(updatedFields);

    return res.status(201).json({
      message: postToUpdate,
    });
  } catch (err) {
    return res.status(400).json({
      error: `Failed to update post with id ${postId}`,
    });
  }
}
