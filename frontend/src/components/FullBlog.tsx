import { useState } from "react";
import { Blog, usegetAuthorName } from "../hooks"
import { AppBar } from "./AppBar"
import { Avatar } from "./BlogCard";
function convertISOToNormalDate(isoDateString: string): string {
    const date = new Date(isoDateString);
    return date.toLocaleDateString(); // Customize this according to your preferred date format
}
export const FullBlog = ({ blog }: { blog: Blog }) => {
    // console.log(blog)
    let normalPublishedAt = "No Date";
    if (blog.publishedAt) {
        normalPublishedAt = convertISOToNormalDate(blog.publishedAt);
    }
    const[authorName,setAuthorName]=useState<string>("")
    const lctoken = localStorage.getItem("jwtToken");
    if (!lctoken) {
        return <div>Not Logged in</div>;
    }
    const authordetails = usegetAuthorName(lctoken);
    authordetails.then((res) => setAuthorName(res.name));

    return (
        <>
            <AppBar authorName={authorName}/>
            <div className="flex justify-center">
                <div className="grid grid-cols-12 pt-10 w-screen px-10 max-w-screen-2xl">
                    <div className=" col-span-8 ">
                        <div className="text-5xl font-extrabold">
                            {blog.title}
                        </div>
                        <div className="text-slate-400 text-2xl">
                            {normalPublishedAt} by {blog.author.name}
                        </div>
                        <div className="font-light text-3xl">
                            {blog.content}
                        </div>
                    </div>
                    <div className=" col-span-4 text-black font-bold">
                        Author
                        <div className="flex w-full">
                            <div className="flex pr-2 flex-col justify-center">

                                <Avatar authorName={blog.author.name || "Anonymous"} size="big" />
                            </div>
                            <div>
                                <div className=" text-3xl">

                                    {blog.author.name || "Anonymous"}
                                </div>
                            </div>
                        </div>
                        <div className="text-slate font-extralight">
                            Random CatchPhrase for the author goes here that is very long and spans multiple lines
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}