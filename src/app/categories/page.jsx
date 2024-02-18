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
    let data={name:newCategoryName};
    if(editedCategory) data._id=editedCategory._id;

   let response= await fetch('/api/categories',{
      method: editedCategory ? 'PUT' :'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(data)
    });
    response=await response.json();
    //console.log(response);
    if(editedCategory)
    {
      if(response._id) setCategories(prev=>prev.map(el=>el._id==response._id? response : el));
    }
    else
  {
    if(response._id) setCategories(prev=>[...prev,response]);
  }
    
    setNewCategoryName('');
    setEditedCategory('');
  }

  async function handleDeleteCategory(_id){
   let response= await fetch(`/api/categories?_id=${_id}`,{
      method:'DELETE'
    });

    if(response.ok){
      //response=await response.json();
      setCategories(cat=>cat.filter(c=>c._id!==_id));
    }
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
      <div className="pb-2 flex gap-2">
      <button type="submit">
       {editedCategory ? 'Update' : 'Create'} 
        </button>
      <button type="button" onClick={()=>{setEditedCategory(null);setNewCategoryName('')}}>Cancel</button>
      </div>
      </div>
      </form>
      <h2 className="mt-8 text-sm text-gray-500">Categories:</h2>
      {categories?.length>0 && categories.map(c=>(
        <div 
        className="bg-gray-100 rounded-lg p-2 px-4 flex gap-1 my-1"
        key={c._id}
        >
          <span 
          className="grow hover:underline cursor-pointer"
          >  {c.name} 
        </span>
        <div className="flex gap-1">
        <button type="button"
        onClick={()=>{
          setEditedCategory(c);
          setNewCategoryName(c.name);
        }}
        >Edit</button>
        <button type="button"
        onClick={()=>handleDeleteCategory(c._id)}
        >Delete</button>
        </div>
       
        </div>
      ))}
    </section>
  )
}
