export default ({ app, redirect }) => {
  if (app.context.route.path === '/my-account') return redirect('/my-account/my-profile');
};
