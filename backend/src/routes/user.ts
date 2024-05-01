import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, verify, sign, jwt } from "hono/jwt";
import { z } from "zod";
// import { SignUpBody } from "../../../common/src/index";
import { SignUpBody } from "@hardy18/medium-common-snippets";
// import
export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  //get body from context
  //validate the request body
  //{
  //email:string compulsory
  //password:string compulsory
  //name:string optional

  // }
  const body = await c.req.json();
  const {success}=SignUpBody.safeParse(body);
  if(!success){
    c.status(400);
    return c.json({message:"Inputs not correct"});
  }
  //create a user
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });
    //create a token
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.text(token);
  } catch (error) {
    c.status(400);
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  //get body from context
  try {
    const body = await c.req.json();
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password,
      },
    });
    if (!user) {
      c.status(403);
      return c.json({ message: "Incorrect email or password" });
    }
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return  c.text(jwt);
  } catch (error) {
    c.status(400);
    return c.json({ message: "Incorrect email or password" });
  }
});
