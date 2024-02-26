"use client";
import { SessionProvider } from "next-auth/react";
import { createContext, useState } from "react";

export const CartContext=createContext({});

export default function AppContext({children}) {
  const[cartProducts,setCartProducts]=useState([]);
  const[menuItems,setMenuItems]=useState([]);

  function addToCart(product,sizes=null,extras=[]){
    setCartProducts(prevProducts=>{
      const cartProduct={...product,size,extras};
      const newProducts=[...prevProducts,cartProduct];

      return newProducts;
    });
  }

  async function getMenuItems(){
    let response=await fetch('/api/menu-items');
      response=await response.json();
      setMenuItems(response);
  }

  return (
    <SessionProvider>

      <CartContext.Provider value={{
        cartProducts,setCartProducts,addToCart,menuItems,getMenuItems
      }}>
      {children}
      </CartContext.Provider>
      
    </SessionProvider>
  )
}
