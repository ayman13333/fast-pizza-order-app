import { useState } from "react";

export default function MenuItemSizesProps({props,setProps,name}) {

    function addProp(){
       setProps(oldSizes=>{
         return[...oldSizes,{name:'',price:0}]
       });
    }
 
    function editProp(e,index,type){
     const newValue=e.target.value;
     setProps(oldSizes=>{
       const newSizes=[...oldSizes];
       newSizes[index][type]=newValue;
       return newSizes;
     });
    }

  return (
    <div className="bg-gray-200 p-2 rounded-lg my-3">
    <label>{name}:</label>
    {props.length>0 && props.map((size,index)=>
    <div className="flex gap-2"
    key={index} >
      <input type="text" 
      value={size.name} placeholder={`${name} name`}
      onChange={e=>editProp(e,index,'name')}
       />
      <input type="number" 
      value={size.price} 
      onChange={e=>editProp(e,index,'price')}
       />
       <div>
        <button className="bg-white m-2"
        type="button"
        onClick={()=>setProps(prev=>prev.filter((v,i)=>i!==index
        ))}
        >x</button>
       </div>
    </div>
    )

    }
    <button 
    type="button"
    onClick={addProp}
    className="bg-white">Add item</button>
  </div>
  )
}
