"use client";
import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function UserForm({ user, onSave }) {
  //const session = useSession();
  const [userName, setUserName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [street, setStreet] = useState(user?.streeAddress || "");
  const [postal, setPostal] = useState(user?.postalCode || "");
  const [city, setCity] = useState(user?.city || "");
  const [country, setCountry] = useState(user?.country || "");
  const[email,setEmail]=useState(user?.email ||'');
  const[admin,setAdmin]=useState(user?.admin || false);


  console.log("user in child");
  console.log(user?.admin);

  return (
    <>
      <div className="max-w-md mx-auto items-center my-5">
        <div className="flex gap-4">
          <div className="bg-gray-300 p-2 rounded-lg">
            <Image
              className="rounded-lg w-full h-full mb-1"
              src={""}
              width={250}
              height={250}
              alt="avatar"
            />
            <label>
              <input type="file" className="hidden" />
              <span className="block border rounded-lg p-2 text-center cursor-pointer">
                Edit
              </span>
            </label>

            {/* <button type="button">Change avatar</button> */}
          </div>
        
        <form
          className="grow"
          onSubmit={(e) =>
            onSave(e, {
              userName,
              street,
              phone,
              postal,
              city,
              country,
              admin
            })
          }
        >
          <label>first and last name</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="first and last name"
          />
          <label>email </label>
          <input
            type="email"
            disabled={true}
            value={email}
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="phone"
          />
          <input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            placeholder="street address"
          />
          <div className="flex gap-2">
            <input
              type="text"
              value={postal}
              onChange={(e) => setPostal(e.target.value)}
              placeholder="postal code"
            />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="city"
            />
          </div>

          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="country"
          />

          <div>
            <label htmlFor="isAdmin" className="p-2 inline-flex items-center gap-2">
            <input 
            checked={admin}
            value={admin}
            onChange={()=>setAdmin(prev=>!prev)}
            type="checkbox"
             id="isAdmin" />
             <span>isAdmin</span> 
              </label>
          </div>
          <button type="submit">Save</button>
        </form>
        </div>
      </div>
    </>
  );
}
