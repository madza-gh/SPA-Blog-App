import { Navigate, useParams, Outlet } from "react-router-dom"
import { Post } from "../App"


type PostLayoutProps ={
    posts: Post[]
}

function PostLayout ({posts}:PostLayoutProps){
    const {id} = useParams()

    const post = posts.find((item)=> item.id == id)

    if(post == null) return <Navigate to={'./'} replace/>

    return <Outlet context={post}/>
}

export default PostLayout