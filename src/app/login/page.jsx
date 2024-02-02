"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setloggingIn] = useState(false);

  async function handleFormSubmit(e){
    e.preventDefault();
    setloggingIn(true);
   const {ok}= await fetch('/api/login',{
        body:JSON.stringify({email,password}),
        headers:{'Content-Type':'application/json'},
        method:'POST'
    });

    if(ok){

    }
    else{

    }
    setloggingIn(true);
  }
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl">Login</h1>
      <form className="block mx-auto max-w-sm" onSubmit={handleFormSubmit}>
      <input type="email" placeholder="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={loggingIn}
        />
        <input type="password" placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          disabled={loggingIn}
        />
        <button type="submit" disabled={loggingIn}>Login</button>

        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button className="flex gap-4 justify-center">
          <Image src={'/google.webp'} alt="" width={32} height={32} />
          Login with google
        </button>

        <div className="text-center my-4 text-gray-500 border-2 p-2">
          Dont have account? <Link href={'/register'} className="underline">Register here  &raquo;</Link>
        </div>
      </form>
    </section>
  )
}
