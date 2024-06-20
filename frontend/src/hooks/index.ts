import axios from "axios";
import { useEffect, useState } from "react";

export function useSpecificBlog({id}:{id:string|undefined}){
  const [blog, setBlog] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }
        const response = await axios.get(
          `https://backend.pardy1166.workers.dev/api/v1/blog/blog/${id}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        console.log(response);
        setBlog(response.data.msg.formattedResponse);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    run();
  }, []);

  return { blog, isLoading };
}

export function useBlog() {
  const [blog, setBlog] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }
        const response = await axios.get(
          "https://backend.pardy1166.workers.dev/api/v1/blog/bulk",
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        console.log(response);
        setBlog(response.data.msg.formattedResponse);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    run();
  }, []);

  return { blog, isLoading };
}
