export const filterAttachments = (attachments, type, ids) =>
  attachments
    .filter((attachment) => attachment.type === type && ids.includes(attachment.id));

export const extractRelationships = (attachments, type, relationship, item) => {
  const relationships = item.relationships[relationship]?.data;

  if (!relationships) return [];

  return Array.isArray(relationships)
    ? filterAttachments(attachments, type, relationships.map((e) => e.id))
    : filterAttachments(attachments, type, [relationships.id]);
};
