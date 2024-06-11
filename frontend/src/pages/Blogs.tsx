import BlogCard, { BlogCardNew } from "../components/BlogCard";
import AppBar from "../components/AppBar";
import { useBlog } from "../hooks";
import Skeleton from "../components/Skeleton"

interface authorName {
  name: string;
}

interface BlogCardProps {
  author: authorName;
  publishedDate: string;
  title: string;
  content: string;
  id: number;
}

export default function Blogs() {
  const { blog, isLoading } = useBlog();
  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center">
        <Skeleton></Skeleton>
        <Skeleton></Skeleton>
        <Skeleton></Skeleton>
        <Skeleton></Skeleton>
    </div>
    )
    
  }
  return (
    <div>
      <div>
        <AppBar needPublish={true}></AppBar>
      </div>
      <div className="tablet:flex w-[100%]">
        <div className="tablet:w-[60%] mx-20">
          {blog.map((b: BlogCardProps) => {
            return BlogCard({
              authorName: b.author.name,
              content: b.content,
              publishedDate: b.publishedDate,
              title: b.title,
              id: b.id,
            });
          })}
        </div>
        <div className="invisible tablet:visible w-[40%] border-l-[0.5px] mt-2">
          <div className="font-semibold text-slate-800 mt-10 ml-12 pb-4">Staff picks</div>
          <div className="max-w-[90%]">
          {blog.map((b: BlogCardProps) => {
            return BlogCardNew({
              authorName: b.author.name,
              publishedDate: b.publishedDate,
              title: b.title,
              id: b.id,
            });
          })}
          </div>
        </div>
      </div>
    </div>
  );
}
