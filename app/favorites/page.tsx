// app/favorites/page.tsx

// import ClientGuard from '@/components/ClientGuard';
import { FavoriteList } from '@/components/favorite/FavoriteList';

export default function FavoritesPage() {
  return (
    <div className='mx-auto'>
      {/* <ClientGuard> */}
        <FavoriteList />
      {/* </ClientGuard> */}
    </div>
  );
}
