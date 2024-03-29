import type { JsonApiDocument } from '@spree/storefront-api-v2-sdk';

export const filterAttachments = (attachments: JsonApiDocument[], type: string, ids: string[]): JsonApiDocument[] =>
  attachments
    .filter((attachment) => attachment.type === type && ids.includes(attachment.id));

export const extractSingleRelationship = (
  attachments: JsonApiDocument[],
  relationshipsName: string,
  item: JsonApiDocument
): JsonApiDocument => {
  const relationshipData: JsonApiDocument = item.relationships[relationshipsName]?.data;

  return attachments.find(e => e.type === relationshipData?.type && e.id === relationshipData?.id);
};

export const extractRelationships = (
  attachments: JsonApiDocument[],
  documentType: string,
  relationshipsName: string,
  item: JsonApiDocument
): JsonApiDocument[] => {
  const relationships: JsonApiDocument | JsonApiDocument[] = item.relationships[relationshipsName]?.data;

  if (!relationships) return [];

  if (!Array.isArray(relationships)) throw new Error(`Expected ${relationshipsName} to be a one-to-many relation.`);

  return filterAttachments(attachments, documentType, relationships.map((relationship) => relationship.id));
};
