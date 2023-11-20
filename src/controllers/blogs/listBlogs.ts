import { Request, Response, NextFunction } from "express";
import db from "../../database/connection";
import { Op } from 'sequelize';

export default async function listBlogs(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const criteria = req.query;
  // TODO - remove and fix "as any" implementation
  const offset: number = (criteria.page as any - 1) * (criteria.limit as any);
  
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

  const result: any = await db.blogs.findAndCountAll({ 
    where,
    limit: criteria.limit,
    offset
   });

   if (!result.rows.length) {
    // throw new Error(`Error getting blogs!`);
    return res.status(404).json({
      error: `No blogs found!`,
    });
  }

  return res.status(200).json({
    total: result.count,
    data: result.rows,
  });
}
