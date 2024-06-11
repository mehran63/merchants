/**
 * For this project, we will be using a mock data file to simulate the data that would be returned from a real API.
 */
import data from './data.json';
import { buildSchema, graphql } from 'graphql';
import type { NextApiRequest, NextApiResponse } from 'next';

export const runtime = 'edge';

const schema = buildSchema(`
  type MerchantCategory {
    name: String
    seeAllPath: String
    merchants: [MerchantTile]
  }

  type MerchantTile {
    id: String
    title: String
    image: String
    logo: String
    bubbleLogo: String
    salesChannel: String
    headline: String
    type: String
    href: String
    integrated: Boolean
    offer: MerchantTileOffer
  }

  type MerchantTileOffer {
    dealType: String
    endDate: String
    activationExpiry: Int
    promoCode: String
    additionalTerms: String
    termsAndConditions: String
    cashbackLimit: String
    dealDescription: String
    cashbackId: String
  }

  type Query {
    getMerchantTile(id: String): MerchantTile
    getAllMerchantTiles: [MerchantTile]
    shopFeed(name: String): [MerchantCategory]
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  shopFeed: ({ name }: { name?: string }) => {
    if (!name) {
      return data.categories;
    }
    return data.categories.map(category => {
      const filteredMerchants = category.merchants.filter(merchant =>
        merchant.title.toLowerCase().includes(name.toLowerCase())
      );
      return { ...category, merchants: filteredMerchants };
    });
  },
};

// Define the API handler
export default async function handler(req: NextApiRequest) {
  if (req.method === 'POST') {
    try {
      // Edge runtime: Read and parse the request body manually
      const chunks = [];
      for await (const chunk of req.body) {
        chunks.push(chunk);
      }
      const body = Buffer.concat(chunks).toString();
      const { query } = JSON.parse(body);
      const result = await graphql({
        schema,
        source: query,
        rootValue: root,
      });
      return new Response(JSON.stringify(result, null, 2), {
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
      });
    } catch (error: any) {
      console.error('Failed to execute GraphQL query', error);
      return new Response(JSON.stringify({ error: error.message }, null, 2), {
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
        status: 500,
      });
    }
  } else {
    return new Response(
      JSON.stringify({ error: 'Method Not Allowed' }, null, 2),
      {
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
        status: 405,
      }
    );
  }
}
