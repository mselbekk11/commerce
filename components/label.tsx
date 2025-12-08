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
      <div className='flex flex-col text-sm text-gray-500 font-medium dark:border-neutral-800 dark:bg-black/70 dark:text-white'>
        <h3 className=''>{title}</h3>
        <Price
          className=''
          amount={amount}
          currencyCode={currencyCode}
          currencyCodeClassName=''
        />
      </div>
    </div>
  );
};

export default Label;
