"use client";
import { useSession } from "next-auth/react"
import Image from "next/image";
import { redirect } from "next/navigation";

export default function ProfilePage() {
    const session=useSession();
    const{status}=session;

    if(status==='loading') return 'Loading....';
    if(status==='unauthenticated') return redirect('/login');
    const userImage=session?.data?.user?.image;

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Profile</h1>
      <form className="max-w-md mx-auto items-center">
        <div className="flex gap-4">
        <div>
            <div className="bg-gray-300 p-2 rounded-lg">
            <Image src={userImage} width={80} height={80} alt="avatar" />
            <button type="button">Change avatar</button>
            </div>
            
        </div>
        <div className="grow">
        <input type="text" placeholder="first and last name" />
        <button type="submit">Save</button>
        </div>
        </div>
      </form>
    </section>
  )
}
