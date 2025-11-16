'use client'
import { useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../Providers'


export default function Upload(){
const { token } = useContext(AuthContext)
const [file, setFile] = useState(null)
const [caption, setCaption] = useState('')


const upload = async ()=>{
if(!file) return alert('Select a file')
const form = new FormData()
form.append('file', file)
form.append('caption', caption)
form.append('file_type', file.type)
form.append('file_name', file.name)
try{
await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/upload`, form, { headers: { Authorization: `Bearer ${token}` } })
alert('Uploaded!')
}catch(e){
console.error(e)
alert('Upload failed')
}
}


return (
<div style={{padding:24}}>
<h2>Upload</h2>
<input type="file" onChange={(e)=>setFile(e.target.files[0])} />
<br/>
<textarea placeholder="Caption" value={caption} onChange={(e)=>setCaption(e.target.value)} />
<br/>
<button onClick={upload}>Share</button>
</div>
)
}