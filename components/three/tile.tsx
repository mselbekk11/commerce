import clsx from 'clsx';
import Image from 'next/image';
import Label from '../label';

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  background = 'bg-[#F6F6F6]',
  constrainAspectRatio = true,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
  };
  background?: string;
  constrainAspectRatio?: boolean;
} & React.ComponentProps<typeof Image>) {
  return (
    <div className={clsx('flex w-full', {
      'flex-col': constrainAspectRatio,
      'h-full flex-col': !constrainAspectRatio
    })}>
      <div
        className={clsx(
          'group relative w-full overflow-hidden border dark:bg-black',
          background,
          {
            'aspect-square': constrainAspectRatio,
            'flex-1': !constrainAspectRatio,
            'border-2 border-black': active,
            'border-neutral-200 dark:border-neutral-800': !active,
          }
        )}
      >
        {props.src ? (
          <Image
            className={clsx('h-full w-full object-cover', {
              'transition duration-300 ease-in-out group-hover:scale-105':
                isInteractive,
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
