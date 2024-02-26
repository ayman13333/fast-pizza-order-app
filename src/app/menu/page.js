"use client";

import MenuItem from "@/components/Menu/MenuItem";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { useEffect, useState } from "react";

export default function Page() {
  const [categories, setCategories] = useState([]);
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const get = async () => {
      let response = await fetch("/api/categories");
      response = await response.json();
      setCategories(response);
      let menusResponse = await fetch("/api/menu-items");
      menusResponse = await menusResponse.json();
      setMenus(menusResponse);
    };
    get();
  }, []);
  return (
    <section className="mt-8">
      {categories.length > 0 &&
        categories.map((c) => (
          <div key={c}>
            <div className="text-center">
              <SectionHeaders title1={c.name} />
              <div className="grid grid-cols-3 gap-2">
              {menus
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
