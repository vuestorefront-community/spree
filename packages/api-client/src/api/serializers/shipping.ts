export const deserializeShippingMethods = (method) => ({
  id: method.id,
  methodId: method.attributes.shipping_method_id,
  label: method.attributes.name,
  selected: method.attributes.selected,
  code: method.attributes.code,
  cost: method.attributes.cost,
  description: method.attributes.display_cost
});
