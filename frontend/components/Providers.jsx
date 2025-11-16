'use client'
import { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'


export const AuthContext = createContext(null)


export default function Providers({ children }){
const [token, setToken] = useState(typeof window !== 'undefined' ? localStorage.getItem('token') : null)
const [user, setUser] = useState(null)
const router = useRouter()


useEffect(()=>{
async function fetchMe(){
if(!token) return
try{
const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, { headers: { Authorization: `Bearer ${token}` } })
if(res.ok){
const data = await res.json()
setUser(data)
} else {
setToken(null)
localStorage.removeItem('token')
}
}catch(e){
console.error(e)
}
}
fetchMe()
},[token])


useEffect(()=>{
if(typeof window !== 'undefined'){
if(token) localStorage.setItem('token', token)
else localStorage.removeItem('token')
}
},[token])


return (
<AuthContext.Provider value={{ token, setToken, user, setUser, router }}>
{children}
</AuthContext.Provider>
)
}