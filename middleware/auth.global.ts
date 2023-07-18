export default defineNuxtRouteMiddleware(async (to) => {
  // skip middleware on server
  if (process.server) return;
  
  const { $nhost } = useNuxtApp();
  const isAuthenticated = await $nhost.auth.isAuthenticatedAsync();

  const isAuthRoute = ["/login", "/register"].includes(to.path);
  if (isAuthRoute && !isAuthenticated) return;
  if (isAuthRoute && isAuthenticated) return navigateTo("/");

  if (!isAuthenticated) return navigateTo("/login");
});
