"use client";
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { CartContext } from '../AppContext';
import { useContext } from 'react';

export default function Header() {
    const session = useSession();
    console.log(session);
    const status = session.status;
    const userData = session?.data?.user;

    const { cartProducts } = useContext(CartContext);

    return (

        <header className="flex items-center justify-between">

            <nav className="flex items-center gap-8 text-gray-500 font-semibold">
                <Link className="text-primary font-semibold text-2xl" href="/">ST PIZZA</Link>
                <Link href={'/'}>Home</Link>
                <Link href={'/menu'}>Menu</Link>
                <Link href={'#about'}>About</Link>
                <Link href={'#contact'}>Contact</Link>

            </nav>

            <nav className="flex items-center gap-8 text-gray-500 font-semibold">
                {
                    status === 'authenticated' && (
                        <>
                            <Link href={'/profile'}>{userData.email}</Link>
                            <button
                                onClick={() => signOut()}
                                className="bg-primary text-white rounded-full px-8 py-2">Logout</button>
                        </>

                    )
                }
                {
                    status === 'unauthenticated' && (
                        <>
                            <Link href={'/login'} className="">Login</Link>
                            <Link href={'/register'} className="bg-primary text-white rounded-full px-8 py-2">Register</Link>
                        </>
                    )
                }


                <Link href='/cart'>Cart({cartProducts.length})</Link>
            </nav>
        </header>

    )
}
