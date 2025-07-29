/**
 * Helper functions for IP address detection and server connectivity check
 */

// Local storage keys
export const IP_STORAGE_KEY = "backend-ip";
export const PORT_STORAGE_KEY = "backend-port";
export const SCHEME_STORAGE_KEY = "backend-scheme";

// Default values
export const DEFAULT_PORT = "3000";
export const DEFAULT_SCHEME = "http://";

/**
 * Detects the local IP address (192.168.x.x or 172.16.x.x) using WebRTC
 * @returns {Promise<string|null>} The detected IP address or null if not found
 */
export const detectLocalIP = async (): Promise<string | null> => {
  return new Promise((resolve) => {
    // Using WebRTC to detect local IP addresses
    const peerConnection = window.RTCPeerConnection 
      || (window as any).mozRTCPeerConnection 
      || (window as any).webkitRTCPeerConnection;

    if (!peerConnection) {
      console.warn("WebRTC not supported for IP detection");
      resolve(null);
      return;
    }

    const pc = new peerConnection({ 
      iceServers: [] 
    });

    // Timeout to ensure we don't hang indefinitely
    const timeoutId = setTimeout(() => {
      pc.close();
      resolve(null);
    }, 5000);

    pc.createDataChannel("");
    pc.createOffer()
      .then(pc.setLocalDescription.bind(pc))
      .catch(() => {
        clearTimeout(timeoutId);
        resolve(null);
      });

    pc.onicecandidate = (ice) => {
      if (!ice || !ice.candidate || !ice.candidate.candidate) {
        return;
      }

      const candidateStr = ice.candidate.candidate;
      const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/;
      const ipMatch = ipRegex.exec(candidateStr);

      if (ipMatch) {
        const ip = ipMatch[1];
        // Check if it's a local IP (192.168.x.x or 172.16.x.x)
        if (ip.startsWith('192.168.') || ip.startsWith('172.16.')) {
          clearTimeout(timeoutId);
          pc.close();
          resolve(ip);
        }
      }
    };
  });
};

/**
 * Checks if a server is reachable at the given IP and port
 * @param {string} ip - The IP address to check
 * @param {string} port - The port to check
 * @param {string} scheme - The scheme (http:// or https://)
 * @returns {Promise<boolean>} True if the server is reachable, false otherwise
 */
export const isServerReachable = async (
  ip: string, 
  port: string = DEFAULT_PORT,
  scheme: string = DEFAULT_SCHEME
): Promise<boolean> => {
  try {
    const url = `${scheme}${ip}:${port}/v1/health`;
    const response = await fetch(url, { 
      method: 'GET',
      mode: 'no-cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      // Set a timeout to avoid hanging
      signal: AbortSignal.timeout(3000)
    });

    return true; // If we get here, the server is reachable
  } catch (error) {
    console.error("Server connectivity check failed:", error);
    return false;
  }
};

/**
 * Gets the backend URL configuration from local storage
 * @returns {Object} The backend URL configuration from local storage
 */
export const getStoredBackendConfig = (): { ip: string | null; port: string; scheme: string } => {
  // Try to get from local storage
  const storedIp = localStorage.getItem(IP_STORAGE_KEY);
  const storedPort = localStorage.getItem(PORT_STORAGE_KEY) || DEFAULT_PORT;
  const storedScheme = localStorage.getItem(SCHEME_STORAGE_KEY) || DEFAULT_SCHEME;

  return {
    ip: storedIp,
    port: storedPort,
    scheme: storedScheme
  };
};

/**
 * Gets the backend URL configuration from environment variables
 * @returns {Object} The backend URL configuration from environment variables
 */
export const getEnvBackendConfig = (): { ip: string | null; port: string; scheme: string } => {
  return {
    ip: process.env.REACT_APP_BACKEND_DOMAIN || null,
    port: process.env.REACT_APP_BACKEND_PORT || DEFAULT_PORT,
    scheme: process.env.REACT_APP_BACKEND_SCHEME || DEFAULT_SCHEME
  };
};

/**
 * Gets the backend URL configuration from local storage or environment variables
 * @returns {Object} The backend URL configuration
 */
export const getBackendConfig = (): { ip: string; port: string; scheme: string } => {
  // Try to get from local storage first
  const stored = getStoredBackendConfig();

  // If we have a stored IP, use it
  if (stored.ip) {
    return {
      ip: stored.ip,
      port: stored.port,
      scheme: stored.scheme
    };
  }

  // Fallback to environment variables
  const env = getEnvBackendConfig();
  return {
    ip: env.ip || "",
    port: env.port,
    scheme: env.scheme
  };
};

/**
 * Saves the backend URL configuration to local storage
 * @param {string} ip - The IP address to save
 * @param {string} port - The port to save
 * @param {string} scheme - The scheme to save
 */
export const saveBackendConfig = (
  ip: string, 
  port: string = DEFAULT_PORT,
  scheme: string = DEFAULT_SCHEME
): void => {
  localStorage.setItem(IP_STORAGE_KEY, ip);
  localStorage.setItem(PORT_STORAGE_KEY, port);
  localStorage.setItem(SCHEME_STORAGE_KEY, scheme);
};

/**
 * Clears the backend URL configuration from local storage
 */
export const clearBackendConfig = (): void => {
  localStorage.removeItem(IP_STORAGE_KEY);
  localStorage.removeItem(PORT_STORAGE_KEY);
  localStorage.removeItem(SCHEME_STORAGE_KEY);
};

/**
 * Gets the backend URL
 * @returns {string} The backend URL
 */
export const getBackendUrl = (): string => {
  const { ip, port, scheme } = getBackendConfig();
  return `${scheme}${ip}:${port}`;
};

/**
 * Checks if the user is accessing the frontend via localhost
 * @returns {boolean} True if the user is using localhost, false otherwise
 */
export const isUsingLocalhost = (): boolean => {
  const hostname = window.location.hostname;
  return hostname === 'localhost' || hostname === '127.0.0.1';
};
