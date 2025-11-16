'use client'
import { useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../Providers'


export default function Login(){
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState(null)
const { setToken, setUser } = useContext(AuthContext)


const login = async ()=>{
try{
const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/jwt/login`, new URLSearchParams({ username: email, password }))
setToken(res.data.access_token)
const me = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, { headers: { Authorization: `Bearer ${res.data.access_token}` } })
setUser(me.data)
}catch(e){
setError('Login failed')
}
}


const signup = async ()=>{
try{
await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, { email, password })
alert('Account created! Please login')
}catch(e){
setError('Signup failed')
}
}


return (
<div style={{maxWidth:480, margin:'40px auto'}}>
<h1>Welcome to Simple Social</h1>
<input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
<br/>
<input placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
<br/>
<button onClick={login}>Login</button>
<button onClick={signup}>Sign Up</button>
{error && <p style={{color:'red'}}>{error}</p>}
</div>
)
}