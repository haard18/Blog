import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"
interface Blog{
    title:string;
    content:string;
    authorName:string;
    publishedDate:string;

}
export const Blog = () => {
    const{loading,blogs}=useBlogs();
    if(loading){
        return <div>Loading...</div>
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
