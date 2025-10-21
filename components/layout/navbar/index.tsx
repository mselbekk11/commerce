import CartModal from 'components/cart/modal';
import { getMenu } from 'lib/shopify';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';

const { SITE_NAME } = process.env;

export async function Navbar() {
  const menu = await getMenu('next-js-frontend-header-menu');

  return (
    <nav className='relative flex items-center justify-between p-4 lg:px-6'>
      <div className='grid w-full grid-cols-3 items-center gap-4'>
        {/* Left area - Mobile menu on mobile, menu items on desktop */}
        <div className='flex justify-start'>
          {/* Mobile menu - visible on mobile only */}
          <div className='flex md:hidden'>
            <Suspense fallback={null}>
              <MobileMenu menu={menu} />
            </Suspense>
          </div>
          {/* Desktop menu items - visible on desktop only */}
          {menu.length ? (
            <ul className='hidden gap-6 text-sm md:flex md:items-center'>
              {menu.map((item: Menu) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    prefetch={true}
                    className='text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300'
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {/* Center area - Logo (visible on both mobile and desktop) */}
        <div className='flex justify-center'>
          <Link
            href='/'
            prefetch={true}
            className='flex items-center justify-center'
          >
            {/* <LogoSquare /> */}
            <div className='text-lg font-semibold uppercase'>
              {SITE_NAME}
            </div>
          </Link>
        </div>

        {/* Right area - Shopping cart (visible on both mobile and desktop) */}
        <div className='flex justify-end'>
          <CartModal />
        </div>
      </div>
    </nav>
  );
}
