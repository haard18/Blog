import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const AppBar = ({authorName}:{authorName:string}) => {
    return <div className="border-b flex py-5 text-xl justify-between px-4">
        <Link to="/blog">
            <div className="cursor-pointer flex justify-center flex-col font-bold">
                Maximum
            </div>
        </Link>
        <div>
            <span className="pr-5">
            <Link to={"/publish"}>
            <button type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 shadow-lg shadow-green-500/50  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">New</button>
            </Link>
            </span>

            <Avatar size={"big"} authorName={authorName}  />
        </div>
    </div>
}