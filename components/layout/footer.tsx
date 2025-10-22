import { getMenu } from 'lib/shopify';

const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  const skeleton =
    'w-full h-6 animate-pulse rounded-sm bg-neutral-200 dark:bg-neutral-700';
  const menu = await getMenu('next-js-frontend-footer-menu');
  const copyrightName = COMPANY_NAME || SITE_NAME || '';

  return (
    <footer className='text-sm text-neutral-500'>
      <div className='py-12 md:pt-30 md:pb-4 text-sm bg-black'>
        <div className='mx-auto flex w-full flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0'>
          <p>
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith('.')
              ? '.'
              : ''}{' '}
            All rights reserved.
          </p>

          <p className='md:ml-auto'>
            <span className='uppercase'>{SITE_NAME}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
