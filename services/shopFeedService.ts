import { MerchantCategory } from '@/types/merchant';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

export async function fetchShopFeed(
  filter: string
): Promise<MerchantCategory[]> {
  const query = `{
        shopFeed(name: "${filter}") {
          name
          seeAllPath
          merchants {
            id
            title
            image
            logo
            bubbleLogo
            salesChannel
            headline
            type
            href
            integrated
            offer {
              dealType
              endDate
              activationExpiry
              promoCode
              additionalTerms
              termsAndConditions
              cashbackLimit
              dealDescription
              cashbackId
            }
          }
        }
      }`;
  const res = await fetch(`${baseURL}/api/graphql`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });
  try {
    const body = await res.text();
    const { data, error } = JSON.parse(body);
    if (!data || !data.shopFeed) {
      console.error('Failed to fetch API', error);
      throw new Error('Failed to fetch API');
    }
    return data.shopFeed;
  } catch (e) {
    console.error('Non-json error', res.status);
    throw new Error(`Failed to parse ${baseURL} API rsponse ${res.status}`);
  }
}
