"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);

  async function handleFormSubmit(e) {
   
      e.preventDefault();
      setCreatingUser(true);
      setError(false);
      setUserCreated(false);
    const response= await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' }
      });

      if(!response.ok) setError(true);
      else setUserCreated(true); 
      setCreatingUser(false);
    
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl">Register</h1>
      {
        userCreated && (
          <div className="my-4 text-center">
            User created. Now you can <Link href={'/login'} className="underline">Login &raquo;</Link>
          </div>
        )
      }

      {
        error && (
          <div className="my-4 text-center">
            Error <br/>
            try again later
          </div>
        )
      }
      <form className="block max-w-sm mx-auto" onSubmit={handleFormSubmit}>
        <input type="email" placeholder="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={creatingUser}
        />
        <input type="password" placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          disabled={creatingUser}
        />
        <button type="submit" disabled={creatingUser}>Register</button>
        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button className="flex gap-4 justify-center">
          <Image src={'/google.webp'} alt="" width={32} height={32} />
          Login with google
        </button>
        <div className="text-center my-4 text-gray-500 border-2 p-2">
          Existing account? <Link href={'/login'} className="underline">login here  &raquo;</Link>
        </div>
      </form>
    </section>
  )
}
