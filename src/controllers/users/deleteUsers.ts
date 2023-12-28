import { Request, Response, NextFunction } from "express";
import db from "../../database/connection";

export default async function deleteUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id: Number = parseInt(req.params.id);

    const user: any = await db.users.findByPk(id);

    if (!user) {
      return res.status(404).json({
        error: `User with id ${id} does not exist`,
      });
    }

    const deletedRecord: any = await user.destroy();

    if (!deletedRecord.deleted_at) {
      return res.status(400).json({
        error: `Error deleting user with id ${id}`,
      });
    }

    return res.status(204).json({
      message: "User deleted successfully",
    });
  } catch (err) {
    console.log("Error - ", err);
    res.status(500).json({ error: `${err}` });
  }
}
