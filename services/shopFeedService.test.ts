import { fetchShopFeed } from '@/services/shopFeedService';

describe('fetchShopFeed', () => {
  it('fetches shop feed data', async () => {
    const filter = 'test';
    const mockData = {
      data: {
        shopFeed: [
          {
            name: 'Test',
            seeAllPath: '/test',
            merchants: [
              {
                id: '1',
                title: 'Merchant 1',
                image: 'image.png',
                logo: 'logo.png',
                bubbleLogo: 'bubble-logo.png',
                salesChannel: 'Online',
                headline: 'Special Offer',
                type: 'Type',
                href: '/merchant/1',
                integrated: true,
                offer: {
                  dealType: 'Deal Type',
                  endDate: 'End Date',
                  activationExpiry: 'Activation Expiry',
                  promoCode: 'Promo Code',
                  additionalTerms: 'Additional Terms',
                  termsAndConditions: 'Terms and Conditions',
                  cashbackLimit: 'Cashback Limit',
                  dealDescription: 'Deal Description',
                  cashbackId: 'Cashback ID',
                },
              },
            ],
          },
        ],
      },
    };
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    } as any);

    const data = await fetchShopFeed(filter);

    expect(data).toEqual(mockData.data.shopFeed);
  });

  it('throws an error when fetching shop feed data fails', async () => {
    const filter = 'test';
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({}),
    } as any);

    await expect(fetchShopFeed(filter)).rejects.toThrowError(
      'Failed to fetch API'
    );
  });
});
