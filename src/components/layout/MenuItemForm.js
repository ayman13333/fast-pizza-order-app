import { useEffect, useState } from "react";
import MenuItemSizesProps from "@/components/layout/MenuItemSizesProps";

export default function MenuItemForm({onSubmit,menuItem}) {

    const[name,setName]=useState(menuItem?.name || '');
    const[desc,setDesc]=useState(menuItem?.description || '');
    const[price,setPrice]=useState(menuItem?.basePrice || 0);
    const[sizes,setSizes]=useState(menuItem?.sizes||[]);
    const[extras,setExtras]=useState(menuItem?.extras||[]);
    const[categories,setCategories]=useState([]);
    const[category,setCategory]=useState(menuItem?.category || '');

    async function get(){
     let response= await fetch('/api/categories');
     response=await response.json();
      setCategories(response);
    }
    useEffect(()=>{
      get();
    },[]);
   
  return (
    <form 
    onSubmit={(e)=>onSubmit(e,name,desc,price,sizes,extras,category)} className="mt-8">
    <div className="flex gap-2 mx-auto max-w-md items-end">
    <div className="grow">
      <label>Menu item name</label>
      <input value={name} onChange={(e)=>setName(e.target.value)} type="text" />

      <label>Description</label>
      <input value={desc} onChange={(e)=>setDesc(e.target.value)} type="text" />

      <label>Category:</label>
      <select value={category} onChange={e=>setCategory(e.target.value)}>
        {categories.length>0 && categories.map(c=>(
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>
      <label>Base price</label>
      <input value={price} onChange={(e)=>setPrice(e.target.value)} type="number" />

      <MenuItemSizesProps props={sizes} setProps={setSizes} name={'Sizes'} />
      <MenuItemSizesProps props={extras} setProps={setExtras} name={'Extra Ingrediants'} />

      <button type="submit">Update</button>
    </div>
    </div>
    </form>
  )
}
