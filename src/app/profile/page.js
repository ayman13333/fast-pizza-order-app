"use client";
import { useSession } from "next-auth/react"
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import SuccessBox from "../../components/layout/SuccessBox";
import Link from "next/link";
import Tabs from "../../components/layout/Tabs";

export default function ProfilePage() {
    const session=useSession();
    const[userName,setUserName]=useState('');
    const[saved,setSaved]=useState(false);
    const[phone,setPhone]=useState("");
    const[street,setStreet]=useState("");
    const[postal,setPostal]=useState("");
    const[city,setCity]=useState("");
    const[country,setCountry]=useState("");
    const[isAdmin,setIsAdmin]=useState(false);

    const{status}=session;

    useEffect(()=>{
      if(status==='authenticated'){
        

        fetch('/api/profile').then(response=>response.json())
        .then(data=>{
          setUserName(data?.name);
          setPhone(data.phone);
          setStreet(data.streeAddress);
          setPostal(data.postalCode);
          setCity(data.city);
          setCountry(data.country);
          setIsAdmin(data.admin);
        })
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
            body:JSON.stringify({
              name:userName,
              streeAddress:street,
              phone,
              postalCode:postal,
              city,
              country
            })
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
     <Tabs isAdmin={isAdmin} />
      {/* <h1 className="text-center text-primary text-4xl mb-4">Profile</h1> */}
      {
        saved&&(
          <SuccessBox>Profile saved!</SuccessBox>
        )
      }
     
      
      <div className="max-w-md mx-auto items-center">
        <div className="flex gap-4">
        <div>
            <div className="bg-gray-300 p-2 rounded-lg">
            <Image className="rounded-lg w-full h-full mb-1" src={""} width={250} height={250} alt="avatar" />
            <label>
            <input type="file" className="hidden" onChange={handleFileChange} />
            <span className="block border rounded-lg p-2 text-center cursor-pointer">Edit</span>
            </label>
           
            {/* <button type="button">Change avatar</button> */}
            </div>   
        </div>
        <form className="grow" onSubmit={handleProfileInfoUpdate}>
          <label>first and last name</label>
        <input type="text" 
        value={userName}
        onChange={e=>setUserName(e.target.value)}
        placeholder="first and last name" />
        <label>email </label>
        <input type="email" disabled={true} value={session?.data?.user?.email} />
        <input type="tel" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="phone" />
        <input type="text" value={street} onChange={(e)=>setStreet(e.target.value)} placeholder="street address" />
        <div className="flex gap-2">
        <input type="text" value={postal} onChange={(e)=>setPostal(e.target.value)} placeholder="postal code" />
        <input type="text" value={city} onChange={(e)=>setCity(e.target.value)} placeholder="city" />
        </div>
       
        <input type="text" value={country} setCountry={(e)=>setCountry(e.target.value)} placeholder="country" />
        <button type="submit">Save</button>
        </form>
        </div>
      </div>
    </section>
  )
}
