"use client";
import { SessionProvider } from "next-auth/react";
import { createContext, useState } from "react";

export const CartContext=createContext({});

export default function AppContext({children}) {
  const[cartProducts,setCartProducts]=useState([]);
  const[menuItems,setMenuItems]=useState([]);
  const[categories,setCategories]=useState([]);

  function addToCart(product,sizes=null,extras=[]){
    setCartProducts(prevProducts=>{
      const cartProduct={...product,sizes,extras};
      const newProducts=[...prevProducts,cartProduct];
      console.log("newProducts");
      console.log(newProducts);
      return newProducts;
    });
  }

  async function getMenuItems(){
    let response=await fetch('/api/menu-items');
      response=await response.json();
      setMenuItems(response);
  }

  async function getCategories() {
    let response = await fetch("/api/categories");
    response = await response.json();
    setCategories(response);
  }

  if(menuItems.length==0) getMenuItems();

  return (
    <SessionProvider>

      <CartContext.Provider value={{
        cartProducts,setCartProducts,addToCart,menuItems,getMenuItems,categories,getCategories
      }}>
      {children}
      </CartContext.Provider>
      
    </SessionProvider>
  )
}
