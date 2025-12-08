import Image from 'next/image';
import { AnimatedHalftoneBackgroundTwo } from './animated-halftone-background-two';

export default function Hero() {
  return (
    <div className='relative w-full bg-black h-[600px]'>
      {/* Background */}
      <div className='absolute inset-0'>
        <AnimatedHalftoneBackgroundTwo />
      </div>

      {/* Image Container */}
      <div className='relative w-full max-w-5xl h-full mx-auto'>
        <Image
          src='/hero-image.png'
          alt='hero image of femal model wearing LLM DEPT. hoody'
          fill
          className='object-cover object-center opacity-50'
          priority
          fetchPriority="high"
        />
      </div>
    </div>
  );
}
