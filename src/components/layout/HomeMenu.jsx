'use client';
import Image from "next/image";
import MenuItem from "../Menu/MenuItem";
import SectionHeaders from "./SectionHeaders";
import { useEffect, useState } from "react";

export default function HomeMenu() {
  const[homePizzas,setHomePizzas]=useState([]);

  useEffect(()=>{
    const get=async()=>{
      let response=await fetch('/api/menu-items');
      response=await response.json();
      setHomePizzas(response.slice(-3));
    }
    get();
  },[]);
  return (
    <section>
      <div className="absolute  left-0 right-0 justify-start overflow-hidden"> 
      <div className="absolute left-0 -top-[70px] text-left">
        <Image src={'/sallad1.png'} width={109} height={189} alt="salad" />
      </div>
      <div className="absolute -top-[100px]  right-0">
        <Image src={'/sallad2.png'} width={107} height={195} alt="salad" />
      </div>
      </div>
      
      <div className="text-center mb-4">
        <SectionHeaders title1={'Menus'} title2={'checkout'} />
      </div>

      <div className="grid grid-cols-3 gap-4">
      {
        homePizzas?.length>0&& homePizzas.map(item=> <MenuItem key={item} {...item} />)
      }
      </div>
    </section>
  )
}
