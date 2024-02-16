'use client';
import Tabs from "@/components/layout/Tabs";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const[menuItems,setMenuItems]=useState([]);
  useEffect(()=>{
    fetch('/api/menu-items')
    .then(res=>{
      res.json().then(menuItems=>setMenuItems(menuItems))
    })
    ;
  },[]);

  return (
    <section className="mt-8 mx-auto max-w-md">
      <Tabs isAdmin={true} />
      <div className="mt-8">
      <Link className="button text-center my-2" href={'/menu-items/new'}>new</Link>
      </div>
      <div>
        <h2 className="text-sm text-gray-500 my-4">Edit item:</h2>
        {
          menuItems.length>0 &&menuItems.map(item=>
            <Link href={`/menu-items/edit/${item._id}`} className="my-2 button" key={item._id}>
              {item?.name}
            </Link>
            )
        }
      </div>   
      </section>
  )
}
