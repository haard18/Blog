import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, verify, sign, jwt } from "hono/jwt";
//put bindings in hono
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();
//import routers
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";
app.get("/",async(c)=>{
  return c.json({message:"Welcome to the blog API"});
})
app.route("/api/v1/user",userRouter);
app.route("/api/v1/blog",blogRouter);


export default app;
