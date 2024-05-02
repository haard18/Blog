import { Avatar } from "./BlogCard"

export const AppBar = () => {
    return <div className="border-b flex py-5 text-xl justify-between px-4">
        <div className="flex justify-center flex-col font-bold">
            Maximum
        </div>
        <div>
            <Avatar size={"big"} authorName="Haard Solanki"/>
        </div>
    </div>
}