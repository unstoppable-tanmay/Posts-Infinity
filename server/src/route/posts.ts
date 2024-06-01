import express, { Request, Response } from "express";
import prisma from "../../prisma/prisma";
import { MiddleWare } from "../middleware/auth";

export const postRouter = express.Router();

postRouter.get("/", MiddleWare, async (req: Request, res: Response) => {
  try {
    const posts = prisma.post.findMany({
      skip: 10,
      take: 10,
      select: {
        author: {
          select: {
            name: true,
            username: true,
            profilePicture: true,
          },
        },
        content: true,
        title: true,
        comments: {
          select: {
            content: true,
            author: {
              select: {
                name: true,
                username: true,
                profilePicture: true,
              },
            },
          },
        },
      },
    });
    return res
      .status(200)
      .json({
        success: true,
        data: { posts, count: 10 },
        msg: "Fetched Successfully",
      });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ success: true, data: null, msg: "Server error" });
  }
});
