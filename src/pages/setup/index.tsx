import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Typography, Alert, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { 
  detectLocalIP, 
  isServerReachable, 
  saveBackendConfig, 
  clearBackendConfig,
  getEnvBackendConfig,
  getStoredBackendConfig,
  DEFAULT_PORT, 
  DEFAULT_SCHEME 
} from '../../helpers/ip.helper';

const { Title, Paragraph, Text } = Typography;

export const SetupPage: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [detectedIp, setDetectedIp] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [testingConnection, setTestingConnection] = useState(false);
  const [connectionAttempts, setConnectionAttempts] = useState<string[]>([]);

  useEffect(() => {
    const initSetup = async () => {
      const attempts: string[] = [];

      try {
        // Step 0: Check if we have a stored configuration in local storage
        // Note: If we're on the setup page, it means the stored config already failed in the context
        const storedConfig = getStoredBackendConfig();
        if (storedConfig.ip) {
          attempts.push(`Tried connecting to ${storedConfig.scheme}${storedConfig.ip}:${storedConfig.port} from local storage`);
          attempts.push(`Could not connect to ${storedConfig.scheme}${storedConfig.ip}:${storedConfig.port}`);

          // Clear the stored config since it's not working
          clearBackendConfig();
        }

        // Step 1: Try to connect using .env configuration
        const envConfig = getEnvBackendConfig();
        if (envConfig.ip) {
          attempts.push(`Tried connecting to ${envConfig.scheme}${envConfig.ip}:${envConfig.port} from .env file`);

          // Set form values to .env values
          form.setFieldsValue({ 
            ip: envConfig.ip, 
            port: envConfig.port,
            scheme: envConfig.scheme
          });

          // Check if server is reachable with .env values
          const isEnvReachable = await isServerReachable(
            envConfig.ip,
            envConfig.port,
            envConfig.scheme
          );

          if (isEnvReachable) {
            // If server is reachable, save config and redirect
            saveBackendConfig(envConfig.ip, envConfig.port, envConfig.scheme);
            navigate('/');
            return;
          } else {
            attempts.push(`Could not connect to ${envConfig.scheme}${envConfig.ip}:${envConfig.port}`);
          }
        } else {
          attempts.push('No IP address found in .env file');
        }

        // Step 2: Try to detect local IP and connect with port 3000
        const detectedIp = await detectLocalIP();
        setDetectedIp(detectedIp);

        if (detectedIp) {
          attempts.push(`Detected local IP: ${detectedIp}`);

          // Update form with detected IP
          form.setFieldsValue({ 
            ip: detectedIp, 
            port: DEFAULT_PORT,
            scheme: DEFAULT_SCHEME
          });

          // Check if server is reachable with detected IP
          const isDetectedReachable = await isServerReachable(
            detectedIp,
            DEFAULT_PORT,
            DEFAULT_SCHEME
          );

          if (isDetectedReachable) {
            // If server is reachable, save config and redirect
            saveBackendConfig(detectedIp, DEFAULT_PORT, DEFAULT_SCHEME);
            navigate('/');
            return;
          } else {
            attempts.push(`Could not connect to ${DEFAULT_SCHEME}${detectedIp}:${DEFAULT_PORT}`);
          }
        } else {
          attempts.push('Could not detect local IP address');
        }

        // If we get here, both attempts failed, show the manual setup form
        setConnectionAttempts(attempts);
      } catch (err) {
        console.error('Error during setup initialization:', err);
      } finally {
        setLoading(false);
      }
    };

    initSetup();
  }, [form, navigate]);

  const onFinish = async (values: { ip: string; port: string; scheme: string }) => {
    setTestingConnection(true);
    setError(null);

    try {
      const isReachable = await isServerReachable(
        values.ip, 
        values.port, 
        values.scheme
      );

      if (isReachable) {
        // Save configuration to local storage
        saveBackendConfig(values.ip, values.port, values.scheme);

        // Redirect to home page
        navigate('/');
      } else {
        setError('Could not connect to the server. Please check the IP address and port.');
      }
    } catch (err) {
      setError('An error occurred while testing the connection.');
      console.error('Connection test error:', err);
    } finally {
      setTestingConnection(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" tip="Detecting local network settings..." />
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      padding: '20px'
    }}>
      <Card style={{ width: '100%', maxWidth: 500 }}>
        <Title level={2}>Server Setup</Title>

        <Paragraph>
          Please enter the IP address and port of your backend server.
        </Paragraph>

        {connectionAttempts.length > 0 && (
          <Alert
            message="Automatic Connection Attempts"
            description={
              <div>
                <p>We tried the following connection methods:</p>
                <ul>
                  {connectionAttempts.map((attempt, index) => (
                    <li key={index}>{attempt}</li>
                  ))}
                </ul>
                <p>Please enter your server details manually.</p>
              </div>
            }
            type="info"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}

        {detectedIp && (
          <Alert
            message="Local IP Detected"
            description={`We detected your local IP address as ${detectedIp}. You can use this or enter a different one.`}
            type="info"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}

        {error && (
          <Alert
            message="Connection Error"
            description={error}
            type="error"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            ip: detectedIp || '',
            port: DEFAULT_PORT,
            scheme: DEFAULT_SCHEME
          }}
        >
          <Form.Item
            name="scheme"
            label="Scheme"
            rules={[{ required: true, message: 'Please select the scheme' }]}
          >
            <Input placeholder="http://" />
          </Form.Item>

          <Form.Item
            name="ip"
            label="IP Address"
            rules={[{ required: true, message: 'Please enter the IP address' }]}
          >
            <Input placeholder="192.168.1.100" />
          </Form.Item>

          <Form.Item
            name="port"
            label="Port"
            rules={[{ required: true, message: 'Please enter the port' }]}
          >
            <Input placeholder="3000" />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={testingConnection}
              block
            >
              {testingConnection ? 'Testing Connection...' : 'Connect to Server'}
            </Button>
          </Form.Item>
        </Form>

        <Text type="secondary">
          Note: This configuration will be saved in your browser's local storage.
        </Text>
      </Card>
    </div>
  );
};

export default SetupPage;
