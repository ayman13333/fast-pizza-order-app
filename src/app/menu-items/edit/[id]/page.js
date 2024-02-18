'use client';
import { useEffect, useRef, useState } from "react";
import { redirect, useParams  } from 'next/navigation';
import Tabs from "@/components/layout/Tabs";
import MenuItemForm from "@/components/layout/MenuItemForm";


export default function Page() {

  const {id} = useParams ();
  const[redirectTo,setRedirectTo]=useState(false);
  //const responseRef=useRef({});
  const [res,setRes]=useState();

    useEffect(()=>{

      const get= async()=>{
        let response=await fetch(`/api/menu-items?id=${id}`);
        response=await response.json();
        setRes({...response});
      }
      // const { id } = router.query;
      console.log(id);
      get();
    },[]);
  
    async function handleFormSubmit(e,name,desc,price,sizes,extras){
      e.preventDefault();
      let data={_id:id,name,description:desc,basePrice:price,sizes,extras};
      const response=await fetch('/api/menu-items',{
        method:'PUT',
        body:JSON.stringify(data),
        headers:{'Content-Type':'application/json'}
      });
  
      if(response.ok){
         setRedirectTo(true);
      }
    }
  
    if(redirectTo) redirect('/menu-items');

    console.log('res');
    console.log(res);
  
    return (
      <section className="mt-8">
        <Tabs isAdmin={true} />
      {res&& <MenuItemForm menuItem={res} onSubmit={handleFormSubmit} />} 
      <div className="max-w-md mx-auto mt-4 ">
        <div className="max-w-md ml-auto ">
        <button>Delete this MenuItem</button>
        </div>
        
      </div>
        </section>
    )
}
