export type LineItem = {
  _id: number;
  _variantId: number;
  _description: string;
  _categoriesRef: string[];
  name: string;
  sku: string;
  images: string[];
  price: {
    original: number;
    current: number;
  };
  qty: number;
}

export type Cart = {
  _id: number;
  lineItems: LineItem[];
  token: string;
};
