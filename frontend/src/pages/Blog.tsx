import axios from "axios"
import { useEffect } from "react"
import { useSpecificBlog } from "../hooks"
import { Avatar } from "../components/BlogCard";
import { useParams } from "react-router-dom";
import AppBar from '../components/AppBar'
import Skeleton from "../components/Skeleton"

export default function Blog(){
    const {id} = useParams();
    const {blog,isLoading}:{blog:any,isLoading:boolean}=useSpecificBlog({id});
    if(isLoading){
        return <div className="flex justify-center items-center h-screen"><Skeleton></Skeleton></div>
    }
    return (
        <div>
            <div><AppBar needPublish={true}></AppBar></div>
        <div className="p-10 flex">
            <div className="flex flex-col min-w-[60%] max-w-[70%] mr-20">
                <div className="text-5xl font-extrabold pb-4">{blog.title}</div>
                <div className="text-gray-400 pb-8">Posted on {blog.publishedDate}</div>
                <div>{blog.content}</div>
            </div>
            <div className="flex flex-col">
                <div className="font-mono mb-8">Author</div>
                <div className="flex w-[100%]">
                    <div><Avatar authorName={blog.authorName}></Avatar></div>
                    <div className="flex flex-col ml-5">
                        <div className="font-bold font-mono text-xl">{blog.authorName}</div>
                        <div>{blog.about}</div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}