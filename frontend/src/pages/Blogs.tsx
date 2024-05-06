import { useState } from "react";
import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs, usegetAuthorName } from "../hooks"
import { Blog } from "./Blog";
interface Blog{
    title:string;
    content:string;
    authorName:string;
    publishedDate:string;

}

export const Blogs = () => {
    const{loading,blogs}=useBlogs();
    const [name, setName] = useState<string>("")
    if(loading ||!Blog  ){
        <BlogSkeleton/>
    }
    const lctoken = localStorage.getItem("jwtToken");

    if (!lctoken) {
        return <div>Not Logged in</div>;
    }

    const authordetails = usegetAuthorName(lctoken);
    authordetails.then((res) => setName(res.name));
    return (

        <div >
            <AppBar  authorName={name}/>
            <div className="flex justify-center">
                <div>
                    {blogs.map((blog:any)=><BlogCard id={blog.id} title={blog.title} content={blog.content} authorName={blog.author.name||"Anonymous"} publishedDate="1st May" />)}
                    
                   
                </div>
            </div>
        </div>
    )
}