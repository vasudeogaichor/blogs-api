import { Request, Response, NextFunction } from "express";
import { Transaction } from "sequelize";
import db from "../../database/connection";

export default async function createBlogs(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const title: string = req.body.title;
  const content: string = req.body.content;

  const t: Transaction = await db.sequelize.transaction();

  let result: any = null;
  try {
    result = await db.blogs.create(
      {
        title,
        content,
      },
      { transaction: t }
    );

    await t.commit();
  } catch (err) {
    await t.rollback();

    return res.status(400).json({
      error: `Blog creation failed with error- ${err}`
    })
  }

  return res.status(201).json({
    message: result,
  });
}
