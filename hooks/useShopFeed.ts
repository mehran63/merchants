import { useState, useEffect } from 'react';
import { fetchShopFeed } from '../services/shopFeedService';
import { MerchantCategory } from '@/types/merchant';

export function useShopFeed(
  filter: string,
  initialMerchantTiles: MerchantCategory[]
) {
  const [isFiltered, setIsFiltered] = useState(false);
  const [merchantTiles, setMerchantTiles] =
    useState<MerchantCategory[]>(initialMerchantTiles);

  useEffect(() => {
    if (filter !== '' || isFiltered) {
      fetchShopFeed(filter).then(setMerchantTiles).catch(console.error);
      setIsFiltered(true);
    }
  }, [filter]);

  return { merchantTiles };
}
