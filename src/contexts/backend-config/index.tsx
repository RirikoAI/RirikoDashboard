import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Alert } from 'antd';
import { 
  detectLocalIP, 
  isServerReachable, 
  saveBackendConfig, 
  clearBackendConfig,
  getBackendConfig,
  getEnvBackendConfig,
  getStoredBackendConfig,
  isUsingLocalhost,
  DEFAULT_PORT,
  DEFAULT_SCHEME
} from '../../helpers/ip.helper';

interface BackendConfigContextType {
  isConfigured: boolean;
  isLoading: boolean;
  isUsingLocalhost: boolean;
  checkConnection: () => Promise<boolean>;
}

const BackendConfigContext = createContext<BackendConfigContextType | undefined>(undefined);

export const useBackendConfig = () => {
  const context = useContext(BackendConfigContext);
  if (!context) {
    throw new Error('useBackendConfig must be used within a BackendConfigProvider');
  }
  return context;
};

interface BackendConfigProviderProps {
  children: ReactNode;
}

export const BackendConfigProvider: React.FC<BackendConfigProviderProps> = ({ children }) => {
  const [isConfigured, setIsConfigured] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [usingLocalhost, setUsingLocalhost] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const checkConnection = async (): Promise<boolean> => {
    try {
      // Step 1: Check if we have a stored configuration in local storage
      const storedConfig = getStoredBackendConfig();
      if (storedConfig.ip) {
        // Try to connect using stored configuration
        const isStoredReachable = await isServerReachable(
          storedConfig.ip, 
          storedConfig.port, 
          storedConfig.scheme
        );

        if (isStoredReachable) {
          setIsConfigured(true);
          return true;
        } else {
          // If stored IP is no longer reachable, clear the localStorage
          clearBackendConfig();
        }
      }

      // Step 2: Try to connect using .env configuration
      const envConfig = getEnvBackendConfig();
      if (envConfig.ip) {
        const isEnvReachable = await isServerReachable(
          envConfig.ip, 
          envConfig.port, 
          envConfig.scheme
        );

        if (isEnvReachable) {
          // Save the working configuration to local storage
          saveBackendConfig(envConfig.ip, envConfig.port, envConfig.scheme);
          setIsConfigured(true);
          return true;
        }
      }

      // Step 3: Try to detect local IP and connect with port 3000
      const detectedIp = await detectLocalIP();
      if (detectedIp) {
        const isDetectedReachable = await isServerReachable(
          detectedIp, 
          DEFAULT_PORT, 
          DEFAULT_SCHEME
        );

        if (isDetectedReachable) {
          // Save the working configuration to local storage
          saveBackendConfig(detectedIp, DEFAULT_PORT, DEFAULT_SCHEME);
          setIsConfigured(true);
          return true;
        }
      }

      // Step 4: If all attempts fail, redirect to setup page
      setIsConfigured(false);
      if (location.pathname !== '/setup') {
        navigate('/setup');
      }

      return false;
    } catch (error) {
      console.error('Error checking connection:', error);
      setIsConfigured(false);

      // If there's an error and we're not already on the setup page, redirect to setup
      if (location.pathname !== '/setup') {
        navigate('/setup');
      }

      return false;
    }
  };

  useEffect(() => {
    const initializeBackendConfig = async () => {
      setIsLoading(true);
      await checkConnection();
      setIsLoading(false);
    };

    // Check if the user is using localhost
    setUsingLocalhost(isUsingLocalhost());

    // Skip the check if we're already on the setup page
    if (location.pathname !== '/setup') {
      initializeBackendConfig();
    } else {
      setIsLoading(false);
    }
  }, [location.pathname]);

  // Localhost warning component
  const LocalhostWarning = () => {
    if (!usingLocalhost) return null;

    return (
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
        <Alert
          message="Warning: Using localhost"
          description={
            <div>
              <p>You are accessing the frontend using localhost. This may cause connectivity issues.</p>
              <p>Please access the application using your local IP address instead.</p>
            </div>
          }
          type="warning"
          showIcon
          closable
          banner
        />
      </div>
    );
  };

  return (
    <BackendConfigContext.Provider value={{ isConfigured, isLoading, isUsingLocalhost: usingLocalhost, checkConnection }}>
      <LocalhostWarning />
      {children}
    </BackendConfigContext.Provider>
  );
};
