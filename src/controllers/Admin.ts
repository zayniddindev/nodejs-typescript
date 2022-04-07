import User from "../models/User";
import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { Request, Response } from "express";

/************* 
____Show All Admins_____
*************/

const show = async (req: any, res: any) => {
  try {
    const data = await User.showAllAdmins();
    if (!data || data.length <= 0) {
      return res.status(204).send("NO Admins");
    }
    res.status(201).send(data);
  } catch (error) {
    res.status(400).send(error);
  }
};

/************* 
____Register_____
*************/

const create = async (req: Request, res: Response) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }

    const oldUser: any = await User.findOne(email);

    if (oldUser && oldUser.length >= 1) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    let encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.createAdmin({
      first_name,
      last_name,
      email: email.toLowerCase(),
      pwd: encryptedPassword,
      role: "admin",
      status: 0,
    });

    // Create token
    const token = JWT.sign(
      { user_id: user.id, email },
      process.env.TOKEN_KEY as string,
      {
        algorithm: "HS256",
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;
    res.status(201).json(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

/***************
___Get By Email___
***************/

const getByEmail = async (req: Request, res: Response) => {
  const { email } = req.params;
  try {
    const user = await User.findOne(email);
    res.status(201).send(user[0]);
  } catch (error) {
    res.status(400).send(error);
  }
};

/************* 
____Login_____
*************/

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    const user = await User.findOne(email);
    if ( !user || !user[0] || user[0]?.length <= 1) {
      res.status(400).send("Invalid Email");
    } else if (await bcrypt.compare(password, user[0].pwd)) {
      // Create token
      const token = JWT.sign(
        { user_id: user[0].id, email },
        process.env.TOKEN_KEY as string,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user[0].token = token;

      // user
      res.status(200).json(user[0]);
    } else {
      res.status(400).send("Invalid Password");
    }
  } catch (err) {
    console.log(err);
  }
};

export default { show, create, getByEmail, login };
