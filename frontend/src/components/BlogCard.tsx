import { Link } from "react-router-dom"

interface BlogCardProps{
    authorName : string,
    publishedDate : string,
    title : string,
    content : string,
    id:number
}

interface BlogCardNewProps{
    authorName : string,
    publishedDate : string,
    title : string,
    id:number
}

export default function BlogCard({authorName,publishedDate,title,content,id}:BlogCardProps){
    return (
        <Link to={`/blog/${id}`}>
            <div className=" border-b border-slate-200 pl-2 pb-2 m-10 cursor-pointer">
                <div className="flex items-center mt-2">
                    <Avatar authorName={authorName}></Avatar>
                    <div className="font-semibold font-mono px-4 text-slate-700">{authorName} . {publishedDate}</div>
                </div>
                
                <div className="font-bold  text-2xl pb-4 mt-2">{title}</div>
                {content.length>300?<div className="font-mono break-words text-justify">{content.substring(0,300)+'...'}</div>:<div className="font-mono break-words">{content}</div>}
                <div className="font-thin">{Math.floor(content.length/500)+' min read'}</div>
            </div>
        </Link>
    )
}   

export function BlogCardNew({authorName,publishedDate,title,id}:BlogCardNewProps){
    return (
        <Link to={`/blog/${id}`}>
            <div className=" pl-2 mx-10 cursor-pointer">
                <div className="flex items-center mt-2">
                    <Avatar authorName={authorName}></Avatar>
                    <div className="font-semibold font-mono px-4 text-slate-700">{authorName}  {publishedDate}</div>
                </div>
                
                <div className="font-bold text-md text-slate-800 pb-4 pl-1 text-justify">{title}</div>
            </div>
        </Link>
    )
}  


export function Avatar({ authorName}: { authorName?: string}) {
    return (
        <div className="w-8 h-8 flex items-center justify-center overflow-hidden bg-slate-100 text-center rounded-full">
            {authorName?authorName[0].toLocaleUpperCase():"U"}
        </div>
    );
}
