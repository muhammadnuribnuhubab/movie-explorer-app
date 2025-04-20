import { Button, PlayIcon } from '../ui';
import { HeroBackground } from './HeroBackground';

export const HeroBanner = () => {
  return (
    <section className="relative overflow-hidden min-h-[550px] md:min-h-[700px]">
      <HeroBackground />

      <div className="absolute inset-0 z-10 flex flex-col justify-end px-[18px] pb-24 md:pb-40 gap-6 md:gap-10 max-w-[1180px] mx-auto">
        <div className="flex flex-col gap-1.5 md:gap-8 md:max-w-[635px]">
          <h1 className="text-2xl md:text-5xl font-bold text-neutral-25">The Gorge</h1>
          <p className="text-base md:text-xl font-normal text-neutral-400">
            Two highly trained operatives grow close from a distance after being
            sent to guard opposite sides of a mysterious gorge. When an evil
            below emerges, they must work together to survive what lies within.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <Button className="w-full md:w-[230px]">
            Watch Trailer <PlayIcon size={18} />
          </Button>
          <Button variant="secondary" className="w-full md:w-[230px]">
            See Detail
          </Button>
        </div>
      </div>
    </section>
  );
};
