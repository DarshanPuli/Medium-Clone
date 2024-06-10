import { useState } from "react";
import AppBar from "../components/AppBar";
import axios from "axios";

export default function CreateBlog() {
    const [title,setTitle] = useState();
    const [content,setContent] = useState();

  async function onClickHandler() {
    const response = await axios.post("https://backend.pardy1166.workers.dev/api/v1/blog/blog",{
        title,
        content
    },{
        headers : {
            Authorization:localStorage.getItem("token")
        }
    });
    console.log(response);
  }
  return (
    <div>
      <AppBar needPublish={false}></AppBar>
      <div className="mt-3 flex flex-col items-center">
        <input
          type="text"
          placeholder="Title"
          className=" border-slate-300 h-32 placeholder:font-mono text-5xl w-[60%] focus:outline-none"
          onChange={(e:any)=>{setTitle(e.target.value)}}
        />
        <input
          type="text"
          placeholder="Tell your story..."
          className=" border-slate-300 h-20 placeholder:font-mono font-semibold text-2xl w-[60%] focus:outline-none"
          onChange={(e:any)=>{setContent(e.target.value)}}
        />
        <button
          className="font-mono bg-green-600 mx-8 p-2 rounded-full text-white w-20 font-semibold text-lg"
          onClick={onClickHandler}
        >
          post
        </button>
      </div>
    </div>
  );
}
