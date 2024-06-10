import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Jwt } from "hono/utils/jwt";
import blogRouter from "./blog";
import userRouter from "./user";
import { cors } from "hono/cors";

const app = new Hono();
app.use('/*',cors({origin:'*'}));

app.route('api/v1/user',userRouter);
app.route('api/v1/blog',blogRouter);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});


export default app;