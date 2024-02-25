"use client";
import { useSession } from "next-auth/react"
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import SuccessBox from "../../components/layout/SuccessBox";
import Link from "next/link";
import Tabs from "../../components/layout/Tabs";
import UserForm from "../../components/layout/UserForm";


export default function ProfilePage() {
    const session=useSession();
    const[isAdmin,setIsAdmin]=useState(false);
    const[user,setUser]=useState(null);
    const[saved,setSaved]=useState(false);

    //let user={};
    const{status}=session;

    useEffect(()=>{
      if(status==='authenticated'){
        fetch('/api/profile').then(response=>response.json())
        .then(data=>{
          // console.log('usr in use effect');
          // console.log(user);
          // user=data;
          setUser(data);
          //console.log()
          // setUserName(data?.name);
          // setPhone(data?.phone);
          // setStreet(data?.streeAddress);
          // setPostal(data?.postalCode);
          // setCity(data?.city);
          // setCountry(data?.country);
           setIsAdmin(data?.admin);
        })
      }
    },[status]);

    if(status==='loading') return 'Loading....';
    if(status==='unauthenticated') return redirect('/login');
    const userImage=session?.data?.user?.image;

    async function handleProfileInfoUpdate(e,userObj) {
        e.preventDefault();
        setSaved(false);

      const response=  await fetch('/api/profile',{
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              name:userObj.userName,
              streeAddress:userObj.street,
             phone: userObj.phone,
              postalCode:userObj.postal,
              city:userObj.city,
              country:userObj.country
            })
        });

        if(response.ok) setSaved(true);
    }

    async function handleFileChange(e){
      const files=e.target.files;
      if(files?.length===1){
        const data=new FormData();
        data.set('file',files[0]);

        await fetch('/api/upload',{
          method:'POST',
          body:data,
         // headers:{'Content-Type':'multipart/form-data'}
        });
      }
    }

    // console.log('user');
    // console.log(user);

  return (
    <section className="mt-8">
     <Tabs isAdmin={isAdmin} />
      {/* <h1 className="text-center text-primary text-4xl mb-4">Profile</h1> */}
      {
        saved&&(
          <SuccessBox>Profile saved!</SuccessBox>
        )
      }
     
       
        {
          user&& <UserForm user={user} onSave={handleProfileInfoUpdate} />
        }  
       
      
    </section>
  )
}
