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
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Execute the GraphQL query
    graphql({ schema, source: req.body.query, rootValue: root })
      .then(result => {
        res.status(200).json(result);
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
