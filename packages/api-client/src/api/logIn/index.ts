export default async function logIn(context, params) {
  const { username, password } = params;

  const response = await context.client.authentication.getToken({ username, password });

  if (response.isSuccess()) {
    const bearerToken = response.success().access_token;
    context.config.auth.changeToken(bearerToken);
  } else {
    throw response.fail();
  }
}
