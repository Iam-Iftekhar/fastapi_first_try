'use client'
import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../Providers'
import PostCard from './PostCard'


export default function Feed(){
const { token, user } = useContext(AuthContext)
const [posts, setPosts] = useState([])


useEffect(()=>{
async function load(){
try{
const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/feed`, { headers: token ? { Authorization: `Bearer ${token}` } : {} })
setPosts(res.data.posts)
}catch(e){
console.error(e)
}
}
load()
},[token])


const onDelete = async (id)=>{
try{
await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, { headers: { Authorization: `Bearer ${token}` } })
setPosts(posts.filter(p=>p.id !== id))
}catch(e){ console.error(e) }
}


return (
<div style={{padding:24}}>
<h2>Feed</h2>
{posts.length === 0 && <p>No posts yet</p>}
{posts.map(post=> <PostCard key={post.id} post={post} onDelete={onDelete} />)}
</div>
)
}