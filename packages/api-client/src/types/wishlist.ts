import { ProductVariant } from './product';

export type WishedProduct = {
  wishedProductId: string;
  variantId: string;
  name: string;
  sku: string;
  price: string;
  displayPrice: string;
  image: string;
};

export type Wishlist = {
  token: string;
  wishedProducts: WishedProduct[];
  isDisabled?: boolean;
};

export type AddToWishlistParams = {
  wishlistToken: string;
  product: ProductVariant;
};

export type RemoveFromWishlistParams = {
  wishlistToken: string;
  wishedProductId: string;
};

export type DeleteWishlistParams = {
  wishlistToken: string;
};
