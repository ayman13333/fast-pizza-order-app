'use client';
import { useContext } from "react";
import SectionHeaders from "../../components/layout/SectionHeaders";
import {CartContext} from "@/components/AppContext";
import Image from "next/image";
import { cartProductPrice } from "../../components/AppContext";

export default function Page() {
  const{cartProducts,removeCartProducts}=useContext(CartContext);

  let total=0;
  for(const p of cartProducts){
    total+=cartProductPrice(p);
  }

  return (
    <section className="mt-8">
      <div className="text-center"><SectionHeaders title1='Cart' /></div>
      
      <div className="mt-4 grid gap-4 grid-cols-2">
        <div>
          {cartProducts.length==0&&(<div>No Products in cart</div>)}
          {cartProducts.length>0&&cartProducts.map((product,index)=>
            <div
            className="flex gap-4 mb-4 border-b py-4 items-center" 
            key={product}
            >
              <div className="w-24">
              <Image width={240} height={240} src="/pizza.png" />
              </div>
              <div className="grow">
              <h3 className="font-semibold">{product?.name}</h3>
              {
                product?.sizes&&(
                  <div className="text-sm text-gray-700">
                    Size: <span>{product?.sizes?.name}</span>
                  </div>
                )
              }

              {
                product?.extras?.length>0&&(
                  <div className="text-sm text-gray-500">
                    {
                      product?.extras.map(extra=>(
                        <div key={extra}>
                          <div>{extra?.name} ${extra?.price}</div>
                        </div>
                      ))
                    }
                  </div>
                )
              }
              </div>

              <div className="text-lg font-semibold">
              ${cartProductPrice(product)}
              </div>

              <div className="ml-2">
                <button
                type="button"
                onClick={()=>removeCartProducts(index)}
                >Remove</button>
              </div>
              
            </div>
            )}
          <div>total:
            <span className="text-lg font-semibold">${total}</span>
            </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg">
          <h2>Checkout</h2>
          <form>
            <label>Address</label>
            <input type="text" placeholder="Address" />
            <button type="submit">Pay ${total}</button>
          </form>
        </div>
      </div>
    </section>
  )
}
