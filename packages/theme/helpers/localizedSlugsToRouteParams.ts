// parses { en: 'jacket', de: 'jacket-de' }
// to { en: { slug: 'jacket' }, de: { slug: 'jacket-de' } }

// parses { en: 'bestsellers/jacket', de: 'bestsellers-de/jacket-de' }
// to { en: { slug_1: 'bestsellers', slug_2: 'jacket' }, de: { slug_1: 'bestsellers-de', slug_2: 'jacket-de' } }

const localizedSlugsToRouteParams = (localizedSlugs) => {
  return Object.keys(localizedSlugs)
    .reduce((acc, locale) => {
      const permalink = localizedSlugs[locale];
      const slugs = permalink.split('/').filter(Boolean);

      return {
        ...acc,
        [locale]:
          slugs.length === 1
            ? { slug: slugs[0] }
            : slugs.reduce((slugAcc, slug, idx) => ({ ...slugAcc, [`slug_${idx + 1}`]: slug }), {})
      };
    }, {});
};

export default localizedSlugsToRouteParams;
