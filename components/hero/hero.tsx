import { AnimatedHalftoneBackgroundTwo } from './animated-halftone-background-two';

export default function Hero() {
  return (
    <div className='relative w-full bg-black py-20 min-h-[600px]'>
      <div className='absolute inset-0 '>
        <AnimatedHalftoneBackgroundTwo />
      </div>
      <div className='relative z-10'>
        {/* <div className='w-full max-w-2xl mx-auto flex flex-col gap-6 items-center justify-center'>
          <p className='text-4xl font-bold text-white'>Title</p>
        </div> */}
      </div>
    </div>
  );
}
