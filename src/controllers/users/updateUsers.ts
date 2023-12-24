import { Request, Response, NextFunction } from "express";
import * as bcrypt from "bcrypt";
import { Transaction } from "sequelize";
import db from "../../database/connection";
import { validateUserData } from "./createUsers";
const saltRounds = 10

export default async function updateUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
    let transaction: Transaction = await db.sequelize.transaction();

  try {
    const { username, email, firstName, lastName, password } = req.body;
    const { id } = req.params

    validateUserData(password, email, res);

    const hashedPassword: string = await bcrypt.hash(password, saltRounds);

    const existingUser = await db.users.findByPk(id);
    if (!existingUser) {
        return res.status(404).json({error: `Unable to find user with id: ${id}`})
    }

    await existingUser.update({
        username: username,
        email: email,
        first_name: firstName,
        last_name: lastName,
        hashed_password: hashedPassword
    }, transaction)

    const result = {...existingUser.get(), hashed_password: undefined}
    
    await transaction.commit()
    res.status(201).json({message: result})

  } catch (err) {
    console.log("Error - ", err);
    res.status(500).json({ error: `${err}` });
  }
}
