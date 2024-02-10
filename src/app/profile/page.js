"use client";
import { useSession } from "next-auth/react"
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";

export default function ProfilePage() {
    const session=useSession();
    const[userName,setUserName]=useState('');
    const[saved,setSaved]=useState(false);
    const{status}=session;

    useEffect(()=>{
      if(status==='authenticated'){
        setUserName(session?.data?.user?.name);
      }
    },[session,status]);

    if(status==='loading') return 'Loading....';
    if(status==='unauthenticated') return redirect('/login');
    const userImage=session?.data?.user?.image;

    async function handleProfileInfoUpdate(e) {
        e.preventDefault();
        setSaved(false);

      const response=  await fetch('/api/profile',{
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({name:userName})
        });

        if(response.ok) setSaved(true);
    }

    async function handleFileChange(e){
      const files=e.target.files;
      if(files?.length===1){
        const data=new FormData();
        data.set('file',files[0]);

        await fetch('/api/upload',{
          method:'POST',
          body:data,
         // headers:{'Content-Type':'multipart/form-data'}
        });
      }
    }
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Profile</h1>
      {
        saved&&(
          <div className="max-w-md mx-auto">
          <h2 className="text-center bg-green-200 p-4 rounded-lg my-2 border border-green-300">Profile saved!</h2>
          </div>
        )
      }
     
      
      <div className="max-w-md mx-auto items-center">
        <div className="flex gap-4">
        <div>
            <div className="bg-gray-300 p-2 rounded-lg">
            <Image className="rounded-lg w-full h-full mb-1" src={userImage} width={250} height={250} alt="avatar" />
            <label>
            <input type="file" className="hidden" onChange={handleFileChange} />
            <span className="block border rounded-lg p-2 text-center cursor-pointer">Edit</span>
            </label>
           
            {/* <button type="button">Change avatar</button> */}
            </div>   
        </div>
        <form className="grow" onSubmit={handleProfileInfoUpdate}>
        <input type="text" 
        value={userName}
        onChange={e=>setUserName(e.target.value)}
        placeholder="first and last name" />
        <input type="email" disabled={true} value={session?.data?.user?.email} />
        <button type="submit">Save</button>
        </form>
        </div>
      </div>
    </section>
  )
}
