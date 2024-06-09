import React from 'react';
import { render } from '@testing-library/react';
import MerchantTileView from './MerchantTile';

describe('MerchantTileView', () => {
  const merchant: any = {
    id: '1',
    href: '/merchant/1',
    bubbleLogo: 'bubble-logo.png',
    image: 'image.png',
    title: 'Merchant 1',
    headline: 'Special Offer',
    salesChannel: 'Online',
  };

  it('renders the merchant tile with all the elements', () => {
    const { getByText } = render(<MerchantTileView merchant={merchant} />);

    expect(getByText('Merchant 1')).toBeInTheDocument();
    expect(getByText('Special Offer')).toBeInTheDocument();
    expect(getByText('Online')).toBeInTheDocument();
  });

  it('renders the merchant tile with the correct images', () => {
    const { getByAltText } = render(<MerchantTileView merchant={merchant} />);

    expect(getByAltText('Merchant 1')).toBeInTheDocument();
    expect(getByAltText('Merchant 1 logo')).toBeInTheDocument();
  });

  it('renders the merchant tile with no logo images', () => {
    const merchantWithNoLogo = { ...merchant, bubbleLogo: undefined };
    const { getByAltText, queryByAltText } = render(
      <MerchantTileView merchant={merchantWithNoLogo} />
    );

    expect(getByAltText('Merchant 1')).toBeInTheDocument();
    expect(queryByAltText('Merchant 1 logo')).not.toBeInTheDocument();
  });

  it('renders the merchant tile with the correct link', () => {
    const { getByRole } = render(<MerchantTileView merchant={merchant} />);

    expect(getByRole('link')).toHaveAttribute('href', '/merchant/1');
  });
});
