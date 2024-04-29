import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

import { decode, verify, sign, jwt } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();
//write a middleware to check if the user is authenticated
blogRouter.use("/*", async (c, next) => {
  const token = c.req.header("Authorization") || "";
  const user = await verify(token, c.env.JWT_SECRET);
  if (!user) {
    return c.status(401);
  }
  if (user) {
    c.set("userId", user.id);
    return next();
  }
  // next();
});
blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const authorId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: authorId,
    },
  });
  return c.json({ id: blog.id });
});
blogRouter.put("/", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const blog = await prisma.post.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });
  return c.json({ id: blog.id });
});
blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.findFirst({
      where: {
        id: id,
      },
    });
    return c.json(blog);
  } catch (error) {
    return c.status(404);
  }
  //   return c.text("blog get Route");
});
//add pagination
//pagination is a way to limit the number of results returned from a query
blogRouter.get("/bulk", async (c) => {
  //   const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const blogs = await prisma.post.findMany();
  return c.json(blogs);
  //   return c.text("blog get all Route");
});
