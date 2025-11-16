'use client'
import Link from 'next/link'
import { useContext } from 'react'
import { AuthContext } from '../Providers'


export default function Nav(){
const { user, setToken, setUser } = useContext(AuthContext)
return (
<nav style={{display:'flex', justifyContent:'space-between', padding:16, borderBottom:'1px solid #eee'}}>
<div><Link href="/">Simple Social</Link></div>
<div style={{display:'flex', gap:12}}>
<Link href="/">Feed</Link>
<Link href="/upload">Upload</Link>
{user ? (
<>
<span>{user.email}</span>
<button onClick={()=>{ setToken(null); setUser(null) }}>Logout</button>
</>
) : (
<Link href="/login">Login</Link>
)}
</div>
</nav>
)
}