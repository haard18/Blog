interface BlogCardProps {
    title: string
    content: string
    authorName: string
    publishedDate: string
}
export const BlogCard = ({ title, content, authorName, publishedDate }: BlogCardProps) => {
    return (
        <div>
            <div className="flex">
                <div className="flex justify-center flex-col pr-4">

                    <Avatar authorName={authorName} />
                </div>

                <div className="font-extralight">
                    {authorName}
                </div>
                <div className="flex justify-center px-2 flex-col ">

                    <Circle />
                </div>
                <div className="font-thin font text-slate-500">
                    {publishedDate}
                </div>
            </div>
            <div className=" text-3xl font-semibold">
                {title}
            </div>
            <div className=" text-md font-thin">
                {content.length > 100 ? content.slice(0, 100) + "..." : content}
            </div>
            <div>
                {`${Math.floor(content.length / 100)} min read`}
            </div>
            <div className="bg-slate-200 h-1 w-full">

            </div>
        </div>
    )
}
function Avatar({ authorName }: { authorName: string }) {

    let initials = authorName.split(" ");
    return <div className="p-3 relative inline-flex items-center justify-center w-5 h-5 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <span className="font-small text-sm font-extralight text-gray-600 dark:text-gray-300">{initials.length > 1 ? initials[0].charAt(0) + initials[1].charAt(0) : initials[0].at(0)}</span>
    </div>
    // </div>

}
function Circle() {
    return <div className="h-1 w-1 rounded-full bg-black">

    </div>
}






