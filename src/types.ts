export type Brand = 'all' | 'samsung' | 'lg' | 'other';

export type Category =
  | 'all'
  | 'tv'
  | 'fridge'
  | 'wash'
  | 'air'
  | 'care'
  | 'wellness'
  | 'kitchen'
  | 'digital_living';

export type ProductTier =
  | 'all'
  | 'triple_dia'
  | 'triple_gold'
  | 'triple_silver'
  | 'double_gold'
  | 'double_silver'
  | 'single_silver';

export interface Product {
  id: string;
  brand: 'samsung' | 'lg' | 'other';
  brandName: string;
  modelCode: string;
  name: string;
  category: Category;
  categoryName: string;
  tier: ProductTier;
  tierName: string;
  tag: string;
  originalPrice: string;
  supportBenefit: string;
  customerCost: string;
  monthlySupport: string;
  specs: string[];
  image: string;
  badge?: string;
  popularRank?: number;
}

export interface ApplicationSubmission {
  id: string;
  applicationNumber: string;
  createdAt: string;
  productName: string;
  productBrand: string;
  productImage: string;
  productModelCode?: string;
  productTierName?: string;
  // Second selected appliance
  product2Name?: string;
  product2Brand?: string;
  product2Image?: string;
  product2ModelCode?: string;
  product2TierName?: string;
  userName: string;
  phoneNumber: string;
  preferredTime: string;
  region: string;
  note?: string;
  status: '접수완료' | '상담원 배정' | '안심콜 대기' | '상담완료';
  formspreeSent?: boolean;
  marketingConsent?: boolean;
}

export interface TickerItem {
  id: string;
  name: string;
  region: string;
  product: string;
  timeAgo: string;
  status: string;
}
