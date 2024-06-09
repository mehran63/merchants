import { MerchantTile } from '@/types/merchant';
import { LazyImage } from './LazyImage';

interface MerchantTileProps {
  merchant: MerchantTile;
}

const MerchantTileView: React.FC<MerchantTileProps> = ({ merchant }) => (
  <a key={merchant.id} href={merchant.href || '/'} className='merchant-tile'>
    {(merchant.bubbleLogo || merchant.logo) && (
      <LazyImage
        src={merchant.bubbleLogo || merchant.logo}
        alt={`${merchant.title} logo`}
        className={`merchant-logo ${merchant.bubbleLogo ? '' : 'merchant-name-logo'}`}
      />
    )}
    <LazyImage
      src={merchant.image}
      alt={merchant.title}
      className='w-full object-cover object-center rounded-t-lg'
    />
    <div className='p-4'>
      <h2 className='text-lg font-medium'>{merchant.title}</h2>
      <p className='text-lg font-bold py-1 pb-2 text-purple-800'>
        {merchant.headline || 'Shop now'}
      </p>
      <span className='bg-gray-100 rounded-lg py-1 px-2 text-s font-semibold text-gray-700'>
        {merchant.salesChannel}
      </span>
    </div>
  </a>
);

export default MerchantTileView;
