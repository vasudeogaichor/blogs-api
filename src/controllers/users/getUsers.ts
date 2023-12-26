import { Request, Response, NextFunction } from "express";
import db from "../../database/connection";
import { User } from "../../interfaces";

export default async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const user: any = await db.users.findByPk(id);
    if (!user) {
      return res.status(404).json({
        error: "Requested user not found",
      });
    }

    const result: User = { ...user.get() };
    result.hashed_password = undefined;
    return res.status(200).json(result);
  } catch (err) {
    console.log("Error - ", err);
    res.status(500).json({ error: `${err}` });
  }
}
