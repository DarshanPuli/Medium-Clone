import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Jwt } from "hono/utils/jwt";
const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string;
        JWT_SECRET:string;
    }
}>();

userRouter.post("/signup", async (c) => {
    try {
      const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
      const { name, password, email } = await c.req.json();
      const user = await prisma.user.create({
        data: {
          name,
          password,
          email,
        },
      });
      const token = await Jwt.sign({ userId: user.id }, c.env.JWT_SECRET);
      c.status(200);
      return c.json({ token:'Bearer'+" "+token });
    } catch (err) {
      c.status(500);
      return c.json({ err: "server error" + err });
    }
  });
  
  userRouter.post("/signin", async (c) => {
    const {email,password} = await c.req.json();
    const prisma = new PrismaClient({
      datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate());
    var user;
  
    try{
      user = await prisma.user.findFirst({
        where:{
          email,
          password
        }
      });
      if(!user){
        c.status(403);
        return c.json({
          err : "user doesnt exist"
        })
      }
      const token = await Jwt.sign({userId:user.id},c.env.JWT_SECRET);
      c.status(200);
      return c.json({token:'Bearer'+" "+token});
  
    }catch(err){
      c.status(500);
      return c.json({
        err : "server error"+err
      })
    }
  });
  
export default userRouter