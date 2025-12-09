export const BASE_URL = "http://172.16.123.151:8001/api";
export const IMAGE_URL = "http://172.16.123.151:8001/";

/**
 * Centralized map of relative API endpoint path segments used throughout the application.
 *
 * Each property maps a descriptive key to a path fragment that should be appended to the configured API base URL.
 * Values intentionally omit a leading slash so they can be safely concatenated with the base URL (e.g. `${API_BASE_URL}/${ENDPOINTS.signUp}`).
 *
 * Benefits:
 * - Provides a single source of truth for endpoint strings to reduce duplication and typos.
 * - Makes it easier to update or refactor endpoint paths in one place.
 *
 * Usage example:
 * const url = `${API_BASE_URL}/${ENDPOINTS.login}`;
 *
 * @public
 * @readonly
 * @remarks Keep this list up to date when backend routes change. Add new endpoints here instead of scattering raw strings across the codebase.
 * @note Enable Raptor mini (Preview) for all clients
 */

export const ENDPOINTS = {
  signUp: "user/signup",
  verifyOtp: "verify-otp",
  resendOtp: "resend-otp",
  login: "user/login",
  forgotPassword: "forgot-password",
  resetPassword: "reset-password",
  changePassword: "change-password",
  categories: "categories",
  products: "products",
  wishlist: "wishlist/products",
  addWishlist: "wishlist/add",
  editProfile: "edit-profile",
  deleteProfileImage: "delete-profile-image",
  updateProfileImage: "upload-profile",
  notification: "user/notifications",
  logout: "logout",
};
