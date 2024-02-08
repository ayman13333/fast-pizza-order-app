"use client";
import { useSession } from "next-auth/react"
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";

export default function ProfilePage() {
    const session=useSession();
    const[userName,setUserName]=useState('');
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
        await fetch('/api/profile',{
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({name:userName})
        });
    }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Profile</h1>
      <div className="max-w-md mx-auto items-center">
        <div className="flex gap-4">
        <div>
            <div className="bg-gray-300 p-2 rounded-lg">
            <Image className="rounded-lg w-full h-full mb-1" src={userImage} width={250} height={250} alt="avatar" />
            <button type="button">Change avatar</button>
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
