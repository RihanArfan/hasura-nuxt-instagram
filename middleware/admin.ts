export default defineNuxtRouteMiddleware(async () => {
  const adminSecret = useAdminSecret();
  const isAuthenticated = !!adminSecret.value;
  if (!isAuthenticated) return navigateTo("/admin/login");
});
