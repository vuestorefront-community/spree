export default async function getCurrentUser(context) {
  const bearerToken = await context.config.auth.getToken();

  const response = await context.client.account.accountInfo({ bearerToken });
  if (response.isSuccess()) {
    return response.success();
  } else {
    throw response.fail();
  }
}
