import { Request, Response, NextFunction } from "express";
import { Transaction } from "sequelize";
import db from "../../database/connection";

export default async function createPosts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // get the data from req.body
  const title: string = req.body.title;
  const content: string = req.body.content;
  // add the post
  const t: Transaction = await db.sequelize.transaction();

  let result = null;
  try {
    result = await db.posts.create(
      {
        title,
        content,
      },
      { transaction: t }
    );

    await t.commit();
  } catch (err) {
    await t.rollback();

    throw new Error(`Post creation failed with error- ${err}`);
  }
  // return response
  console.log('result - ', result);
  return res.status(200).json({
    message: result,
  });
}
