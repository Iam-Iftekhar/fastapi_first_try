'use client'
import Image from 'next/image'


function createTransformedUrl(originalUrl, transformationParams, caption){
if(caption){
// base64 encode then URL encode
const b64 = btoa(unescape(encodeURIComponent(caption)))
const encoded = encodeURIComponent(b64)
const text_overlay = `l-text,ie-${encoded},ly-N20,lx-20,fs-100,co-white,bg-000000A0,l-end`
transformationParams = text_overlay
}
if(!transformationParams) return originalUrl
const parts = originalUrl.split('/')
const base = parts.slice(0,4).join('/')
const file = parts.slice(4).join('/')
return `${base}/tr:${transformationParams}/${file}`
}


export default function PostCard({ post, onDelete }){
return (
<div style={{border:'1px solid #eee', padding:16, marginBottom:12}}>
<div style={{display:'flex', justifyContent:'space-between'}}>
<div><strong>{post.email}</strong> • {post.created_at.slice(0,10)}</div>
{post.is_owner && <button onClick={()=>onDelete(post.id)}>🗑️</button>}
</div>
<div style={{marginTop:12}}>
{post.file_type === 'image' ? (
<img src={createTransformedUrl(post.url, '', post.caption)} alt="post" style={{width:300}} />
) : (
<video width={300} controls src={createTransformedUrl(post.url, 'w-400,h-200,cm-pad_resize,bg-blurred')} />
)}
</div>
<p>{post.caption}</p>
</div>
)
}