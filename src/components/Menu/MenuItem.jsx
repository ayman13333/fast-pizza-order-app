'use client';
import { useContext, useState } from "react"
import { CartContext } from "../AppContext"
import MenuItemTile from "./MenuItemTile";


export default function MenuItem(MenuItem) {

  const { name, description, basePrice, sizes, extras } = MenuItem;
  const { addToCart } = useContext(CartContext);
  const [showPoPUP, setShowPoPUP] = useState(false);
  const[selectedSize,setSelectedSize]=useState(null);
  const[selectedExtras,setSelectedExtras]=useState([]);

  
  function handleAddToCart() {
    // ()=>addToCart(MenuItem)
    if(showPoPUP){
      addToCart(MenuItem,selectedSize,selectedExtras);
      setShowPoPUP(false);
      return;
    }
    if (sizes.length == 0 && extras.length == 0) addToCart(MenuItem)
    else setShowPoPUP(true);
  }

  function handleExtrasClick(e,extra) {
    const checked=e.target.checked;
    if(checked) setSelectedExtras(prev=>[...prev,extra]);
    else setSelectedExtras(prev=>prev.filter(e=>e.name!==extra.name));
    
  }

  let selectedPrice=basePrice;
  if(selectedSize) selectedPrice+=selectedSize.price;

  if(selectedExtras?.length>0){
    for(const extra of selectedExtras)
    {
      selectedPrice+=extra.price;
    }
  }

  return (
    <>
      {
        showPoPUP&&(
          <div 
          onClick={()=>setShowPoPUP(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center">
            <div 
            onClick={e=>e.stopPropagation()}
            className="bg-white p-4 rounded-lg max-w-md overflow-y-scroll">

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
                    <input type="radio" name="size" onClick={()=>setSelectedSize(size)} checked={selectedSize?.name===size.name} />{size.name} ${basePrice+ size.price}
                  </label>
                ))

                }
              </div>
            )}

            {extras?.length>0&&(
                <div className="p-2">
                <h3 className="mb-2 text-gray-700">Pick your extras:</h3>
                {extras.map(extras=>(
                  <label 
                  className="block p-4 mb-2 rounded-md border text-start"
                  key={extras}>
                    <input type="checkbox" onClick={(e)=>handleExtrasClick(e,extras)} name={extras.name} />{extras.name} ${basePrice+ extras.price}
                  </label>
                ))
                }
              </div>
              )
            }

            <button onClick={handleAddToCart} className="primary" type="button">Add to Cart {selectedPrice}$ </button>
            </div>
          </div>
        )
      }
      <MenuItemTile handleAddToCart={handleAddToCart} {...MenuItem} />
    </>

  )
}
