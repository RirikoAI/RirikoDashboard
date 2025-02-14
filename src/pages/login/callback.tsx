import { useEffect } from "react";
import { APP_URL, REFRESH_TOKEN_KEY, TOKEN_EXPIRES_AT_KEY, TOKEN_KEY } from "../../constants";
export const Callback = () => {
  useEffect(() => {
    fetch(`${APP_URL}/v1/auth/getToken`, {
      credentials: 'include',
    }).then(async r => {
      if (r.ok) {
        const tokens = await r.json();
        localStorage.setItem(TOKEN_KEY, tokens.access_token);
        localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh_token);
        localStorage.setItem(TOKEN_EXPIRES_AT_KEY, tokens.expires_at);
        window.location.href = '/';
      }
    })
  }, []);
  
  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
};
