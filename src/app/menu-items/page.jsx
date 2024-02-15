'use client';
import Tabs from "@/components/layout/Tabs";
import { useState } from "react";

export default function Page() {
  const[name,setName]=useState('');
  const[desc,setDesc]=useState('');
  const[price,setPrice]=useState(0);

  async function handleFormSubmit(e){
    e.preventDefault();

  }
  return (
    <section className="mt-8">
      <Tabs isAdmin={true} />
      <form onSubmit={handleFormSubmit} className="mt-8">
      <div className="flex gap-2 mx-auto max-w-md items-end">
      <div className="grow">
        <label>Menu item name</label>
        <input value={name} onChange={(e)=>setName(e.target.value)} type="text" />

        <label>Description</label>
        <input value={desc} onChange={(e)=>setDesc(e.target.value)} type="text" />

        <label>Base price</label>
        <input value={price} onChange={(e)=>setPrice(e.target.value)} type="number" />

        <button type="submit">Create</button>
      </div>
      </div>
      </form>
      </section>
  )
}
