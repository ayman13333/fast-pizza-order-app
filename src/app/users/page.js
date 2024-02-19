'use client';
import Tabs from "@/components/layout/Tabs";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
    const[users,setUsers]=useState([]);

    async function get(){
        let response=await fetch('/api/users');
        response=await response.json();
        setUsers(response);
    }
    useEffect(()=>{
        get();
    },[]);
  return (
    <section className="mt-8 mx-auto max-w-2xl">
        <Tabs isAdmin={true} />
        <div className="mt-8">
            {
                users.length>0 && users.map(user=>(
                    <div 
                    className="bg-gray-100 rounded-lg mb-2 p-1 px-4 flex items-center gap-4"
                    key={user._id}>
                        <div className="grid grid-cols-2 gap-4 grow">
                        <span className="text-gray-900">{user?.name || 'no name'}</span>
                        <span className="text-gray-500">{user?.email}</span>
                        </div>
                        <div>
                            <Link className="button" href={`/users/${user._id}`}>Edit</Link>
                        </div>

                    </div>
                ))
            }
        </div> 
    </section>
  )
}
