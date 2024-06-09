import { MerchantCategory } from '@/types/merchant';
import MerchantTileView from './MerchantTile';

interface MerchantCategoryProps {
  category: MerchantCategory;
}

const MerchantCategoryView: React.FC<MerchantCategoryProps> = ({
  category,
}) => (
  <div className='bg-white rounded p-4'>
    <h2 className='text-2xl font-semibold mb-2'>{category.name}</h2>
    <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6'>
      {category.merchants.map(merchant => (
        <MerchantTileView key={merchant.id} merchant={merchant} />
      ))}
    </div>
  </div>
);

export default MerchantCategoryView;
