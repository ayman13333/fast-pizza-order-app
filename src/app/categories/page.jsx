"use client";
import Tabs from "@/components/layout/Tabs";
import { useEffect, useState } from "react";

export default function Page() {
  const[categories,setCategories]=useState([]);
  const[newCategoryName,setNewCategoryName]=useState('');
  const[editedCategory,setEditedCategory]=useState(null);


  useEffect(()=>{
    fetch('/api/categories').then(res=>res.json())
    .then(categoriesRes=>setCategories(categoriesRes));
  },[]);

  async function handleAddCategory(e) {
    e.preventDefault();
   let response= await fetch('/api/categories',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({name:newCategoryName})
    });
    response=await response.json();
    //console.log(response);
    if(response._id) setCategories(prev=>[...prev,response]);
    setNewCategoryName('');
  }
  return (
    <section className="mt-8 max-w-lg mx-auto">
      <Tabs isAdmin={true} />
      <form className="mt-8" onSubmit={handleAddCategory}>
      <div className="flex gap-2 items-end">
      <div className="grow">
      <label>New category name</label>
      <input value={newCategoryName} onChange={(e)=>setNewCategoryName(e.target.value)} type="text" />
      </div>
      <div className="pb-2">
      <button type="submit">
       {editedCategory ? 'Update' : 'Create'} 
        </button>
      </div>
      </div>
      </form>
      <h2 className="mt-8 text-sm text-gray-500">Edit Category:</h2>
      {categories?.length>0 && categories.map(c=>(
        <button 
        className="bg-gray-200 rounded-lg p-2 px-4 flex gap-1 cursor-pointer my-1"
        key={c._id}
        onClick={()=>{
          setEditedCategory(c);
          setNewCategoryName(c.name);
        }}
        >
        {c.name}
        </button>
      ))}
    </section>
  )
}
