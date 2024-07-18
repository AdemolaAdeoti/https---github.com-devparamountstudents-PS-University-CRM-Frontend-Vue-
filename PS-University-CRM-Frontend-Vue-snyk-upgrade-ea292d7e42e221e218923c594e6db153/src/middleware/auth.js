import { useAuthStore } from "@/stores/auth";

export default (to, from, next) => {
  // Block navigation to paths that include '/undefined' or contain spaces
  if (to.fullPath.includes('/undefined') || to.fullPath.split(' ').length > 1) {
    return next(false); // Abort the navigation
  }

  // Allow navigation to specific non-auth routes
  if (to.fullPath === "/terms-privacy" || to.fullPath === "/technical-support") {
    return next();
  }

  // Auth logic
  const authStore = useAuthStore();
  const token = authStore.userToken;

  // If user is trying to navigate to login but already has a token, redirect to dashboard
  if (token && to.fullPath === "/login") {
    return next("/dashboard");
  }

  // If route requires auth (not marked with `skipAuth`) and there's no token, redirect to login
  if (!to.meta.skipAuth && !token) {
    return next("/login");
  }

  // In all other cases, proceed as normal
  return next();
};
