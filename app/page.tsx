import { CardCast, MovieCard } from '@/components/card';
import { FavoriteList } from '@/components/favorite';
import { Header, Logo, Footer } from '@/components/layout';
import { Search } from '@/components/search';
import {
  Button,
  PlayIcon,
  HeartOutlineIcon,
  Rating,
  Toast,
  ChevronLeft,
  ChevronRight,
  CalendarIcon,
  SearchIcon,
  HappyFaceIcon,
  CloseIcon,
  StarOutlineIcon,
  StarInlineIcon,
  VideoIcon,
  ChevronUpIcon,
  CheckIcon,
  MenuIcon,
  ArrowLeftIcon,
  RoundedCloseIcon,
  HeartInlineIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@/components/ui';

export default function Home() {
  return (
    <div className='min-h-screen bg-neutral-900 text-white flex flex-col gap-6 p-6'>
      <Header />

      <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <Card title='Logo'>
          <Logo />
        </Card>

        <Card title='Primary Button'>
          <Button className='flex items-center'>
            Click Me <PlayIcon size={18} />
          </Button>
        </Card>

        <Card title='Secondary Button'>
          <Button className='flex items-center' variant='secondary'>
            Click Me <HeartOutlineIcon size={18} />
          </Button>
        </Card>

        <Card title='Large Button'>
          <Button className='flex items-center' size='lg'>
            Large <PlayIcon />
          </Button>
        </Card>

        <Card title='Search (Large)'>
          <Search size='large' />
        </Card>

        <Card title='Search (Small)'>
          <Search size='small' />
        </Card>

        <Card title='Rating'>
          <Rating rating={7.5} className='!text-neutral-25' />
        </Card>

        <Card title='Cast Card'>
          <CardCast />
        </Card>

        <Card title='Movie Card'>
          <MovieCard imageUrl='/' title='Movie Title' rating={8.7} />
        </Card>

        <Card title='Favorite List'>
          <FavoriteList />
        </Card>

        <Card title='Toast'>
          <Toast />
        </Card>

        <Card title='Chevron Arrows'>
          <div className='flex gap-3'>
            <ChevronLeft />
            <ChevronRight />
          </div>
        </Card>

        <Card title='All Icons'>
          <div className='flex flex-wrap gap-3'>
            <CalendarIcon />
            <SearchIcon />
            <HappyFaceIcon />
            <CloseIcon />
            <StarOutlineIcon />
            <StarInlineIcon />
            <VideoIcon />
            <ChevronUpIcon />
            <CheckIcon />
            <PlayIcon />
            <MenuIcon />
            <HeartOutlineIcon />
            <ArrowLeftIcon />
            <RoundedCloseIcon />
            <HeartInlineIcon />
            <ChevronLeftIcon />
            <ChevronRightIcon />
          </div>
        </Card>
      </section>

      <Footer />
    </div>
  );
}

// Card wrapper untuk tiap komponen
function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className='bg-neutral-800 rounded-2xl p-4 shadow-md'>
      <h3 className='text-lg font-semibold mb-3'>{title}</h3>
      <div>{children}</div>
    </div>
  );
}
