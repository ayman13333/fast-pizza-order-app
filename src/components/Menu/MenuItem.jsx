'use client';
import { useContext, useState } from "react"
import { CartContext } from "../AppContext"
import MenuItemTile from "./MenuItemTile";


export default function MenuItem(MenuItem) {

  const { name, description, basePrice, sizes, extras } = MenuItem;
  const { addToCart } = useContext(CartContext);
  const [showPoPUP, setShowPoPUP] = useState(false);

  function handleAddToCart() {
    // ()=>addToCart(MenuItem)
    if (sizes.length == 0 && extras.length == 0) addToCart(MenuItem)
    else setShowPoPUP(true);
  }

  return (
    <>
      {
        showPoPUP&&(
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg max-w-md">
            <img src="/pizza.png" className="max-h-24 mx-auto block" alt="pizza" />
            <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
            <p className="text-gray-500 mb-2 text-center">{description}</p>
            {sizes?.length>0&&(
              <div className="p-2">
                <h3 className="mb-2 text-gray-700">Pick your size:</h3>
                {sizes.map(size=>(
                  <label 
                  className="block p-4 mb-2 rounded-md border text-start"
                  key={size}>
                    <input type="radio" name="size" />{size.name} ${basePrice+ size.price}
                  </label>
                ))

                }
              </div>
            )}

            {
              extras?.length>0&&(
                <div className="p-2">
                <h3 className="mb-2 text-gray-700">Pick your extras:</h3>
                {extras.map(extras=>(
                  <label 
                  className="block p-4 mb-2 rounded-md border text-start"
                  key={extras}>
                    <input type="checkbox" name={extras.name} />{extras.name} ${basePrice+ extras.price}
                  </label>
                ))

                }
              </div>
              )
            }
            </div>
          </div>
        )
      }
      <MenuItemTile handleAddToCart={handleAddToCart} {...MenuItem} />
    </>

  )
}
