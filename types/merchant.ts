export interface MerchantTileOffer {
  dealType: string;
  endDate: string;
  activationExpiry: number;
  promoCode: string;
  additionalTerms: string;
  termsAndConditions: string;
  cashbackLimit: string;
  dealDescription: string;
  cashbackId: string;
}

export interface MerchantTile {
  id: string;
  title: string;
  image: string;
  logo: string;
  bubbleLogo: string;
  salesChannel: string;
  headline: string;
  type: string;
  href: string;
  integrated: boolean;
  offer: MerchantTileOffer;
}

export interface MerchantCategory {
  name: string;
  seeAllPath: string;
  merchants: MerchantTile[];
}
