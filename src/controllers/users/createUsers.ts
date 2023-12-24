import { Request, Response, NextFunction } from "express";
import * as bcrypt from "bcrypt";
import { Transaction } from "sequelize";
import db from "../../database/connection";
import { isStrongPassword, isEmailValid } from "../../utils/users";

const saltRounds = 10;

export async function createUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let transaction: Transaction = await db.sequelize.transaction();

  try {
    const { username, firstName, lastName, password, email } = req.body;
    validateUserData(password, email, res);

    let hashedPassword: string = await bcrypt.hash(password, saltRounds);
    const newUser: any = await db.users.create(
      {
        username: username,
        first_name: firstName,
        last_name: lastName,
        hashed_password: hashedPassword,
        email: email,
      },
      transaction
    );

    const result: any = {
      ...newUser.get(),
      hashed_password: undefined,
    };
    await transaction.commit();
    return res.status(201).json({
      message: result,
    });
  } catch (err) {
    console.log("Error - ", err);
    res.status(500).json({ error: `${err}` });
  }
}

export function validateUserData(password: string, email: string, res: Response) {
  const strongPassword: boolean = isStrongPassword(password);

  if (!strongPassword) {
    res.status(400).json({
      Error:
        "Password should contain at least one uppercase character," +
        "one lowercase character, one digit, one special character and must have at least 8 characters.",
    });
  }

  const validEmail: boolean = isEmailValid(email);
  if (!validEmail) {
    res.status(400).json({
      Error: "Provided email is invalid",
    });
  }
}
