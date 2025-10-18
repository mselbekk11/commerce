import Price from './price';

const Label = ({
  title,
  amount,
  currencyCode,
}: {
  title: string;
  amount: string;
  currencyCode: string;
}) => {
  return (
    <div className='flex w-full pt-2 pb-2'>
      <div className='flex flex-col rounded-full text-xs font-semibold text-black dark:border-neutral-800 dark:bg-black/70 dark:text-white'>
        <h3 className=''>{title}</h3>
        <Price
          className=' text-black'
          amount={amount}
          currencyCode={currencyCode}
          currencyCodeClassName='hidden @[275px]/label:inline'
        />
      </div>
    </div>
  );
};

export default Label;
