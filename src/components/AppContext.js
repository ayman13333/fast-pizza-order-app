"use client";
import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";

export const CartContext=createContext({});

export function cartProductPrice(cartProduct) {
    let price=cartProduct.basePrice;
    if(cartProduct.size) price+=cartProduct.size.price;
    if(cartProduct.extras?.length>0){
      for(const extra of cartProduct.extras){
        price+=extra.price;
      }
    }

    return price;
}

export default function AppContext({children}) {
  const[cartProducts,setCartProducts]=useState([]);
  const[menuItems,setMenuItems]=useState([]);
  const[categories,setCategories]=useState([]);

  const ls=typeof window !=='undefined' ? window.localStorage :null;

  useEffect(()=>{
    if(ls && ls.getItem('cart')){
      setCartProducts(JSON.parse(ls.getItem('cart')))
    }
  },[]);

  function saveCartToLocalStorage(cartProducts){
    if(ls){
      ls.setItem('cart',JSON.stringify(cartProducts));
    }
  }

  function addToCart(product,sizes=null,extras=[]){
    setCartProducts(prevProducts=>{
      const cartProduct={...product,sizes,extras};
      const newProducts=[...prevProducts,cartProduct];
     saveCartToLocalStorage(newProducts);
      return newProducts;
    });
  }

  function clearCart() {
    setCartProducts([]);
    saveCartToLocalStorage([]);
  }

  function removeCartProducts(indexToRemove) {
    setCartProducts(prevCart=>{
      const newCartProducts=prevCart.filter((v,index)=>indexToRemove !==index);
      saveCartToLocalStorage(newCartProducts);
      return newCartProducts;
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
        cartProducts,setCartProducts,addToCart,menuItems,getMenuItems,categories,getCategories,clearCart,removeCartProducts
      }}>
      {children}
      </CartContext.Provider>
      
    </SessionProvider>
  )
}
