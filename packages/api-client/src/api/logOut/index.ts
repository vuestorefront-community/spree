export default async function logOut(context) {
  await context.config.auth.removeToken();
}
