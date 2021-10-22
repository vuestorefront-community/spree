/* istanbul ignore file */

import { UserOrderGetters } from '@vue-storefront/core';
import { Order, OrderItem } from '../types';

export const getDate = (order: Order): string => order ? new Date(order.completedAt).toLocaleString('en-US') : '';

export const getId = (order: Order): string => order?.number || '';

export const getStatus = (order: Order): string => order?.state || '';

export const getPrice = (order: Order): number | null => order?.totalAmount || 0;

export const getItems = (order: Order): any[] => order?.lineItems || [];

export const getItemSku = (item: OrderItem): string => item?.sku || '';

export const getItemName = (item: OrderItem): string => item?.name || '';

export const getItemQty = (item: OrderItem): number => item?.qty || 0;

export const getItemPrice = (item: OrderItem): number => item?.price?.current || 0;

export const getFormattedPrice = (price: number) => String(price);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getOrdersTotal = (orders: any): number => 1;

const orderGetters: UserOrderGetters<Order, OrderItem> = {
  getDate,
  getId,
  getStatus,
  getPrice,
  getItems,
  getItemSku,
  getItemName,
  getItemQty,
  getItemPrice,
  getFormattedPrice,
  getOrdersTotal
};

export default orderGetters;
