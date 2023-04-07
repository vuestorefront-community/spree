import type { JsonApiDocument, EstimatedShippingMethodAttr } from '@spree/storefront-api-v2-sdk';
import { Shipment, ShippingRate } from '../..';
import { extractRelationships } from './common';

export const deserializeShippingRate = (method: EstimatedShippingMethodAttr): ShippingRate => ({
  id: method.id,
  methodId: method.attributes.shipping_method_id.toString(),
  name: method.attributes.name,
  selected: method.attributes.selected,
  cost: method.attributes.cost
});

export const deserializeShipment = (shipment: JsonApiDocument, included: JsonApiDocument[]): Shipment => {
  const shippingRates = extractRelationships(included, 'shipping_rate', 'shipping_rates', shipment);

  return {
    id: shipment.id,
    availableShippingRates: shippingRates.map(deserializeShippingRate)
  };
};

export const deserializeCartShipments = (included: JsonApiDocument[]): Shipment[] => {
  const shipments = included.filter(e => e.type === 'shipment');
  return shipments.map(e => deserializeShipment(e, included));
};
