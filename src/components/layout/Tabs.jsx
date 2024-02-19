'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Tabs({isAdmin}) {
  const path= usePathname();

  return (
    <div className="flex mx-auto justify-center mt-8 gap-2 tabs">
    <Link className={path==='/profile' ? 'active' : ''} href={'/profile'}>Profile</Link>
    {
      isAdmin&&(
        <>
        <Link className={path==='/categories' ? 'active' : ''} href={'/categories'}>Categories</Link>
        <Link className={/menu-item/.test(path) ? 'active' : ''} href={'/menu-items'}>Menu Items</Link>
        <Link className={/users/.test(path) ? 'active' : ''} href={'/users'}>Users</Link>
        <Link className={path==='/orders' ? 'active' : ''} href={'/orders'}>Orders</Link>
        </>
      )
    }
  </div>
  )
}
