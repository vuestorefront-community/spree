export default async function isGuest(context) {
  if (await context.config.auth.getToken()) {
    return false;
  }

  return true;
}
