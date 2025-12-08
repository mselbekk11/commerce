import { AnimatedHalftoneBackgroundTwo } from '../hero/animated-halftone-background-two';
import ClothingDetail from './clothing-detail';

export default function Section() {
  return (
    <div className='relative w-full bg-black py-20'>
      <div className='absolute inset-0'>
        <AnimatedHalftoneBackgroundTwo />
      </div>
      <div className='relative z-10'>
        <ClothingDetail />
      </div>
    </div>
  );
}
