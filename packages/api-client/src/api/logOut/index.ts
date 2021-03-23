export default async function logOut(context) {
  context.config.auth.removeToken();
}
