import { render } from '@testing-library/react';
import { MerchantTile } from '@/types/merchant';
import MerchantCategoryView from './MerchantCategory';

jest.mock('./MerchantTile', () => {
  return {
    __esModule: true,
    default: ({ merchant: { headline } }: { merchant: MerchantTile }) => (
      <div data-testid='mock-merchant-tile'>{headline}</div>
    ),
  };
});

describe('MerchantCategoryView', () => {
  const category: any = {
    name: 'Electronics',
    merchants: [
      { id: 1, headline: 'Merchant 1' },
      { id: 2, headline: 'Merchant 2' },
      { id: 3, headline: 'Merchant 3' },
    ],
  };

  it('renders category name correctly', () => {
    const { getByText } = render(<MerchantCategoryView category={category} />);
    expect(getByText('Electronics')).toBeInTheDocument();
  });

  it('renders merchant tiles correctly', () => {
    const { getByText } = render(<MerchantCategoryView category={category} />);
    expect(getByText('Merchant 1')).toBeInTheDocument();
    expect(getByText('Merchant 2')).toBeInTheDocument();
    expect(getByText('Merchant 3')).toBeInTheDocument();
  });

  it('renders the correct number of merchant tiles', () => {
    const { getAllByTestId } = render(
      <MerchantCategoryView category={category} />
    );
    const merchantTiles = getAllByTestId('mock-merchant-tile');
    expect(merchantTiles.length).toBe(3);
  });
});
