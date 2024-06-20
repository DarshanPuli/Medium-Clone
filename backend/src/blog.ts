import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { Jwt } from "hono/utils/jwt";

const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string;
        JWT_SECRET:string;
    },
    Variables :{
        userId:number
    }
}>();

blogRouter.use('/*',async (c,next)=>{
    try{
        const jwt = c.req.header('Authorization');
        if(!jwt){
            c.status(401);
            return c.json({
                err : "you are not authorized"
            })
        }
        const token = jwt.split(" ")[1];
        const {userId} = await Jwt.verify(token,c.env.JWT_SECRET) as {userId:number};
        c.set('userId',userId);
        await next();
    }catch(err){
        c.status(500);
        return c.json({
            err : "server error" + err
        })
    }
    
})

blogRouter.post("/blog", async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())
    
    const {title,content} = await c.req.json();
    try{
        const response = await prisma.blog.create({
            data : {
                title,
                content,
                authorId : c.get('userId')
            }
        });
        c.status(200);
        return c.json({
            msg:"post created"
        })
    }catch(err){
        return c.json({
            err : "server error"+err
        })
    }
  });
  
blogRouter.put("/blog", async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try{
        const {id,title,content} = await c.req.json();
        const response = await prisma.blog.update({
            where:{
                id
            },
            data:{
                title : title ?? undefined,
                content : content ?? undefined
            }
        });
        console.log(response);
        c.status(200);
        return c.json({
            msg : "blog updated"
        })
    }catch(err){
        c.status(500);
        return c.json({
            err : "internal error" + err
        })
    }
  });

  blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())
    // const {id} = await c.req.json();
    try{
        const response = await prisma.blog.findMany({
            select:{
                title:true,
                id:true,
                content:true,
                publishedDate:true,
                author:{
                    select:{
                        name:true,
                    }
                }
            }
        });

        const formattedResponse = response.map(blog => ({
            title: blog.title,
            id:blog.id,
            content: blog.content,
            publishedDate: blog.publishedDate.toISOString().split('T')[0],
            author:{
                name:blog.author.name
            }
        }));


        c.status(200);
        return c.json({
            msg : {formattedResponse}
        })
    }catch(err){
        c.status(500);
        return c.json({
            err : "internal error" + err
        })
    }
  });

  blogRouter.get("/blog/:id", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())

    var id = await c.req.param('id').substring(0);
    console.log(Number(id));
    console.log("hi");
    console.log(id);
    try{
        const response = await prisma.blog.findFirst({
            where:{
                id:Number(id)
            },
            select:{
                id:true,
                title:true,
                content:true,
                publishedDate:true,
                author:{
                    select:{
                        name:true,
                        about:true
                    }
                }
            }
        });

        const formattedResponse = {
            title:response?.title,
            id:response?.id,
            content:response?.content,
            publishedDate:response?.publishedDate.toISOString().split('T')[0],
            authorName:response?.author.name,
            about:response?.author.about
        }
        c.status(200);
        return c.json({
            msg : {formattedResponse}
        })
    }catch(err){
        c.status(500);
        return c.json({
            err : "internal error" + err
        })
    }
  });
  


export default blogRouter