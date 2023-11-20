import { Request, Response, NextFunction } from "express";
import db from "../../database/connection";
import { Op } from 'sequelize';

export default async function listBlogs(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const criteria = req.query;
  
  const where: any = {};

  if (criteria?.id) {
    where.id = criteria.id;
  }

  if (criteria?.query) {
    where[Op.or] = [
      {
        title: {
          [Op.iLike]: `%${criteria.query}%` // Case-insensitive search in title
        },
      },
      {
        content: {
          [Op.iLike]: `%${criteria.query}%` // Case-insensitive search in content
        },
      },
    ]
  }

  const result: any = await db.blogs.findAll({ where });

  if (!result.length) {
    // throw new Error(`Error getting blogs!`);
    return res.status(404).json({
      error: `No blogs found!`,
    });
  }

  return res.status(200).json({
    message: result,
  });
}
