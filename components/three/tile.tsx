import clsx from 'clsx';
import Image from 'next/image';
import Label from '../label';

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  shouldBlur = false,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  shouldBlur?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
  };
} & React.ComponentProps<typeof Image>) {
  return (
    <div className='flex w-full flex-col'>
      <div
        className={clsx(
          'group relative aspect-square w-full overflow-hidden border dark:bg-black',
          {
            'border-2 border-blue-600': active,
            'border-neutral-200 dark:border-neutral-800': !active,
          }
        )}
      >
        {props.src ? (
          <Image
            className={clsx('h-full w-full object-cover', {
              'transition duration-300 ease-in-out group-hover:scale-105':
                isInteractive,
              'blur-xs': shouldBlur,
            })}
            {...props}
          />
        ) : null}
      </div>
      {label ? (
        <Label
          title={label.title}
          amount={label.amount}
          currencyCode={label.currencyCode}
        />
      ) : null}
    </div>
  );
}
