import { Link } from "react-router-dom"

interface BlogCardProps {
    title: string
    content: string
    authorName: string
    publishedDate: string,
    id: number
}
export const BlogCard = ({ title, content, authorName, publishedDate, id }: BlogCardProps) => {
    return (
        <Link to={`/blog/${id}`}>
            <div className="border-b p-5 pb-4 w-screen max-w-screen-md border-slate-500 cursor-pointer">
                <div className="flex">
                    <div className=" text-sm flex-col pr-4">

                        <Avatar size="small" authorName={authorName} />
                    </div>

                    <div className="flex justify-center flex-col font-extralight">
                        {authorName}
                    </div>
                    <div className="flex justify-center px-2 flex-col ">

                        <Circle />
                    </div>
                    <div className="flex justify-center flex-col font-thin font text-slate-500">
                        {publishedDate}
                    </div>
                </div>
                <div className="pt-2 text-3xl font-semibold">
                    {title}
                </div>
                <div className=" text-md font-thin">
                    {content.length > 100 ? content.slice(0, 100) + "..." : content}
                </div>
                <div className="pt-4 text-slate-500 text-sm font-thin">
                    {`${Math.floor(content.length / 100)} min read`}
                </div>

            </div>
        </Link>
    )
}
export function Avatar({ authorName, size = "small" }: { authorName: string, size: "big" | "small" }) {

    let initials = authorName.split(" ");
    return <div className={`p-3 relative inline-flex items-center justify-center ${size === "big" ? "w-10 h-10" : "w-6 h-6"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
        <span className={`font-small ${size === "big" ? "text-lg" : "text-sm"} font-extralight text-white`}>
            {initials.length > 1 ? initials[0].charAt(0) + (initials.length > 1 ? initials[1].charAt(0) : '') : initials[0].charAt(0)}
        </span>
            </div>
    // </div>

}
export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-black">

    </div>
}






