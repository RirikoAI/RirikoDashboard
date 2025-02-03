import { fetchApi } from "./api-service";
import { authProvider } from "../providers/authProvider";

export const getDiscordServers = async () => {
  let servers;
  
  try {
    servers = await fetchApi("http://localhost:3000/v1/discord/guilds");
    return servers.data;
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