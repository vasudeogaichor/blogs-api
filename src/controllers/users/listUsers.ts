import { Request, Response, NextFunction } from "express";
import db from "../../database/connection";
import { Op } from "sequelize";
import { User } from "../../interfaces";
import { FindAndCountAllResult } from "../../types";

export default async function listUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const criteria = req.query;
    const offset: number =
      ((criteria.page as any) - 1) * (criteria.limit as any);

    const where: any = {};

    if (criteria?.id) {
      where.id = criteria.id;
    }

    if (criteria?.query) {
      where[Op.or] = [
        {
          username: {
            [Op.iLike]: `%${criteria.query}%`, // Case-insensitive search in username
          },
        },
        {
          first_name: {
            [Op.iLike]: `%${criteria.query}%`, // Case-insensitive search in first name
          },
        },
        {
          last_name: {
            [Op.iLike]: `%${criteria.query}%`, // Case-insensitive search in last name
          },
        },
      ];
    }

    const result: FindAndCountAllResult<User> = await db.users.findAndCountAll({
      where,
      limit: criteria.limit,
      offset,
      attributes: { exclude: ["hashed_password"] },
    });

    if (!result.rows.length) {
      return res.status(404).json({
        error: `No users found!`,
      });
    }

    return res.status(200).json({
      total: result.count,
      data: result.rows,
    });
  } catch (err) {
    console.log("Error - ", err);
    res.status(500).json({ error: `${err}` });
  }
}
