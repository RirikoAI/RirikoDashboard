import { APP_URL } from "../constants";
import { authProvider } from "../providers/authProvider";
import { api } from "./index";

export const getDiscordServers = async () => {
  try {
    return await api(`${ APP_URL }/v1/discord/guilds`, {
      withCredentials: true,
      retries: 3,
    });
  } catch (e: any) {
    // check if we got error 401 or 403
    if (e.response.status === 401 || e.response.status === 403) {
      await logout();
    }
  }
}

async function logout() {
  await authProvider.logout({});
  window.location.href = "/login";
}