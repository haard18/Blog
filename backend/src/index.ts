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
//Route for signuo
app.post("/api/v1/user/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  //get body from context
  const body = await c.req.json();
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
    const token =await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ token });
  } catch (error) {
    c.status(400);
  }
});

app.post("/api/v1/user/signin", async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  //get body from context
  const body=await c.req.json();
  const user=await prisma.user.findUnique({
    where:{
      email:body.email,
      password:body.password
    }
  })
  if(!user){
    return c.json({message:"User not found"});
  }
  const jwt=await sign({id:user.id},c.env.JWT_SECRET);
  return c.json({jwt});

});
app.use("/api/v1/blog/*", async (c, next) => {
  //get token from header
  //verify token
  //if token is valid then go to next middleware
  //else return 401
  //protects all routes starting with /api/v1/blog
  const header=c.req.header('Authorization')||"";
  const token=header.split(" ")[1];
  const response=await verify(token,c.env.JWT_SECRET);
  if(response.id){
    return await next();
  }
  else{
    c.status(403);
    return c.json({message:"Unauthorized"});
  }
})
app.post("/api/v1/blog", (c) => {
  return c.text("blog create Route");
});
app.put("/api/v1/blog", (c) => {
  return c.text("blog update Route");
});
app.get("/api/v1/blog/:id", (c) => {
  return c.text("blog get Route");
});
app.get("/api/v1/blog/bulk", (c) => {
  return c.text("blog get all Route");
});
export default app;
