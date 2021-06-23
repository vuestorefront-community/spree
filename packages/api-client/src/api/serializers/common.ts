export const filterAttachments = (attachments, type, ids) =>
  attachments.filter((e) => e.type === type && ids.includes(e.id));

export const extractRelationships = (attachments, type, relationship, item) => {
  const relationships = item.relationships[relationship].data;

  return Array.isArray(relationships)
    ? filterAttachments(attachments, type, relationships.map((e) => e.id))
    : filterAttachments(attachments, type, relationships.id);
};
