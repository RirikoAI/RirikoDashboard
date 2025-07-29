import 'dotenv/config';
import { getBackendUrl } from './helpers/ip.helper';

// Use the backend URL from local storage or fallback to environment variables
export const APP_URL = getBackendUrl();
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
