import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks"
import { Blog } from "./Blog";
interface Blog{
    title:string;
    content:string;
    authorName:string;
    publishedDate:string;

}
export const Blogs = () => {
    const{loading,blogs}=useBlogs();
    if(loading ||!Blog  ){
        <BlogSkeleton/>
    }
    
    return (

        <div >
            <AppBar />
            <div className="flex justify-center">
                <div>
                    {blogs.map((blog:any)=><BlogCard id={blog.id} title={blog.title} content={blog.content} authorName={blog.author.name||"Anonymous"} publishedDate="1st May" />)}
                    
                   
                </div>
            </div>
        </div>
    )
}
