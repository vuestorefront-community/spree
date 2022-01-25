export const getCurrencyCookie = (context: any) => {
  const value = `; ${context.$spree.config.axios.headers.cookie}`;
  const parts = value.split(`; vsf-spree-currency=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};
