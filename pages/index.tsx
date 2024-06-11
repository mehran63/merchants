import MerchantCategoryView from '@/components/MerchantCategory';
import { useShopFeed } from '@/hooks/useShopFeed';
import { fetchShopFeed } from '@/services/shopFeedService';
import { MerchantCategory } from '@/types/merchant';
import { GetServerSideProps, NextPage } from 'next';
import React, { useState } from 'react';

export const runtime = 'experimental-edge';

interface PageProps {
  merchantTiles: MerchantCategory[];
}

const Page: NextPage<PageProps> = ({ merchantTiles: initialMerchantTiles }) => {
  const [filter, setFilter] = useState('');
  const { merchantTiles } = useShopFeed(filter, initialMerchantTiles);

  return (
    <div className='container mx-auto px-4 bg-white'>
      <h1 className='text-4xl font-bold mb-4'>ZipCo AU Merchants</h1>
      <div className='space-y-4'>
        <input
          type='text'
          value={filter}
          onChange={e => setFilter(e.target.value)}
          placeholder='Filter by name'
          className='mb-4 w-full p-2 rounded-lg border-2 border-gray-300'
        />
        {merchantTiles.map(category => (
          <MerchantCategoryView key={category.seeAllPath} category={category} />
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  const merchantTiles = await fetchShopFeed('');
  return { props: { merchantTiles } };
};

export default Page;
