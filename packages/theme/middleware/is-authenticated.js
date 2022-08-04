export default (context) => {
  const token = context.$cookies.get('spree-bearer-token');

  if (token) {
    const tokenExpiresAt = token.created_at + token.expires_in;
    const currentTime = Date.now() / 1000;

    if (currentTime < tokenExpiresAt) {
      return;
    }
  }

  context.app.router.push(context.app.localePath('/'));
  context.redirect(context.app.localePath('/'));
};
