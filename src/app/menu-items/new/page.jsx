'use client';
import Tabs from "@/components/layout/Tabs";
import { redirect } from "next/navigation";
import { useState } from "react";
import MenuItemForm from "@/components/layout/MenuItemForm";


export default function Page() {
  // const[name,setName]=useState('');
  // const[desc,setDesc]=useState('');
  // const[price,setPrice]=useState(0);
  const[redirectTo,setRedirectTo]=useState(false);

  async function handleFormSubmit(e,name,desc,price){
    e.preventDefault();
    let data={name:name,description:desc,basePrice:price};
    const response=await fetch('/api/menu-items',{
      method:'POST',
      body:JSON.stringify(data),
      headers:{'Content-Type':'application/json'}
    });

    if(response.ok){
       setRedirectTo(true);
    }
  }

  if(redirectTo) redirect('/menu-items');

  return (
    <section className="mt-8">
      <Tabs isAdmin={true} />
      <MenuItemForm onSubmit={handleFormSubmit} />
      </section>
  )
}
