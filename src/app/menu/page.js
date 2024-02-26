"use client";

import { CartContext } from "@/components/AppContext";
import MenuItem from "@/components/Menu/MenuItem";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { useContext, useEffect, useState } from "react";

export default function Page() {
 // const [categories, setCategories] = useState([]);
 // const [menus, setMenus] = useState([]);

  const{menuItems,categories,getCategories}=useContext(CartContext);

  useEffect(() => {
    getCategories();
  }, []);
  
  return (
    <section className="mt-8">
      {categories.length > 0 &&
        categories.map((c) => (
          <div key={c}>
            <div className="text-center">
              <SectionHeaders title1={c.name} />
              <div className="grid grid-cols-3 gap-2">

              {menuItems
                .filter((item) => item.category == c._id)
                .map((item) => (
                    <div key={item}>
                      <MenuItem {...item} />
                    </div>
                ))}
              </div>
              
            </div>
          </div>
        ))}
    </section>
  );
}
