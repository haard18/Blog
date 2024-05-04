import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"
export interface Blog{
    "content": string;
    "id": number;
    "title": string;
    "author":{
        "name":string
    };
    "publishedAt":string;
}
export const useBlogs=()=>{
    const [loading,setLoading]=useState(true)
    const [blogs,setblogs]=useState<Blog[]>([])

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers:{
                Authorization:localStorage.getItem("jwtToken")
            }}
        )
        .then((res)=>{
            setblogs(res.data)
            setLoading(false)
        })
    },[])

    return{
        loading,
        blogs
    }
}
export const useBlog=({id}:{id:string})=>{
    const [loading,setLoading]=useState(true)
    const [blog,setblog]=useState<Blog>()

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers:{
                Authorization:localStorage.getItem("jwtToken")
            }}
        )
        .then((res)=>{
            setblog(res.data)
            setLoading(false)
        })
    },[])

    return{
        loading,
        blog
    }
}