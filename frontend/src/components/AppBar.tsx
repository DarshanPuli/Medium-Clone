import logo from "../assets/logo.png";
import publish from "../assets/publish.png";
import { Avatar } from "./BlogCard";
import { Link, useNavigate } from "react-router-dom";
export default function Appbar({ needPublish }: { needPublish: boolean }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between p-2 shadow shadow-sm items-center mr-4">
      <div className=" flex ">
        <Link to={"/blogs"}>
          <img src={logo} alt="nope" className="w-24 h-16 ml-4 mr-16" />
        </Link>
      </div>

      <div>
        <input
          type="text"
          className="border border-slate-200 pl-4 p-1.5 rounded-full w-96 placeholder:font-mono"
          placeholder="Search"
        />
      </div>
      <div className="flex items-center">
        <Link to={"/blogs"}>
          <img src={publish} alt="nope" className="w-8 h-8 " />
        </Link>
        {needPublish ? (
          <button
            className="font-mono  mr-12 pr-3 rounded-full text-black"
            onClick={() => {
              navigate("/createBlog");
            }}
          >
            Publish
          </button>
        ) : (
          <div></div>
        )}
        <Avatar></Avatar>
      </div>
    </div>
  );
}
