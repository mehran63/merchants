import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Page, { getServerSideProps } from '../../pages/index';
import { MerchantCategory } from '@/types/merchant';

jest.mock('@/services/shopFeedService', () => ({
  fetchShopFeed: jest.fn(() => Promise.resolve('merchantTiles data list')),
}));

jest.mock('@/components/MerchantCategory', () => {
  return {
    __esModule: true,
    default: ({ category: { name } }: { category: MerchantCategory }) => (
      <div data-testid='mock-merchant-tile'>{name}</div>
    ),
  };
});

describe('Page', () => {
  it('renders a heading', () => {
    // Arrange
    const mockMerchantTiles: any = [
      {
        name: 'Mock Category',
        seeAllPath: '/mock-category',
      },
    ];
    // Act
    render(<Page merchantTiles={mockMerchantTiles} />);
    // Assert
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it('renders a filter input', () => {
    // Arrange
    const mockMerchantTiles: any = [
      {
        name: 'Mock Category',
        seeAllPath: '/mock-category',
      },
    ];
    // Act
    render(<Page merchantTiles={mockMerchantTiles} />);
    // Assert
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input).toBeInTheDocument();
  });

  it('renders merchant categories', () => {
    // Arrange
    const mockMerchantTiles: any = [
      {
        name: 'Mock Category',
        seeAllPath: '/mock-category',
      },
    ];
    // Act
    render(<Page merchantTiles={mockMerchantTiles} />);
    // Assert
    const category = screen.getByTestId('mock-merchant-tile');
    expect(category).toBeInTheDocument();
  });

  it('renders the correct number of merchant categories', () => {
    // Arrange
    const mockMerchantTiles: any = [
      {
        name: 'Mock Category 1',
        seeAllPath: '/mock-category-1',
      },
      {
        name: 'Mock Category 2',
        seeAllPath: '/mock-category-2',
      },
      {
        name: 'Mock Category 3',
        seeAllPath: '/mock-category-3',
      },
    ];
    // Act
    render(<Page merchantTiles={mockMerchantTiles} />);
    // Assert
    const categories = screen.getAllByTestId('mock-merchant-tile');
    expect(categories).toHaveLength(3);
  });
});

describe('getServerSideProps', () => {
  it('returns the correct props', async () => {
    // Arrange
    // Act
    const response: any = await getServerSideProps({} as any);
    // Assert
    expect(response).toHaveProperty('props');
    expect(response.props).toHaveProperty(
      'merchantTiles',
      'merchantTiles data list'
    );
  });
});
