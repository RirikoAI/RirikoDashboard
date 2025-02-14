import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ai.ririko.dashboard',
  appName: 'Ririko Dashboard',
  webDir: 'dist',
  server: {
    "allowNavigation": [
      "*"
    ]
  }
};

export default config;
