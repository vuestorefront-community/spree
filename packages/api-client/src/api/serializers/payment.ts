export const deserializePaymentMethods = (method) => ({
  id: method.id,
  type: method.attributes.type,
  label: method.attributes.name,
  description: method.attributes.description,
  preferences: method.attributes.preferences
});
