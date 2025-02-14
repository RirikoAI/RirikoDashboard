import 'dotenv/config';
export const APP_URL = `${process.env.REACT_APP_BACKEND_SCHEME}${process.env.REACT_APP_BACKEND_DOMAIN}:${process.env.REACT_APP_BACKEND_PORT}`;
export const API_URL = `${APP_URL}/v1`; // API URL (backend)
export const TOKEN_KEY = "access-token";
export const REFRESH_TOKEN_KEY = "refresh-token";
export const TOKEN_EXPIRES_AT_KEY = "token-expires";

// Time threshold in milliseconds (e.g., 1 hour) for refresing token
export const TIME_THRESHOLD = 60 * 60 * 1000;

export const LANGUAGES = {
  en: "English",
  ms: "Bahasa Melayu",
};