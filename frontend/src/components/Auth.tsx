import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link,useNavigate } from "react-router-dom";

export default function Auth({ type }:{type:"signup"|"signin"}) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onclickHandler = async () => {
    const result = await axios.post(
      "https://backend.pardy1166.workers.dev/api/v1/user/"+type,
      {
        name: username,
        password,
        email,
      }
    );
    localStorage.setItem("token", result.data.token);
    navigate('/blogs');
  };

  return type == "signup" ? (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="pb-2">
        <div className="text-3xl font-bold">Create an account</div>
        <div className="flex pb-4 justify-center">
          <div className="text-gray-400">Already have an account?</div>
          <div className="text-gray-400 underline">
            <Link to="/signin">login</Link>
          </div>
        </div>
      </div>
      <div className="w-[100%] pl-40 pr-40 pb-4">
        <div>
          <LabelledInput
            label={"Username"}
            placeholder={"enter your username"}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></LabelledInput>
        </div>
        <div>
          <LabelledInput
            label={"Email"}
            placeholder={"enter your email"}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></LabelledInput>
        </div>
        <div>
          <LabelledInput
            label={"Password"}
            type={"password"}
            placeholder={"enter your Password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></LabelledInput>
        </div>
        <div className="pt-6">
          <Button label={"Signup"} onClick={onclickHandler}></Button>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="pb-2">
        <div className="text-3xl font-bold">Login to your account</div>
        <div className="flex pb-4 justify-center">
          <div className="text-gray-400">Dont have an account?</div>
          <div className="text-gray-400 underline">
            <Link to="/signup">signup</Link>
          </div>
        </div>
      </div>
      <div className="w-[100%] pl-40 pr-40 pb-4">
        <div>
          <LabelledInput
            label={"Email"}
            placeholder={"enter your email"}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></LabelledInput>
        </div>
        <div>
          <LabelledInput
            label={"Password"}
            placeholder={"enter your Password"}
            type={"password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></LabelledInput>
        </div>
        <div className="pt-6">
          <Button label={"Signup"} onClick={onclickHandler}></Button>
        </div>
      </div>
    </div>
  )
}

interface lableType{
  label : string,
  placeholder : string,
  onChange : (e:ChangeEvent<HTMLInputElement>)=>void
  type?:string
}

export function LabelledInput({ label, placeholder, onChange,type }:lableType) {
  return (
    <div className="pb-2">
      <p className="font-semibold pb-1">{label}</p>
      <input
        className="border rounded-md placeholder:p-2 w-[100%] p-1.5"
        type={type||"text"}
        placeholder={placeholder}
        onChange={onChange}
      ></input>
    </div>
  );
}

interface button{
  label:string,
  onClick:()=>void
}

export function Button({ label, onClick }:button) {
  return (
    <button
      className="bg-black text-white p-2 w-[100%] rounded-md"
      onClick={onClick}
    >
      {label}
    </button>
  );
}
