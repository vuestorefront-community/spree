export default function isGuest(context) {
  if (context.config.auth.getToken()) {
    return false;
  }

  return true;
}
