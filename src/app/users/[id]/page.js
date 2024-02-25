'use client';

import Tabs from "@/components/layout/Tabs";
import UserForm from "@/components/layout/UserForm";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const {id} = useParams ();
  const[user,setUser]=useState(null);
  useEffect(()=>{
    async function get() {
      let response=await fetch(`/api/users?id=${id}`);
      response=await response.json();
      setUser(response);
    }
    get();
  },[]);

  async function handleSaveButtonClick(e,userObj) {
    e.preventDefault();

    const response=  await fetch('/api/profile',{
      method:'PUT',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        _id:id,
        name:userObj.userName,
        streeAddress:userObj.street,
       phone: userObj.phone,
        postalCode:userObj.postal,
        city:userObj.city,
        country:userObj.country,
        email:user.email
      })
  });
  }

  return (
    <section className="mt-8 mx-auto max-w-2xl">
      <Tabs isAdmin={true} />
      <div className="mt-8">
     {user&& <UserForm user={user} onSave={handleSaveButtonClick} />} 
      </div>
    </section>
  )
}
