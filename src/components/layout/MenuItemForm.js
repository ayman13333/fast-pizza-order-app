import { useState } from "react";
import MenuItemSizesProps from "@/components/layout/MenuItemSizesProps";

export default function MenuItemForm({onSubmit,menuItem}) {

    const[name,setName]=useState(menuItem?.name || '');
    const[desc,setDesc]=useState(menuItem?.description || '');
    const[price,setPrice]=useState(menuItem?.basePrice || 0);
    const[sizes,setSizes]=useState([]);
    const[extras,setExtras]=useState([]);
   
  return (
    <form 
    onSubmit={(e)=>onSubmit(e,name,desc,price,sizes,extras)} className="mt-8">
    <div className="flex gap-2 mx-auto max-w-md items-end">
    <div className="grow">
      <label>Menu item name</label>
      <input value={name} onChange={(e)=>setName(e.target.value)} type="text" />

      <label>Description</label>
      <input value={desc} onChange={(e)=>setDesc(e.target.value)} type="text" />

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
