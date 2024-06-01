import express, { Request, Response } from "express";
import { sign, decode, JwtPayload } from "jsonwebtoken";
import { compareSync, hashSync } from "bcrypt";
import { body, validationResult } from "express-validator";
import prisma from "../../prisma/prisma";

export const userRouter = express.Router();

userRouter.post(
  "/signup",
  [
    body("username").not().isEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, name, profilePicture } = req.body;

    try {
      let user = await prisma.user.findUnique({
        where: {
          email,
          username,
        },
      });
      if (user) {
        return res
          .status(400)
          .json({ msg: "User with Same Username Or Email exists" });
      }

      user = await prisma.user.create({
        data: {
          username,
          email,
          password: hashSync(password, 10),
          name,
          profilePicture,
        },
      });

      const payload = { id: user.id };
      sign(
        payload,
        process.env.JWT_SECRET!,
        { expiresIn: "72h" },
        (err, token) => {
          if (err) {
            return res.status(500).json({
              success: false,
              data: null,
              msg: "Internal Server Error",
            });
          } else {
            return res
              .cookie("token", { token }, { httpOnly: true, maxAge: 900000 })
              .status(200)
              .json({
                success: true,
                data: user,
                msg: "Signed In Successfully",
              });
          }
        }
      );
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

userRouter.post(
  "/login",
  [body("email").isEmail(), body("password").isLength({ min: 6 })],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, data: null, msg: errors.array()[0].msg });
    }

    const { email, password } = req.body;

    try {
      let user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res
          .status(400)
          .json({ success: false, data: null, msg: "No User Found" });
      }

      if (!compareSync(password, user.password)) {
        return res
          .status(400)
          .json({ success: false, data: null, msg: "Worng Password" });
      }

      const payload = { id: user.id };
      sign(
        payload,
        process.env.JWT_SECRET!,
        { expiresIn: "72h" },
        (err, token) => {
          if (err) {
            return res.status(500).json({
              success: false,
              data: null,
              msg: "Internal Server Error",
            });
          } else {
            return res
              .cookie("token", { token }, { httpOnly: true, maxAge: 900000 })
              .status(200)
              .json({
                success: true,
                data: user,
                msg: "Signed In Successfully",
              });
          }
        }
      );
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

userRouter.get("/", async (req: Request, res: Response) => {
  const cookie = req.cookies;

  const token = decode(cookie.token);

  if (!token) {
    return res
      .status(400)
      .json({ success: false, data: null, msg: "No Token Provided" });
  }

  try {
    let user = await prisma.user.findUnique({
      where: {
        id: (token as any).id,
      },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, data: null, msg: "No User Found" });
    }

    return res
      .status(200)
      .json({ success: true, data: user, msg: "Signed In Successfully" });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Sign up
// {
//   "username":"",
//   "email":"",
//   "password":"",
//   "name":"",
//   "profilePicture":"",
// }
